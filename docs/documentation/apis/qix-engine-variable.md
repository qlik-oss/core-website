
<!-- markdownlint-disable -->
# Variable

_API specification for version 12.96.0, generated on 2017-11-14T11:53:52.452Z._


## `ForceContent`

Sets the value of a dual variable overriding any input constraints.
This method is deprecated (not recommended to use). Use _SetProperties method_ instead. The _ForceContent method_ does not evaluate any expression. 

##### Parameters

Name | Type | Mandatory | Description
---- | ---- | --------- | -----------
`qs` | string | Yes | String representation of a dual value.<br>Set this parameter to "", if the string representation is to be Null.
`qd` | number | Yes | Numeric representation of a dual value.


_No return values._


## `GetContent`

Returns the calculated value of a variable.
This method is deprecated (not recommended to use). Use _GetProperties method_ instead. 


_No parameters._


##### Returns

Name | Type | Description
---- | ---- | -----------
`qContent` | object | Information about the calculated value.

## `GetNxProperties`

Gets the properties of a variable.
This method is deprecated (not recommended to use). Use _GetProperties method_ instead. 


_No parameters._


##### Returns

Name | Type | Description
---- | ---- | -----------
`qProperties` | object | Information about the properties of the variable.

## `GetRawContent`

Returns the raw value of a variable.
This method is deprecated (not recommended to use). Use _GetProperties method_ instead. 


_No parameters._


##### Returns

Name | Type | Description
---- | ---- | -----------
`qReturn` | string | &lt;Definition of the variable&gt;

## `SetContent`

Sets a value to a variable.
This method is deprecated (not recommended to use). Use _SetProperties method_ instead. 

##### Parameters

Name | Type | Mandatory | Description
---- | ---- | --------- | -----------
`qContent` | string | Yes | Value of the variable.
`qUpdateMRU` | boolean | Yes | If set to true, the value is added to the Most Recently Used (MRU) list.

##### Returns

Name | Type | Description
---- | ---- | -----------
`qReturn` | boolean | true/false<br><div class=note>The operation is successful if qReturn is set to true.</div>

## `SetNxProperties`

Sets some properties to a variable.
This method is deprecated (not recommended to use). Use _SetProperties method_ instead. 

##### Parameters

Name | Type | Mandatory | Description
---- | ---- | --------- | -----------
`qProperties` | object | Yes | Information about the properties of the variable


_No return values._
