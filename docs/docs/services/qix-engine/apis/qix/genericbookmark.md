
<!-- markdownlint-disable -->
<!-- proselint-disable -->
# GenericBookmark

_QIX methods for version 12.181.0._

## `Apply`

Applies a bookmark.<br><br>The operation is successful if **qSuccess** is set to true. 

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | &lt;true or false&gt; |

## `ApplyPatches`

Applies a patch to the properties of an object. Allows an update to some of the properties.<br>Applying a patch takes less time than resetting all the properties.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPatches` | [`NxPatch`](./definitions.md#nxpatch) | Yes | Array of patches. |

_No return values._

## `Approve`

Adds the generic bookmark to the list of approved objects<br>This operation is possible only in Qlik Sense Enterprise.

_No parameters._

_No return values._

## `GetFieldValues`

Retrieves the values of a field.<br><br>

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qField` | string | Yes | Name of the field. |
| `qGetExcludedValues` | boolean | Yes | If set to true, only excluded values are returned. |
| `qDataPage` | [`BookmarkFieldPage`](./definitions.md#bookmarkfieldpage) | Yes | [`Range`](./definitions.md#range) of returned values. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qFieldValues` | array&lt;[`FieldValue`](./definitions.md#fieldvalue)> | The field values from a defined range. |

## `GetInfo`

Returns:<br>* The type of the object.<br>* The identifier of the object.

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
| `qLayout` | [`GenericBookmarkLayout`](./definitions.md#genericbookmarklayout) | Information on the object. |

## `GetProperties`

Shows the properties of an object.<br>If the member delta is set to true in the request object, only the delta is retrieved.<br>The following is always returned in the output:

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qProp` | [`GenericBookmarkProperties`](./definitions.md#genericbookmarkproperties) | Information about the generic object. |

## `Publish`

Publishes a bookmark.

_No parameters._

_No return values._

## `SetProperties`

Sets some properties for a bookmark.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qProp` | [`GenericBookmarkProperties`](./definitions.md#genericbookmarkproperties) | Yes | Information about the bookmark. |

_No return values._

## `UnApprove`

Removes the generic bookmark from the list of approved objects<br>This operation is possible only in Qlik Sense Enterprise.

_No parameters._

_No return values._

## `UnPublish`

Unpublishes a bookmark.

_No parameters._

_No return values._
