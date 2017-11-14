
<!-- markdownlint-disable -->
# GenericMeasure

_API specification for version 12.97.0, generated on 2017-11-14T15:08:57.898Z._

## `ApplyPatches`

Applies a patch to the properties of an object. Allows an update to some of the properties.<br>Applying a patch takes less time than resetting all the properties.

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

Evaluates a measure and displays its properties, including the dynamic properties.

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

## `GetMeasure`

Returns the definition of a measure.

_No parameters._

##### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qMeasure` | object | Information about the measure. |

## `GetProperties`

Shows the properties of an object.<br>Returns the identifier and the definition of the measure.<br>If the member delta is set to true in the request object, only the delta is retrieved.<br>The following is always returned in the output:

_No parameters._

##### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qProp` | object | Information about the generic object. |

## `Publish`

Publishes a measure.

_No parameters._

##### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |


## `SetProperties`

Sets some properties for a measure.

##### Parameters

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qProp` | object | Yes | Information about the measure. |

##### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |


## `UnPublish`

Unpublishes a measure.

_No parameters._

##### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |

