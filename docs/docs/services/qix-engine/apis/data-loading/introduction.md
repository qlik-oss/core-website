# Data Connector API

!!! warning "Experimental feature"
    This feature is in an experimental state. Use with caution
    since this feature may change in the future.

The Data Connector API in Qlik Associative Engine is based on gRPC. If you are new
to gRPC we recommend that you [read their documentation](https://grpc.io/docs/) as well
as check our [examples](#examples) how they are used when loading data into the engine.

In Qlik Core, a connector is typically implemented as a stateless Docker container that
sits between the engine and the data source, as shown in the diagram below.

![connector](./data-connector.png)

## API Specification

The Data Connector API is documented [here](./data-connector-api.md).

## Examples

We recommend that you have a look at the respective example projects below to
see a full working connector.

!!! Tip
    For large data sets, it is important to choose a language that meets your performance requirements.
    Although gRPC is a fast protocol, it still comes with some computational overhead, especially in
    managed/interpreted languages like JavaScript.
    Go seems to be fast enough to saturate a gigabit line, which covers most requirements.

### PostgreSQL connector built with Go

[github.com/qlik-ea/core-grpc-postgres-connector](https://github.com/qlik-ea/core-grpc-postgres-connector)

### MongoDB connector built with JavaScript

[github.com/qlik-ea/core-grpc-mongodb-connector](https://github.com/qlik-ea/core-grpc-mongodb-connector)
