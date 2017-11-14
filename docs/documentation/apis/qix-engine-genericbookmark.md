
<!-- markdownlint-disable -->
# GenericBookmark

_API specification for version 12.96.0, generated on 2017-11-14T14:44:26.997Z._

## `Apply`

Applies a bookmark.<br><br>The operation is successful if **qSuccess** is set to true. 

_No parameters._

##### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | &lt;true or false&gt; |

## `ApplyPatches`

Applies a patch to the properties of an object. Allows an update to some of the properties.<br>Applying a patch takes less time than resetting all the properties.

##### Parameters

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPatches` | array | Yes | Array of patches. |

##### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |


## `GetFieldValues`

Retrieves the values of a field.<br><br>

##### Parameters

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qField` | string | Yes | Name of the field. |
| `qGetExcludedValues` | boolean | Yes | If set to true, only excluded values are returned. |
| `qDataPage` | object | Yes | Range of returned values. |

##### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qFieldValues` | array | The field values from a defined range. |

## `GetInfo`

Returns:<br>* The type of the object.<br>* The identifier of the object.

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
| `qLayout` | object | Information on the object. |

## `GetProperties`

Shows the properties of an object.<br>If the member delta is set to true in the request object, only the delta is retrieved.<br>The following is always returned in the output:

_No parameters._

##### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qProp` | object | Information about the generic object. |

## `Publish`

Publishes a bookmark.

_No parameters._

##### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |


## `SetProperties`

Sets some properties for a bookmark.

##### Parameters

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qProp` | object | Yes | Information about the bookmark. |

##### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |


## `UnPublish`

Unpublishes a bookmark.

_No parameters._

##### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |

