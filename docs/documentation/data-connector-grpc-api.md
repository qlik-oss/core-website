# Data Connector GRPC API
In order to allow any kind of data to be fed into the engine each data source is abstracted by a connector. A connector is typically implemented as a stateless docker container sitting between engine and the data source. 

``` 
+-------------+              +-------------+                +-------------+
|   Engine    | --GetData--> |  Connector  | -------------> | Data Source |
|             | <----------  |             | <------------  |             |
+-------------+              +-------------+                +-------------+
```

The role of the connector is to translate the APIs and formats of a data source into a format that the engine understands - namely the [Data Connector GRPC API](./data-connector-grpc-api.proto). 

## Configuring connectors
There are several ways in which engine can discover available connectors, where using the GrpcConnectorPlugins settings is the simplest one.     

## The GetData function
When data is loaded into engine one grpc call - _GetData_ - is sent for each table being loaded.
 
``` 
rpc GetData(GetDataOptions) returns(stream DataChunk) {}
```

The input to the call is a structure that contains among other things a connection string, username, password, and a query statement. The format of the connection string and query are connector specific. The input structure can for instance look like this: 

``` 
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

The _GetData_ call returns a stream of data chunks. This allows a connector to stream data from the data source to engine while translating the data piece by piece. In addition to the actual data stream the connector also has to supply a GRPC header _x-qlik-getdata-bin_ with metadata. 

### Data chunks
One would expect that a data chunk would contain a set of rows but in fact the data is sent column by column where each column holds the corresponding column values for a all rows in the chunk. The reason for this is simply performance. All values in a specific column share the same format which allows GRPC (and hence protobuf) to encode the data more efficiently. To further improve the performance each column can choose from a variety of formats - strings, floating point numbers, and integers. Along with the column data a structure called _ValueFlag_ is used to further specify the format of the data. This is for instance used to specify date formats etc.

``` 
message DataChunk {
  repeated Column cols = 1;
}
``` 

``` 
message Column {
    repeated string strings = 1;
    repeated double doubles = 2;
    repeated sint64 integers = 3;
    repeated ValueFlag flags = 4;
}
``` 

### Metadata
The metadata sent in the _x-qlik-getdata-bin_ header is the _GetDataResponse_ message encoded using _protobuf_ which is the underlying encoding technology in GRPC.
```
message GetDataResponse {
    repeated FieldInfo fieldInfo = 1;
    string tableName = 2;
}
```
