<!-- markdownlint-disable -->
# GenericDimension

_QIX methods for version 12.134.0._

## `ApplyPatches`

Applies a patch to the properties of an object. Allows an update to some of the properties.<br>Applying a patch takes less time than resetting all the properties.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPatches` | [`NxPatch`](./definitions.md#nxpatch) | Yes | Array of patches. |

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
| `qItems` | [`NxLinkedObjectInfo`](./definitions.md#nxlinkedobjectinfo) | List of the linked objects. |

## `GetProperties`

Shows the properties of an object.<br>Returns the identifier and the definition of the dimension.<br>If the member delta is set to true in the request object, only the delta is retrieved.

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qProp` | [`GenericDimensionProperties`](./definitions.md#genericdimensionproperties) | Information about the generic object. |

## `Publish`

Publishes a dimension.

_No parameters._

_No return values._

## `SetProperties`

Sets some properties for a dimension.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qProp` | [`GenericDimensionProperties`](./definitions.md#genericdimensionproperties) | Yes | Information about the dimension. |

_No return values._

## `UnPublish`

Unpublishes a dimension.

_No parameters._

_No return values._
