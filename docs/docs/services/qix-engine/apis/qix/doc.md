
<!-- markdownlint-disable -->
<!-- proselint-disable -->
# Doc

_QIX methods for version 12.181.0._

## `AbortModal`

Aborts any selection mode in an app. For more information about selection mode, see _BeginSelections method_.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qAccept` | boolean | Yes | Set this parameter to true to accept the selections before exiting the selection mode. |

_No return values._

## `AddAlternateState`

Adds an alternate state in the app.<br>You can create multiple states within a Qlik Sense app and apply these states to specific objects within the app. Objects in a given state are not affected by user selections in the other states.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qStateName` | string | Yes | Name of the alternate state. |

_No return values._

## `AddFieldFromExpression`

Adds a field on the fly.<br>The expression of a field on the fly is persisted but not its values. <br>The operation is successful if **qSuccess** is set to true. 

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qName` | string | Yes | Name of the field. |
| `qExpr` | string | Yes | Expression value.<br>It is not possible to use all aggregation functions. For example, you cannot add a field on the fly with an expression that uses the _Sum_ or _Count_ aggregation functions. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | True or False. |

## `ApplyBookmark`

Applies a bookmark.<br>The operation is successful if **qSuccess** is set to true. 

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qId` | string | Yes | Identifier of the bookmark. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | True or False. |

## `Back`

Loads the last logical operation (if any).

_No parameters._

_No return values._

## `BackCount`

Returns the number of entries on the back stack.

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | integer | &lt;Number of entries in the back stack&gt; |

## `CheckExpression`

