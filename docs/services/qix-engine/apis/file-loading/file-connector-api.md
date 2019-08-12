
<!-- markdownlint-disable -->
<!-- proselint-disable -->
# gRPC File Connector API

_gRPC File Connector API for version 12.424.0._

Package: **qlik.filehosting**

[File Connector Protobuf API specification](./file-connector-api.proto)

## Methods

### `GetCapabilities`

_No description._

**Parameters:**

| Type | Description |
| ---- | ----------- |
| [CapabilitiesRequest](#capabilitiesrequest) | _No description._ |

**Response:**

| Type | Description |
| ---- | ----------- |
| [Capabilities](#capabilities) | _No description._ |


### `Download`


The Engine will send many DownloadRequest messages.

The first DownloadRequest message is the file name to download.
If the file is not available, the connector can return an error
immediately.

The following DownloadRequest messages asks for the file content
at random offsets. (Though they will often but not always
be serial).

The Engine will often ask for a few megabytes of data at the time.
But if the Engine knows that it will do a perfectly linear read, it
may send one read request for all the file content. That could be a
lot of data, which will have to send back in many DownloadResponse
messages.

The best bandwidth is achieved if most DownloadResponse messages
are 64K or slightly less. But tests show that anywhere from 10K
to 120K gives almost as good performance. The size of an
DownloadResponse message is the size of the data and a small
protocol overhead.

When the Engine will not make any more data requests, it will
call WritesDone() and the connector will get no more
DownloadRequest messages.

When WritesDone() is called by the Engine, the connector
will continue to send the data already requested.

The Engine may call TryCancel() at any time for a variety
of reasons. Typically, when analyzing files for the file
wizard API or when script errors happen.

When the Connector is streaming back data, it should check
often if the rpc is canceled. If canceled,
the Connector should stop sending more data and return
CANCELLED on the request.

If the connector don't receive a TryCancel() call, it will
typically return OK as status code after Engine has called
WritesDone() and the Connector returned all requested data.

At the very end, Engine will call Finish() to retrieve the
status code for the call. This is used for error handling
and trouble shooting.

**Parameters:**

| Type | Description |
| ---- | ----------- |
| [DownloadRequest](#downloadrequest) | _No description._ |

**Response:**

| Type | Description |
| ---- | ----------- |
| [DownloadResponse](#downloadresponse) | _No description._ |


### `Upload`


The Engine will send many UploadRequest messages.

The first UploadRequest message is the file name to upload.
The connector can return an error immediately if not allowed for
some reason.

The Engine will send a stream of UploadRequest messages
to serially upload a file.

The Engine call WritesDone() when the upload is complete.

The Engine will call Finish() at the end.

**Parameters:**

| Type | Description |
| ---- | ----------- |
| [UploadRequest](#uploadrequest) | _No description._ |

**Response:**

| Type | Description |
| ---- | ----------- |
| [UploadResponse](#uploadresponse) | _No description._ |


### `List`


List files from directory or from pattern.
Only list files in one directory.
No recursive listing.
If there are no matching files, just return Status::OK.

**Parameters:**

| Type | Description |
| ---- | ----------- |
| [ListRequest](#listrequest) | _No description._ |

**Response:**

| Type | Description |
| ---- | ----------- |
| [ListItem](#listitem) | _No description._ |


### `Metadata`

_No description._

**Parameters:**

| Type | Description |
| ---- | ----------- |
| [MetadataRequest](#metadatarequest) | _No description._ |

**Response:**

| Type | Description |
| ---- | ----------- |
| [FileMeta](#filemeta) | _No description._ |


## Definitions

### `Capabilities`

_No description._

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `supportsRandomRead` | Does the connector support random access read ? | [bool](#bool) | _optional_ | _No default value._ |

### `CapabilitiesRequest`

_No description._

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `setup` | _No description._ | [Setup](#setup) | _optional_ | _No default value._ |

### `DownloadRequest`

_No description._

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `file` | Set for the first in a call | [File](#file) | _optional_ | _No default value._ |
| `chunk` | Set for second and following | [Chunk](#chunk) | _optional_ | _No default value._ |

### `Chunk`

_No description._

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `start` | _No description._ | [int64](#int64) | _optional_ | _No default value._ |
| `length` | _No description._ | [int64](#int64) | _optional_ | _No default value._ |

### `File`

Requires an empty response as acknowledgement.

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `setup` | _No description._ | [Setup](#setup) | _optional_ | _No default value._ |
| `name` | Classic path name or just a hash or anything. | [string](#string) | _optional_ | _No default value._ |

### `DownloadResponse`

_No description._

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `response` | _No description._ | [Response](#response) | _optional_ | _No default value._ |
| `chunk` | _No description._ | [Chunk](#chunk) | _optional_ | _No default value._ |

### `Chunk`

_No description._

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `data` | _No description._ | [bytes](#bytes) | _optional_ | _No default value._ |
| `last` | The last chunk for current ByteRange request must have the "last" | [bool](#bool) | _optional_ | _No default value._ |

### `Response`

Used by the server to respond to the File request if successful.


### `FileMeta`

_No description._

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `size` | -1 for unknown | [int64](#int64) | _optional_ | _No default value._ |
| `lastUpdated` | Seconds since 1970 (UTC). | [int64](#int64) | _optional_ | _No default value._ |

### `ListItem`

_No description._

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `name` | _No description._ | [string](#string) | _optional_ | _No default value._ |
| `isFolder` | _No description._ | [bool](#bool) | _optional_ | _No default value._ |
| `meta` | _No description._ | [FileMeta](#filemeta) | _optional_ | _No default value._ |

### `ListRequest`

_No description._

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `setup` | _No description._ | [Setup](#setup) | _optional_ | _No default value._ |
| `pathPattern` | List all files matching the pattern. | [string](#string) | _optional_ | _No default value._ |

### `MetadataRequest`

_No description._

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `setup` | _No description._ | [Setup](#setup) | _optional_ | _No default value._ |
| `fileName` | _No description._ | [string](#string) | _optional_ | _No default value._ |

### `Setup`

_No description._

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `config` | Connector attributes and data | [string](#string) | _optional_ | _No default value._ |
| `reloadId` | Helpful information for connector | [string](#string) | _optional_ | _No default value._ |
| `appId` | _No description._ | [string](#string) | _optional_ | _No default value._ |
| `user` | The user for the connection | [string](#string) | _optional_ | _No default value._ |
| `password` | The password for the connection | [string](#string) | _optional_ | _No default value._ |
| `spaceId` | The space id for the app that is trying to use the connection | [string](#string) | _optional_ | _No default value._ |

### `UploadRequest`

_No description._

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `file` | _No description._ | [File](#file) | _optional_ | _No default value._ |
| `chunk` | _No description._ | [Chunk](#chunk) | _optional_ | _No default value._ |

### `Chunk`

_No description._

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `data` | _No description._ | [bytes](#bytes) | _optional_ | _No default value._ |

### `File`

_No description._

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `setup` | _No description._ | [Setup](#setup) | _optional_ | _No default value._ |
| `name` | _No description._ | [string](#string) | _optional_ | _No default value._ |

### `UploadResponse`

_No description._


## Enums


## Scalar Value Types

### `double`

| cpp | cs | go | java | php | python | ruby |
| --- | -- | -- | ---- | --- | ------ | ---- |
| double | double | float64 | double | float | float | Float |


### `float`

| cpp | cs | go | java | php | python | ruby |
| --- | -- | -- | ---- | --- | ------ | ---- |
| float | float | float32 | float | float | float | Float |


### `int32`

| cpp | cs | go | java | php | python | ruby |
| --- | -- | -- | ---- | --- | ------ | ---- |
| int32 | int | int32 | int | integer | int | Bignum or Fixnum (as required) |


### `int64`

| cpp | cs | go | java | php | python | ruby |
| --- | -- | -- | ---- | --- | ------ | ---- |
| int64 | long | int64 | long | integer/string | int/long | Bignum |


### `uint32`

| cpp | cs | go | java | php | python | ruby |
| --- | -- | -- | ---- | --- | ------ | ---- |
| uint32 | uint | uint32 | int | integer | int/long | Bignum or Fixnum (as required) |


### `uint64`

| cpp | cs | go | java | php | python | ruby |
| --- | -- | -- | ---- | --- | ------ | ---- |
| uint64 | ulong | uint64 | long | integer/string | int/long | Bignum or Fixnum (as required) |


### `sint32`

| cpp | cs | go | java | php | python | ruby |
| --- | -- | -- | ---- | --- | ------ | ---- |
| int32 | int | int32 | int | integer | int | Bignum or Fixnum (as required) |


### `sint64`

| cpp | cs | go | java | php | python | ruby |
| --- | -- | -- | ---- | --- | ------ | ---- |
| int64 | long | int64 | long | integer/string | int/long | Bignum |


### `fixed32`

| cpp | cs | go | java | php | python | ruby |
| --- | -- | -- | ---- | --- | ------ | ---- |
| uint32 | uint | uint32 | int | integer | int | Bignum or Fixnum (as required) |


### `fixed64`

| cpp | cs | go | java | php | python | ruby |
| --- | -- | -- | ---- | --- | ------ | ---- |
| uint64 | ulong | uint64 | long | integer/string | int/long | Bignum |


### `sfixed32`

| cpp | cs | go | java | php | python | ruby |
| --- | -- | -- | ---- | --- | ------ | ---- |
| int32 | int | int32 | int | integer | int | Bignum or Fixnum (as required) |


### `sfixed64`

| cpp | cs | go | java | php | python | ruby |
| --- | -- | -- | ---- | --- | ------ | ---- |
| int64 | long | int64 | long | integer/string | int/long | Bignum |


### `bool`

| cpp | cs | go | java | php | python | ruby |
| --- | -- | -- | ---- | --- | ------ | ---- |
| bool | bool | bool | boolean | boolean | boolean | TrueClass/FalseClass |


### `string`

| cpp | cs | go | java | php | python | ruby |
| --- | -- | -- | ---- | --- | ------ | ---- |
| string | string | string | String | string | str/unicode | String (UTF-8) |


### `bytes`

| cpp | cs | go | java | php | python | ruby |
| --- | -- | -- | ---- | --- | ------ | ---- |
| string | ByteString | []byte | ByteString | string | str | String (ASCII-8BIT) |
