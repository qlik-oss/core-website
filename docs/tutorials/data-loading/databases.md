# Databases

This tutorial gives an example of how to load data from a database into Qlik Associative Engine using a JDBC connector
and the gRPC protocol. In this example data resides in mySQL and PostgreSQL.

Several different database connector examples are provided with Qlik Core. See the
[Data Connector API](../../services/qix-engine/apis/data-loading/introduction.md) section for more information.

## Prerequisites

To follow along in this tutorial, you should have basic understanding of Docker.

You need the following software installed:

* Git
* Docker
* docker-compose
* Node.js

!!! Note
    Shell commands should be run in a Bash shell.
    If you are using Windows, we recommend using Git Bash.

## Setup

To run the example code, clone the
[qlik-oss/core-grpc-jdbc-connector](https://github.com/qlik-oss/core-grpc-jdbc-connector)
Git repository. Check out the repo documentation to get familiar with the content and structure.

In your shell, make sure current directory is at the repo root.

Set the `ACCEPT_EULA` environment variable as applicable and start the containers by running:

```sh
ACCEPT_EULA=<yes/no> docker-compose up --build -d
```

This starts the following services in containers:

* A mySQL database
* A postgreSQL database
* A core-grpc-jdbc-connector
* The Qlik Associative Engine

Verify that all four containers are properly running with:

```sh
docker ps
```

## The gRPC JDBC connector

The gRPC JDBC connector runs in its own Docker container and sits between Qlik Associative Engine and the databases
supporting JDBC connections. It implements the
[Data Connector API](../../services/qix-engine/apis/data-loading/introduction.md) which makes it possible for the
engine to communicate over gRPC with it. At the other end it communicates with the PostgreSQL and mySQL containers
with JDBC connections, in this way working as a data bridge between the engine and the data sources.

The Qlik Associative Engine container must be configured to use the custom JDBC connector by providing some command-line
options to it. Study the
[docker-compose.yml](https://github.com/qlik-oss/core-grpc-jdbc-connector/blob/master/example/docker-compose.yml) file
and notice the following options:

* `-S EnableGrpcCustomConnectors=1` which enables gRPC connectors in the Qlik Associative Engine.
* `-S GrpcConnectorPlugins="jdbc,jdbc-connector:50051"` which registers a connector of the type `jdbc`, which we tell
  the Qlik Associative Engine exists on host `jdbc-connector` and listening on port 50051. The first occurrence of
  `jdbc` (before the comma) is an arbitrary string used to identify the connector, another name could be chosen.

## Loading data from the databases

Now that we have populated databases, a gRPC connector container, and the Qlik Associative Engine running, all we need
is to trigger a load of the data.

In this example, the `reload-runner` Node.js program uses [enigma.js](https://github.com/qlik-oss/enigma.js) to trigger
a load of the airport data using the gRPC connector.

```sh
cd reload-runner
npm install
npm start
```

The expected output is that 100 rows of airport data fetched from MySQL and an additional 100 rows of data
fetched from PostgreSQL are printed to the console.

## What is happening?

Once the containers are running and you trigger the reload, the program creates and opens an app called `reloadapp.qvf`
on the Qlik Associative Engine. Then it creates two connections of the type we defined earlier to load data from both
the mySQL and PostgreSQL databases.

In the PostgreSQL case, the connection is done in a way similar to:

```js
const connectionSettings = {
  qType: 'jdbc',
  qName: 'jdbc',
  qConnectionString:
   'CUSTOM CONNECT TO "provider=jdbc;driver=postgresql;host=postgres-database;port=5432;database=postgres"',
  qUserName: 'postgres',
  qPassword: 'postgres',
};

// parts of code omitted

const connectionId = await app.createConnection(connectionSettings);
```

In the `connectionSettings` object:

* `qType` represents what type of connector the connection should use.
* `qName` is the name of this connection instance.
* `qConnectionString` is the parameter that is sent to the connector. The parts of the connection string that is
  specific to the JDBC connector is the driver setting. It will be the JDBC driver that the connector will use to
  connect to the database with. The provider needs to be the same as the `qType`. Host, port and database are related to
  locating the database.
* `qUserName` and `qPassword` are the credentials used to access the database with (will be removed from the logs).

Then, we set a script to use the connection that we just created:

```js
const script = `
   lib connect to 'jdbc';
   airports:
   sql SELECT * FROM airports;
   `; // add script to use the jdbc connector and load a table
app.setScript(script);
```

The `lib connect to 'jdbc';` statement refers to the name of the connection to use.
`airports:` will be the internal name of the table loaded.
The actual load statement that is sent to the connector is everything after `sql`.
In this case the load statement will be `SELECT * FROM airports`.

Next, we reload the data into the Qlik Associative Engine. The first 100 results of the `airports` table loaded from
mySQL are printed to the console. The workflow is then repeated a second time, now loading from PostgreSQL.

The biggest difference between the connection strings is the driver setting, `driver=mysql` and `driver=postgresql`
respectively.

!!! Tip
    We recommend that you take a look inside the `index.js` file and that you read through the
    [enigma.js](https://github.com/qlik-oss/enigma.js) documentation to get a better understanding of the steps taken in
    this tutorial.
