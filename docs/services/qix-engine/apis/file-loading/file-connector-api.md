
<!-- markdownlint-disable -->
<!-- proselint-disable -->
# gRPC File Connector API

_gRPC File Connector API for version 12.387.0._

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

_No description._

**Parameters:**

| Type | Description |
| ---- | ----------- |
| [DownloadRequest](#downloadrequest) | _No description._ |

**Response:**

| Type | Description |
| ---- | ----------- |
| [DownloadResponse](#downloadresponse) | _No description._ |


### `Upload`

stream UploadChunk writes serially only.

**Parameters:**

| Type | Description |
| ---- | ----------- |
| [UploadRequest](#uploadrequest) | _No description._ |

**Response:**

| Type | Description |
| ---- | ----------- |
| [UploadResponse](#uploadresponse) | _No description._ |


### `List`

List files from directory or from pattern.   Only list files in one directory.   No recursive listing.

**Parameters:**

| Type | Description |
| ---- | ----------- |
| [ListRequest](#listrequest) | _No description._ |

**Response:**

| Type | Description |
| ---- | ----------- |
| [ListItem](#listitem) | _No description._ |


### `Metadata`

Work in progress.   Very basic right now. Will add more details.

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

_No description._

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

Empty


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
| `name` | If empty, do we give it a random name ? | [string](#string) | _optional_ | _No default value._ |

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
