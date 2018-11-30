
<!-- markdownlint-disable -->
<!-- proselint-disable -->
# GenericVariable

_QIX methods for version 12.277.0._

## `ApplyPatches`

Applies a patch to the properties of a variable. Allows an update to some of the properties.<br>Applying a patch takes less time than resetting all the properties.

Required permissions: [`update`](https://core.qlik.com/services/qix-engine/access-control/#actions)

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPatches` | [`NxPatch`](./definitions.md#nxpatch) | Yes | Array of patches. |

_No return values._

## `GetInfo`

Returns the type and identifier of the object.


_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qInfo` | [`NxInfo`](./definitions.md#nxinfo) | `{"qId":"<identifier>","qType":"<type>"}` |

## `GetLayout`

Evaluates an object and displays its properties including the dynamic properties.<br>If the member _delta_ is set to true in the request object, only the delta is evaluated.


_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qLayout` | [`GenericVariableLayout`](./definitions.md#genericvariablelayout) | Information on the object |

## `GetProperties`

Shows the properties of an object.<br>If the member **delta** is set to true in the request, only the delta is retrieved. <br>The following is always returned in the output:


_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qProp` | [`GenericVariableProperties`](./definitions.md#genericvariableproperties) | Information about the generic object |

## `SetDualValue`

Sets the value of a dual variable.<br>These changes are not persistent. They only last the duration of the engine session.


**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qText` | string | Yes | String representation of a dual value. Set this parameter to "", if the string representation is to be Null. |
| `qNum` | number | Yes | Numeric representation of a dual value. |

_No return values._

## `SetNumValue`

Sets a numerical value to a variable.<br>These changes are not persistent. They only last the duration of the engine session.


**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qVal` | number | Yes | Value of the variable. |

_No return values._

## `SetProperties`

Sets some properties for a variable.<br>The identifier of a variable cannot be modified. You cannot update the properties of a script-defined variable using the [`SetProperties`](#setproperties) method. 

Required permissions: [`update`](https://core.qlik.com/services/qix-engine/access-control/#actions)

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qProp` | [`GenericVariableProperties`](./definitions.md#genericvariableproperties) | Yes | Information about the variable. |

_No return values._

## `SetStringValue`

Sets a string value to a variable.<br>These changes are not persistent. They only last the duration of the engine session.


**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qVal` | string | Yes | Value of the variable. The string can contain an expression. |

_No return values._
