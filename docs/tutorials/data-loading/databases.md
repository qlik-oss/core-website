# Databases

This tutorial gives an example of how to load data from a database into Qlik Associative Engine using the gRPC protocol
and a JDBC connector. In this example data resides in PostgreSQL but the solution would be similar if using,
for example, MongoDB.

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

## Loading data from PostgreSQL database with JDBC

In this example workflow, load data from a PostgreSQL database using the gRPC protocol in the Qlik Associative Engine.

To run the example code, clone the
[qlik-oss/core-grpc-jdbc-connector](https://github.com/qlik-oss/core-grpc-jdbc-connector)
Git repository. Check out the repo documentation to get familiar with the content and structure.

Do the following:

1. Start the containers.

    ```bash
    cd example/
    ACCEPT_EULA=<yes/no> docker-compose up --build -d
    ```

    The [`docker-compose.yml`](https://github.com/qlik-oss/core-grpc-jdbc-connector/blob/master/example/docker-compose.yml)
    file starts the following services in containers:

    - A mySQL database
    - A postgreSQL database
    - A core-grpc-jdbc-connector
    - The Qlik Associative Engine

    **Note:** If you look at the `docker-compose.yml` file, port `9076` on the container
    is mapped to port `19076` on the local machine.
    This lets you access the Qlik Associative Engine from outside of the Docker network.
    In this example, we want to trigger a load of the airport data
    from outside of the container.

    The following special commands are important for enabling the gRPC connectors:

    - `-S EnableGrpcCustomConnectors=1`

        Enables gRPC connectors in the Qlik Associative Engine.

    - `-S GrpcConnectorPlugins="jdbc,jdbc-connector:50051"`

        Registers a connector of the type `jdbc`,
        which we tell the Qlik Associative Engine exists on host `jdbc-connector`
        and listening on port `50051`.

1. Verify that the three services are running in containers.

    ```bash
    docker ps
    ```

    The postgres-database containers share port `5432` and the mysql-database containers share port `3306`,
    they are both exposed on the network.
    The `jdbc-connector` can therefore access the database container on this port.

    The `jdbc-connector` container exposes port `50051`.
    This is the port that we told the Qlik Associative Engine to talk to
    with the commands in the `docker-compose.yml` file.

    The Qlik Associative Engine exposes ports `9076` and `9090`.
    Port `9090` is used for metrics, which is not relevant for this example.
    Port `9076` is the standard Qlik Associative Engine API port. Since we mapped it to
    port `19076` on your local machine, _outside_ of the container,
    requests to your machine on port `19076` will go to Qlik Associative Engine container.

1. Trigger the data load.

    Now that we have a populated database, a gRPC connector container,
    and a Qlik Associative Engine running, all we need is to trigger a load of the data.

    For this example, a small Node.js program that uses the Qlik library [enigma.js](https://github.com/qlik-oss/enigma.js)
    that talks to the Qlik Associative Engine triggers a load of the airport data with the gRPC connector.

    ```bash
    cd reload-runner
    npm install
    npm start
    ```

    You should see the 100 rows of airport data fetched from MySQL and an additional 100 rows of data
    fetched from PostgreSQL in your terminal.

### What is happening?

Once the containers are running and you trigger the reload, the program creates and opens an app called `reloadapp.qvf`
on the Qlik Associative Engine. Then it creates a connection of the type we defined earlier.

```js
app.createConnection({
  qType: 'jdbc', // the name we defined as a parameter to engine in our docker-compose.yml
  qName: 'jdbc',
  qConnectionString:
   'CUSTOM CONNECT TO "provider=jdbc;driver=postgresql;host=postgres-database;port=5432;database=postgres"', // the connection string includes both the provide to use and parameters to it.
  qUserName: 'postgres', // username and password for the postgres database, provided to the GRPC-Connector
  qPassword: 'postgres',
});
```

**qType** represents what type of connector the connection should use.

**qName** is the name of this connection instance.

**qConnectionString** is the parameter that is sent to the connector. The parts of the connection string that is
specific to the JDBC connector is the driver setting. It will be the JDBC driver that the connector will use to connect
to the database with. The provider needs to be the same as the qType. Host, port and database are related to locating
the database.

**qUserName** and **qPassword** are the credentials used to access the database with (will be removed from the logs).

Then, we set a script to use the connection that we just created.

```js
const script = `
   lib connect to 'jdbc';
   airports:
   sql SELECT * FROM airports;
   `; // add script to use the jdbc connector and load a table
app.setScript(script);
```

The "lib connect to 'jdbc';" refers to the name of the connection to use.
"airports:" will be the internal name of the table loaded.
The actual load statement that is sent to the connector is everything after sql.
In this case the load statement will be "SELECT * FROM airports".

Next, we reload the data to load the new data into the Qlik Associative Engine.
The first 100 results of the `airports` table loaded from PostgreSQL are print to the console.

The workflow is then repeated a second time with only change being that we use a new connection
to the MySQL database container.

```js
app.createConnection({
  qType: 'jdbc', // the name we defined as a parameter to Qlik Associative Engine in our docker-compose.yml
  qName: 'jdbc',
  qConnectionString:
  'CUSTOM CONNECT TO "provider=jdbc;driver=mysql;host=mysql-database;port=3306;database=airport"', // the connection string includes both the provider to use and parameters to it.
  qUserName: 'root', // username and password for the postgres database, provided to the GRPC-Connector
  qPassword: 'mysecretpassword',
});
```

The biggest difference between the connection strings are the driver setting that is using
the JDBC driver for mysql instead of postgresql.

The first 100 results of the `airports` table loaded from MySQL are print to the console.

!!! Tip
    We recommend that you take a look inside the `index.js` file
    and that you read through the [enigma.js](https://github.com/qlik-oss/enigma.js) documentation
    to get a better understanding of the steps taken in this tutorial.
