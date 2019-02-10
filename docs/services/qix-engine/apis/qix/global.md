
<!-- markdownlint-disable -->
<!-- proselint-disable -->
# Global

_QIX methods for version 12.321.0._

## `AbortAll`

Sets an abort flag on all pending and ongoing requests in the current engine session.<br>- If an abort flag is set on a pending request, the request is aborted.<br>- If an abort flag is set on an ongoing request, the engine checks to see if it is possible to abort the request.


_No parameters._

_No return values._

## `AbortRequest`

Sets an abort flag on a specific request in the current engine session.<br>- If an abort flag is set on a pending request, the request is aborted.<br>- If an abort flag is set on an ongoing request, the engine checks to see if it is possible to abort the request.


**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qRequestId` | integer | Yes | Identifier of request to abort. |

_No return values._

## `AllowCreateApp`

Indicates whether or not a user is able to create an app.


_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | boolean | &lt;true or false&gt;<br>_False_ means that the user cannot create an app. |

## `CancelReload`

Cancels an ongoing reload. The reload of the app is stopped. The indexation can be canceled and _true_ is still the return value of the reload task.

Required permissions: [`reload`](https://core.qlik.com/services/qix-engine/access-control/#actions)

_No parameters._

_No return values._

## `CancelRequest`

Cancels an ongoing request. The request is stopped.


**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qRequestId` | integer | Yes | Identifier of the request to stop. |

_No return values._

## `ConfigureReload`

Configures the engine's behavior during a reload.<br>The [`ConfigureReload`](#configurereload) method should be run before the _DoReload method_. 

