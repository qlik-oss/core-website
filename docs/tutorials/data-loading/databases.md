# Databases

In this tutorial, learn how to load data from a databases, such as mySQL and PostgreSQL,
into Qlik Associative Engine with a JDBC connector using the gRPC protocol.

Qlik Core includes several database connector examples. For more information, see the
[Data Connector API](../../services/qix-engine/apis/data-loading/introduction.md) section.

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
Git repository. Before you continue, look at the documentation to get familiar with the content and structure of
the repository.

!!!Note
    In your shell, make sure current directory is at the repository root.

To begin, you must accept the EULA and start the containers.

Run the following command:

```sh
ACCEPT_EULA=<yes/no> docker-compose up --build -d
```

This starts the following services in containers:

* A mySQL database
* A postgreSQL database
* A core-grpc-jdbc-connector
* Qlik Associative Engine

To verify that all four containers are running properly, run the following command:

```sh
docker ps
```

!!! Tip
    In the `core-data-loading` examples script logging is enabled to get the log messages in `stdout`.
    The script logging verbosity can be set in e.g. a docker-compose file like [this](https://github.com/qlik-oss/core-data-loading/blob/master/docker-compose.yml#L8).
    Further description regarding the verbosity levels and log message details can be found in the [logging chapter](../../services/qix-engine/logging.md).

## The gRPC JDBC connector

The gRPC JDBC connector runs in its own Docker container and sits between the Qlik Associative Engine and the databases.
The connector implements the [Data Connector API](../../services/qix-engine/apis/data-loading/introduction.md),
which makes it possible for the engine to communicate with the connector over gRPC.
On the database side, it communicates with the PostgreSQL and mySQL containers
with JDBC connections. In this way, it functions as a data bridge between the engine and the data sources.

For the Qlik Associative Engine to use the custom JDBC connector,
you must configure the engine container by enabling connectors,
specifying the connector type, and specifying the connector location.

Look at the [docker-compose.yml](https://github.com/qlik-oss/core-grpc-jdbc-connector/blob/master/examples/docker-compose.yml)
file and take note of the following options:

* `-S EnableGrpcCustomConnectors=1` enables gRPC connectors in the Qlik Associative Engine.
* `-S GrpcConnectorPlugins="jdbc,jdbc-connector:50051"` registers a connector of the type `jdbc` and tells
  the Qlik Associative Engine that the connector exists on host `jdbc-connector` and on port 50051.

    !!! Note
        The first occurrence of `jdbc` (before the comma) is an arbitrary string used to identify the connector.
        You an use another name.

## Loading data from the databases

Now that you have your databases, the connector, and the engine running in containers,
you need to trigger a load of the data.

In this example, the `reload-runner` Node.js program uses [enigma.js](https://github.com/qlik-oss/enigma.js) to trigger
a load for some of the airport data using the gRPC connector.

Run the following command:

```sh
cd reload-runner
npm install
npm start
```

The expected output is 100 rows of airport data fetched from MySQL, and an additional 100 rows of data
fetched from PostgreSQL. The data is printed to the console.

## What is happening

Once the containers are running and you trigger the reload, the program creates and opens an app called `reloadapp.qvf`
on the Qlik Associative Engine.
Then, it creates two connections of the type you defined earlier
to load data from both the mySQL and PostgreSQL databases.

Take a look at the postgreSQL connection. It is created like this:

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

* `qType` represents the type of connector the connection should use.
* `qName` is the name of the connection instance.
* `qConnectionString` is the parameter that is sent to the connector. The part of the connection string that is
  specific to the JDBC connector is the driver setting. It is the JDBC driver that the connector uses to
  connect to the database. The provider must be the same as the `qType`. Host, port, and database are related to
  locating the database.
* `qUserName` and `qPassword` are the database access credentials. They are not stored in the logs.

Then, you set a script to use the connection that you just created:

```js
const script = `
   lib connect to 'jdbc';
   airports:
   sql SELECT * FROM airports;
   `; // add script to use the jdbc connector and load a table
app.setScript(script);
```

The `lib connect to 'jdbc';` statement refers to the name of the connection to use.
`airports:` is the internal name of the table loaded.
The load statement that is sent to the connector is after `sql`.
In this case, the load statement is `SELECT * FROM airports`, where `*` denotes all headers.

Next, you reload the data into the Qlik Associative Engine.

The expected output is a list of airport entries loaded from the mySQL database.
The first 100 results are printed to the console.
The workflow is then repeated a second time, now loading from PostgreSQL.

The biggest difference between the two database connection strings is the driver setting:
`driver=mysql` and `driver=postgresql` respectively.

!!! Tip
    We recommend that you take a look inside the `index.js` file, and that you read through the
    [enigma.js](https://github.com/qlik-oss/enigma.js)
    documentation to get a better understanding of the steps in this tutorial.

## Next steps

More runnable load script examples, including more advanced ones, are available in the
[qlik-oss/core-data-loading](https://github.com/qlik-oss/core-data-loading) Git repository.
