
<!-- markdownlint-disable -->
<!-- proselint-disable -->
# gRPC Analytical Connector API

_gRPC Analytical Connector API for version 12.424.0._

Package: **qlik.sse**

[Analytical Connector Protobuf API specification](./analytical-connector-api.proto)

## Methods

### `GetCapabilities`

A handshake call for the Qlik engine to retrieve the capability of the plugin.

**Parameters:**

| Type | Description |
| ---- | ----------- |
| [Empty](#empty) |  An empty message used when nothing is to be passed in a call. |

**Response:**

| Type | Description |
| ---- | ----------- |
| [Capabilities](#capabilities) |  A full description of the plugin, sent to the Qlik engine, listing all functions available and indicating whether script evaluation is allowed. |


### `ExecuteFunction`

Requests a function to be executed as specified in the header.

**Parameters:**

| Type | Description |
| ---- | ----------- |
| [BundledRows](#bundledrows) |  A number of rows collected in one message. The actual number will depend on the size of each row and is adjusted to optimize throughput. |

**Response:**

| Type | Description |
| ---- | ----------- |
| [BundledRows](#bundledrows) |  A number of rows collected in one message. The actual number will depend on the size of each row and is adjusted to optimize throughput. |


### `EvaluateScript`

Requests a script to be evaluated as specified in the header.

**Parameters:**

| Type | Description |
| ---- | ----------- |
| [BundledRows](#bundledrows) |  A number of rows collected in one message. The actual number will depend on the size of each row and is adjusted to optimize throughput. |

**Response:**

| Type | Description |
| ---- | ----------- |
| [BundledRows](#bundledrows) |  A number of rows collected in one message. The actual number will depend on the size of each row and is adjusted to optimize throughput. |


## Definitions

### `BundledRows`


A number of rows collected in one message. The actual number will depend on the size of each row and is adjusted to optimize throughput.

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `rows` | _No description._ | [Row](#row) | repeated | _No default value._ |

### `Capabilities`


A full description of the plugin, sent to the Qlik engine, listing all functions available and indicating whether script evaluation is allowed.

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `allowScript` | When true, the Qlik engine allows scripts to be sent to the plugin. | [bool](#bool) | _optional_ | _No default value._ |
| `functions` | The definitions of all available functions. | [FunctionDefinition](#functiondefinition) | repeated | _No default value._ |
| `pluginIdentifier` | The ID or name of the plugin. | [string](#string) | _optional_ | _No default value._ |
| `pluginVersion` | The version of the plugin. | [string](#string) | _optional_ | _No default value._ |

### `CommonRequestHeader`


A header sent at the start of both an EvaluateScript request and an ExecuteFunction request under the key "qlik-commonrequestheader-bin".

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `appId` | The ID of the app the request was executed in. | [string](#string) | _optional_ | _No default value._ |
| `userId` | The ID of the user the request was executed by. | [string](#string) | _optional_ | _No default value._ |
| `cardinality` | The cardinality of the parameters. | [int64](#int64) | _optional_ | _No default value._ |

### `Dual`


The basic data type for the data stream. Can contain double, string, or both.

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `numData` | Numeric value as double. | [double](#double) | _optional_ | _No default value._ |
| `strData` | String. | [string](#string) | _optional_ | _No default value._ |

### `Empty`


An empty message used when nothing is to be passed in a call.


### `FieldDescription`


Field definition for function and script calls.

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `dataType` | The data type of the field. | [DataType](#datatype) | _optional_ | _No default value._ |
| `name` | The name of the field. | [string](#string) | _optional_ | _No default value._ |
| `tags` | The tags of the field. | [string](#string) | repeated | _No default value._ |

### `FunctionDefinition`


The definition of a function, which informs the Qlik engine how to use it.

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `name` | The name of the function. | [string](#string) | _optional_ | _No default value._ |
| `functionType` | The type of the function. | [FunctionType](#functiontype) | _optional_ | _No default value._ |
| `returnType` | The return type of the function. | [DataType](#datatype) | _optional_ | _No default value._ |
| `params` | The parameters the function takes. | [Parameter](#parameter) | repeated | _No default value._ |
| `functionId` | A unique ID number for the function, set by the plugin, to be used in calls from the Qlik engine to the plugin. | [int32](#int32) | _optional_ | _No default value._ |

### `FunctionRequestHeader`


A header sent at the start of an ExecuteFunction request under the key "qlik-functionrequestheader-bin".

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `functionId` | The ID of the function to be executed. | [int32](#int32) | _optional_ | _No default value._ |
| `version` | A dummy variable as a workaround for an issue. | [string](#string) | _optional_ | _No default value._ |

### `Parameter`


Parameter definition for functions and script calls.

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `dataType` | The data type of the parameter. | [DataType](#datatype) | _optional_ | _No default value._ |
| `name` | The name of the parameter. | [string](#string) | _optional_ | _No default value._ |

### `Row`


A row of duals.

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `duals` | Row of duals. | [Dual](#dual) | repeated | _No default value._ |

### `ScriptRequestHeader`


A header sent at the start of an EvaluateScript request under the key "qlik-scriptrequestheader-bin".

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `script` | The script to be executed. | [string](#string) | _optional_ | _No default value._ |
| `functionType` | The function type of the script evaluation: scalar, aggregation or tensor. | [FunctionType](#functiontype) | _optional_ | _No default value._ |
| `returnType` | The return type from the script evaluation: numeric, string or both. | [DataType](#datatype) | _optional_ | _No default value._ |
| `params` | The parameters names and types passed to the script. | [Parameter](#parameter) | repeated | _No default value._ |

### `TableDescription`


A header sent before returning data to Qlik, under the key "qlik-tabledescription-bin".

**Fields:**

| Name | Description | Type | Label | Default |
| ---- | ------------| ---- | ----- | ------- |
| `fields` | The fields of the table. | [FieldDescription](#fielddescription) | repeated | _No default value._ |
| `name` | The name of the table. | [string](#string) | _optional_ | _No default value._ |
| `numberOfRows` | Number of rows in table. | [int64](#int64) | _optional_ | _No default value._ |

## Enums

### `DataType`


Data types of the parameters and return values.

| Name | Number | Description |
| ---- | ------ | ----------- |
| `STRING` | 0 | Contains only string. |
| `NUMERIC` | 1 | Contains only double. |
| `DUAL` | 2 | Contains both a string and a double. |

### `FunctionType`


Types of functions (determined by their return values).

| Name | Number | Description |
| ---- | ------ | ----------- |
| `SCALAR` | 0 | The return value is a scalar per row. |
| `AGGREGATION` | 1 | All rows are aggregated into a single scalar. |
| `TENSOR` | 2 | Multiple rows in, multiple rows out. |

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
