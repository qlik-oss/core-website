# Data Loading Recipe

This recipe outlines a couple of different approaches and things to keep in mind when loading data into your document
in a scalable environment.

## End-user defined data

This section is mainly documentation how to use the halyard.js stream service to allow customized end-user
data through services like Dropbox.

## Developer defined data

This section contains a runnable example how to load some airport data from a postgresql database using the GRPC protocol in QIX Engine. 
It assumes you are running in a \*nix environment or uses Git Bash if on Windows.

First clone and open the `postgres-grpc-connector` repository and move to the `example` folder.

Then we need to build our postgres image containing our airport data.
```bash
$ cd postgres-image
$ docker build . -t example/postgres-grpc-connector-database
```
The Dockerfile we are using looks like this
```
FROM postgres:10.0
COPY ./airports.csv /
COPY ./init-airports-data.sql /docker-entrypoint-initdb.d/
```
It builds on the official postgres image and then copies our `airports.csv` file into the image as well as the `init-airports-data.sql` script to the folder `docker-entrypoint-initdb.d`, when the postgres image starts it will run all `.sql` inside the folder and thus our `init-airports-data.sql` will be run.

The script looks like this
```sql
CREATE TABLE airports
(
  rowID integer,
  airport character varying(250),
  city character varying(250),
  country character varying(250),
  iatacode character varying(50),
  icaocode character varying(50),
  latitude character varying(50),
  longitude character varying(50),
  altitude character varying(50),
  timezone character varying(50),
  dst character varying(50),
  tz character varying(50)
);
COPY airports FROM '/airports.csv' DELIMITER ',' CSV HEADER;
```

It creates a table in the default database containing the data from the copied `airports.csv` file. Thus when running the created image we will have a standard postgres database with an airports table containing our data from the `airports.csv`

After building our database image we can start our containers.
```bash
$ cd ..
$ docker-compose up -d
```
The docker-compose file looks like this
```
version: "3.3"
services:
  postgres-database:
    container_name: postgres-database
    image: example/postgres-grpc-connector-database
  postgres-grpc-connector:
    container_name: postgres-grpc-connector
    image: qlikea/postgres-grpc-connector:latest
  qix-engine:
    container_name: qix-engine
    image: qlikea/engine:12.84.0
    ports:
      - 9076:9076
    command: -S EnableGrpcCustomConnectors=1 -S GrpcConnectorPlugins="postgres-grpc-connector,postgres-grpc-connector:50051"
```
You can see that it starts three services. The first is the database using the image we just created. The second is the postgres-grp-connector and the final one is the qix-engine. 

For the qix-engine service we have opened and mapped port `9076` on the container to port `9076` on our local machine, this is because we will access the engine from outside of the docker network to trigger a load of our airport data and thus the port needs to open to the outside.

We have also added a few commands to the engine `-S EnableGrpcCustomConnectors=1` enables grpc-connectors in the engine and `-S GrpcConnectorPlugins="postgres-grpc-connector,postgres-grpc-connector:50051"` creates a connector of type `postgres-grpc-connector` which we tell the engine exists on host `postgres-grpc-connector` and listening on port `50051`

We can see our running containers using 
```bash
$ docker ps
```