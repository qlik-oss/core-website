# Data Connector GRPC API

In order to allow any kind of data to be fed into QIX Engine each data source is abstracted by a connector. A connector
is typically implemented as a stateless docker container sitting between QIX Engine and the data source.

``` asciiart
+-------------+              +-------------+                +-------------+
| QIX Engine  | --GetData--> |  Connector  | -------------> | Data Source |
|             | <----------  |             | <------------  |             |
+-------------+              +-------------+                +-------------+
```

The role of the connector is to translate the APIs and formats of a data source into a format that QIX Engine
understands: the [Data Connector GRPC API](data-connector-grpc.proto).

## Configuring Connectors

There are several ways the QIX Engine can discover available connectors. The simplest way is to use GrpcConnectorPlugins settings.

## The GetData Function

When it loads data, the QIX Engine sends one GRPC call, `GetData`, per table.

``` proto
rpc GetData(GetDataOptions) returns(stream DataChunk) {}
```

The input to the call is a structure that contains among other things a connection string, a username, a password, and a
query statement. The format of the connection string and query are connector specific. For example, the input structure might
look like this:

``` json
{
  connection: {
    connectionString: 'hostname=localhost',
    user: 'test',
    password: 'test'
  },
  parameters: {
    statement: '{ "collection": "airports" }',
  }
}
```

## Output

The `GetData` call returns a stream of data chunks. This allows a connector to stream data from the data source to
the QIX Engine while translating the data piece by piece. In addition to the actual data stream, the connector also has to
supply a GRPC header `x-qlik-getdata-bin` with metadata.

### Data Chunks

For performance reasons the data is sent column by column, where
each column holds the corresponding column values for a all rows in the chunk. 
All values in a specific column share the same format, which allows GRPC (and hence protobuf) to encode
the data more efficiently. To further improve the performance, each column can be in one of several different formats:
strings, floating point numbers, and integers. Along with the column data, a structure called `ValueFlag` is used to
further specify the format of the data. This could be used, for example, to specify date formats.

``` proto
message DataChunk {
  repeated Column cols = 1;
}
```

``` proto
message Column {
  repeated string strings = 1;
  repeated double doubles = 2;
  repeated sint64 integers = 3;
  repeated ValueFlag flags = 4;
}
```

### Metadata

The metadata sent in the `x-qlik-getdata-bin` header is the `GetDataResponse` message encoded using protobuf which
is the underlying encoding technology in GRPC.

``` proto
message GetDataResponse {
  repeated FieldInfo fieldInfo = 1;
  string tableName = 2;
}
```

## Examples

We have provided two example connectors to help you get started, one in Go and one in JavaScript. See their respective projects in GitHub for more information:

 * Postgres/Go: [github.com/qlik-ea/postgres-grpc-connector](https://github.com/qlik-ea/postgres-grpc-connector)
 * MongoDB/JavaScript: [github.com/qlik-ea/mongodb-grpc-connector](https://github.com/qlik-ea/mongodb-grpc-connector)

## A Note On Performance

For large data sets it is important to choose a language that provides adequate performance.
Although GRPC is a fast protocol, it still comes with some computational overhead, especially in
managed/interpreted languages like JavaScript. Go, it seems, is fast enough to saturate a Gigabit line
which would cover most needs. To utilize a 10 Gbps line or faster, for instance, a C/C++
implementation would be needed.
