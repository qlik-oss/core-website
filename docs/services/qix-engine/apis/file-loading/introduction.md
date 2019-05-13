# File Connector API

!!! warning "Experimental feature"
    This feature is in an experimental state. Use with caution
    since this feature may change in the future.

The File Connector API in Qlik Associative Engine is based on gRPC.
If you are new to gRPC we recommend that you [read their documentation](https://grpc.io/docs/)
as well as check our [examples](#examples).

## Description

The gRPC File Connector feature in Qlik Associative Engine can be used to download and upload files
to and/or from a remote storage.
Functionality-wise the feature is similar to that of the `folder` connector which is used for accessing locally stored files.
The feature is intended to enable a user to load or store files from external sources
such as an S3 bucket, Dropbox or other remote storage services.

## Configuration

The gRPC File Connector feature is enabled by passing `-S EnableGrpcFileStreamConnector=1`
to Qlik Associative Engine as a startup parameter.

When the feature is enabled it is also possible to define your own custom gRPC File Connectors e.g. `-S GrpcCustomConnectorPlugins=s3connector,s3connector:50051,fs`.

Multiple connectors can also be configured using a `;` as delimiter e.g. `-S GrpcCustomConnectorPlugins=s3-grpc-file-connector,s3connector:50051,fs;dropbox-grpc-file-connector,dropboxconnector:50052,fs`.

An example on how it can be configured in a `docker-compose` file:

```yaml
qix-engine:
    image: qlikcore/engine:12.387.0
    ports:
      - 9076:9076
    command: -S AcceptEULA=${ACCEPT_EULA} -S EnableGrpcFileStreamConnector=1 -S GrpcConnectorPlugins="s3-grpc-file-connector,s3-grpc-file-connector:50051,fs"
```

There is also a full example of a implemented gRPC File Connector for an S3 bucket [here](https://github.com/qlik-oss/core-grpc-s3-file-connector).

## API Specification

The File Connector API is documented [here](./file-connector-api.md).

## Examples

The example below is a connector written in Node.js
that showcases how this feature can be implemented and used against an S3 Bucket in AWS.
If you want to go through the example step-by-step take a look at the [tutorial](../../../../tutorials/data-loading/remote-files.md).

### S3 file connector built with Node.js

[github.com/qlik-oss/core-grpc-s3-file-connector](https://github.com/qlik-oss/core-grpc-s3-file-connector)
