# Remote files

In this tutorial, we learn how to load data from remote files into Qlik Associative Engine
using the gRPC File Connector API.
The tutorial uses the connector example from [core-grpc-s3-file-connector](https://github.com/qlik-oss/core-grpc-s3-file-connector).

## Prerequisites

To follow along in this tutorial, you should have basic understanding of Docker.

You need the following software installed:

* Git
* Docker
* docker-compose
* Node.js (optional)
* [corectl](https://github.com/qlik-oss/corectl#download) (optional)

!!! Note
    Shell commands should be run in a Bash shell.
    If you are using Windows, we recommend using Git Bash.

## The gRPC S3 File Connector

The S3 File Connector example is a connector built to display how to be able to download and upload files
to and from an S3 bucket in AWS.
The connector is built in Node.js and uses the gRPC protocol to stream data to and from the Qlik Associative Engine.

## Setup

To run the example code, clone the
[qlik-oss/core-grpc-s3-file-connector](https://github.com/qlik-oss/core-grpc-s3-file-connector) Git repository.
Before you continue, look at the documentation to get familiar with the content and structure of
the repository.

!!!Note
    In your shell, make sure current directory is at the repository root.

The connector example repo provides a [docker-compose.yml](https://github.com/qlik-oss/core-grpc-s3-file-connector/blob/master/examples/docker-compose.yml),
that starts the example connector together with a Qlik Associative Engine.

```yml
version: "3.3"

services:
  qix-engine:
    image: qlikcore/engine:<version>
    ports:
      - 9076:9076
    # EnableGrpcFileStreamConnector parameter enables the feature.
    # Default is disabled (0)
    # GrpcConnectorPlugins parameter configures the connector in engine.
    # Format <connector name>,<host>:<port>.
    # The "fs" at the end of the string marks that the connector
    # supports streaming of files
    command: -S EnableGrpcFileStreamConnector=1 -S GrpcConnectorPlugins="s3-grpc-file-connector,s3-grpc-file-connector:50051,fs" -S AcceptEULA=${ACCEPT_EULA}
  s3-grpc-file-connector:
    build: ../ # Build the connector from the Dockerfile
    ports:
      - 50051:50051 # Expose the connector on port 50051
    environment:
      # The following variables are passed as environment variables to the connector upon startup
      CORE_S3_FILE_CONNECTOR_BUCKET_NAME: ${CORE_S3_FILE_CONNECTOR_BUCKET_NAME} # Name of the S3 bucket that the connector should target
      CORE_S3_FILE_CONNECTOR_BUCKET_ACCESS_KEY_ID: ${CORE_S3_FILE_CONNECTOR_BUCKET_ACCESS_KEY_ID} # Access key id for the S3 bucket
      CORE_S3_FILE_CONNECTOR_BUCKET_SECRET_ACCESS_KEY: ${CORE_S3_FILE_CONNECTOR_BUCKET_SECRET_ACCESS_KEY} # Access key token for the S3 bucket
```

In this example we are going to use a data set from [`airports.csv`](https://github.com/qlik-oss/core-grpc-s3-file-connector/blob/master/examples/airports.csv).
This data set is present in an S3 Bucket in AWS.
The name of the S3 bucket is configured in the example connector by passing it as an environment variable; `CORE_S3_FILE_CONNECTOR_BUCKET_NAME`.
To be able to access the S3 bucket the connector will also need to provide the credentials,
which in this example is the access key id `CORE_S3_FILE_CONNECTOR_BUCKET_ACCESS_KEY_ID`
and a secret `CORE_S3_FILE_CONNECTOR_BUCKET_SECRET_ACCESS_KEY`.

To run this example you will need to set up your own S3 bucket and configure the name and credentials as described above.
You can either hardcode the variables in the [docker-compose.yml](https://github.com/qlik-oss/core-grpc-s3-file-connector/blob/master/example/docker-compose.yml#L14),
or set them as environment variables.
You will also need to copy the `airports.csv` file into your bucket, or switch to using another data set.

To start the example connector and a Qlik Associative Engine just run:

```bash
cd examples
ACCEPT_EULA=yes docker-compose up -d
```

## Creating a connection

Once a connector has been properly configured in Qlik Associative Engine
it will be possible to create and use the connector in a `connection`.

The connector that was configured in Qlik Associative Engine using th `GrpcConnectorPlugins` parameter,
was configured with type `s3-grpc-file-connector`.

In a `corectl.yml` configuration file it would now be possible to create a `connection` object like this:

```yml
connections:
  s3bucket:
    type: s3-grpc-file-connector
```

This will create a `connection` with name `s3bucket` and of type `s3-grpc-file-connector`.
Further description on how connections are configured in `corectl` can be found [here](https://github.com/qlik-oss/corectl/blob/master/docs/corectl_config.md).

This tutorial also provides a Node.js example where a connection is created using `enigma.js`,
and the set up the connection can be seen [here](https://github.com/qlik-oss/core-grpc-s3-file-connector/blob/master/example/node/index.js#L55).

!!!Note
    In the examples above the connection string is empty and not used.
    The connection can however also include a connection string,
    username and password which will also be passed to the connector.
    In many cases it will be up to the connector
    to define which information that should be passed by the Qlik Associative Engine.

## Loading data from file in a S3 bucket

This section will describe how to load data from a file using the connection that was set up in the previous section.
As mentioned earlier we have a data set available in the S3 bucket named `airports.csv`.

Lets say that we want to load all the data from that file using a load script.
That can be done using this load script statement:

```txt
Airports:
LOAD
  *
FROM [lib://s3bucket/airports.csv]
(txt, codepage is 28591, delimiter is ',', msq);
```

The `lib` statement is basically `lib://<connection name>/<remote file>`.

## Storing data into a file in a S3 bucket

Similar to loading data from a file with this feature,
it is also possible to store files to a remote share.

For a Qlik Core user this is usable for example when storing data in to QVD files.
Considering the table being loaded in previous section,
we can now store data from the table `Airports` into a QVD using the following load script syntax:

```txt
STORE
    Airport,
    City
FROM Airports INTO [lib://s3bucket/exported.qvd];
```

This will store the data into a file named `exported.qvd` located in the S3 bucket.

## Using file script functions in a load script

In addition to only being able to load from and store into a remote share,
there are also a number of load script functions related to files that can be used.

Below is a subset of the file script functions that can be used together with this feature.

```txt
Files:
LOAD Distinct
  FileName() as filename,
  FileTime() as filetime,
  FileSize() as filesize
FROM [lib://s3bucket/];
```

The load script above will load all file names, sizes and last modified times of the files in the S3 bucket,
and add it to a table called `Files`.

Additional file functions that can be used are further described in the script reference section for [file functions](../../services/qix-engine/script_reference/file_functions.md).

## Running the examples

Depending on your preference the connector repo contains two different examples.
One is written in Node.js using `enigma.js` and one is utilizing the tool `corectl`.

Both examples performs the same set of actions:

1. Creates an app in Qlik Associative Engine
1. Creates a connection in Qlik Associative Engine that utilizes the gRPC S3 File Connector
1. Sets a load [script](https://github.com/qlik-oss/core-grpc-s3-file-connector/blob/master/examples/script.qvs)
1. Performs a reload

To run the Node.js example:

```bash
cd node
npm install
npm start
```

And running the `corectl` example:

```bash
cd corectl
corectl build
corectl get tables
```

## Next steps

More runnable load script examples are available in the
[qlik-oss/core-data-loading](https://github.com/qlik-oss/core-data-loading) Git repository.