Required permissions: [`reload`](https://core.qlik.com/services/qix-engine/access-control/#actions)

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qCancelOnScriptError` | boolean | Yes | If set to true, the script execution is halted on error.<br>Otherwise, the engine continues the script execution.<br>This parameter is relevant only if the variable _ErrorMode_ is set to 1. |
| `qUseErrorData` | boolean | Yes | If set to true, any script execution error is returned in _qErrorData_ by the [`GetProgress`](#getprogress) method. |
| `qInteractOnError` | boolean | Yes | If set to true, the script execution is halted on error and the engine is waiting for an interaction to be performed. If the result from the interaction is 1 (_qDef.qResult_ is 1), the engine continues the script execution otherwise the execution is halted.<br>This parameter is relevant only if the variable _ErrorMode_ is set to 1 and the script is run in debug mode (_qDebug_ is set to true when calling the _DoReload method_). |

_No return values._

## `CopyApp`

Copies an app that is in the Qlik Sense repository.<br>The engine copies the app into an app entity that was previously created by the repository. See the [Qlik Sense Repository Service API](#csh-RepositoryServiceAPI-Introduction) for more information.<br>This operation is possible only in Qlik Sense Enterprise.

Required permissions: [`duplicate`](https://core.qlik.com/services/qix-engine/access-control/#actions)

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qTargetAppId` | string | Yes | Identifier (GUID) of the app entity in the Qlik Sense repository.<br>The app entity must have been previously created by the Qlik Sense Repository Service (QRS) API. |
| `qSrcAppId` | string | Yes | Identifier (GUID) of the source app in the Qlik Sense repository. |
| `qIds` | array | Yes | Array of QRS identifiers.<br>The list of all objects in the app to be copied must be given. This list must contain the GUIDs of all these objects.<br>If the list of the QRS identifiers is empty, the [`CopyApp`](#copyapp) method copies all objects to the target app.<br>Script-defined variables are automatically copied when copying an app. To be able to copy variables not created via script, the GUID of each variable must be provided in the list of QRS identifiers.<br>To get the QRS identifiers of the objects in an app, you can use the QRS API. The GET method (from the QRS API) returns the identifiers of the objects in the app.<br>The following example returns the QRS identifiers of all the objects in a specified app:<br>GET /qrs/app/9c3f8634-6191-4a34-a114-a39102058d13<br>Where<br>_9c3f8634-6191-4a34-a114-a39102058d13_ is the identifier of the app. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | _No description._ |

## `CreateApp`

Creates an app.<br><br>The operation is successful if **qSuccess** is set to true. 

Required permissions: [`create`](https://core.qlik.com/services/qix-engine/access-control/#actions)

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qAppName` | string | Yes | Name of the app. |
| `qLocalizedScriptMainSection` | string | No | Name of the first section in the script editor.<br>The default value is _Main_. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | _No description._ |
| `qAppId` | string | One of:<br>- Path and name of the app (Qlik Sense Desktop)<br>- GUID (Qlik Sense Enterprise) |

## `CreateDocEx`

Creates an app and opens an engine session.<br>This operation is possible only in Qlik Sense Desktop.

Required permissions: [`create`](https://core.qlik.com/services/qix-engine/access-control/#actions)

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qDocName` | string | Yes | Name of the app. |
| `qUserName` | string | No | Name of the user. |
| `qPassword` | string | No | Password of the user. |
| `qSerial` | string | No | Current Qlik Sense serial number. |
| `qLocalizedScriptMainSection` | string | No | Name of the first section in the script editor.<br>The default value is _Main_. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qDocId` | string | &lt;path and name of the app&gt; |
| `qReturn` | [`ObjectInterface`](./definitions.md#objectinterface) | { "qType": "Doc", "qHandle": &lt;handle of the app&gt; } |

## `CreateSessionApp`

Creates an empty session app.<br>The following applies:<br>- The name of a session app cannot be chosen. The engine automatically assigns a unique identifier to the session app.<br>- A session app is not persisted and cannot be saved. Everything created during a session app is non-persisted; for example: objects, data connections.

Required permissions: [`create`](https://core.qlik.com/services/qix-engine/access-control/#actions)

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSessionAppId` | string | &lt;Identifier of the session app&gt; |
| `qReturn` | [`ObjectInterface`](./definitions.md#objectinterface) | { "qType": "Doc", "qHandle": &lt;Handle of the session app&gt; }<br>The identifier of the session app is composed of the prefix _SessionApp__ and of a GUID. |

## `CreateSessionAppFromApp`

Creates a session app from a source app.<br>The following applies:<br>- The objects in the source app are copied into the session app but contain no data.<br>- The script of the session app can be edited and reloaded.<br>- The name of a session app cannot be chosen. The engine automatically assigns a unique identifier to the session app.<br>- A session app is not persisted and cannot be saved. Everything created during a session app is non-persisted; for example: objects, data connections.

Required permissions: [`create`](https://core.qlik.com/services/qix-engine/access-control/#actions)

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qSrcAppId` | string | Yes | App identifier of the source app.<br>It corresponds to _qAppId_ returned by the [`CreateApp`](#createapp) method when creating the source app. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSessionAppId` | string | &lt;Identifier of the session app&gt; |
| `qReturn` | [`ObjectInterface`](./definitions.md#objectinterface) | { "qType": "Doc", "qHandle": &lt;Handle of the session app&gt; }<br>The identifier of the session app is composed of the prefix _SessionApp__ and of a GUID. |

## `DeleteApp`

Deletes an app from the Qlik Sense repository or from the file system.

Required permissions: [`delete`](https://core.qlik.com/services/qix-engine/access-control/#actions)

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qAppId` | string | Yes | Identifier of the app to delete.<br>In Qlik Sense Enterprise, the identifier of the app is a GUID in the Qlik Sense repository.<br>In Qlik Sense Desktop, the identifier of the app is the name of the app, as defined in the apps folder _%userprofile%\Documents\Qlik\Sense\Apps_. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | `true` |

## `EngineVersion`

Returns the version number of the Qlik engine component.


_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qVersion` | [`NxEngineVersion`](./definitions.md#nxengineversion) | `{"qComponentVersion":"<Qlik engine component version>"}` |

## `ExportApp`

Exports an app from the Qlik Sense repository to the file system.<br>This operation is possible only in Qlik Sense Enterprise.<br><br>The operation is successful if **qSuccess** is set to true. 


**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qTargetPath` | string | Yes | Path and name of the target app. |
| `qSrcAppId` | string | Yes | Identifier of the source app. The identifier is a GUID from the Qlik Sense repository. |
| `qIds` | array | Yes | Array of identifiers.<br>The list of all the objects in the app to be exported must be given. This list must contain the GUIDs of all these objects. |
| `qNoData` | boolean | No | Set this parameter to true if the data should be omitted in the exported app. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | `true` |

## `GetActiveDoc`

Returns the handle of the current app.


_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | [`ObjectInterface`](./definitions.md#objectinterface) | { "qType": "Doc", "qHandle": &lt;handle of the app&gt; }<br>If no app is opened, an error message is returned:<br>{ "jsonrpc": "2.0", "id": 2, "error": { "code": 1007, "parameter": "No active document", "message": "App invalid" } } |

## `GetAppEntry`

Retrieves the meta data of an app.


**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qAppID` | string | Yes | Identifier of the app, as returned by the [`CreateApp`](#createapp) method.<br>One of:<br>- Path and name of the app (Qlik Sense Desktop)<br>- GUID (Qlik Sense Enterprise) |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qEntry` | [`AppEntry`](./definitions.md#appentry) | Information about the app. |

## `GetAuthenticatedUser`

Retrieves information about the authenticated user.


_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | string | UserDirectory=&lt;directory&gt;; UserId=&lt;identifier&gt; |

## `GetBNF`

!!! warning "Deprecated"
    Use the [`GetBaseBNF`](#getbasebnf) method instead

Gets the current Backus-Naur Form (BNF) grammar of the Qlik engine scripting language. The BNF rules define the syntax for the script statements and the script or chart functions.<br>In the Qlik engine BNF grammar, a token is a string of one or more characters that is significant as a group. For example, a token could be a function name, a number, a letter, a parenthesis, and so on.


**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qBnfType` | string | Yes | Returns a set of rules defining the syntax for:<br>- The script statements and the script functions if _qBnfType_ is set to S.<br>- The chart functions if _qBnfType_ is set to E.<br><br>One of:<br>- S or SCRIPT_TEXT_SCRIPT<br>- E or SCRIPT_TEXT_EXPRESSION |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qBnfDefs` | array&lt;[`BNFDef`](./definitions.md#bnfdef)> | Description of the scripting language grammar. |

## `GetBaseBNF`

Gets the current Backus-Naur Form (BNF) grammar of the Qlik engine scripting language, as well as a string hash calculated from that grammar. The BNF rules define the syntax for the script statements and the script or chart functions. If the hash changes between subsequent calls to this method, this indicates that the BNF has changed.<br>In the Qlik engine grammars, a token is a string of one or more characters that is significant as a group. For example, a token could be a function name, a number, a letter, a parenthesis, and so on.


**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qBnfType` | string | Yes | The type of grammar to return:<br>- The script statements and the script functions if _qBnfType_ is set to S.<br>- The chart functions if _qBnfType_ is set to E.<br><br>One of:<br>- S or SCRIPT_TEXT_SCRIPT<br>- E or SCRIPT_TEXT_EXPRESSION |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qBnfDefs` | array&lt;[`BNFDef`](./definitions.md#bnfdef)> | Description of the scripting language grammar. |
| `qBnfHash` | string | A string hash of the BNF definition. |

## `GetBaseBNFHash`

Gets a string hash calculated from the current Backus-Naur Form (BNF) grammar of the Qlik engine scripting language. If the hash changes between subsequent calls to this method, this indicates that the BNF grammar has changed.


**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qBnfType` | string | Yes | The type of grammar to return:<br>- The script statements and the script functions if _qBnfType_ is set to S.<br>- The chart functions if _qBnfType_ is set to E.<br><br>One of:<br>- S or SCRIPT_TEXT_SCRIPT<br>- E or SCRIPT_TEXT_EXPRESSION |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qBnfHash` | string | A string hash of the BNF definition. |

## `GetBaseBNFString`

Gets the current Backus-Naur Form (BNF) grammar of the Qlik engine scripting language, as well as a string hash calculated from that grammar. The BNF rules define the syntax for the script statements and the script or chart functions. If the hash changes between subsequent calls to this method, this indicates that the BNF has changed.<br>In the Qlik engine grammars, a token is a string of one or more characters that is significant as a group. For example, a token could be a function name, a number, a letter, a parenthesis, and so on.


**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qBnfType` | string | Yes | The type of grammar to return:<br>- S: returns the script statements and the script functions.<br>- E: returns the chart functions.<br><br>One of:<br>- S or SCRIPT_TEXT_SCRIPT<br>- E or SCRIPT_TEXT_EXPRESSION |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qBnfStr` | string | Description of the scripting language grammar. |
| `qBnfHash` | string | A string hash of the BNF definition. |

## `GetCustomConnectors`

List the custom connectors available in the system.

Required permissions: [`reload`](https://core.qlik.com/services/qix-engine/access-control/#actions)

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qReloadList` | boolean | No | Sets if the list of custom connectors should be reloaded or not.<br>If set to false, only the connectors that were returned the previous time are returned. If new connectors have been added since the last call to the [`GetCustomConnectors`](#getcustomconnectors) method was made, the new connectors are not returned.<br>If set to true, the [`GetCustomConnectors`](#getcustomconnectors) method looks for new connectors in the file system.<br>The default value is false. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qConnectors` | array&lt;[`CustomConnector`](./definitions.md#customconnector)> | List of the custom connectors. |

## `GetDatabasesFromConnectionString`

Lists the databases in a ODBC, OLEDB or CUSTOM data source.

Required permissions: [`reload`](https://core.qlik.com/services/qix-engine/access-control/#actions)

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qConnection` | [`Connection`](./definitions.md#connection) | Yes | Information about the connection. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qDatabases` | array&lt;[`Database`](./definitions.md#database)> | List of the databases in the connection. |

## `GetDefaultAppFolder`

Returns the folder where the apps are stored.<br>This method applies only if running Qlik Sense Desktop.

Required permissions: [`reload`](https://core.qlik.com/services/qix-engine/access-control/#actions)

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qPath` | string | Path of the folder where the apps are stored. |

## `GetDocList`

Returns the list of apps.<br><br>**In Qlik Sense Enterprise:**<br><br>The list is generated by the QRS. The [`GetDocList`](#getdoclist) method only returns documents the current user is allowed to access.<br><br>**In Qlik Sense Desktop:**<br><br>The apps are located in _C:\Users\&lt;user name&gt;\Documents\Qlik\Sense\Apps_.


_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qDocList` | array&lt;[`DocListEntry`](./definitions.md#doclistentry)> | List of app identifiers.<br>- In Qlik Sense Enterprise, the app identifier is a GUID.<br>- In Qlik Sense Desktop, the app identifier corresponds to the app path and name. |

## `GetFolderItemsForPath`

Returns the files and folders located at a specified path.

Required permissions: [`reload`](https://core.qlik.com/services/qix-engine/access-control/#actions)

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qPath` | string | Yes | Absolute or relative path.<br>Relative paths are relative to the default _Apps_ folder.<br><br>**In Qlik Sense Enterprise:**<br><br>The list is generated by the QRS. The [`GetDocList`](#getdoclist) method only returns documents the current user is allowed to access.<br><br>**In Qlik Sense Desktop:**<br><br>The apps are located in _C:\Users\&lt;user name&gt;\Documents\Qlik\Sense\Apps_. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qFolderItems` | array&lt;[`FolderItem`](./definitions.md#folderitem)> | Path of the folder where the apps are stored. |

## `GetFunctions`

Gets the list of all the script functions.


**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qGroup` | string | No | Name of the group.<br>Default is all groups.<br><br>One of:<br>- ALL or FUNC_GROUP_ALL<br>- U or FUNC_GROUP_UNKNOWN<br>- NONE or FUNC_GROUP_NONE<br>- AGGR or FUNC_GROUP_AGGR<br>- NUM or FUNC_GROUP_NUMERIC<br>- RNG or FUNC_GROUP_RANGE<br>- EXP or FUNC_GROUP_EXPONENTIAL_AND_LOGARITHMIC<br>- TRIG or FUNC_GROUP_TRIGONOMETRIC_AND_HYPERBOLIC<br>- FIN or FUNC_GROUP_FINANCIAL<br>- MATH or FUNC_GROUP_MATH_CONSTANT_AND_PARAM_FREE<br>- COUNT or FUNC_GROUP_COUNTER<br>- STR or FUNC_GROUP_STRING<br>- MAPP or FUNC_GROUP_MAPPING<br>- RCRD or FUNC_GROUP_INTER_RECORD<br>- CND or FUNC_GROUP_CONDITIONAL<br>- LOG or FUNC_GROUP_LOGICAL<br>- NULL or FUNC_GROUP_NULL<br>- SYS or FUNC_GROUP_SYSTEM<br>- FILE or FUNC_GROUP_FILE<br>- TBL or FUNC_GROUP_TABLE<br>- DATE or FUNC_GROUP_DATE_AND_TIME<br>- NUMI or FUNC_GROUP_NUMBER_INTERPRET<br>- FRMT or FUNC_GROUP_FORMATTING<br>- CLR or FUNC_GROUP_COLOR<br>- RNK or FUNC_GROUP_RANKING<br>- GEO or FUNC_GROUP_GEO<br>- EXT or FUNC_GROUP_EXTERNAL<br>- PROB or FUNC_GROUP_PROBABILITY<br>- ARRAY or FUNC_GROUP_ARRAY<br>- LEG or FUNC_GROUP_LEGACY |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qFunctions` | array&lt;[`Function`](./definitions.md#function)> | Name of the group<br>Default is all groups. |

## `GetInteract`

Retrieves information on the user interaction that is requested by the engine.<br>Engine can request user interactions only during script reload and when the reload is performed in debug mode ( _qDebug_ is set to true when using the _DoReload method_ ).<br>When running reload in debug mode, the engine pauses the script execution to receive data about user interaction. The engine can pause:<br>- Before executing a new script statement.<br>- When an error occurs while executing the script.<br>- When the script execution is finished.<br><br>To know if the engine is paused and waits for a response to an interaction request, the [`GetProgress`](#getprogress) method should be used. The engine waits for a response if the property _qUserInteractionWanted_ is set to true in the response of the [`GetProgress`](#getprogress) request.

Required permissions: [`reload`](https://core.qlik.com/services/qix-engine/access-control/#actions)

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qRequestId` | integer | Yes | Identifier of the request.<br>Corresponds to the identifier of the _DoReload_ request. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qDef` | [`InteractDef`](./definitions.md#interactdef) | Information to set up the user interaction.<br>Indicates which kind of interaction is wanted. |
| `qReturn` | boolean | _No description._ |

## `GetLogicalDriveStrings`

Lists the logical drives in the system.<br>This method applies only if running Qlik Sense Desktop.

Required permissions: [`reload`](https://core.qlik.com/services/qix-engine/access-control/#actions)

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qDrives` | array&lt;[`DriveInfo`](./definitions.md#driveinfo)> | List of drives. |

## `GetOdbcDsns`

Returns the list of the ODBC connectors that are installed in the system.

Required permissions: [`reload`](https://core.qlik.com/services/qix-engine/access-control/#actions)

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qOdbcDsns` | array&lt;[`OdbcDsn`](./definitions.md#odbcdsn)> | List of the ODBC connectors. |

## `GetOleDbProviders`

Returns the list of the OLEDB providers installed on the system.

Required permissions: [`reload`](https://core.qlik.com/services/qix-engine/access-control/#actions)

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qOleDbProviders` | array&lt;[`OleDbProvider`](./definitions.md#oledbprovider)> | List of the OLEDB providers. |

## `GetProgress`

Gives information about the progress of the _DoReload_ and _DoSave_ calls.<br>For more information on DoReload and DoSave, see the _DoReload Method_ and _DoSave Method_. 


**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qRequestId` | integer | Yes | Identifier of the _DoReload_ or _DoSave_ request or 0.<br>Complete information is returned if the identifier of the request is given.<br>If the identifier is 0, less information is given. Progress messages and error messages are returned but information like when the request started and finished is not returned. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qProgressData` | [`ProgressData`](./definitions.md#progressdata) | Information about the progress of the request. |

## `GetSupportedCodePages`

Lists the supported code pages.

Required permissions: [`reload`](https://core.qlik.com/services/qix-engine/access-control/#actions)

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qCodePages` | array&lt;[`CodePage`](./definitions.md#codepage)> | List of the code pages |

## `GetUniqueID`

Returns the unique identifier of the endpoint for the current user in the current app.<br>This unique identifier can be used for logging purposes.


_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qUniqueID` | string | Unique identifier of the endpoint. |

## `InteractDone`

Informs the engine that a user interaction (which was earlier requested by the engine) was performed and indicates to the engine what to do next.

Required permissions: [`reload`](https://core.qlik.com/services/qix-engine/access-control/#actions)

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qRequestId` | integer | Yes | Identifier of the request.<br>Corresponds to the identifier of the _DoReload_ request. |
| `qDef` | [`InteractDef`](./definitions.md#interactdef) | Yes | User response to the current interaction. |

_No return values._

## `IsDesktopMode`

Indicates whether the user is working in Qlik Sense Desktop.


_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | boolean | &lt;true or false&gt;<br>The engine returns **true** if the user is working with Qlik Sense Desktop. |

## `IsPersonalMode`

!!! warning "Deprecated"
    Use [`IsDesktopMode`](#isdesktopmode) method instead

Indicates whether or not the user is working in personal mode (Qlik Sense Desktop).


_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | boolean | &lt;true or false&gt;<br>The engine returns **true** if the user is working with Qlik Sense Desktop. |

## `IsValidConnectionString`

Checks if a connection string is valid.

Required permissions: [`reload`](https://core.qlik.com/services/qix-engine/access-control/#actions)

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qConnection` | [`Connection`](./definitions.md#connection) | Yes | Information about the connection. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | boolean | &lt;true or false&gt;<br>_True_ means that the connection string is correct. |

## `OSName`

Returns the name of the operating system.


_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | string | &lt;operating system name&gt; |

## `OSVersion`

Returns the version number of the operating system.


_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | string | &lt;operating system version&gt; |

## `OpenDoc`

Opens an app and checks if the app needs to be migrated (if the app is deprecated).<br>The [`OpenDoc`](#opendoc) method compares the version of the app with the version of Qlik Sense and migrates the app to the current version of Qlik Sense if necessary. Once the migration is done, the app is opened.<br>If no migration is needed, the app is opened immediately.<br>The following applies:<br>- The app version is lower than 0.95: no migration is done. Apps older than the version 0.95 are not supported.<br>- The app version is at least 0.95 and less than the Qlik Sense version: the app is migrated and then opened.<br>- Qlik Sense and the app have the same version: the app is opened, no migration is needed.<br><br>If the app is read-only, the app migration cannot occur. An error message is sent.


**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qDocName` | string | Yes | The GUID (in Qlik Sense Enterprise) or Name (in Qlik Sense Desktop) of the app to retrieve. |
| `qUserName` | string | No | Name of the user that opens the app. |
| `qPassword` | string | No | Password of the user. |
| `qSerial` | string | No | Current Qlik Sense serial number. |
| `qNoData` | boolean | No | Set this parameter to true to be able to open an app without loading its data.<br>When this parameter is set to true, the objects in the app are present but contain no data. The script can be edited and reloaded.<br>The default value is false. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | [`ObjectInterface`](./definitions.md#objectinterface) | _No description._ |

## `ProductVersion`

!!! warning "Deprecated"
    Use [`EngineVersion`](#engineversion) method instead

Returns the Qlik Sense version number.


_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | string | &lt;Qlik Sense version&gt; |

## `PublishApp`

Publishes an app to the supplied stream.

Required permissions: [`publish`](https://core.qlik.com/services/qix-engine/access-control/#actions)

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qAppId` | string | Yes | The Id of the app to publish. |
| `qName` | string | Yes | The name of the app to publish. |
| `qStreamId` | string | Yes | The stream Id of the app to publish. |

_No return values._

## `QTProduct`

Returns the Qlik product name.


_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | string | &lt;Qlik product name&gt; |

## `QvVersion`

!!! warning "Deprecated"
    Use the [`EngineVersion`](#engineversion) method instead

Returns the Qlik Sense version number.


_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | string | &lt;Qlik Sense version&gt; |

## `ReloadExtensionList`

Reloads the list of extensions.


_No parameters._

_No return values._

## `ReplaceAppFromID`

Replaces objects of a target app with the objects from a source app.<br>The list of objects in the app to be replaced must be defined in _qIds_.<br>The data model of the app cannot be updated. This operation is possible only in Qlik Sense Enterprise.<br><br>The operation is successful if **qSuccess** is set to true. 

Required permissions: [`update`](https://core.qlik.com/services/qix-engine/access-control/#actions)

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qTargetAppId` | string | Yes | Identifier (GUID) of the target app.<br>The target app is the app to be replaced. |
| `qSrcAppID` | string | Yes | Identifier (GUID) of the source app.<br>The objects in the source app will replace the objects in the target app. |
| `qIds` | array | Yes | QRS identifiers (GUID) of the objects in the target app to be replaced. Only QRS-approved GUIDs are applicable.<br>An object that is QRS-approved, is for example an object that has been published (for example, not private anymore).<br>If an object is private, it should not be included in this list.<br>If the array of identifiers contains objects that are not present in the source app, the objects related to these identifiers are removed from the target app.<br>If _qIds_ is empty, no objects are deleted in the target app. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | &lt;true or false&gt; |

## `ShutdownProcess`

Shuts down the Qlik engine.<br>This operation is possible only in Qlik Sense Desktop.


_No parameters._

_No return values._
