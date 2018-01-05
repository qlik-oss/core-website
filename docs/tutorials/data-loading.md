# Loading Data

In this tutorial, you will learn how to load data into your document,
and some important considerations to keep in mind while loading data in a scalable environment.

## Prerequisites

To follow along in this tutorial, you should be running in a \*Nix environment,
or if you are working in a Windows environment,
we recommend that you run commands from Git Bash.
You should also have basic understanding of Docker.

## File connectivity service

The QIX Engine can access many data sources by using the `File-Connectivity-Service`.
This service provides built-in data connectivity, to simplify accessing
[OAuth 2.0](https://oauth.net/2/)-protected data sources
like Dropbox, OneDrive, and GoogleDrive.

The file connectivity service works by defining a unique HTTP endpoint for
registered connection providers.
You can then access data by making calls to the HTTP endpoint for the registered data source.

### Loading data from Dropbox using OAuth2.0

In this example workflow, you will create an OAuth2.0 Dropbox application, load data,
and print some data to the console.

Before you start this example, you must clone the [outhaul](https://github.com/qlik-ea/outhaul)
Git repository to your local machine.

``` bash
git clone https://github.com/qlik-ea/outhaul.git
```

Do the following:

1. Install the dependencies
    ``` bash
    cd file-connectivity-service
    npm install
    ```
1. Copy the [`airports.csv`](https://github.com/qlik-ea/outhaul/blob/master/data/airports.csv) file,
    which is located in the `/data` folder of the `outhaul` repository, and paste it into your Dropbox.
1. Create an OAuth2.0 application by following the
    [OAuth guide instructions](https://www.dropbox.com/developers/reference/oauth-guide).

    **Note:** When you create your application, the `Redirect URI`
    should be the address of the callback that is running the service: `http://[host]:[port]/oauth2/callback`.
    For example: `http://localhost:3000/oauth2/callback`

1. Set the following environment variables in the command shell:
    ``` bash
    export DROPBOX_CLIENT_ID="your App key
    export DROPBOX_CLIENT_SECRET="your App secret"
    ```
1. Start the docker container and run the example `dropbox.js` application.
    ```bash
    cd examples
    docker-compose up -d --build
    node ./dropbox
    ```
    **Note:** When you run the `dropbox.js` application, the first 10 lines of the [`airports.csv](https://github.com/qlik-ea/outhaul/blob/master/data/airports.csv)
    are pritned to the console window.

The workflow for loading data from GoogleDrive and OneDrive is similar to the example above,
and loading data from these data sources is supported by the
[file-connectivity-service](https://github.com/qlik-ea/outhaul).

## Loading data from a PostgreSQL database using GRPC protocol

In this example workflow, you will load data from a PostgreSQL database
using the GRPC protocol in the QIX Engine.

Before you start this example, you must clone the [postgres-grpc-connector](https://github.com/qlik-ea/postgres-grpc-connector) Git repository to your local machine.

``` bash
git clone https://github.com/qlik-ea/postgres-grpc-connector.git
```

Do the following:

1. Build the PostgreSQL image containing the example data.

    ```bash
    cd examples/postgres-image
    docker build . -t example/postgres-grpc-connector-database
    ```

    **The Dockerfile**

    The [Dockerfile](https://github.com/qlik-ea/postgres-grpc-connector/blob/master/example/postgres-image/Dockerfile)
    builds a PostgreSQL image.
    It also copies the `airports.csv` data file and the `init-airports-data.sql`,
    and places them on the image. The script is copied to the `docker-entrypoint-initdb.d` folder.
    When the PostgreSQL image starts, it will run all `.sql` files inside the folder.

    When the [script](https://github.com/qlik-ea/postgres-grpc-connector/blob/master/example/postgres-image/init-airports-data.sql) is executed,
    it creates a table in the default database that contains the data copied from the `airports.csv` file.
    The result is a standard PostgreSQL database with a table that contains
    the data from the `airports.csv` file.

1. Start the containers.

    ```bash
    cd ..
    docker-compose up -d
    ```

    The `docker-compose.yml` starts the following services in containers:

    - A database
    - A postgres-grp-connector
    - The QIX Engine

    **Note:** For the QIX Engine, port `9076` on the container is mapped to port `19076` on the local machine.
    This lets you access the QIX Engine from outside of the docker network. In this example, we want to trigger a load of the airport data, thus the port needs open outside of the container.

    **Special commands for the QIX Engine**

    - `-S EnableGrpcCustomConnectors=1`

        Enables grpc-connectors in the QIX Engine.

    - `-S GrpcConnectorPlugins="postgres-grpc-connector,postgres-grpc-connector:50051"`

        Creates a connector of the type `postgres-grpc-connector`,
        which we tell the QIX Engine exists on host `postgres-grpc-connector`
        and listening on port `50051`.

1. Verify that the three services are running in containers.

    ```bash
    docker ps
    ```

    **Ports**

    The database container exposes port `5432` on the network
    that the containers share among themselves. The `postgres-grpc-connector`
    can therefore access the database container on this port.

    The `postgres-grpc-connector` container exposes port `50051`.
    This is the port that we told the QIX Engine to talk to
    with the commands in the `docker-compose.yml` file.

    The engine exposes ports `9076` and `9090`.
    Port `9090` is used for metrics, which is not relevant for this example.
    Port `9076` is the standard QIX Engine API port. Since we mapped it to
    port `19076` on your local machine, _outside_ of the container,
    requests to your machine on port `19076` will go to QIX Engine container.

1. Trigger the data load.

    Now that we have a database container with the data, a GRPC-Connector container,
    and a QIX Engine running, all we need is to trigger a load of the data.

    In this example, we use a small `Node.JS` program that uses the Qlik library [enigma.js](https://github.com/qlik-oss/enigma.js)
    that talks to the QIX Engine to trigger a load of the airport data via the GRPC-Connector.

    ```bash
    cd reload-runner
    npm install
    npm start
    ```

    You should see the info from 10 different airports in your terminal.

## What is happening

Once the containers are running and you trigger the data load,
the program creates or opens an app called `reloadapp.qvf` on the QIX Engine.
Then it creates a connection of the type we defined earlier.

```js
app.createConnection({
  qType: 'postgres-grpc-connector', //the name we defined as a parameter to the QIX Engine in our docker-compose.yml
  qName: 'postgresgrpc',
  //the connection string inclues both the provider to use and parameters to it.
  qConnectionString: 'CUSTOM CONNECT TO "provider=postgres-grpc-connector;host=postgres-database;port=5432;database=postgres"',
  qUserName: 'postgres', //username and password for the PostgreSQL database, provided to the grpc-connector
  qPassword: 'postgres'
});
```

The connection string
`CUSTOM CONNECT TO "provider=postgres-grpc-connector;host=postgres-database;port=5432;database=postgres`
tells the QIX Engine to use the `postgres-grpc-connector`.
The remaing part of the connection string specifies parameters to the GRPC-Connector,
such as the database host, address, and port.
You can see that the host is the name of the service we defined in the `docker-compose` file
and the port is the port that the database-container exposes.

Then, we set a script to use the connection that we just created.

```js
const script = `
  lib connect to 'postgresgrpc';
  Airports:
  sql select rowID,Airport,City,Country,IATACode,ICAOCode,Latitude,Longitude,Altitude,TimeZone,DST,TZ,clock_timestamp() from airports;
`; // add script to use the grpc-connector and load a table
app.setScript(script);
```

We use the name `postgresgrpc`, which we defined when we created our connection.
Then, we load the airport data from the PostgreSQL `airports` table into
the QIX Engine table named `Airports`.

Next, we reload the data to load the new data into the QIX Engine and finally, we
fetch the first 10 results of the `Airports` table and print them to the console.

**Tip:** We recommend that you take a look inside the `index.js` file
and that you read through the [enigma.js](https://github.com/qlik-oss/enigma.js) documentation
to get a better understanding of the steps taken in this tutorial.
