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

We can see our three running containers using 
```bash
$ docker ps
```
It should look something like this
```
CONTAINER ID        IMAGE                                      COMMAND                  CREATED             STATUS              PORTS                              NAMES
523db2fa776f        example/postgres-grpc-connector-database   "docker-entrypoint..."   20 hours ago        Up 39 seconds       5432/tcp                           postgres-database
c2f3ec13840b        qlikea/postgres-grpc-connector:latest      "/go/bin/server"         20 hours ago        Up 40 seconds       50051/tcp                          postgres-grpc-connector
95656bea1801        qlikea/engine:12.84.0                      "./entrypoint.sh -..."   20 hours ago        Up 39 seconds       0.0.0.0:9076->9076/tcp, 9090/tcp   qix-engine
```

Looking at the ports here we can see that the database container exposes port `5432` on the network the containers share among themselves and the `postgres-grpc-connector` can therefore talk to the database container on this port. 

The `postgres-grpc-connector` container exposes the port `50051` which is the same port we told the engine to talk to it on with the commands in the `docker-compose` file.

Finally we can see that the engine exposes the ports `9076` and `9090`. The `9090` port is used for metrics and is not interesting in this example. 

But the `9076` port is the engines standard API port and here we have also opened it to the _outside_ and mapped it to port `9076` on your local machine. So requests to your machine on port `9076` will go to qix-engine container.

So now that we have a database container with the data, a GRPC-Connector container and an engine running all we need is to trigger a load of the data.

We will do this with a small `Node.JS` program using the Qlik library [Enigma.js](https://github.com/qlik-oss/enigma.js) to talk with the engine.