# Loading Data

Start loading data into your document by working through a data load workflow using OAuth2.0 or the gRPC protocol.

## Prerequisites

To follow along in this tutorial, you should have basic understanding of Docker.

!!! Note
    In the examples that follow, all shell commands should be run in a Bash shell.
    If you are using Windows, we recommend using Git Bash.

## Accessing data through a connection service

Learn how you can connect to an [OAuth 2.0](https://oauth.net/2/)-protected data source
using the _example_ data-connection service to retrieve and load data.

### File connectivity service

The `File-Connectiviy-Service` is an example of a service that can be used to load data from
remote files in a Qlik Core stack.
This service can be configured to provide built-in data connectivity to connect to
[OAuth 2.0](https://oauth.net/2/)-protected data sources
like Dropbox, OneDrive, and GoogleDrive.

The data connection service that is used in this tutorial
works by defining a unique HTTP endpoint for each registered connection provider.
The Qlik Associative Engine can then access different data sources by making calls
to the service-defined HTTP endpoints.

Before you start this example, you must clone the
[File Connectivity Service](https://github.com/qlik-ea/core-file-connectivity-service)
Git repository to your local machine.

``` bash
git clone https://github.com/qlik-ea/core-file-connectivity-service.git
```

### Dropbox example

Do the following:

1. Install the dependencies.
    ``` bash
    cd core-file-connectivity-service
    npm install
    ```
1. Copy the [`airports.csv`](https://github.com/qlik-ea/core-file-connectivity-service/blob/master/data/airports.csv)
    file, which is located in the `/data` folder of the `core-file-connectivity-service` repository, and paste
    it into your Dropbox.
1. Create an OAuth2.0 application by following the
    [OAuth guide instructions](https://www.dropbox.com/developers/reference/oauth-guide).

    **Note:** When you create your application, the `Redirect URI`
    should be the address of the callback that is running the service: `http://[host]:[port]/oauth2/callback`.
    For example: `http://localhost:3000/oauth2/callback`

1. Start the Docker container, ensure that you set the proper
    credentials in the environment variables prefixing the
    `docker-compose` command.
    ```bash
    cd examples
    DROPBOX_CLIENT_ID="your App key" DROPBOX_CLIENT_SECRET="your App secret" docker-compose up -d --build
    ```
1. Run the `dropbox.js` application.
    ```bash
    node dropbox.js
    ```
    It should output the 10 lines of the [`airports.csv`](https://github.com/qlik-ea/core-file-connectivity-service/blob/master/data/airports.csv)
        to the console window.

The workflow for loading data from GoogleDrive and OneDrive is similar to the example above,
and loading data from these data sources is supported by the
[File Connectivity Service](https://github.com/qlik-ea/core-file-connectivity-service).

## Loading data from a PostgreSQL database using gRPC protocol

In this example workflow, load data from a PostgreSQL database
using the gRPC protocol in the Qlik Associative Engine.

Before you start this example, you must clone the [postgres-grpc-connector](https://github.com/qlik-ea/postgres-grpc-connector)
Git repository to your local machine.

``` bash
git clone https://github.com/qlik-ea/postgres-grpc-connector.git
```

Do the following:

1. Build the PostgreSQL image that contains the example data.

    ```bash
    cd examples/postgres-image
    docker build . -t example/postgres-grpc-connector-database
    ```

    **Note:** The `Dockerfile` copies the example data to the image.
    The PostgreSQL container then automatically populates the database.
    The result is a PostgreSQL database with a table that is populated with the
    data from the `airports.csv` file.

1. Start the containers.

    ```bash
    cd ..
    docker-compose up -d
    ```

    The `docker-compose.yml` file starts the following services in containers:

    - A database
    - A postgres-grpc-connector
    - The Qlik Associative Engine

    **Note:** If you look at the `docker-compose.yml` file, port `9076` on the container
    is mapped to port `19076` on the local machine.
    This lets you access the Qlik Associative Engine from outside of the Docker network.
    In this example, we want to trigger a load of the airport data
    from outside of the container.

    The following special commands are important for enabling the gRPC connectors:

    - `-S EnableGrpcCustomConnectors=1`

        Enables gRPC connectors in the Qlik Associative Engine.

    - `-S GrpcConnectorPlugins="postgres-grpc-connector,postgres-grpc-connector:50051"`

        Creates a connector of the type `postgres-grpc-connector`,
        which we tell the Qlik Associative Engine exists on host `postgres-grpc-connector`
        and listening on port `50051`.

1. Verify that the three services are running in containers.

    ```bash
    docker ps
    ```

    The database containers share a common port `5432`, which is exposed on the network.
    The `postgres-grpc-connector` can therefore access the database container on this port.

    The `postgres-grpc-connector` container exposes port `50051`.
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

    You should see the info from 10 different airports printed to the console.

## What is happening

Once the containers are running and you trigger the data load,
the program creates and opens an app called `reloadapp.qvf` on the Qlik Associative Engine.
Then it creates a connection of the type we defined earlier.

```js
app.createConnection({
  qType: 'postgres-grpc-connector', //the name we defined as a parameter to the Qlik Associative Engine in our docker-compose.yml
  qName: 'postgresgrpc',
  //the connection string inclues both the provider to use and parameters to it.
  qConnectionString: 'CUSTOM CONNECT TO "provider=postgres-grpc-connector;host=postgres-database;port=5432;database=postgres"',
  qUserName: 'postgres', //username and password for the PostgreSQL database, provided to the gRPC connector
  qPassword: 'postgres'
});
```

The connection string
`CUSTOM CONNECT TO "provider=postgres-grpc-connector;host=postgres-database;port=5432;database=postgres`
tells the Qlik Associative Engine to use the newly created connection.
The remaining part of the connection string specifies parameters to the gRPC connector,
such as the database host, address, and port.
You can see that the host is the name of the service we defined in the `docker-compose.yml` file
and the port is the port that the database container exposes.

Then, we set a script to use the connection that we just created.

```js
const script = `
  lib connect to 'postgresgrpc';
  Airports:
  sql select rowID,Airport,City,Country,IATACode,ICAOCode,Latitude,Longitude,Altitude,TimeZone,DST,TZ,clock_timestamp() from airports;
`; // add script to use the gRPC connector and load a table
app.setScript(script);
```

We use the name `postgresgrpc`, which we defined when we created our connection.
Then, we load the airport data from the PostgreSQL `airports` table into
a Qlik Associative Engine table that is named `Airports`.

Next, we reload the data to load the new data into the Qlik Associative Engine. Finally, we
fetch the first 10 results of the `Airports` table and print them to the console.

!!! Tip
    We recommend that you take a look inside the `index.js` file
    and that you read through the [enigma.js](https://github.com/qlik-oss/enigma.js) documentation
    to get a better understanding of the steps taken in this tutorial.
