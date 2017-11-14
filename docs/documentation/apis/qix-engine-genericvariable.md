
<!-- markdownlint-disable -->
# GenericVariable

_API specification for version 12.97.0, generated on 2017-11-14T15:08:57.902Z._

## `ApplyPatches`

Applies a patch to the properties of a variable. Allows an update to some of the properties.<br>Applying a patch takes less time than resetting all the properties.

##### Parameters

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPatches` | array | Yes | Array of patches. |

##### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |


## `GetInfo`

Returns the type and identifier of the object.

_No parameters._

##### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qInfo` | object | `{"qId":"<identifier>","qType":"<type>"}` |

## `GetLayout`

Evaluates an object and displays its properties including the dynamic properties.<br>If the member _delta_ is set to true in the request object, only the delta is evaluated.

_No parameters._

##### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qLayout` | object | Information on the object |

## `GetProperties`

Shows the properties of an object.<br>If the member **delta** is set to true in the request, only the delta is retrieved. <br>The following is always returned in the output:

_No parameters._

##### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qProp` | object | Information about the generic object |

## `SetDualValue`

Sets the value of a dual variable.<br>These changes are not persistent. They only last the duration of the engine session.

##### Parameters

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qText` | string | Yes | String representation of a dual value. Set this parameter to "", if the string representation is to be Null. |
| `qNum` | number | Yes | Numeric representation of a dual value. |

##### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |


## `SetNumValue`

Sets a numerical value to a variable.<br>These changes are not persistent. They only last the duration of the engine session.

##### Parameters

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qVal` | number | Yes | Value of the variable. |

##### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |


## `SetProperties`

Sets some properties for a variable.<br>The identifier of a variable cannot be modified. You cannot update the properties of a script-defined variable using the _SetProperties method_. 

##### Parameters

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qProp` | object | Yes | Information about the variable. |

##### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |


## `SetStringValue`

Sets a string value to a variable.<br>These changes are not persistent. They only last the duration of the engine session.

##### Parameters

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qVal` | string | Yes | Value of the variable. The string can contain an expression. |

##### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |

