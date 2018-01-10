<!-- markdownlint-disable -->
# GenericObject

_QIX methods for version 12.119.0._

## `AbortListObjectSearch`

Aborts the results of a search in a list object.<br>This method applies to list objects (objects with one dimension). After an abort on a list object search, the [`GetLayout`](#getlayout) Method does not return any more search results but it does return the values in the field. 

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | Path to the definition of the list object.<br>For example, _/qListObjectDef_ . |

_No return values._

## `AcceptListObjectSearch`

Accept the results of a search in a list object. The search results become selected in the field.<br>This method applies to list objects (objects with one dimension). The search results are displayed using the [`GetLayout`](#getlayout) Method. 

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | Path to the definition of the list object.<br>For example, _/qListObjectDef_ . |
| `qToggleMode` | boolean | Yes | Set to true to keep any selections present in the list object.<br>If this parameter is set to false, selections made before accepting the list object search become alternative. |
| `qSoftLock` | boolean | No | Set to true to ignore locks; in that case, locked fields can be selected.<br>The default value is false. |

_No return values._

## `ApplyPatches`

Applies a patch to the properties of an object. Allows an update to some of the properties.<br>It is possible to apply a patch to the properties of a generic object, that is not persistent. Such a patch is called a soft patch.<br>In that case, the result of the operation on the properties (add, remove or delete) is not shown when doing [`GetProperties`](#getproperties) , and only a [`GetLayout`](#getlayout) call shows the result of the operation.<br>Properties that are not persistent are called soft properties. Once the engine session is over, soft properties are cleared.<br>Soft properties apply only to generic objects.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPatches` | [`NxPatch`](./qix-engine-definitions.md#nxpatch) | Yes | Array of patches. |
| `qSoftPatch` | boolean | No | If set to true, it means that the properties to be applied are not persistent. The patch is a soft patch.<br>The default value is false. |

_No return values._

## `BeginSelections`

Begins the selection mode. The app enters the modal state. The specified object enters the selection mode and a modal window is opened. The selection mode can apply to only one object in an app at a time.<br>When a visualization is in selection mode, selections can be made in this visualization. The visualization is not sorted until the selection mode is ended. Once the selection mode is ended and if the selections are accepted, the visualization is sorted according to the sort criteria. For more information about:<br>* Ending the selection mode, see [`EndSelections`](#endselections) Method.<br>* The sort criteria, see [`ListObjectDef`](./qix-engine-definitions.md#listobjectdef) or [`HyperCubeDef`](./qix-engine-definitions.md#hypercubedef).<br><br>

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPaths` | array | Yes | List of the paths to the definition of the objects to enter selection mode.<br>For example, _/qListObjectDef_ . |

_No return values._

## `ClearSelections`

Clears the selections in a dimension of a visualization.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | Path to the definition of the visualization.<br>For example, _/qListObjectDef_ . |
| `qColIndices` | array | No | Array of dimension numbers or indexes. The selections are cleared in the specified dimensions.<br>Dimension numbers/indexes start from 0.<br>If this parameter is not set, all dimensions are cleared. |

_No return values._

## `ClearSoftPatches`

Clears the soft properties of a generic object.<br>For more information on how to add soft properties to a generic object, see [`ApplyPatches`](#applypatches) Method.

_No parameters._

_No return values._

## `CollapseLeft`

Collapses the left dimensions of a pivot table. This method applies only to pivot tables that are not always fully expanded.<br>In the definition of the hypercube (in [`HyperCubeDef`](./qix-engine-definitions.md#hypercubedef) ), the parameter _qAlwaysFullyExpanded_ must be set to false.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | Path to the definition of the object to be collapsed.<br>For example, _/qHyperCubeDef_ . |
| `qRow` | integer | Yes | Row index in the data matrix.<br>Indexing starts from 0. |
| `qCol` | integer | Yes | Column index. The index is based on the left dimension indexes.<br>Indexing starts from 0. |
| `qAll` | boolean | Yes | If set to true, it collapses all cells.<br>Parameters _qRow_ and _qCol_ are not used if _qAll_ is set to true, but they need to be set (for example to 0). |

_No return values._

## `CollapseTop`

Collapses the top dimensions of a pivot table. This method applies only to pivot tables that are not always fully expanded.<br>In the definition of the hypercube (in [`HyperCubeDef`](./qix-engine-definitions.md#hypercubedef) ), the parameter _qAlwaysFullyExpanded_ must be set to false.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | Path to the definition of the object to be collapsed<br>For example, _/qHyperCubeDef_ . |
| `qRow` | integer | Yes | Row index. The index is based on the top dimension indexes.<br>Indexing starts from 0. |
| `qCol` | integer | Yes | Column index in the data matrix.<br>Indexing starts from 0. |
| `qAll` | boolean | Yes | If set to true, it collapses all cells.<br>Parameters _qRow_ and _qCol_ are not used if _qAll_ is set to true, but they need to be set (for example to 0). |

_No return values._

## `CopyFrom`

Copies the properties of a generic object and its children.<br>The source object is specified by the parameter _qFromId_ and the destination object is referenced by its handle.<br>The identifier of the destination object is the same as before the copy takes place.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qFromId` | string | Yes | Identifier of the object to copy. |

_No return values._

## `CreateChild`

Creates a generic object that is a child of another generic object.<br>It is possible to update the properties of the child's parent at the same time that the child is created. Both operations are performed by the same call. It is possible to create a child that is linked to another generic object. The two objects have the same properties.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qProp` | [`GenericObjectProperties`](./qix-engine-definitions.md#genericobjectproperties) | Yes | Information about the child.<br>It is possible to create a child that is linked to another object. |
| `qPropForThis` | [`GenericObjectProperties`](./qix-engine-definitions.md#genericobjectproperties) | No | Identifier of the parent's object.<br>Should be set to update the properties of the parent's object at the same time the child is created. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qInfo` | [`NxInfo`](./qix-engine-definitions.md#nxinfo) | `{"qId":"<identifier of the child>","qType":"<type of the child>"}` |
| `qReturn` | [`ObjectInterface`](./qix-engine-definitions.md#objectinterface) | { "qType": "GenericObject", "qHandle": &lt;handle of the child&gt; } |

## `DestroyAllChildren`

Removes all children and all children to the children on an object.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPropForThis` | [`GenericObjectProperties`](./qix-engine-definitions.md#genericobjectproperties) | No | Identifier of the parent's object and property to update.<br>Should be set to update the properties of the parent's object at the same time the child is created. |

_No return values._

## `DestroyChild`

Removes a child object.<br>It is possible to update the properties of the child's parent at the same time that the child is removed. Both operations are performed by the same call. Removing a linked object, invalidate the linking object. <br><br>The operation is successful if **qSuccess** is set to true. 

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qId` | string | Yes | Identifier of the child to remove. |
| `qPropForThis` | [`GenericObjectProperties`](./qix-engine-definitions.md#genericobjectproperties) | No | Identifier of the parent's object and property to update.<br>Should be set to update the properties of the parent's object at the same time the child is created. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | &lt;true or false&gt; |

## `DrillUp`

You can use the drillUp method with any object that contains a drilldown group as a dimension.<br>This method allows you to move between different levels of information (from a detailed level to a less detailed level of information). You can go back to previous visualizations up to the highest level of the hierarchy.<br>If you try to drill up more steps than there are available levels, the first level of the hierarchy is displayed.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | Path to the definition of the object to be selected.<br>For example, _/qHyperCubeDef_ . |
| `qDimNo` | integer | Yes | Dimension number or index starting from 0.<br>The default value is 0. |
| `qNbrSteps` | integer | Yes | Number of steps you want to drill up.<br>The default value is 0. |

_No return values._

## `EmbedSnapshotObject`

Adds a snapshot to a generic object.<br>Only one snapshot can be embedded in a generic object. If you embed a snapshot in an object that already contains a snapshot, the new snapshot overwrites the previous one.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qId` | string | Yes | Identifier of the bookmark. |

_No return values._

## `EndSelections`

Ends the selection mode on a visualization. The selections are accepted or aborted when exiting the selection mode, depending on the _qAccept_ parameter value.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qAccept` | boolean | Yes | Set this parameter to true to accept the selections before exiting the selection mode. |

_No return values._

## `ExpandLeft`

Expands the left dimensions of a pivot table. This method applies only to pivot tables that are not always fully expanded.<br>In the definition of the hypercube (in [`HyperCubeDef`](./qix-engine-definitions.md#hypercubedef) ), the parameter _qAlwaysFullyExpanded_ must be set to false.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | Path to the definition of the object to be expanded.<br>For example, _/qHyperCubeDef_ . |
| `qRow` | integer | Yes | Row index in the data matrix to expand.<br>Indexing starts from 0. |
| `qCol` | integer | Yes | Column index. The index is based on the left dimension indexes.<br>Indexing starts from 0. |
| `qAll` | boolean | Yes | If set to true, it expands all cells.<br>Parameters _qRow_ and _qCol_ are not used if _qAll_ is set to true, but they need to be set (for example to 0). |

_No return values._

## `ExpandTop`

Expands the top dimensions of a pivot table. This method applies only to pivot tables that are not always fully expanded.<br>In the definition of the hypercube (in [`HyperCubeDef`](./qix-engine-definitions.md#hypercubedef) ), the parameter _qAlwaysFullyExpanded_ must be set to false.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | Path to the definition of the object to be expanded.<br>For example, _/qHyperCubeDef_ . |
| `qRow` | integer | Yes | Row index. The index is based on the top dimension indexes.<br>Indexing starts from 0. |
| `qCol` | integer | Yes | Column index in the data matrix.<br>Indexing starts from 0. |
| `qAll` | boolean | Yes | If set to true, it expands all cells.<br>Parameters _qRow_ and _qCol_ are not used if _qAll_ is set to true, but they need to be set (for example to 0). |

_No return values._

## `ExportData`

Exports the data of any generic object to an Excel file or a open XML file. If the object contains excluded values, those excluded values are not exported.<br>This API has limited functionality and will not support CSV export from all types of objects. Consider using Excel export instead. Treemap and bar chart are not supported.<br><br>

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qFileType` | string | Yes | Type of the file to export.<br><br>One of:<br>* CSV_C or EXPORT_CSV_C<br>* CSV_T or EXPORT_CSV_T<br>* OOXML or EXPORT_OOXML |
| `qPath` | string | No | Path to the definition of the object to be exported.<br>For example, _/qHyperCubeDef_ .<br>This parameter is mandatory if the file type is _CSV_C_ or _CSV_T_ . |
| `qFileName` | string | No | Name of the exported file after download from browser.<br>This parameter is optional and only used in Qlik Sense Desktop. |
| `qExportState` | string | No | Defines the values to be exported.<br>The default value is A.<br><br>One of:<br>* P or EXPORT_POSSIBLE<br>* A or EXPORT_ALL |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qUrl` | string | &lt;url of the exported file&gt; |
| `qWarnings` | array | `[1000]` |

## `GetChild`

Returns the type of the object and the corresponding handle.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qId` | string | Yes | Identifier of the object. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | [`ObjectInterface`](./qix-engine-definitions.md#objectinterface) | { "qType": "GenericObject", "qHandle": &lt;handle of the object&gt; } |

## `GetChildInfos`

Returns the identifier and the type for each child in an app object. If the child contains extra properties in _qInfos_ , these properties are returned.<br><br>Full dynamic properties are optional and are returned if they exist in the definition of the object.

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qInfos` | [`NxInfo`](./qix-engine-definitions.md#nxinfo) | [ { "qId": "&lt;identifier of the child 1&gt;", "qType": "&lt;type of the child 1&gt;"<br>}, { "qId": "&lt;identifier of the child 2&gt;", "qType": "&lt;type of the child 2&gt;", "&lt;FullDynamicProperty&gt;": "&lt;value&gt;" }<br>...<br>] |

## `GetEffectiveProperties`

Returns the identifier, the type and the properties of the object.<br>If the object contains some soft properties, the soft properties are returned.<br>If the object is linked to another object, the properties of the linking object are returned.<br>GetEffectiveProperties method<br>Returns the identifier, the type and the properties of the object.<br>If the object contains some soft properties, the soft properties are returned.<br>If the object is linked to another object, the properties of the linking object are returned.

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qProp` | [`GenericObjectProperties`](./qix-engine-definitions.md#genericobjectproperties) | Information about the generic object. |

## `GetFullPropertyTree`

Gets the properties of:<br>* A generic object.<br>* The children of the generic object.<br>* The bookmarks/embedded snapshots of the generic object.

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qPropEntry` | [`GenericObjectEntry`](./qix-engine-definitions.md#genericobjectentry) | Information about the properties. |

## `GetHyperCubeBinnedData`

This method supports data binning.<br>When a generic object with two or three measures and one dimension contains a lot of data, groups of points (for example, cells) can be rendered instead of points.<br>A zone of interest can be refined (for zooming in) up to a maximum refinement level (set in the _qQueryLevel_ parameter) or coarsened (for zoom out).<br>The grid of cells is adaptive (not static), meaning that it adapts to different length scales.<br>The [`GetHyperCubeBinnedData`](#gethypercubebinneddata) method gives information about the adaptive grid and the values of the generic object.<br>The number of points in a cell and the coordinates (expressed in the measure range) of each cell are returned.<br>Dimension values and measure values are rendered at point level (highest detailed level).<br>The generic object should contain two or three measures and one dimension. When the refinement is high, the first two measures are represented on the x-axis and on the y-axis, while the third measure is visualized as color or point size.<br><br>

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | Path to the definition of the object.<br>For example, _/qHyperCubeDef_ . |
| `qPages` | [`NxPage`](./qix-engine-definitions.md#nxpage) | Yes | Array of pages to retrieve.<br>Since the generic object contains two measures and one dimension, _qWidth_ should be set to 3.<br>If the value of a measure is Null, the value cannot be rendered. Therefore, the number of elements rendered in a page can be less than the number defined in the property _qHeight_ . |
| `qViewport` | [`NxViewPort`](./qix-engine-definitions.md#nxviewport) | Yes | Defines the canvas and the zoom level.<br>This parameter is not yet used and is optional. |
| `qDataRanges` | [`NxDataAreaPage`](./qix-engine-definitions.md#nxdataareapage) | Yes | [`Range`](./qix-engine-definitions.md#range) of the data to render.<br>This range applies to the measure values.<br>The lowest and highest values of a measure can be retrieved by using the [`GetLayout`](#getlayout) method (in _/qHyperCube/qMeasureInfo_ ). |
| `qMaxNbrCells` | integer | Yes | Maximum number of cells in the grid. |
| `qQueryLevel` | integer | Yes | Level of details. The higher the level, the more detailed information you get (zoom-in).<br>When the number of points to render falls below a certain threshold, the values are no longer rendered as cells but as points.<br>The query level should be no greater than 20. |
| `qBinningMethod` | integer | Yes | Selects the algorithm.<br>The default value is 0.<br>One of:<br>* 0: Adaptive grid<br>* 1: Hexagonal grid<br>* 2: Uniform grid |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qDataPages` | [`NxDataPage`](./qix-engine-definitions.md#nxdatapage) | Information about the data set.<br>Depending on the refinement level, the information is about:<br>* The adaptive grid. Occurs when cells are rendered and not points.<br>or<br>* The dimension values and the measure values. Occurs when the level of detail is high (points are rendered). |

## `GetHyperCubeContinuousData`

Retrieves and packs compressed hypercube and axis data. It is possible to retrieve specific pages of data.<br>Binning is done on the time stamp data as well as the date. This means that you can zoom in to a level of granularity as low as seconds.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | Path to the definition of the object.<br>For example, _/qHyperCubeDef_ . |
| `qOptions` | [`NxContinuousDataOptions`](./qix-engine-definitions.md#nxcontinuousdataoptions) | Yes | Defines the data to return. |
| `qReverseSort` | boolean | No | If set to true the returned data pages are reverse sorted.<br>Optional. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qDataPages` | [`NxDataPage`](./qix-engine-definitions.md#nxdatapage) | Array of pages to retrieve.<br>The dimension values and the measure values. |
| `qAxisData` | [`NxAxisData`](./qix-engine-definitions.md#nxaxisdata) | List of x-axis data including name, ticks and tags.<br>Only days are returned, not time. |

## `GetHyperCubeData`

Retrieves the calculated data for a chart, a table, or a scatter plot. It is possible to retrieve specific pages of data.<br>This method works for a hypercube in DATA_MODE_STRAIGHT.<br>A data set is returned.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | Path to the definition of the object to be selected.<br>For example, _/qHyperCubeDef_ . |
| `qPages` | [`NxPage`](./qix-engine-definitions.md#nxpage) | Yes | Array of pages to retrieve. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qDataPages` | [`NxDataPage`](./qix-engine-definitions.md#nxdatapage) | A data set |

## `GetHyperCubePivotData`

Retrieves the values of a pivot table. It is possible to retrieve specific pages of data.<br>This method works for a hypercube in DATA_MODE_PIVOT.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | Path to the definition of the object to be selected.<br>For example, _/qHyperCubeDef_ . |
| `qPages` | [`NxPage`](./qix-engine-definitions.md#nxpage) | Yes | Array of pages to retrieve. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qDataPages` | [`NxPivotPage`](./qix-engine-definitions.md#nxpivotpage) | A data set. |

## `GetHyperCubeReducedData`

Reduces the data of a bar chart, a line chart or a scatter plot chart and retrieves them.<br>The reduction is dependent on the zoom factor (parameter _qZoomFactor_ ) and on the reduction mode.<br>This method can be used to create mini charts.<br><br>

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | Path to the definition of the object to be selected.<br>For example, _/qHyperCubeDef_ . |
| `qPages` | [`NxPage`](./qix-engine-definitions.md#nxpage) | Yes | Array of pages. |
| `qZoomFactor` | integer | Yes | Defines the zoom factor.<br>If set to -1, the engine decides of the zoom factor.<br>* If the reduction mode is _D1_ or _S_ , the zoom factor is 2ⁿ. If the zoom factor is 5, the data are reduced by a factor 32.<br>* If the reduction mode is _C_ , the zoom factor defines the number of centroids. |
| `qReductionMode` | string | Yes | Defines the reduction mode.<br><br>One of:<br>* N or DATA_REDUCTION_NONE<br>* D1 or DATA_REDUCTION_ONEDIM<br>* S or DATA_REDUCTION_SCATTERED<br>* C or DATA_REDUCTION_CLUSTERED<br>* ST or DATA_REDUCTION_STACKED |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qDataPages` | [`NxDataPage`](./qix-engine-definitions.md#nxdatapage) | A data set. |

## `GetHyperCubeStackData`

Retrieves the values of a stacked pivot table. It is possible to retrieve specific pages of data.<br>This method works for a hypercube in DATA_MODE_PIVOT_STACK.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | Path to the definition of the object to be selected.<br>For example, _/qHyperCubeDef_ . |
| `qPages` | [`NxPage`](./qix-engine-definitions.md#nxpage) | Yes | Array of pages to retrieve. |
| `qMaxNbrCells` | integer | No | Maximum number of cells at outer level.<br>The default value is 10 000. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qDataPages` | [`NxStackPage`](./qix-engine-definitions.md#nxstackpage) | A data set. |

## `GetHyperCubeTreeData`

Retrieves data for nodes in a tree structure. It is possible to retrieve specific pages of data.<br>This method works for a hypercube in DATA_MODE_PIVOT.<br><br>

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | Path to the definition of the object to be selected. |
| `qNodeOptions` | [`NxTreeDataOption`](./qix-engine-definitions.md#nxtreedataoption) | No | Specifies all the paging filters needed to define the tree to be fetched. If left out the complete tree is returned. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qNodes` | [`NxTreeNode`](./qix-engine-definitions.md#nxtreenode) | Represents the nodes and dimensions of the defined tree. |

## `GetInfo`

Returns the type and identifier of the object.

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qInfo` | [`NxInfo`](./qix-engine-definitions.md#nxinfo) | `{"qId":"<identifier>","qType":"<type>"}` |

## `GetLayout`

Evaluates an object and displays its properties including the dynamic properties.<br>If the member _delta_ is set to true in the request object, only the delta is evaluated. A [`GetLayout`](#getlayout) call on a generic object, returns up to one level down in the hierarchy.<br><br>

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qLayout` | [`GenericObjectLayout`](./qix-engine-definitions.md#genericobjectlayout) | Information on the object. |

## `GetLinkedObjects`

Lists the linked objects to a generic object, a dimension or a measure.

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qItems` | [`NxLinkedObjectInfo`](./qix-engine-definitions.md#nxlinkedobjectinfo) | List of the linked objects. |

## `GetListObjectData`

Retrieves the values of a list object.<br>A data set is returned.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | Path to the definition of the object to be selected.<br>For example, _/qListObjectDef_ . |
| `qPages` | [`NxPage`](./qix-engine-definitions.md#nxpage) | Yes | Array of pages you are interested in. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qDataPages` | [`NxDataPage`](./qix-engine-definitions.md#nxdatapage) | A data set. |

## `GetProperties`

Returns the identifier, the type and the properties of the object.<br>Because it is not mandatory to set all properties when you define an object, the [`GetProperties`](#getproperties) method may show properties that were not set. In that case, default values are given.<br>If the object contains some soft properties, the soft properties are not returned by the [`GetProperties`](#getproperties) method. Use the [`GetEffectiveProperties`](#geteffectiveproperties) method instead.<br>If the object is linked to another object, the properties of the linking object are not returned by the [`GetProperties`](#getproperties) method. Use the [`GetEffectiveProperties`](#geteffectiveproperties) method instead.<br>The properties depends on the generic object type, see [properties](genericobject-layout.html).<br>If the member delta is set to true in the request object, only the delta is retrieved.

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qProp` | [`GenericObjectProperties`](./qix-engine-definitions.md#genericobjectproperties) | Information about the generic object. |

## `GetSnapshotObject`

Returns the type of the object and the corresponding handle.

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | [`ObjectInterface`](./qix-engine-definitions.md#objectinterface) | { "qType": "GenericBookmark", "qHandle": &lt;Handle of the snapshot&gt; } |

## `Lock`

Locks the selected values of a generic object.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | Path to the definition of the object.<br>For example, _/qListObjectDef_ . |
| `qColIndices` | array | No | Dimension numbers or dimension indexes where the lock should apply.<br>Dimension numbers/indexes start from 0.<br>If this parameter is not set, the selected values in all dimensions are locked. |

_No return values._

## `MultiRangeSelectHyperCubeValues`

_No details._

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | _No description._ |
| `qRanges` | [`NxMultiRangeSelectInfo`](./qix-engine-definitions.md#nxmultirangeselectinfo) | Yes | _No description._ |
| `qOrMode` | boolean | No | _No description._ |
| `qDeselectOnlyOneSelected` | boolean | No | _No description._ |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | _No description._ |

## `MultiRangeSelectTreeDataValues`

_No details._

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | _No description._ |
| `qRanges` | [`NxTreeMultiRangeSelectInfo`](./qix-engine-definitions.md#nxtreemultirangeselectinfo) | Yes | _No description._ |
| `qOrMode` | boolean | No | _No description._ |
| `qDeselectOnlyOneSelected` | boolean | No | _No description._ |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | _No description._ |

## `Publish`

Publishes a generic object.<br>This operation is possible only in Qlik Sense Enterprise.

_No parameters._

_No return values._

## `RangeSelectHyperCubeValues`

Make range selections in measures.<br> This method applies to hypercubes. For example, bar charts, tables and scatter plots.<br>The member **Change** returns the handles of the objects that are updated following the selections.<br>_qSuccess_ is set to _true_ if the selections are successful and is set to _false_ in the following cases:<br>* The object contains some invalid fields (fields that are not in the data model).<br>* The selection applies to a locked field.<br>* A range selection is performed and the parameter _OneAndOnlyOne_ is set to true in the definition of the object.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | Path to the definition of the object to be selected.<br>For example, _/qHyperCubeDef_ . |
| `qRanges` | [`NxRangeSelectInfo`](./qix-engine-definitions.md#nxrangeselectinfo) | Yes | Ranges of selection. |
| `qColumnsToSelect` | array | No | Indicates which dimensions to select.<br>The dimensions numbering starts at 0 (first dimension is 0).<br>If the array is empty, all dimensions are selected. |
| `qOrMode` | boolean | No | Applies to hypercubes with multiple measures.<br>If set to true, it means that at least one of the measures must be in the range of selections for the group of measures to be selected.<br>If set to false, it means that all measures must be in the range of selections for the group of measures to be selected.<br>The default value is false. |
| `qDeselectOnlyOneSelected` | boolean | No | Set this parameter to true to unselect the last single selected value. There must be only one selected value in the field.<br>The default value is false. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | true/false |

## `ResetMadeSelections`

Resets all selections made in selection mode.

_No parameters._

_No return values._

## `SearchListObjectFor`

Searches for a string in a list object.<br>This method applies to list objects (objects with one dimension). The search results can be displayed using the [`GetLayout`](#getlayout) Method. <br><br>The operation is successful if **qSuccess** is set to true. 

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | Path to the definition of the list object.<br>For example, _/qListObjectDef_ . |
| `qMatch` | string | Yes | Search string.<br>Wild card characters are allowed. The search is not case sensitive.<br>Examples:<br>* P*U*: retrieves only values that start with P and contain U<br>* P U S: retrieves values that start with P, U or S |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | `true` |

## `SelectHyperCubeCells`

Makes selections in multiple dimensions and measures.<br> This method applies to hypercubes, such as bar charts, tables and scatter plots.<br>The member **Change** returns the handles of the objects that are updated following the selections.<br>_qSuccess_ is set to _true_ if the selections are successful and is set to _false_ in the following cases:<br>* The object contains some invalid fields (fields that are not in the data model).<br>* The selection applies to a locked field.<br>* A range selection is performed and the parameter _OneAndOnlyOne_ is set to true in the definition of the object.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | Path to the definition of the object to be selected.<br>For example, _/qHyperCubeDef_ . |
| `qRowIndices` | array | Yes | Array of row indexes to select, starting from 0.<br>If the array is empty _[ ]_ , all rows are selected. |
| `qColIndices` | array | Yes | Indexes of the columns to select, starting from 0.<br>A column corresponds to a dimension or a measure depending on the definition of the hypercube.<br>Example:<br>If the hypercube has two dimensions and one measure:<br>* [0] selects the first column (i.e the first dimension).<br>* [1] selects the second column (i.e the second dimension).<br>* [2] selects the third column (i.e the measure).<br><br>If the array is empty _[ ]_ , all columns are selected. |
| `qSoftLock` | boolean | No | Set to true to ignore locks; in that case, locked fields can be selected. |
| `qDeselectOnlyOneSelected` | boolean | No | Set this parameter to true to unselect the last single selected value. There must be only one selected value in the field.<br>The default value is false. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | true/false |

## `SelectHyperCubeContinuousRange`

The following is returned in the output:<br>The operation is successful if **qSuccess** is set to true. 

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | Path to the definition of the object.<br>For example, _/qHyperCubeDef_ . |
| `qRanges` | [`NxContinuousRangeSelectInfo`](./qix-engine-definitions.md#nxcontinuousrangeselectinfo) | Yes | Selects ranges in a hypercube in (Ranges[N].Min,Ranges[N].Max) intervals.<br>If either Ranges[N].MinInclEq or Ranges[N].MaxInclEq, or both flags are set to _true_ then _Min_ and _Max_ values will be selected. |
| `qSoftLock` | boolean | No | Set to true to ignore locks; in that case, locked fields can be selected.<br>The default value is false. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | &lt;true or false&gt; |

## `SelectHyperCubeValues`

Selects some values in one dimension.<br>The values are identified by their element numbers.<br>This method applies to charts, tables and scatter plots.<br>The member **Change** returns the handles of the objects that are updated following the selections.<br>_qSuccess_ is set to _true_ if the selections are successful and is set to _false_ in the following cases:<br>* The object contains some invalid fields (fields that are not in the data model).<br>* The selection applies to a locked field.<br>* A range selection is performed and the parameter _OneAndOnlyOne_ is set to true in the definition of the object.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | Path to the definition of the object to be selected.<br>For example, _/qHyperCubeDef_ . |
| `qDimNo` | integer | Yes | Dimension number or index to select.<br>Dimension numbers/index start from 0. |
| `qValues` | array | Yes | Element numbers of the field to select.<br>You can select multiple elements; the separator is the comma. |
| `qToggleMode` | boolean | Yes | Set to true to toggle. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | true/false |

## `SelectListObjectAll`

Selects all values of a field.<br>This method applies to list objects (objects with one dimension).<br>The member **Change** returns the handles of the objects that are updated following the selections.<br>_qSuccess_ is set to _true_ if the selections are successful and is set to _false_ in the following cases:<br>* The object contains some invalid fields (fields that are not in the data model).<br>* The selection applies to a locked field.<br>* A range selection is performed and the parameter _OneAndOnlyOne_ is set to true in the definition of the object.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | Path to the definition of the object to be selected.<br>For example, _/qListObjectDef_ . |
| `qSoftLock` | boolean | No | Set to true to ignore locks; in that case, locked fields can be selected.<br>The default value is false. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | true/false |

## `SelectListObjectAlternative`

Selects all alternative values in a specific field.<br>This method applies to list objects (objects with one dimension). If a field contains at least one selected value, the values that are neither selected nor excluded are alternatives values.<br>The member **Change** returns the handles of the objects that are updated following the selections.<br>_qSuccess_ is set to _true_ if the selections are successful and is set to _false_ in the following cases:<br>* The object contains some invalid fields (fields that are not in the data model).<br>* The selection applies to a locked field.<br>* A range selection is performed and the parameter _OneAndOnlyOne_ is set to true in the definition of the object.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | Path to the definition of the object to be selected.<br>For example, _/qListObjectDef_ . |
| `qSoftLock` | boolean | No | Set to true to ignore locks; in that case, locked fields can be selected.<br>The default value is false. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | true/false |

## `SelectListObjectContinuousRange`

The following is returned in the output:<br>The operation is successful if **qSuccess** is set to true. 

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | Path to the definition of the object.<br>For example, _/qHyperCubeDef_ . |
| `qRanges` | [`Range`](./qix-engine-definitions.md#range) | Yes | Selects ranges in a hypercube in (Ranges[N].Min,Ranges[N].Max) intervals.<br>If either Ranges[N].MinInclEq or Ranges[N].MaxInclEq, or both flags are set to _true_ then _Min_ and _Max_ values will be selected. |
| `qSoftLock` | boolean | No | Set to true to ignore locks; in that case, locked fields can be selected.<br>The default value is false. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | &lt;true or false&gt; |

## `SelectListObjectExcluded`

Inverts the current selections in a specific field.<br>This method applies to list objects (objects with one dimension).<br>The member **Change** returns the handles of the objects that are updated following the selections.<br>_qSuccess_ is set to _true_ if the selections are successful and is set to _false_ in the following cases:<br>* The object contains some invalid fields (fields that are not in the data model).<br>* The selection applies to a locked field.<br>* A range selection is performed and the parameter _OneAndOnlyOne_ is set to true in the definition of the object.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | Path to the definition of the object to be selected.<br>For example, _/qListObjectDef_ . |
| `qSoftLock` | boolean | No | Set to true to ignore locks; in that case, locked fields can be selected.<br>The default value is false. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | true/false |

## `SelectListObjectPossible`

Selects all possible values of a list object.<br>This method applies to list objects (objects with one dimension).<br>The member **Change** returns the handles of the objects that are updated following the selections.<br>_qSuccess_ is set to _true_ if the selections are successful and is set to _false_ in the following cases:<br>* The object contains some invalid fields (fields that are not in the data model).<br>* The selection applies to a locked field.<br>* A range selection is performed and the parameter _OneAndOnlyOne_ is set to true in the definition of the object.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | Path to the definition of the object to be selected.<br>For example, _/qListObjectDef_ . |
| `qSoftLock` | boolean | No | Set to true to ignore locks; in that case, locked fields can be selected.<br>The default value is false. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | true/false |

## `SelectListObjectValues`

Makes single selections in dimensions.<br>This method applies to list objects only.<br>The member **Change** returns the handles of the objects that are updated following the selections.<br>_qSuccess_ is set to _true_ if the selections are successful and is set to _false_ in the following cases:<br>* The object contains some invalid fields (fields that are not in the data model).<br>* The selection applies to a locked field.<br>* A range selection is performed and the parameter _OneAndOnlyOne_ is set to true in the definition of the object.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | Path to the definition of the object to be selected.<br>For example, _/qListObjectDef_ . |
| `qValues` | array | Yes | Element numbers to select.<br>You can select multiple values; the separator is the comma. |
| `qToggleMode` | boolean | Yes | Set to true to toggle. |
| `qSoftLock` | boolean | No | Set to true to ignore locks; in that case, locked fields can be selected.<br>The default value is false. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | true/false |

## `SelectPivotCells`

This method only applies to hypercubes that are not represented as straight tables. The parameter _qMode_ in [`HyperCubeDef`](./qix-engine-definitions.md#hypercubedef) must be set either to _P_  or _K_ . <br><br>

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | Path to the definition of the object.<br>For example, _/qHyperCubeDef_ . |
| `qSelections` | [`NxSelectionCell`](./qix-engine-definitions.md#nxselectioncell) | Yes | Information about the selections to perform. |
| `qSoftLock` | boolean | No | Set to true to ignore locks; in that case, locked fields can be selected. |
| `qDeselectOnlyOneSelected` | boolean | No | Set this parameter to true to unselect the last single selected value. There must be only one selected value in the field.<br>The default value is false. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | true/false |

## `SetChildArrayOrder`

Sets the order of the children in a generic object.<br>To change the order of the children in a generic object, the identifiers of all the children must be included in the list of the identifiers (in _qIds_ ). 

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qIds` | array | Yes | List of the children identifiers. |

_No return values._

## `SetFullPropertyTree`

Sets the properties of:<br>* A generic object.<br>* The children of the generic object.<br>* The bookmarks/embedded snapshots of the generic object.<br><br>If the [`SetFullPropertyTree`](#setfullpropertytree) method is asked to set some properties to a child that does not exist, it creates the child. The type of an object cannot be updated.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPropEntry` | [`GenericObjectEntry`](./qix-engine-definitions.md#genericobjectentry) | Yes | Information about the generic object entry. |

_No return values._

## `SetProperties`

Sets some properties for a generic object.<br>The properties depends on the generic object type, see [properties](genericobject-property.html).

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qProp` | [`GenericObjectProperties`](./qix-engine-definitions.md#genericobjectproperties) | Yes | Information about the generic object. |

_No return values._

## `UnPublish`

Unpublishes a generic object.<br>This operation is possible only in Qlik Sense Enterprise.

_No parameters._

_No return values._

## `Unlock`

Unlocks the selected values of a generic object if the target (or handle ) is a generic object

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | Path to the definition of the object.<br>For example, _/qListObjectDef_ . |
| `qColIndices` | array | No | Dimension numbers/indexes where the unlock should apply.<br>Dimension numbers/indexes start from 0.<br>If this parameter is not set, the locked values in all dimensions are unlocked. |

_No return values._
