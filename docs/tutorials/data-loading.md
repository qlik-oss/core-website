# Data Loading Recipe

This recipe outlines a couple of different approaches and things to keep in mind when loading data into your document
in a scalable environment.

It assumes you are running in a \*nix environment or use Git Bash on Windows. Basic Docker knowledge is also assumed.

## End-user defined file based data

This section is mainly documentation on how to use the [file-connectivity-service](https://github.com/qlik-ea/outhaul) to access end-user file based data.
The [file-connectivity-service](https://github.com/qlik-ea/outhaul) is built to simplify accessing [OAuth 2.0](https://oauth.net/2/) protected data sources like Dropbox, OneDrive, GoogleDrive.
Connection providers are registered with the [file-connectivity-service](https://github.com/qlik-ea/outhaul) and in return a unique HTTP endpoint is defined.
The unique HTTP endpoint is used to access the data source. This solution enables the QIX Engine to access a wide variety of different data sources using the built in web file connector.

### Example on how to load data from Dropbox using OAuth2.0

``` bash
git clone https://github.com/qlik-ea/outhaul.git
cd file-connectivity-service
npm install
```

Copying the file [`airports.csv`](https://github.com/qlik-ea/outhaul/blob/master/data/airports.csv) located in the `/data` folder to your Dropbox.
Follow [this guide](https://www.dropbox.com/developers/reference/oauth-guide) and create a OAuth 2.0 application.
The `Redirect URIs` should be the address to the `http://[host]:[port]/oauth2/callback` running the service, for example: `http://localhost:3000/oauth2/callback`

**Set the following environment variables in the terminal**

``` bash
cd examples
export DROPBOX_CLIENT_ID="your App key
export DROPBOX_CLIENT_SECRET="your App secret"
docker-compose up -d --build
node ./dropbox
```

The first 10 lines of the [`airports.csv`](https://github.com/qlik-ea/outhaul/blob/master/data/airports.csv) table should be outputted in the console window.

GoogleDrive and OneDrive have similar workflow as the one described above and are supported in the [file-connectivity-service](https://github.com/qlik-ea/outhaul).

## Developer defined data

This section contains a runnable example how to load some airport data from a postgres database using the GRPC protocol
in the QIX Engine.

First clone and open the [postgres-grpc-connector](https://github.com/qlik-ea/postgres-grpc-connector) repository
and move to the `example` folder.

Then we need to build our postgres image containing our airport data.

```bash
cd postgres-image
docker build . -t example/postgres-grpc-connector-database
```

The [Dockerfile](https://github.com/qlik-ea/postgres-grpc-connector/blob/master/example/postgres-image/Dockerfile)
builds on the official postgres image and then copies our `airports.csv` file into the image
as well as copying the `init-airports-data.sql` script to the folder `docker-entrypoint-initdb.d` on the image.

When the postgres image starts it will run all `.sql` files inside the folder
and thus our `init-airports-data.sql` will be run.

The [script](https://github.com/qlik-ea/postgres-grpc-connector/blob/master/example/postgres-image/init-airports-data.sql)
creates a table in the default database containing the data from the copied `airports.csv` file.
Thus when running the created image we will have a standard postgres database with an airports table containing
our data from the `airports.csv` file.

After building our database image we can start our containers.

```bash
cd ..
docker-compose up -d
```

You can see that the [docker-compose](https://github.com/qlik-ea/postgres-grpc-connector/blob/master/example/docker-compose.yml)
starts three services.
The first is the database using the image we just created.
The second is the postgres-grp-connector and the final one is the QIX Engine.

For the QIX Engine we have opened and mapped port `9076` on the container to port `19076` on our local machine,
this is because we will access the QIX Engine from outside of the docker network to trigger a load of our airport data
and thus the port needs to open to the outside.

We have also added a few commands to the QIX Engine `-S EnableGrpcCustomConnectors=1` enables grpc-connectors
in the QIX Engine and `-S GrpcConnectorPlugins="postgres-grpc-connector,postgres-grpc-connector:50051"`
creates a connector of type `postgres-grpc-connector`
which we tell the QIX Engine exists on host `postgres-grpc-connector` and listening on port `50051`

We can see our three running containers using

```bash
docker ps
```

Looking at the ports here we can see that the database container exposes port `5432` on the network the containers
share among themselves and the `postgres-grpc-connector` can therefore access to the database container on this port.

The `postgres-grpc-connector` container exposes the port `50051` which is the same port we told the QIX Engine
to talk to it on with the commands in the `docker-compose` file.

Finally we can see that the engine exposes the ports `9076` and `9090`. The `9090` port is used for metrics
and is not interesting in this example.

The `9076` port is the QIX Engines standard API port and here we have also opened it to the _outside_ and mapped it to
port `19076` on your local machine. So requests to your machine on port `19076` will go to QIX Engine container.

Now that we have a database container with the data, a GRPC-Connector container
and a QIX Engine running all we need is to trigger a load of the data.

We will do this with a small `Node.JS` program using the Qlik library [enigma.js](https://github.com/qlik-oss/enigma.js)
to talk with the QIX Engine to trigger a load of our airport data via the GRPC-Connector.

```bash
cd reload-runner
npm install
npm start
```

You should see the info from 10 different airports in your terminal.

What the program does is it first creates or opens an app called `reloadapp.qvf` on the QIX Engine.
Then it creates a connection of the type we defined earlier

```js
app.createConnection({
  qType: 'postgres-grpc-connector', //the name we defined as a parameter to the QIX Engine in our docker-compose.yml
  qName: 'postgresgrpc',
  //the connection string inclues both the provider to use and parameters to it.
  qConnectionString: 'CUSTOM CONNECT TO "provider=postgres-grpc-connector;host=postgres-database;port=5432;database=postgres"',
  qUserName: 'postgres', //username and password for the postgres database, provided to the grpc-connector
  qPassword: 'postgres'
});
```

The connection string
`CUSTOM CONNECT TO "provider=postgres-grpc-connector;host=postgres-database;port=5432;database=postgres`
tells the QIX Engine to use the `postgres-grpc-connector` and then the rest is parameters to the GRPC-Connector
such as the database host address and port.
You can see that the host is the name of the service we defined in the `docker-compose`
and the port is the port the database-container exposes.

After this we set a script to use the connection we just created.

```js
const script = `
  lib connect to 'postgresgrpc';
  Airports:
  sql select rowID,Airport,City,Country,IATACode,ICAOCode,Latitude,Longitude,Altitude,TimeZone,DST,TZ,clock_timestamp() from airports;
`; // add script to use the grpc-connector and load a table
app.setScript(script);
```

We are using the name `postgresgrpc` that we defined when we created our connection
and then we are loading the airport data from the postgres `airports` table into the qix table `Airports`

Then we do a reload to load the new data into the QIX Engine
and after that we fetch the first 10 results of the `Airports` table and print them to the terminal.

You can get more detailed info by looking inside the `index.js` file
and reading on [enigma.js](https://github.com/qlik-oss/enigma.js).
