
<!-- markdownlint-disable -->
# GenericDimension

_API specification for version 12.97.0, generated on 2017-11-14T15:02:00.060Z._

## `ApplyPatches`

Applies a patch to the properties of an object. Allows an update to some of the properties.<br>Applying a patch takes less time than resetting all the properties.

##### Parameters

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPatches` | array | Yes | Array of patches. |

##### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |


## `GetDimension`

Returns the definition of a dimension.<br><br>The definition of the dimension is returned.

_No parameters._

##### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qDim` | object | `{"qGrouping":"...","qFieldDefs":["..."],"qFieldLabels":["..."]}` |

## `GetInfo`

Returns the type and identifier of the object.

_No parameters._

##### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qInfo` | object | `{"qId":"<identifier>","qType":"<type>"}` |

## `GetLayout`

Evaluates a dimension and displays its properties, including the dynamic properties.

_No parameters._

##### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qLayout` | object | Information on the object. |

## `GetLinkedObjects`

Lists the linked objects to a generic object, a dimension or a measure.

_No parameters._

##### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qItems` | array | List of the linked objects. |

## `GetProperties`

Shows the properties of an object.<br>Returns the identifier and the definition of the dimension.<br>If the member delta is set to true in the request object, only the delta is retrieved.

_No parameters._

##### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qProp` | object | Information about the generic object. |

## `Publish`

Publishes a dimension.

_No parameters._

##### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |


## `SetProperties`

Sets some properties for a dimension.

##### Parameters

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qProp` | object | Yes | Information about the dimension. |

##### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |


## `UnPublish`

Unpublishes a dimension.

_No parameters._

##### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |

