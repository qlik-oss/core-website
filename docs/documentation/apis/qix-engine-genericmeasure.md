
<!-- markdownlint-disable -->
# GenericMeasure

_API specification for version 12.96.0, generated on 2017-11-14T11:53:52.449Z._


## `ApplyPatches`

Applies a patch to the properties of an object. Allows an update to some of the properties.
Applying a patch takes less time than resetting all the properties.

##### Parameters

Name | Type | Mandatory | Description
---- | ---- | --------- | -----------
`qPatches` | array | Yes | Array of patches.


_No return values._


## `GetInfo`

Returns the type and identifier of the object.


_No parameters._


##### Returns

Name | Type | Description
---- | ---- | -----------
`qInfo` | object | { "qId": "&lt;identifier&gt;", "qType": "&lt;type&gt;" }

## `GetLayout`

Evaluates a measure and displays its properties, including the dynamic properties.


_No parameters._


##### Returns

Name | Type | Description
---- | ---- | -----------
`qLayout` | object | Information on the object.

## `GetLinkedObjects`

Lists the linked objects to a generic object, a dimension or a measure.


_No parameters._


##### Returns

Name | Type | Description
---- | ---- | -----------
`qItems` | array | List of the linked objects.

## `GetMeasure`

Returns the definition of a measure.


_No parameters._


##### Returns

Name | Type | Description
---- | ---- | -----------
`qMeasure` | object | Information about the measure.

## `GetProperties`

Shows the properties of an object.
Returns the identifier and the definition of the measure.
If the member delta is set to true in the request object, only the delta is retrieved.
The following is always returned in the output:


_No parameters._


##### Returns

Name | Type | Description
---- | ---- | -----------
`qProp` | object | Information about the generic object.

## `Publish`

Publishes a measure.


_No parameters._



_No return values._


## `SetProperties`

Sets some properties for a measure.

##### Parameters

Name | Type | Mandatory | Description
---- | ---- | --------- | -----------
`qProp` | object | Yes | Information about the measure.


_No return values._


## `UnPublish`

Unpublishes a measure.


_No parameters._



_No return values._

