<!-- markdownlint-disable -->
# Variable

_QIX methods for version 12.115.0._

## `ForceContent`

Sets the value of a dual variable overriding any input constraints.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qs` | string | Yes | String representation of a dual value.<br>Set this parameter to "", if the string representation is to be Null. |
| `qd` | number | Yes | Numeric representation of a dual value. |

_No return values._

## `GetContent`

Returns the calculated value of a variable.

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qContent` | [`AlfaNumString`](./qix-engine-definitions.md#alfanumstring) | Information about the calculated value. |

## `GetNxProperties`

Gets the properties of a variable.

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qProperties` | [`NxVariableProperties`](./qix-engine-definitions.md#nxvariableproperties) | Information about the properties of the variable. |

## `GetRawContent`

Returns the raw value of a variable.

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | string | &lt;Definition of the variable&gt; |

## `SetContent`

Sets a value to a variable.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qContent` | string | Yes | Value of the variable. |
| `qUpdateMRU` | boolean | Yes | If set to true, the value is added to the Most Recently Used (MRU) list. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | boolean | true/false<br>The operation is successful if qReturn is set to true. |

## `SetNxProperties`

Sets some properties to a variable.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qProperties` | [`NxVariableProperties`](./qix-engine-definitions.md#nxvariableproperties) | Yes | Information about the properties of the variable |

_No return values._
