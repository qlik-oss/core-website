
<!-- markdownlint-disable -->
<!-- proselint-disable -->
# GenericDimension

_QIX methods for version 12.657.0._

## `ApplyPatches`

Applies a patch to the properties of an object. Allows an update to some of the properties.<br>Applying a patch takes less time than resetting all the properties.

Required permissions: [`update`](https://core.qlik.com/services/qix-engine/access-control/#actions)

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPatches` | [`NxPatch`](./definitions.md#nxpatch) | Yes | Array of patches. |

_No return values._

## `Approve`

Adds the generic dimension to the list of approved objects<br>This operation is possible only in Qlik Sense Enterprise.

Required permissions: [`approve`](https://core.qlik.com/services/qix-engine/access-control/#actions)

_No parameters._

_No return values._

## `GetDimension`

Returns the definition of a dimension.<br><br>The definition of the dimension is returned.


_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qDim` | [`NxLibraryDimensionDef`](./definitions.md#nxlibrarydimensiondef) | `{"qGrouping":"...","qFieldDefs":["..."],"qFieldLabels":["..."]}` |

## `GetInfo`

Returns the type and identifier of the object.


_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qInfo` | [`NxInfo`](./definitions.md#nxinfo) | `{"qId":"<identifier>","qType":"<type>"}` |

## `GetLayout`

Evaluates a dimension and displays its properties, including the dynamic properties.


_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qLayout` | [`GenericDimensionLayout`](./definitions.md#genericdimensionlayout) | Information on the object. |

## `GetLinkedObjects`

Lists the linked objects to a generic object, a dimension or a measure.


_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qItems` | array&lt;[`NxLinkedObjectInfo`](./definitions.md#nxlinkedobjectinfo)> | List of the linked objects. |

## `GetProperties`

Shows the properties of an object.<br>Returns the identifier and the definition of the dimension.<br>If the member delta is set to true in the request object, only the delta is retrieved.


_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qProp` | [`GenericDimensionProperties`](./definitions.md#genericdimensionproperties) | Information about the generic object. |

## `Publish`

Publishes a dimension.<br>This operation is not applicable for Qlik Sense Desktop.

Required permissions: [`publish`](https://core.qlik.com/services/qix-engine/access-control/#actions)

_No parameters._

_No return values._

## `SetProperties`

Sets some properties for a dimension.

Required permissions: [`update`](https://core.qlik.com/services/qix-engine/access-control/#actions)

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qProp` | [`GenericDimensionProperties`](./definitions.md#genericdimensionproperties) | Yes | Information about the dimension. |

_No return values._

## `UnApprove`

Removes the generic dimension from the list of approved objects<br>This operation is possible only in Qlik Sense Enterprise.

Required permissions: [`approve`](https://core.qlik.com/services/qix-engine/access-control/#actions)

_No parameters._

_No return values._

## `UnPublish`

Unpublishes a dimension.<br>This operation is not applicable for Qlik Sense Desktop.

Required permissions: [`publish`](https://core.qlik.com/services/qix-engine/access-control/#actions)

_No parameters._

_No return values._
