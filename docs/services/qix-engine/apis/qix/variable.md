
<!-- markdownlint-disable -->
<!-- proselint-disable -->
# Variable

_QIX methods for version 12.329.0._

## `ForceContent`

!!! warning "Deprecated"
    Use [`GenericVariable::SetProperties`](./genericvariable.md#genericvariable::setproperties) method instead

Sets the value of a dual variable overriding any input constraints.


**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qs` | string | Yes | String representation of a dual value.<br>Set this parameter to "", if the string representation is to be Null. |
| `qd` | number | Yes | Numeric representation of a dual value. |

_No return values._

## `GetContent`

!!! warning "Deprecated"
    Use [`GenericVariable::GetProperties`](./genericvariable.md#genericvariable::getproperties) method instead

Returns the calculated value of a variable.


_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qContent` | [`AlfaNumString`](./definitions.md#alfanumstring) | Information about the calculated value. |

## `GetNxProperties`

!!! warning "Deprecated"
    Use [`GetProperties`](./genericvariable.md#getproperties) method instead

Gets the properties of a variable.


_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qProperties` | [`NxVariableProperties`](./definitions.md#nxvariableproperties) | Information about the properties of the variable. |

## `GetRawContent`

!!! warning "Deprecated"
    Use [`GenericVariable::GetProperties`](./genericvariable.md#genericvariable::getproperties) method instead

Returns the raw value of a variable.


_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | string | &lt;Definition of the variable&gt; |

## `SetContent`

!!! warning "Deprecated"
    Use [`GenericVariable::SetProperties`](./genericvariable.md#genericvariable::setproperties) method instead

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

!!! warning "Deprecated"
    Use [`SetProperties`](./genericvariable.md#setproperties) method instead

Sets some properties to a variable.

Required permissions: [`update`](https://core.qlik.com/services/qix-engine/access-control/#actions)

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qProperties` | [`NxVariableProperties`](./definitions.md#nxvariableproperties) | Yes | Information about the properties of the variable |

_No return values._