Checks if a given expression is valid.<br>The expression is correct if the parameters _qErrorMsg_ , _qBadFieldNames_ and _qDangerousFieldNames_ are empty. 

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qExpr` | string | Yes | Expression to check. |
| `qLabels` | array | No | List of labels. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qErrorMsg` | string | Message displayed when there is a syntax error. |
| `qBadFieldNames` | array<[`NxRange`](./definitions.md#nxrange)> | A list of bad field names. |
| `qDangerousFieldNames` | array<[`NxRange`](./definitions.md#nxrange)> | A list of dangerous field names. |

## `CheckNumberOrExpression`

Checks if:<br>* A given expression is valid.<br>* A number is correct according to the locale.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qExpr` | string | Yes | Expression to check. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qErrorMsg` | string | Message displayed when there is a syntax error. |
| `qBadFieldNames` | array<[`NxRange`](./definitions.md#nxrange)> | A list of bad field names. |

## `CheckScriptSyntax`

Checks the syntax of a script.<br><br>

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qErrors` | array<[`ScriptSyntaxError`](./definitions.md#scriptsyntaxerror)> | `[]` |

## `ClearAll`

Clear selections in fields for current state. Locked fields are not cleared by default.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qLockedAlso` | boolean | No | When true, clears the selection for locked fields. |
| `qStateName` | string | No | Alternate state name. When set, applies to alternate state instead of current |

_No return values._

## `ClearUndoBuffer`

Clears entirely the undo and redo buffer.

_No parameters._

_No return values._

## `CloneBookmark`

Clones a bookmark.<br>The identifier is set by the engine.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qId` | string | Yes | Identifier of the object to clone. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qCloneId` | string | Identifier of the clone. |

## `CloneDimension`

Clones a dimension.<br><br>The identifier is set by the engine.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qId` | string | Yes | Identifier of the object to clone. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qCloneId` | string | &lt;identifier of the clone&gt; |

## `CloneMeasure`

Clones a measure.<br><br>The identifier is set by the engine.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qId` | string | Yes | Identifier of the object to clone. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qCloneId` | string | &lt;identifier of the clone&gt; |

## `CloneObject`

Clones root level objects, such as sheets and stories. The [`CloneObject`](#cloneobject) method works for both app objects and child objects.<br>When you clone an object that contains children, the children are cloned as well.<br>If you for example want to clone a visualization, you must provide the qID of the root object, in this case the sheet since [`CloneObject`](#cloneobject) clones root level objects.<br>It is not possible to clone a session object.<br><br>The identifier is set by the engine.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qId` | string | Yes | Identifier of the object to clone. The identifier must be a root object. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qCloneId` | string | &lt;identifier of the clone&gt; |

## `CommitDraft`

Commits the draft of an object that was previously created by invoking the [`CreateDraft`](#createdraft) method.<br>Committing a draft replaces the corresponding published object.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qId` | string | Yes | Identifier of the draft to commit. |

_No return values._

## `CreateBookmark`

Creates a bookmark.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qProp` | [`GenericBookmarkProperties`](./definitions.md#genericbookmarkproperties) | Yes | Properties for the object. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qInfo` | [`NxInfo`](./definitions.md#nxinfo) | Information about the bookmark. |
| `qReturn` | [`ObjectInterface`](./definitions.md#objectinterface) | Generic bookmark |

## `CreateConnection`

Creates a connection.<br>A connection indicates from which data source the data should be taken.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qConnection` | [`Connection`](./definitions.md#connection) | Yes | Information about the connection. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qConnectionId` | string | &lt;identifier of the connection&gt; |

## `CreateDimension`

Creates a master dimension.<br>A master dimension is stored in the library of an app and can be used in many objects. Several generic objects can contain the same dimension.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qProp` | [`GenericDimensionProperties`](./definitions.md#genericdimensionproperties) | Yes | Information about the properties. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qInfo` | [`NxInfo`](./definitions.md#nxinfo) | `{"qId":"<identifier of the dimension>","qType":"Dimension"}` |
| `qReturn` | [`ObjectInterface`](./definitions.md#objectinterface) | { "qType": "GenericDimension", "qHandle": &lt;handle of the dimension&gt; } |

## `CreateDraft`

Creates a draft of an object.<br>This method can be used to create a draft of a sheet or a story that is published. This is a way to continue working on a sheet or a story that is published.<br>Replace the published object by the content of the draft by invoking the [`CommitDraft`](#commitdraft) method.<br><br>The identifier is set by the engine.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qId` | string | Yes | Identifier of the object to create a draft from. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qDraftId` | string | &lt;identifier of the draft&gt; |

## `CreateMeasure`

Creates a master measure.<br>A master measure is stored in the library of an app and can be used in many objects. Several generic objects can contain the same measure.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qProp` | [`GenericMeasureProperties`](./definitions.md#genericmeasureproperties) | Yes | Information about the properties. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qInfo` | [`NxInfo`](./definitions.md#nxinfo) | `{"qId":"<identifier of the measure>","qType":"Measure"}` |
| `qReturn` | [`ObjectInterface`](./definitions.md#objectinterface) | { "qType": "GenericMeasure", "qHandle":  &lt;handle of the measure&gt; } |

## `CreateObject`

Creates a generic object at app level. For more information on generic objects, see _Generic object_.<br>It is possible to create a generic object that is linked to another object.<br>A linked object is an object that points to a linking object. The linking object is defined in the properties of the linked object (in _qExtendsId_ ).<br>The linked object has the same properties as the linking object.<br>The linking object cannot be a transient object.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qProp` | [`GenericObjectProperties`](./definitions.md#genericobjectproperties) | Yes | Information about the object. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qInfo` | [`NxInfo`](./definitions.md#nxinfo) | `{"qId":"<identifier of the new object>","qType":"<type of the new object>"}` |
| `qReturn` | [`ObjectInterface`](./definitions.md#objectinterface) | { "qType": "GenericObject", "qHandle": &lt;handle of the new object&gt; } |

## `CreateSessionObject`

Creates a transient object. For example, you can use a transient object to create an app overview or a story overview.<br>It is possible to create a transient object that is linked to another object.<br>A linked object is an object that points to a linking object. The linking object is defined in the properties of the linked object (in _qExtendsId_ ).<br>The linked object has the same properties as the linking object.<br>The linking object cannot be a transient object.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qProp` | [`GenericObjectProperties`](./definitions.md#genericobjectproperties) | Yes | Information about the object. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | [`ObjectInterface`](./definitions.md#objectinterface) | `{"qType":"GenericObject","qHandle":"<handle>"}` |

## `CreateSessionVariable`

Creates a transient variable.<br>To set some properties to the variable, use the _SetProperties method_. <br><br>

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qProp` | [`GenericVariableProperties`](./definitions.md#genericvariableproperties) | Yes | Name of the variable. Variable names are case sensitive. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | [`ObjectInterface`](./definitions.md#objectinterface) | { "qType": "GenericVariable", "qHandle":  &lt;Handle of the variable&gt; } |

## `CreateVariable`

!!! warning "Deprecated"
    Use [`Doc::CreateVariableEx`](#doc::createvariableex) method instead

Creates a variable.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qName` | string | Yes | Name of the variable. Variable names are case sensitive. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | boolean | &lt;true/false&gt;<br>The operation is successful if qReturn is set to true. |

## `CreateVariableEx`

Creates a variable.<br>To create a variable via a script, you need to use the [`SetScript`](#setscript) method. For more information, see _Create a variable_.<br>To set some properties to the variable, use the _SetProperties method_. In a published app, only transient variables can be created. See [`CreateSessionVariable`](#createsessionvariable) method. <br><br>

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qProp` | [`GenericVariableProperties`](./definitions.md#genericvariableproperties) | Yes | Name of the variable. Variable names are case sensitive and must be unique. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qInfo` | [`NxInfo`](./definitions.md#nxinfo) | Identifier and type of the object. |
| `qReturn` | [`ObjectInterface`](./definitions.md#objectinterface) | _No description._ |

## `DeleteConnection`

Deletes a connection.<br>In Qlik Sense Enterprise, there is an additional file connection named _AttachedFiles_ . The AttachedFiles connection can only be removed by the administrator of the system. 

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qConnectionId` | string | Yes | Identifier of the connection to remove. |

_No return values._

## `DestroyBookmark`

Removes a bookmark.<br>The operation is successful if **qSuccess** is set to true. 

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qId` | string | Yes | Identifier of the bookmark. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | True or False. |

## `DestroyDimension`

Removes a dimension.<br><br>The operation is successful if **qSuccess** is set to true. 

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qId` | string | Yes | Identifier of the dimension to remove. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | &lt;true or false&gt; |

## `DestroyDraft`

Removes the draft of an object.<br>The children of the draft object (if any) are removed as well.<br>This method can be used to cancel the work on the draft of an object. For example, if you had created a draft of a sheet that is published, you might not want anymore to replace the published sheet.<br><br>The operation is successful if **qSuccess** is set to true. 

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qId` | string | Yes | Identifier of the draft object to remove. |
| `qSourceId` | string | Yes | Identifier of the source object (the object from which a draft was created). |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | &lt;true or false&gt; |

## `DestroyMeasure`

Removes a generic measure.<br><br>The operation is successful if **qSuccess** is set to true. 

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qId` | string | Yes | Identifier of the measure to remove. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | &lt;true or false&gt; |

## `DestroyObject`

Removes an app object.<br>The children of the object (if any) are removed as well.<br><br>The operation is successful if **qSuccess** is set to true. 

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qId` | string | Yes | Identifier of the object to remove. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | &lt;true or false&gt; |

## `DestroySessionObject`

Removes a transient object.<br><br>The operation is successful if **qSuccess** is set to true. 

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qId` | string | Yes | Identifier of the transient object to remove. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | &lt;true, false&gt; |

## `DestroySessionVariable`

Removes a transient variable.<br><br>The operation is successful if **qSuccess** is set to true. 

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qId` | string | Yes | Identifier of the variable. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | &lt;true or false&gt; |

## `DestroyVariableById`

Removes a variable.<br>Script-defined variables cannot be removed using the [`DestroyVariableById`](#destroyvariablebyid) method or the [`DestroyVariableByName`](#destroyvariablebyname) method. For more information, see _Remove a variable_.<br><br>The operation is successful if **qSuccess** is set to true. 

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qId` | string | Yes | Identifier of the variable. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | &lt;true or false&gt; |

## `DestroyVariableByName`

Removes a variable.<br>Script-defined variables cannot be removed using the [`DestroyVariableById`](#destroyvariablebyid) method or the [`DestroyVariableByName`](#destroyvariablebyname) method. For more information, see _Remove a variable_.<br><br>The operation is successful if **qSuccess** is set to true. 

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qName` | string | Yes | Name of the variable. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | &lt;true or false&gt; |

## `DoReload`

Reloads the script that is set in an app.<br><br>

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qMode` | integer | No | Error handling mode<br>One of:<br>* 0: for default mode.<br>* 1: for ABEND; the reload of the script ends if an error occurs.<br>* 2: for ignore; the reload of the script continues even if an error is detected in the script. |
| `qPartial` | boolean | No | Set to true for partial reload.<br>The default value is false. |
| `qDebug` | boolean | No | Set to true if debug breakpoints are to be honored. The execution of the script will be in debug mode.<br>The default value is false. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | boolean | &lt;true or false&gt;<br>The operation is successful if **qReturn** is set to true. <br>If the data load has successfully finished, no matter how the indexing behaves, _true_ is returned. This happens even if there is a timeout, a memory limit is reached, or any other error occurs during the indexing. |

## `DoReloadEx`

Reloads the script that is set in an app and returns the path to the script log file.<br>A log file is created per reload.<br><br>

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qParams` | [`DoReloadExParams`](./definitions.md#doreloadexparams) | No | _No description._ |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qResult` | [`DoReloadExResult`](./definitions.md#doreloadexresult) | _No description._ |

## `DoSave`

Saves an app. All objects and data in the data model are saved.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qFileName` | string | No | Name of the file to save. |

_No return values._

## `Evaluate`

Evaluates an expression and returns the result as a string.<br><br>

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qExpression` | string | Yes | Expression to evaluate. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | string | The result of the evaluation. |

## `EvaluateEx`

Evaluates an expression and returns the result as a dual.<br><br>

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qExpression` | string | Yes | Expression to evaluate. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qValue` | [`FieldValue`](./definitions.md#fieldvalue) | The result of the evaluation as a dual. |

## `FindMatchingFields`

Retrieves any fields that belong to the same archipelago as the specified field and that match at least one of the specified tags.<br>Tags set by Qlik Sense are prefixed by the _$_ sign.  

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qFieldName` | string | Yes | Name of the field.<br>This method looks for fields that belong to the same archipelago as this specified field. |
| `qTags` | array | Yes | List of tags.<br>This method looks for fields that match at least one of the tags in this list. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qFieldNames` | array<[`NxMatchingFieldInfo`](./definitions.md#nxmatchingfieldinfo)> | List of matching fields. |

## `Forward`

Loads the next logical operation (if any).

_No parameters._

_No return values._

## `ForwardCount`

Returns the number of entries on the [`Forward`](#forward) stack.

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | integer | &lt;Number of entries in the forward stack&gt; |

## `GetAllInfos`

Returns the identifier and the type of any generic object in the app.

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qInfos` | array<[`NxInfo`](./definitions.md#nxinfo)> | Information about all generic objects in the app. |

## `GetAppLayout`

Evaluates an app.<br>Returns dynamic properties (if any) in addition to the engine (fixed) properties.<br>A data set is returned.

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qLayout` | [`NxAppLayout`](./definitions.md#nxapplayout) | A data set. |

## `GetAppProperties`

Gets the properties of an app.

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qProp` | [`NxAppProperties`](./definitions.md#nxappproperties) | Information about the properties of the app. |

## `GetAssociationScores`

Computes a set of association scores for each pair of fields between two given tables that have been loaded in an app.<br>When a table contains some synthetic keys, all fields in the synthetic key tables are analyzed against fields in other tables. To denote that a field is a synthetic key, the field name is prefixed by _[Synthetic Key]:_ .

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qTable1` | string | Yes | Name of the first table. |
| `qTable2` | string | Yes | Name of the second table. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qScore` | array<[`AssociationScore`](./definitions.md#associationscore)> | Array of computed scores. |

## `GetBookmark`

Returns the handle of a bookmark.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qId` | string | Yes | Identifier of the bookmark. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | [`ObjectInterface`](./definitions.md#objectinterface) | Generic bookmark. |

## `GetBookmarks`

_No details._

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qOptions` | [`NxGetBookmarkOptions`](./definitions.md#nxgetbookmarkoptions) | Yes | _No description._ |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qList` | array<[`NxContainerEntry`](./definitions.md#nxcontainerentry)> | _No description._ |

## `GetConnection`

Retrieves a connection and returns:<br>* The creation time of the connection.<br>* The identifier of the connection.<br>* The type of the connection.<br>* The name of the connection.<br>* The connection string.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qConnectionId` | string | Yes | Identifier of the connection. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qConnection` | [`Connection`](./definitions.md#connection) | Information about the connection. |

## `GetConnections`

Lists the connections in an app.<br>In Qlik Sense Enterprise, there is an additional file connection named _AttachedFiles_ . This connection is stored in the Qlik Sense repository. 

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qConnections` | array<[`Connection`](./definitions.md#connection)> | List of connections. |

## `GetContentLibraries`

Lists the content libraries.<br>To differentiate a global content library from an app specific content library, you can check the property _qAppSpecific_ . If this property is set to true, it means that the content library is app specific.<br>There is always one specific content library per app.<br><br>

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qList` | [`ContentLibraryList`](./definitions.md#contentlibrarylist) | List the content libraries. |

## `GetDatabaseInfo`

Gives information about an ODBC, OLEDB or CUSTOM connection. See _Outputs_ for more details.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qConnectionId` | string | Yes | Name of the connection. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qInfo` | [`DatabaseInfo`](./definitions.md#databaseinfo) | Information about the connection. |

## `GetDatabaseOwners`

Lists the owners of a database for a ODBC, OLEDB or CUSTOM connection.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qConnectionId` | string | Yes | Identifier of the connection. |
| `qDatabase` | string | No | Name of the database. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qOwners` | array<[`DatabaseOwner`](./definitions.md#databaseowner)> | List of owner names. |

## `GetDatabaseTableFields`

Lists the fields inside a table of a database for a ODBC, OLEDB or CUSTOM connection.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qConnectionId` | string | Yes | Identifier of the connection. |
| `qDatabase` | string | No | Name of the database.<br>If _qDatabase_ is not set then _qOwner_ must be set. |
| `qOwner` | string | No | Owner of the database.<br>If _qOwner_ is not set then _qDatabase_ must be set. |
| `qTable` | string | Yes | Name of the table. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qFields` | array<[`DataField`](./definitions.md#datafield)> | List of the fields. |

## `GetDatabaseTablePreview`

Retrieves the values of the specified table of a database for a ODBC, OLEDB or CUSTOM connection.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qConnectionId` | string | Yes | Identifier of the connection. |
| `qDatabase` | string | No | Name of the database.<br>If _qDatabase_ is not set then _qOwner_ must be set. |
| `qOwner` | string | No | Owner of the database.<br>If _qOwner_ is not set then _qDatabase_ must be set. |
| `qTable` | string | Yes | Name of the table. |
| `qConditions` | [`FilterInfo`](./definitions.md#filterinfo) | No | _No description._ |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qPreview` | array<[`DataRecord`](./definitions.md#datarecord)> | List the values in the table. |
| `qRowCount` | integer | _No description._ |

## `GetDatabaseTables`

Lists the tables inside a database for a ODBC, OLEDB or CUSTOM connection.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qConnectionId` | string | Yes | Identifier of the connection. |
| `qDatabase` | string | No | Name of the database.<br>If _qDatabase_ is not set then _qOwner_ must be set. |
| `qOwner` | string | No | Owner of the database.<br>If _qOwner_ is not set then _qDatabase_ must be set. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qTables` | array<[`DataTable`](./definitions.md#datatable)> | List of the tables. |

## `GetDatabases`

Lists the databases inside a ODBC, OLEDB or CUSTOM data source.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qConnectionId` | string | Yes | Identifier of the connection. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qDatabases` | array<[`Database`](./definitions.md#database)> | List of databases. |

## `GetDimension`

Returns the handle of a dimension.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qId` | string | Yes | Identifier of the dimension. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | [`ObjectInterface`](./definitions.md#objectinterface) | { "qType": "GenericDimension", "qHandle": &lt;handle of the dimension&gt; }The handle of the dimension is returned. |

## `GetEmptyScript`

Creates a script that contains one section. This section contains **SET** statements that give localized information from the regional settings of the computer.<br>The computer regional settings are retrieved when the engine starts.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qLocalizedMainSection` | string | No | Name of the script section.<br>The default value is _Main_ . |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | string | Script contents with SET statements containing localized information |

## `GetFavoriteVariables`

Retrieves the variables that are tagged as favorite.

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qNames` | array | Favorite variables to retrieve. |

## `GetField`

Returns a handle to a field.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qFieldName` | string | Yes | Name of the field. |
| `qStateName` | string | No | Name of the alternate state.<br>Default state is current selections. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | [`ObjectInterface`](./definitions.md#objectinterface) | Handle to the field |

## `GetFieldDescription`

Returns the description of a field.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qFieldName` | string | Yes | Name of the field. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | [`FieldDescription`](./definitions.md#fielddescription) | Description of the field. |

## `GetFieldOnTheFlyByName`

Find the field-on-the-fly by passing its readable name.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qReadableName` | string | Yes | Readable name of the field-on-the-fly. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qName` | string | Fields-on-the-fly expression in form of a name. |

## `GetFileTableFields`

Lists the fields of a table for a folder connection.<br><br>

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qConnectionId` | string | Yes | Identifier of the connection. |
| `qRelativePath` | string | No | Path of the connection file. |
| `qDataFormat` | [`FileDataFormat`](./definitions.md#filedataformat) | Yes | Type of the file. |
| `qTable` | string | Yes | Name of the table.<br>This parameter must be set for _XLS_ , _XLSX_ , _HTML  _ and _XML_ files. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qFields` | array<[`DataField`](./definitions.md#datafield)> | List of the tables. |
| `qFormatSpec` | string | List of format specification items, within brackets.<br>Examples of specification items:<br>* file type<br>* embedded labels, no labels<br>* table is &lt;table name&gt; |

## `GetFileTablePreview`

Lists the values in a table for a folder connection.<br><br>

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qConnectionId` | string | Yes | Identifier of the connection. |
| `qRelativePath` | string | No | Path of the connection file. |
| `qDataFormat` | [`FileDataFormat`](./definitions.md#filedataformat) | Yes | Type of the file. |
| `qTable` | string | Yes | Name of the table.<br>This parameter must be set for _XLS_ , _XLSX_ , _HTML  _ and _XML_ files. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qPreview` | array<[`DataRecord`](./definitions.md#datarecord)> | List of the tables. |
| `qFormatSpec` | string | List of format specification items, within brackets.<br>Examples of specification items:<br>* file type<br>* embedded labels, no labels<br>* table is &lt;table name&gt; |

## `GetFileTables`

Lists the tables for a folder connection.<br><br>

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qConnectionId` | string | Yes | Identifier of the connection. |
| `qRelativePath` | string | No | Path of the connection file. |
| `qDataFormat` | [`FileDataFormat`](./definitions.md#filedataformat) | Yes | Type of the file. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qTables` | array<[`DataTable`](./definitions.md#datatable)> | List of the tables. |

## `GetFileTablesEx`

Lists the tables and fields of a JSON or XML file for a folder connection.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qConnectionId` | string | Yes | Identifier of the connection. |
| `qRelativePath` | string | No | Path of the connection file. |
| `qDataFormat` | [`FileDataFormat`](./definitions.md#filedataformat) | Yes | Type of the file. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qTables` | array<[`DataTableEx`](./definitions.md#datatableex)> | List of the tables. |

## `GetFolderItemsForConnection`

Lists the items for a folder connection.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qConnectionId` | string | Yes | Identifier of the connection. |
| `qRelativePath` | string | No | Relative path of the connection. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qFolderItems` | array<[`FolderItem`](./definitions.md#folderitem)> | List of the folder items. |

## `GetIncludeFileContent`

Gets the content of a file.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | ["lib://CONNECTION_NAME\\\&lt;the name of the file you want to use&gt;.txt"]<br>OR<br>["lib://Connection_Name\\\&lt;Folder under your connection&gt;\\\&lt;the name of the file you want to use&gt;.txt"]<br>[ ] should be used when the first variable contains a lib reference. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qContent` | string | Content of the file. |

## `GetLibraryContent`

Returns the content of a library.<br><br>

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qName` | string | Yes | Name of the content library.<br>It corresponds to the property _qContentLibraryListItem/qName_ returned by the [`GetContentLibraries`](#getcontentlibraries) method. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qList` | [`StaticContentList`](./definitions.md#staticcontentlist) | List the content files in the content library. |

## `GetLineage`

Gets the lineage information of the app. The lineage information includes the LOAD and STORE statements from the data load script associated with this app.<br>An array of lineage information.

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qLineage` | array<[`LineageInfo`](./definitions.md#lineageinfo)> | Information about the lineage of the data in the app. |

## `GetLocaleInfo`

Returns locale information.

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | [`LocaleInfo`](./definitions.md#localeinfo) | Information about the locale. |

## `GetLooselyCoupledVector`

Returns a list of table states.<br><br>The following states apply:<br>* 0 The table is not loosely coupled.<br>* 1 The table is loosely coupled.<br>* 2 The table is loosely coupled and cannot be changed to another state using the Qlik Engine API.<br><br>The last three values in the vector are for internal use.<br>In case of circular references, the engine automatically sets the table state to loosely coupled to avoid creating loops.

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qv` | array | The list of table states |

## `GetMatchingFields`

Retrieves any fields that match all of the specified tags or just one of them in the data model of an app.<br>Tags set by Qlik Sense are prefixed by the _$_ sign.  

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qTags` | array | Yes | List of tags.<br>The [`GetMatchingFields`](#getmatchingfields) method looks for fields that match one or all of the tags in this list, depending on the value of _qMatchingFieldMode_ . |
| `qMatchingFieldMode` | string | No | Matching field mode.<br>The default value is MATCHINGFIELDMODE_MATCH_ALL.<br><br>One of:<br>* MATCHINGFIELDMODE_MATCH_ALL<br>* MATCHINGFIELDMODE_MATCH_ONE |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qFieldNames` | array<[`NxMatchingFieldInfo`](./definitions.md#nxmatchingfieldinfo)> | List of matching fields. |

## `GetMeasure`

Returns the handle of a measure.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qId` | string | Yes | Identifier of the measure. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | [`ObjectInterface`](./definitions.md#objectinterface) | { "qType": "GenericMeasure", "qHandle": &lt;handle of the measure&gt; }The handle of the measure is returned. |

## `GetMediaList`

!!! warning "Deprecated"
    Use [`GetLibraryContent`](#getlibrarycontent) method instead

Lists the media files.

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qList` | [`MediaList`](./definitions.md#medialist) | Information about the media files. |
| `qReturn` | boolean | Is set to true if the operation is successful. |

## `GetObject`

Returns the type of the app object and the corresponding handle.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qId` | string | Yes | Identifier of the object to retrieve. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | [`ObjectInterface`](./definitions.md#objectinterface) | { "qType": "GenericObject", "qHandle": &lt;handle&gt; } |

## `GetObjects`

_No details._

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qOptions` | [`NxGetObjectOptions`](./definitions.md#nxgetobjectoptions) | Yes | _No description._ |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qList` | array<[`NxContainerEntry`](./definitions.md#nxcontainerentry)> | _No description._ |

## `GetScript`

Gets values in script.

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qScript` | string | &lt;script values&gt; |

## `GetScriptBreakpoints`

Lists the breakpoints in the script of an app.

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qBreakpoints` | array<[`EditorBreakpoint`](./definitions.md#editorbreakpoint)> | Information about the breakpoints. |

## `GetScriptEx`

Gets script and script meta-data.

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qScript` | [`AppScript`](./definitions.md#appscript) | The script and meta data of the script. |

## `GetTableData`

Retrieves the data of a specific table.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qOffset` | integer | Yes | Position from the top, starting from 0.<br>If the offset is set to 0, the rows starting from the position/index 0 are shown. |
| `qRows` | integer | Yes | Number of rows to show. |
| `qSyntheticMode` | boolean | Yes | If this parameter is set to true, the internal data/table representation is shown. Synthetic fields are present (if any). |
| `qTableName` | string | Yes | Name of the table. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qData` | array<[`TableRow`](./definitions.md#tablerow)> | Array of data. |

## `GetTablesAndKeys`

Returns:<br>* The list of tables in an app and the fields inside each table.<br>* The list of derived fields.<br>* The list of key fields.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qWindowSize` | [`Size`](./definitions.md#size) | Yes | Size of the window that is used to display the results. |
| `qNullSize` | [`Size`](./definitions.md#size) | Yes | _No description._ |
| `qCellHeight` | integer | Yes | Height of a cell in a table in pixels. |
| `qSyntheticMode` | boolean | Yes | One of:<br>* _true_ for internal table viewer:<br>Shows a more detailed view on how the Qlik engine defines the relations between fields and the quality of the keys.<br>* _false_ for source table viewer:<br>Shows the natural relation between fields without reference to synthetic keys and resultant linking synthetic tables. Instead synthetic keys are represented by multiple connectors between tables. |
| `qIncludeSysVars` | boolean | Yes | If set to true, the system variables are included. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qtr` | array<[`TableRecord`](./definitions.md#tablerecord)> | List of tables. |
| `qk` | array<[`SourceKeyRecord`](./definitions.md#sourcekeyrecord)> | List of keys. |

## `GetTextMacros`

Fetches updated variables after a statement execution.<br><br>If qRefSeqNo and qSetSeqNo are set to 0, it means that the variables were not updated.

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qMacros` | array<[`TextMacro`](./definitions.md#textmacro)> | List of variables. |

## `GetVariable`

!!! warning "Deprecated"
    Use [`Doc::GetVariableById`](#doc::getvariablebyid) method or [`Doc::GetVariableByName`](#doc::getvariablebyname) method instead

Returns a handle to a variable.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qName` | string | Yes | Name of the variable. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | [`ObjectInterface`](./definitions.md#objectinterface) | Handle to the variable. |

## `GetVariableById`

Gets the handle of a variable.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qId` | string | Yes | Identifier of the variable. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | [`ObjectInterface`](./definitions.md#objectinterface) | { "qType": "GenericVariable", "qHandle": &lt;Handle of the variable&gt; } |

## `GetVariableByName`

Gets the handle of a variable.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qName` | string | Yes | Name of the variable. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | [`ObjectInterface`](./definitions.md#objectinterface) | { "qType": "GenericVariable", "qHandle": &lt;Handle of the variable&gt; } |

## `GetViewDlgSaveInfo`

Returns information about the position of the tables in the data model viewer.<br>The position of the broom points and the position of the connection points cannot be retrieved in Qlik Sense.<br><br>

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | [`TableViewDlgSaveInfo`](./definitions.md#tableviewdlgsaveinfo) | Information about the position of the tables. |

## `GuessFileType`

Guesses the data format for a given file.<br>Recognized file formats are:<br>* _CSV_ for Delimited<br>* _FIX_ for Fixed Record<br>* _DIF_ for Data Interchange Format<br>* _EXCEL_BIFF_ for Microsoft Excel (XLS)<br>* _EXCEL_OOXML_ for Microsoft Excel (XLSX)<br>* _HTML_ for HTML<br>* _QVD_ for QVD file<br>* _XML_ for XML<br>* _QVX_ for QVX file<br>* _JSON_ for JSON format<br>* _KML_ for KML file<br><br>

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qConnectionId` | string | Yes | Identifier of the connection file. |
| `qRelativePath` | string | No | Path of the connection file. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qDataFormat` | [`FileDataFormat`](./definitions.md#filedataformat) | Information about the format of the data. |

## `LockAll`

Locks all selections in fields for current state.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qStateName` | string | No | Alternate state name. When set, applies to alternate state instead of current. |

_No return values._

## `ModifyConnection`

Updates a connection.<br>The identifier of a connection cannot be updated. qType cannot be modified with the [`ModifyConnection`](#modifyconnection) method.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qConnectionId` | string | Yes | Identifier of the connection. |
| `qConnection` | [`Connection`](./definitions.md#connection) | Yes | Information about the connection.<br>Properties that can be updated. |
| `qOverrideCredentials` | boolean | No | Set this parameter to true to override the user name and password. |

_No return values._

## `Publish`

Publishes an app.<br>All app objects are published. Generic objects, bookmarks, dimensions and measures inside the app are published.<br>An app can only be published once and cannot be published to more than one stream.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qStreamId` | string | Yes | Identifier of the stream. |
| `qName` | string | No | Name of the published app.<br>If this parameter is not set, the engine automatically gives a new name to the published app. |

_No return values._

## `Redo`

Redoes the previous operation.<br><br>The operation is successful if **qSuccess** is set to true. 

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | &lt;true or false&gt; |

## `RemoveAlternateState`

Removes an alternate state in the app.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qStateName` | string | Yes | Name of the alternate state. |

_No return values._

## `RemoveVariable`

!!! warning "Deprecated"
    Use [`Doc::DestroyVariableById`](#doc::destroyvariablebyid) method or [`Doc::DestroyVariableByName`](#doc::destroyvariablebyname) method instead

Removes a variable.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qName` | string | Yes | Name of the variable. Variable names are case sensitive. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | boolean | &lt;true/false&gt;<br>The operation is successful if qReturn is set to true. |

## `Resume`

Resumes the app as the user left it.

_No parameters._

_No return values._

## `SaveObjects`

Saves all objects that were modified in the app.<br>Data from the data model are not saved. This operation is possible only in Qlik Sense Enterprise.

_No parameters._

_No return values._

## `Scramble`

Scrambles a field so the data is not recognizable. Some properties are retained to help debugging. For example, special characters are not changed, and small numbers are scrambled to another small number.<br>Update access is required to use the function in Qlik Sense Enterprise.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qFieldName` | string | Yes | Name of the field to scramble. |

_No return values._

## `SearchAssociations`

!!! warning "Deprecated"
    Use [`SearchResults`](#searchresults) method instead

Returns the search matches for one or more search terms.<br>The search results depend on the search context.<br>[`SearchCombinationOptions`](./definitions.md#searchcombinationoptions)<br><br>

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qOptions` | [`SearchCombinationOptions`](./definitions.md#searchcombinationoptions) | Yes | Information about the search fields and the search context. |
| `qTerms` | array | Yes | List of terms to search for. |
| `qPage` | [`SearchPage`](./definitions.md#searchpage) | Yes | Array of pages to retrieve. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qResults` | [`SearchAssociationResult`](./definitions.md#searchassociationresult) | List of the association results. |

## `SearchObjects`

Returns the generic objects corresponding to one or more search terms. The search is performed within the title, subtitle, footnote and type. In addition, associated dimension values are also searched in. For example, if the country “Japan” is selected and the object contains the dimension City, the object will appear in the results for “Osaka” but not for “Johannesburg”. The generic objects with the following types will never appear in the results: _slideitem_ , _sheet_ , _story_ , _slide_ , _masterobject_ , _snapshot_ , _LoadModel_ , _appprops_ and _searchhistory_ .

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qOptions` | [`SearchObjectOptions`](./definitions.md#searchobjectoptions) | Yes | Information about attributes. |
| `qTerms` | array | Yes | Terms to search for. |
| `qPage` | [`SearchPage`](./definitions.md#searchpage) | Yes | Array of pages to retrieve. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qResult` | [`SearchResult`](./definitions.md#searchresult) | List of search results. |

## `SearchResults`

Returns the search matches for one or more search terms.<br>Search results are organized in search groups. The type of search group indicates where the search matches come from (from data for example).<br>Each search group contains search results that correspond to a combination of search terms.<br>For example, if the search terms are _organic_ , _pasta_ , and _America_ , the possible combination of search groups are:<br>* organic<br>* pasta<br>* America<br>* organic, pasta, America<br>* organic, pasta<br>* organic, America<br>* pasta, America<br><br>For every search group, there are one or more search group items. Each subgroup item contains results that correspond to an item type (for example a field).<br>For every search group item, there are one or several search matches. The position of the match in each search result is given.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qOptions` | [`SearchCombinationOptions`](./definitions.md#searchcombinationoptions) | Yes | Information about the search combinations. |
| `qTerms` | array | Yes | Terms to search for. |
| `qPage` | [`SearchPage`](./definitions.md#searchpage) | Yes | Array of pages to retrieve. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qResult` | [`SearchResult`](./definitions.md#searchresult) | List of search results. |

## `SearchSuggest`

Returns search terms suggestions.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qOptions` | [`SearchCombinationOptions`](./definitions.md#searchcombinationoptions) | Yes | Information about the search combinations. |
| `qTerms` | array | Yes | Terms to search for. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qResult` | [`SearchSuggestionResult`](./definitions.md#searchsuggestionresult) | List of search suggestions. |

## `SelectAssociations`

Selects all search hits for a specified group.<br>The results depend on the search context.<br>[`SearchCombinationOptions`](./definitions.md#searchcombinationoptions).

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qOptions` | [`SearchCombinationOptions`](./definitions.md#searchcombinationoptions) | Yes | Information about the search fields and the search context. |
| `qTerms` | array | Yes | List of terms to search for. |
| `qMatchIx` | integer | Yes | Index (value of _qId_ ) of the search result to select. |
| `qSoftLock` | boolean | No | This parameter is deprecated and should not be set. |

_No return values._

## `SendGenericCommandToCustomConnector`

Sends a generic command to a custom connector.<br>For more information on the commands that can be sent to a custom connector, see the QVX SDK help.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qProvider` | string | Yes | Connector file name.<br>Command to be executed by the connector. |
| `qCommand` | string | Yes | One of:<br>* JsonRequest<br>* GetCustomCaption<br>* IsConnected<br>* DisableQlikViewSelectButton<br>* HaveStarField |
| `qMethod` | string | Yes | Method name to be used within the command.<br>The available methods depend on the chosen connector. |
| `qParameters` | array | Yes | Parameters of the command.<br>No parameters are required. |
| `qAppendConnection` | string | Yes | Name of the connection. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qResult` | string | Result of the command. |

## `SetAppProperties`

Sets properties to an app.<br>The qLastReloadTime, qMigrationHash and qSavedInProductVersion properties does not need to be set but if they are, they should match the current values in the app layout. 

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qProp` | [`NxAppProperties`](./definitions.md#nxappproperties) | Yes | Information about the properties of an app. |

_No return values._

## `SetFavoriteVariables`

Set some variables as favorite.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qNames` | array | Yes | Variables to set as favorite. |

_No return values._

## `SetFetchLimit`

Limits the number of rows of data to load from a data source.<br>This method works when reloading in debug mode.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qLimit` | integer | Yes | Fetch limit.<br>Number of rows to load. |

_No return values._

## `SetLooselyCoupledVector`

Sets a list of table states, one for each table.<br><br>The following states apply:<br>* 0 The table is not loosely coupled.<br>* 1 The table is loosely coupled.<br>* 2 The table is loosely coupled and cannot be changed to another state using the Qlik Engine API.<br><br>The last three values in the vector are for internal use.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qv` | array | Yes | The list of table states to set. A state will not be changed if already set to 2. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | boolean | &lt;true/false&gt;<br>The engine returns true if the vector has been updated. |

## `SetScript`

Sets values in script.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qScript` | string | Yes | Script content. |

_No return values._

## `SetScriptBreakpoints`

Set some breakpoints in the script of an app.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qBreakpoints` | [`EditorBreakpoint`](./definitions.md#editorbreakpoint) | Yes | Information about the breakpoints. |

_No return values._

## `SetViewDlgSaveInfo`

Sets the positions of the tables in the data model viewer.<br>The position of the broom points and the position of the connection points cannot be set in Qlik Sense.<br><br>

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qInfo` | [`TableViewDlgSaveInfo`](./definitions.md#tableviewdlgsaveinfo) | Yes | Information about the table. |

_No return values._

## `Undo`

Undoes the previous operation.<br><br>The operation is successful if **qSuccess** is set to true. 

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | &lt;true or false&gt; |

## `UnlockAll`

Unlocks all selections in fields for current state.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qStateName` | string | No | Alternate state name. When set, applies to alternate state instead of current. |

_No return values._
