
<!-- markdownlint-disable -->
<!-- proselint-disable -->
# gRPC Data Connector API

_gRPC Data Connector API for version 12.401.0._

Package: **qlik.connect**

[Data Connector Protobuf API specification](./data-connector-api.proto)

## Methods

### `GetData`

The standard way to send data.
First send GetDataResponse as initial meta data.
Then send DataChunk stream.

**Parameters:**

| Type | Description |
| ---- | ----------- |
| [DataRequest](#datarequest) | _No description._ |

**Response:**

| Type | Description |
| ---- | ----------- |
| [DataChunk](#datachunk) |   A structure for streaming field values.   This message contains two parts. A value bucket part and a code part.   Every transferred value have a string code and one or two numeric codes.  These codes can be negative to indicate special things. -1 indicates null for example.   Otherwise they can index into the value buckets.  A value with a null string and a null number is a null value in the Qlik Engine.   Number code have a special mechanism to escape an integer value inline with -2.   Each chunk starts anywhere in any row and continues for an arbitary length and may wrap to  another row. A DataChunk will typically transfer many rows.   Each DataChunk must be equal or less in size to the default Grpc message size limit. This is  currently 4 MB.   64 KB or slightly less is the optimal size for bandwith performance. But anything from  20 to 120 KB will give good performance if used with the hint option when  writing.   Very large strings can be sent in many DataChunk messages by using the -3 escape sequence. |


### `GetMetaInfo`

_No description._

**Parameters:**

| Type | Description |
| ---- | ----------- |
| [MetaInfoRequest](#metainforequest) | _No description._ |

**Response:**

| Type | Description |
| ---- | ----------- |
| [MetaInfo](#metainfo) |    Useful for debugging. |


## Definitions

### `ConnectionInfo`

_No description._

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `connectionString` | _No description._ | [string](#string) | _optional_ | _No default value._ |
| `user` | _No description._ | [string](#string) | _optional_ | _No default value._ |
| `password` | _No description._ | [string](#string) | _optional_ | _No default value._ |

### `DataChunk`


A structure for streaming field values.

This message contains two parts. A value bucket part and a code part.

Every transferred value have a string code and one or two numeric codes.
These codes can be negative to indicate special things. -1 indicates null for example.

Otherwise they can index into the value buckets.
A value with a null string and a null number is a null value in the Qlik Engine.

Number code have a special mechanism to escape an integer value inline with -2.

Each chunk starts anywhere in any row and continues for an arbitary length and may wrap to
another row. A DataChunk will typically transfer many rows.

Each DataChunk must be equal or less in size to the default Grpc message size limit. This is
currently 4 MB.

64 KB or slightly less is the optimal size for bandwith performance. But anything from
20 to 120 KB will give good performance if used with the hint option when
writing.

Very large strings can be sent in many DataChunk messages by using the -3 escape sequence.

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `stringBucket` | Value buckets/ Strings the chunk | [string](#string) | repeated | _No default value._ |
| `doubleBucket` | Doubles in the chunk. | [double](#double) | repeated | _No default value._ |
| `stringCodes` | Code arrays*  0 or greater is an index into stringBucket.  -1 for a missning string. (null string) (no string value entry required).  -2 for an empty string. (no string value entry required).     A connector dont have to use the -2 optimization. Its perfectly    fine to send an empty string as all other strings. | [sint32](#sint32) | repeated | _No default value._ |
| `numberCodes` | 0 or greater is an index into doubleBucket.  -1 for a null number.  -2 followed by an integer value. In this case there is no index into doubleValues.     Instead -2 is followed by an actual field value number. This is a variable     length encoded integer and will take up less space than a full double in most cases.      A connector dont have to use the -2 optimization. Its perfectly fine to transfer     all numbers in the double bucket.   -3 is partial message special case.     The string code of this value will be 0 or greater. That string will be appended to     the previous value. One string value can be transferred in many chunks this way.     The number value is always the transferred atomicly the first time.      A connector dont have to use the -3 special case. A much simpler solution (if its     acceptable) is to cap all strings to 3 MB or less so that they can be sent within     the 4 MB limit. | [sint64](#sint64) | repeated | _No default value._ |

### `DataInfo`

_No description._

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `statement` | _No description._ | [string](#string) | _optional_ | _No default value._ |
| `parameters` | _No description._ | [Parameter](#parameter) | repeated | _No default value._ |
| `firstRowsOnly` | Set by Engine to inform the Connector it will only use X rows.  The Connector can then limit the number of rows fetched from the database.  This is used with the FIRST prefix, or while debugging.  If not set, the Engine will require all rows. | [OptionalInteger](#optionalinteger) | _optional_ | _No default value._ |

### `DataRequest`

_No description._

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `connection` | _No description._ | [ConnectionInfo](#connectioninfo) | _optional_ | _No default value._ |
| `sessionInfo` | _No description._ | [SessionInfo](#sessioninfo) | _optional_ | _No default value._ |
| `parameters` | _No description._ | [DataInfo](#datainfo) | _optional_ | _No default value._ |

### `FieldAttributes`

Subset of classic Qlik Engine number format.

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `Type` | _No description._ | [FieldAttrType](#fieldattrtype) | _optional_ | _No default value._ |

### `FieldInfo`

_No description._

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `name` | _No description._ | [string](#string) | _optional_ | _No default value._ |
| `semanticType` | _No description._ | [SemanticType](#semantictype) | _optional_ | _No default value._ |
| `fieldAttributes` | _No description._ | [FieldAttributes](#fieldattributes) | _optional_ | _No default value._ |
| `tags` | Optional field description. Examples: key, text, ASCII. | [string](#string) | repeated | _No default value._ |

### `GetDataResponse`

Transferred as initial metadata with the name "x-qlik-getdata-bin".

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `fieldInfo` | _No description._ | [FieldInfo](#fieldinfo) | repeated | _No default value._ |
| `tableName` | _No description._ | [string](#string) | _optional_ | _No default value._ |

### `MetaInfo`


Useful for debugging.

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `name` | Example: "AbcDb connector" | [string](#string) | _optional_ | _No default value._ |
| `version` | Version number in any format.     Example: "1.0.0.0" or "1.23 Beta" or "Buildnumber: 1234" or "2018-Feb-06" | [string](#string) | _optional_ | _No default value._ |
| `developer` | Example: "Qlik" | [string](#string) | _optional_ | _No default value._ |

### `MetaInfoRequest`

_No description._

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `sessionInfo` | _No description._ | [SessionInfo](#sessioninfo) | _optional_ | _No default value._ |

### `OptionalInteger`

_No description._

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `hasValue` | Used or not | [bool](#bool) | _optional_ | _No default value._ |
| `value` | Integer value | [sint64](#sint64) | _optional_ | _No default value._ |

### `Parameter`

_No description._

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `name` | _No description._ | [string](#string) | _optional_ | _No default value._ |
| `value` | _No description._ | [string](#string) | _optional_ | _No default value._ |

### `SessionInfo`

_No description._

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `user` | _No description._ | [string](#string) | _optional_ | _No default value._ |
| `sessionId` | _No description._ | [string](#string) | _optional_ | _No default value._ |
| `docId` | _No description._ | [string](#string) | _optional_ | _No default value._ |
| `reloadId` | _No description._ | [string](#string) | _optional_ | _No default value._ |

## Enums

### `FieldAttrType`

Direct copy of FieldAttrType in Qlik Engine. How to display the data.

| Name | Number | Description |
| ---- | ------ | ----------- |
| `UNKNOWN` | 0 | _No description._ |
| `TEXT` | 1 | _No description._ |
| `REAL` | 2 | _No description._ |
| `DATE` | 3 | _No description._ |
| `TIME` | 4 | _No description._ |
| `TIMESTAMP` | 5 | _No description._ |
| `INTERVAL` | 6 | _No description._ |
| `INTEGER` | 10 | _No description._ |
| `FIX` | 11 | _No description._ |
| `MONEY` | 12 | _No description._ |

### `SemanticType`

How to interpret the data.
If dates or times are already in the Qlik Engine format (fractional day since 1899-12-30), then the fastest way
to import is to use SemanticType=DEFAULT. And transfer the date as a double and set FieldAttributes::Type = DATE.
If the dates are in "days since 1904-01-01" format the best way is to add 1462 to them and send as
1899-12-30 dates.

| Name | Number | Description |
| ---- | ------ | ----------- |
| `DEFAULT` | 0 | The normal value. |
| `UNIX_SECONDS_SINCE_1970_UTC` | 1 | Transferred as double or integer. |
| `ISO_8601` | 2 | Date and time format. Transferred as string. |

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
