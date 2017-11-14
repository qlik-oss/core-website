
<!-- markdownlint-disable -->
# GenericBookmark

_API specification for version 12.96.0, generated on 2017-11-14T11:53:52.448Z._


## `Apply`

Applies a bookmark.

The operation is successful if **qSuccess** is set to true. 


_No parameters._


##### Returns

Name | Type | Description
---- | ---- | -----------
`qSuccess` | boolean | &lt;true or false&gt;

## `ApplyPatches`

Applies a patch to the properties of an object. Allows an update to some of the properties.
Applying a patch takes less time than resetting all the properties.

##### Parameters

Name | Type | Mandatory | Description
---- | ---- | --------- | -----------
`qPatches` | array | Yes | Array of patches.


_No return values._


## `GetFieldValues`

Retrieves the values of a field.



##### Parameters

Name | Type | Mandatory | Description
---- | ---- | --------- | -----------
`qField` | string | Yes | Name of the field.
`qGetExcludedValues` | boolean | Yes | If set to true, only excluded values are returned.
`qDataPage` | object | Yes | Range of returned values.

##### Returns

Name | Type | Description
---- | ---- | -----------
`qFieldValues` | array | The field values from a defined range.

## `GetInfo`

Returns:
* The type of the object.
* The identifier of the object.


_No parameters._


##### Returns

Name | Type | Description
---- | ---- | -----------
`qInfo` | object | { "qId": "&lt;identifier&gt;", "qType": "&lt;type&gt;" }

## `GetLayout`

Evaluates an object and displays its properties including the dynamic properties.
If the member _delta_ is set to true in the request object, only the delta is evaluated.


_No parameters._


##### Returns

Name | Type | Description
---- | ---- | -----------
`qLayout` | object | Information on the object.

## `GetProperties`

Shows the properties of an object.
If the member delta is set to true in the request object, only the delta is retrieved.
The following is always returned in the output:


_No parameters._


##### Returns

Name | Type | Description
---- | ---- | -----------
`qProp` | object | Information about the generic object.

## `Publish`

Publishes a bookmark.


_No parameters._



_No return values._


## `SetProperties`

Sets some properties for a bookmark.

##### Parameters

Name | Type | Mandatory | Description
---- | ---- | --------- | -----------
`qProp` | object | Yes | Information about the bookmark.


_No return values._


## `UnPublish`

Unpublishes a bookmark.


_No parameters._



_No return values._

