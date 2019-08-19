
<!-- markdownlint-disable -->
<!-- proselint-disable -->
# Definitions

_QIX definitions for version 12.429.0._

## `AlfaNumString`

!!! warning "Deprecated"
    This definition is deprecated and should not be used

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qString` | string | N/A | Calculated value. |
| `qIsNum` | boolean | N/A | Is set to true if the value is a numeric. |

## `AlternateStateData`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qStateName` | string | N/A | Name of the alternate state.<br>Default is current selections: $ |
| `qFieldItems` | array&lt;[`BookmarkFieldItem`](#bookmarkfielditem)> | N/A | List of the selections. |

## `AppEntry`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qID` | string | N/A | Identifier of the app. |
| `qTitle` | string | N/A | Title of the app. |
| `qPath` | string | N/A | Path of the app. |
| `qLastReloadTime` | string | N/A | Last reload time of the app. |
| `qReadOnly` | boolean | N/A | Is set to true if the app is read-only. |
| `qMeta` | [`NxMeta`](#nxmeta) | N/A | Meta data. |
| `qThumbnail` | [`StaticContentUrl`](#staticcontenturl) | N/A | App thumbnail. |
| `qFileSize` | integer | N/A | _No description._ |
| `qHasSectionAccess` | boolean | N/A | If true the app has section access configured. |

## `AppObjectList`

Lists the app objects. Is the layout for [`AppObjectListDef`](#appobjectlistdef).<br>An app object is a generic object created at app level.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qItems` | array&lt;[`NxContainerEntry`](#nxcontainerentry)> | N/A | Information about the list of dimensions. |

## `AppObjectListDef`

Defines the list of objects in an app.<br>An app object is a generic object created at app level.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qType` | string | N/A | Type of the app list. |
| `qData` | [`JsonObject`](#jsonobject) | N/A | Data that you want to include in the app list definition.<br>You need to enter the paths to the information you want to retrieve. |

## `AppScript`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qScript` | string | N/A | Script text. |
| `qMeta` | [`NxMeta`](#nxmeta) | N/A | Information about publishing and permissions.<br>This parameter is optional. |


## `AssociationScore`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qFieldPairName` | string | N/A | Pair of fields.<br>_&lt; FieldName1&gt;_ / _&lt; FieldName2&gt;_<br>Where:<br>&lt; _FieldName1_ &gt; is a field in the table 1 (defined in _qTable1_ )<br>&lt; _FieldName2_ &gt; is a field in the table 2 (defined in _qTable2_ )<br>If the field is a synthetic key, the name of the field is preceded by _[Synthetic key]:_ . |
| `qScoreSummary` | integer | N/A | Flag used to interpret calculated scores.<br>One of the following values or sum of values that apply:<br>- 0: The cardinal ratio cannot be zero but the symbol score and the row score can be zero.<br>- -1: The fields do not have the same type.<br>- -2: The number of rows of the field _FieldName1_ is zero.<br>- -4: The number of distinct values of the field _FieldName1_ is zero.<br>- -8: The number of rows of the field _FieldName2_ is zero.<br>- -16: The number of distinct values of the field _FieldName2_ is zero.<br><br>Example:<br>The number of rows of the field _FieldName1_ is zero, and the number of distinct values of the field _FieldName2_ is zero, then _qScoreSummary_ is -18. |
| `qField1Scores` | [`FieldScores`](#fieldscores) | N/A | Association information about the field _FieldName1_ defined in _qFieldPairName_ . |
| `qField2Scores` | [`FieldScores`](#fieldscores) | N/A | Association information about the field _FieldName2_ defined in _qFieldPairName_ . |

## `BNFDef`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qBnf` | array&lt;integer> | N/A | Array of token references that all together build up the definition of the current token.<br>Generally, if the array is not empty, the definition is a BNF rule (_qIsBnfRule_ is set to true). However, some BNF  rules do have an empty array (_qIsBnfRule_ is set to true, but _qBnf_ is empty). |
| `qNbr` | integer | N/A | Number of the current token definition. |
| `qPNbr` | integer | N/A | Number of the parent rule definition. |
| `qHelpId` | integer | N/A | Reference identifier to a function described in the documentation. The identifier is stored in the definition of the token containing the function name.<br>Is not used in Qlik Sense. |
| `qName` | string | N/A | Token name.<br>One of:<br>- A rule name<br>- An identifier<br>- A literal value |
| `qStr` | string | N/A | Literal string of the token.<br>Examples: 'Round' and '('. |
| `qIsBnfRule` | boolean | N/A | If set to true, a list of related rule tokens is assigned to _qBnf_ .<br>This parameter is optional. The default value is false. |
| `qScriptStatement` | boolean | N/A | If set to true, the definition specifies a script statement.<br>This parameter is optional. The default value is false. |
| `qControlStatement` | boolean | N/A | If set to true, the definition specifies a control statement.<br>This parameter is optional. The default value is false. |
| `qBnfLiteral` | boolean | N/A | If set to true, the definition specifies a literal token.<br>This parameter is optional. The default value is false. |
| `qQvFunc` | boolean | N/A | If set to true, the definition is related to a Qlik Sense function. It cannot be an aggregation function.<br>This parameter is optional. The default value is false. |
| `qAggrFunc` | boolean | N/A | If set to true, the definition is related to an aggregation function.<br>This parameter is optional. The default value is false. |
| `qFG` | string | N/A | Group of the function.<br><br>One of:<br>- ALL or FUNC_GROUP_ALL<br>- U or FUNC_GROUP_UNKNOWN<br>- NONE or FUNC_GROUP_NONE<br>- AGGR or FUNC_GROUP_AGGR<br>- NUM or FUNC_GROUP_NUMERIC<br>- RNG or FUNC_GROUP_RANGE<br>- EXP or FUNC_GROUP_EXPONENTIAL_AND_LOGARITHMIC<br>- TRIG or FUNC_GROUP_TRIGONOMETRIC_AND_HYPERBOLIC<br>- FIN or FUNC_GROUP_FINANCIAL<br>- MATH or FUNC_GROUP_MATH_CONSTANT_AND_PARAM_FREE<br>- COUNT or FUNC_GROUP_COUNTER<br>- STR or FUNC_GROUP_STRING<br>- MAPP or FUNC_GROUP_MAPPING<br>- RCRD or FUNC_GROUP_INTER_RECORD<br>- CND or FUNC_GROUP_CONDITIONAL<br>- LOG or FUNC_GROUP_LOGICAL<br>- NULL or FUNC_GROUP_NULL<br>- SYS or FUNC_GROUP_SYSTEM<br>- FILE or FUNC_GROUP_FILE<br>- TBL or FUNC_GROUP_TABLE<br>- DATE or FUNC_GROUP_DATE_AND_TIME<br>- NUMI or FUNC_GROUP_NUMBER_INTERPRET<br>- FRMT or FUNC_GROUP_FORMATTING<br>- CLR or FUNC_GROUP_COLOR<br>- RNK or FUNC_GROUP_RANKING<br>- GEO or FUNC_GROUP_GEO<br>- EXT or FUNC_GROUP_EXTERNAL<br>- PROB or FUNC_GROUP_PROBABILITY<br>- ARRAY or FUNC_GROUP_ARRAY<br>- LEG or FUNC_GROUP_LEGACY |
| `qFieldFlag` | boolean | N/A | If set to true, the definition is related to a field.<br>This parameter is optional. The default value is false. |
| `qMT` | string | N/A | Type of the data.<br><br>One of:<br>- N or NOT_META<br>- D or META_DOC_NAME<br>- R or META_RET_TYPE<br>- V or META_DEFAULT_VALUE |
| `qDepr` | boolean | N/A | Indicates whether a script statement, a chart or a script function is deprecated (not recommended for use).<br>If set to true, the script statement or the function is not recommended for use in Qlik Sense.<br>This parameter is optional. The default value is false. |
| `qFGList` | undefined | N/A | List of groups the function belongs to. |

## `BookmarkFieldItem`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qDef` | [`FieldDefEx`](#fielddefex) | N/A | Name and type of the field. |
| `qLocked` | boolean | N/A | Indicates if the field is locked.<br>Default is false. |
| `qSelectInfo` | [`SelectInfo`](#selectinfo) | N/A | Information on the selections criteria. |
| `qValues` | array&lt;[`FieldValue`](#fieldvalue)> | N/A | _No description._ |
| `qExcludedValues` | array&lt;[`FieldValue`](#fieldvalue)> | N/A | List of excluded values.<br>Either the list of selected values or the list of excluded values is displayed. |
| `qAndMode` | boolean | N/A | If set to true, selections within a list object are made in AND mode; If you have a list object that lists all customers, by selecting Customer 1 and Customer 2 while in and-mode, all records that are associated with Customer 1 **and** Customer 2 are selected.<br>The default value is false; selections within a list object are made in OR mode. If you have a list object that lists all customers, by selecting Customer 1 and Customer 2 while in or-mode, all records that are associated with either Customer 1 **or** Customer 2 are selected.<br>This parameter is not returned if set to false. |
| `qOneAndOnlyOne` | boolean | N/A | If set to true, the field has always one selection (not 0 and not more than 1). If another value is selected, the previous one is unselected.<br>The default value is false. This parameter is not returned if set to false. |

## `BookmarkFieldPage`

Defines the range of the bookmark fields that are returned.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qStartIndex` | integer | N/A | The start value of the range. |
| `qEndIndex` | integer | N/A | The end value of the range. |

## `BookmarkList`

Lists the bookmarks. Is the layout for [`BookmarkListDef`](#bookmarklistdef).

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qItems` | array&lt;[`NxContainerEntry`](#nxcontainerentry)> | N/A | Information about the list of bookmarks. |

## `BookmarkListDef`

Defines the list of bookmarks.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qType` | string | N/A | Type of the list. |
| `qData` | [`JsonObject`](#jsonobject) | N/A | Data |

## `BookmarkVariableItem`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qName` | string | N/A | Name of the variable. |
| `qValue` | [`FieldValue`](#fieldvalue) | N/A | Value of the variable. |

## `CalendarStrings`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qDayNames` | array&lt;string> | N/A | List of short day names. |
| `qMonthNames` | array&lt;string> | N/A | List of short month names. |
| `qLongDayNames` | array&lt;string> | N/A | List of long day names. |
| `qLongMonthNames` | array&lt;string> | N/A | List of long month names. |

## `CharRange`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qCharPos` | integer | N/A | Position of the first search occurrence. |
| `qCharCount` | integer | N/A | Number of occurrences found. |

## `ChildList`

Lists the children of a generic object. Is the layout for [`ChildListDef`](#childlistdef).<br>ChildList is used by the _GetLayout Method_ to list the children of a generic object. 

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qItems` | array&lt;[`NxContainerEntry`](#nxcontainerentry)> | N/A | Information about the items in the app object. |

## `ChildListDef`

Defines the list of children of a generic object.<br>What is defined in [`ChildListDef`](#childlistdef) has an impact on what the _GetLayout_ method returns. See _Example_ for more information.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qData` | [`JsonObject`](#jsonobject) | N/A | Data that you want to include in the child list definition.<br>You need to enter the paths to the information you want to retrieve. |

## `CodePage`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qNumber` | integer | N/A | Number of the code page. |
| `qName` | string | N/A | Name of the code page. |
| `qDescription` | string | N/A | Description of the code page. |

## `Connection`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qId` | string | N/A | Identifier of the connection.<br>Is generated by the engine and is unique. |
| `qName` | string | N/A | Name of the connection.<br>This parameter is mandatory and must be set when creating or modifying a connection. |
| `qConnectionString` | string | N/A | One of:<br>- ODBC CONNECT TO [&lt;provider name&gt;]<br>- OLEDB CONNECT TO [&lt;provider name&gt;]<br>- CUSTOM CONNECT TO [&lt;provider name&gt;]<br>- "&lt;local absolute or relative path, UNC path&gt;"<br>- "&lt;URL&gt;"<br><br>Connection string.<br>This parameter is mandatory and must be set when creating or modifying a connection. |
| `qType` | string | N/A | One of:<br>- ODBC<br>- OLEDB<br>- &lt;Name of the custom connection file&gt;<br>- folder<br>- internet<br><br>Type of the connection.<br>This parameter is mandatory and must be set when creating or modifying a connection.<br>For ODBC, OLEDB and custom connections, the engine checks that the connection type matches the connection string.<br>The type is not case sensitive. |
| `qUserName` | string | N/A | Name of the user who creates the connection.<br>This parameter is optional; it is only used for OLEDB, ODBC and CUSTOM connections.<br>A call to _GetConnection Method_ does not return the user name. |
| `qPassword` | string | N/A | Password of the user who creates the connection.<br>This parameter is optional; it is only used for OLEDB, ODBC and CUSTOM connections.<br>A call to _GetConnection Method_ does not return the password. |
| `qModifiedDate` | string | N/A | Is generated by the engine.<br>Creation date of the connection or last modification date of the connection. |
| `qMeta` | [`NxMeta`](#nxmeta) | N/A | Information about the connection. |
| `qLogOn` | string | N/A | Select which user credentials to use to connect to the source.<br>- LOG_ON_SERVICE_USER: Disables<br>- LOG_ON_CURRENT_USER: Enables<br><br>One of:<br>- LOG_ON_SERVICE_USER<br>- LOG_ON_CURRENT_USER |

## `ContentLibraryList`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qItems` | array&lt;[`ContentLibraryListItem`](#contentlibrarylistitem)> | N/A | Information about the content library. |

## `ContentLibraryListItem`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qName` | string | N/A | Name of the library. |
| `qAppSpecific` | boolean | N/A | Is set to true if the library is specific to the app (not a global content library). |
| `qMeta` | [`NxMeta`](#nxmeta) | N/A | Information about publishing and permissions. |

## `CustomConnector`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qProvider` | string | N/A | Name of the custom connector file. |
| `qParent` | string | N/A | Name of the parent folder that contains the custom connector file. |
| `qDisplayName` | string | N/A | Name of the custom connector as displayed in the Qlik interface. |
| `qMachineMode` | string | N/A | Mode of the machine (64 or 32 bits).<br><br>One of:<br>- CONNECT_DEFAULT<br>- CONNECT_64<br>- CONNECT_32 |
| `qSupportFileStreaming` | boolean | N/A | _No description._ |

## `DataField`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qName` | string | N/A | Name of the field. |
| `qIsKey` | boolean | N/A | Is set to true if the field is a primary key. |
| `qOriginalFieldName` | string | N/A | Is shown for fixed records.<br>_qOriginalFieldName_ and _qName_ are identical if no field names are used in the file.<br>_qOriginalFieldName_ differs from _qName_ if embedded file names are used in the file. |

## `DataRecord`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qValues` | array&lt;string> | N/A | List of values inside the table.<br>The first values (in _result/qPreview/0/qValues_ ) correspond to the field names in the table.<br>The following values (from _result/qPreview/1/qValues_ ) are the values of the fields in the table. |

## `DataTable`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qName` | string | N/A | Name of the table. |
| `qType` | string | N/A | Type of the table.<br>For example: Table or View. |

## `DataTableEx`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qName` | string | N/A | Name of the table. |
| `qFields` | array&lt;[`DataField`](#datafield)> | N/A | List of the fields in the table. |
| `qFormatSpec` | string | N/A | List of format specification items, within brackets.<br>Examples of specification items:<br>- file type<br>- embedded labels, no labels<br>- table is &lt;table name&gt; |

## `Database`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qName` | string | N/A | Name of the database. |
| `qIsDefault` | boolean | N/A | Is set to true if the database is set by default. |

## `DatabaseInfo`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qDBMSName` | string | N/A | Name of the product accessed by the provider. |
| `qDBUsage` | boolean | N/A | If set to true, it means that the data source contains some databases. |
| `qOwnerUsage` | boolean | N/A | If set to true, it means that the data source contains some owners. |
| `qDBSeparator` | string | N/A | Character string used after the database name.<br>Example with separator " **.** ":<br>FROM LinkedTablesData.dbo.Months<br>Where:<br>- **LinkedTablesData** is the database name<br>- **dbo** is the owner name<br>- **Months** is the table name |
| `qOwnerSeparator` | string | N/A | Character string used after the owner name.<br>Example with separator " **.** ":<br>FROM LinkedTablesData.dbo.Months<br>Where:<br>- **LinkedTablesData** is the database name<br>- **dbo** is the owner name<br>- **Months** is the table name |
| `qDBFirst` | boolean | N/A | If set to true, it means that the database is displayed first, before the owners and tables. |
| `qQuotePreffix` | string | N/A | Prefix used with field, database or owner names that contain special characters or keywords. |
| `qQuoteSuffix` | string | N/A | Suffix used with field, database or owner names that contain special characters or keywords. |
| `qSpecialChars` | string | N/A | List of the special characters. |
| `qDefaultDatabase` | string | N/A | Name of the default database. |
| `qKeywords` | array&lt;string> | N/A | List of the script keywords. |

## `DatabaseOwner`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qName` | string | N/A | Name of the owner. |

## `DelimiterInfo`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qName` | string | N/A | Name of the delimiter.<br>Example:<br>"Tab_DELIMITER" |
| `qScriptCode` | string | N/A | Representation of the delimiter value that is used in the script.<br>Example:<br>"'\t'" |
| `qNumber` | integer | N/A | Delimiter character number used by the engine to determine how to separate the values. |
| `qIsMultiple` | boolean | N/A | Is set to true if multiple spaces are used to separate the values. |

## `DerivedFieldsInTableData`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qDefinitionName` | string | N/A | Name of the derived definition. |
| `qTags` | array&lt;string> | N/A | List of tags. |
| `qActive` | boolean | N/A | Is set to true is the derived field is in use. |

## `DimensionList`

Lists the dimensions. Is the layout for [`DimensionListDef`](#dimensionlistdef).

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qItems` | array&lt;[`NxContainerEntry`](#nxcontainerentry)> | N/A | Information about the list of dimensions. |

## `DimensionListDef`

Defines the lists of dimensions.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qType` | string | N/A | Type of the list. |
| `qData` | [`JsonObject`](#jsonobject) | N/A | Data |

## `DoReloadExParams`

Parameters for a reload.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qMode` | integer | N/A | 0: for default mode.<br>1: for ABEND; the reload of the script ends if an error occurs.<br>2: for ignore; the reload of the script continues even if an error is detected in the script. |
| `qPartial` | boolean | N/A | Set to true for partial reload.<br>The default value is false. |
| `qDebug` | boolean | N/A | Set to true to debug reload.<br>The default value is false. |
| `qReloadId` | string | N/A | Optional reload ID.<br>ID will be automatically generated if not set. |

## `DoReloadExResult`

The result and path to script log for a reload.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qSuccess` | boolean | N/A | The reload is successful if True. |
| `qScriptLogFile` | string | N/A | Path to the script log file. |

## `DocListEntry`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qDocName` | string | N/A | Name of the app. |
| `qConnectedUsers` | integer | N/A | Not used. |
| `qFileTime` | number | N/A | Last modified time stamp of the app.<br>This property is used only with Qlik Sense Desktop.<br>It is set to 0 for Qlik Sense Enterprise. |
| `qFileSize` | number | N/A | Size of remote app.<br>This property is used only with Qlik Sense Desktop.<br>It is set to 0 for Qlik Sense Enterprise. |
| `qDocId` | string | N/A | Identifier of the app.<br>- In Qlik Sense Desktop, the identifier is the path and name of the app.<br>- In Qlik Sense Enterprise, the identifier is the app's GUID. |
| `qMeta` | [`NxMeta`](#nxmeta) | N/A | Meta data related to the app. |
| `qLastReloadTime` | string | N/A | Last reload time of the app. |
| `qReadOnly` | boolean | N/A | If set to true, the app is read-only. |
| `qTitle` | string | N/A | Title of the app. |
| `qThumbnail` | [`StaticContentUrl`](#staticcontenturl) | N/A | Thumbnail of the app. |
| `qHasSectionAccess` | boolean | N/A | If true the app has section access configured. |

## `DriveInfo`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qDrive` | string | N/A | Value of the drive.<br>Examples:<br>C:\\\, E:\\\ |
| `qType` | string | N/A | Type of the drive.<br>_Fixed_ means physical drive. |
| `qName` | string | N/A | Name of the drive. |
| `qTypeIdentifier` | string | N/A | Information about the drive type.<br><br>One of:<br>- REMOVABLE<br>- FIXED<br>- NETWORK<br>- CD_ROM<br>- RAM<br>- UNKNOWN_TYPE |
| `qUnnamedDrive` | boolean | N/A | _No description._ |

## `EditorBreakpoint`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qbufferName` | string | N/A | Name of the breakpoint. |
| `qlineIx` | integer | N/A | Line number in the script where the breakpoint is set. |
| `qEnabled` | boolean | N/A | If set to true then the breakpoint is enabled (in use). |



## `ErrorData`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qErrorString` | string | N/A | Detailed information about the error message. |
| `qLineEnd` | string | N/A | Line termination characters. |
| `qLine` | string | N/A | Script statement where the error occurs. |
| `qErrorDataCode` | string | N/A | Type of the error messages.<br><br>One of:<br>- EDC_ERROR<br>- EDC_WARNING<br>- EDC_CIRCULAR_REFERENCE |
| `qMessage` | [`ProgressMessage`](#progressmessage) | N/A | _No description._ |

## `ExtensionList`

Obsolete, use qrs API's to fetch extensions.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qItems` | array&lt;string> | N/A | _No description._ |


## `FieldAttributes`

Sets the formatting of a field.<br>The properties of _qFieldAttributes_ and the formatting mechanism are described below.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qType` | string | UNKNOWN | Type of the field.<br>Default is U.<br><br>One of:<br>- U or UNKNOWN<br>- A or ASCII<br>- I or INTEGER<br>- R or REAL<br>- F or FIX<br>- M or MONEY<br>- D or DATE<br>- T or TIME<br>- TS or TIMESTAMP<br>- IV or INTERVAL |
| `qnDec` | integer | 10 | Number of decimals.<br>Default is 10. |
| `qUseThou` | integer | N/A | Defines whether or not a thousands separator must be used.<br>Default is 0. |
| `qFmt` | string | N/A | Defines the format pattern that applies to _qText_ .<br>Is used in connection to the type of the field (parameter **qType** ).<br>For more information, see _Formatting mechanism_.<br>Example: _YYYY-MM-DD_ for a date. |
| `qDec` | string | N/A | Defines the decimal separator.<br>Example: **.** |
| `qThou` | string | N/A | Defines the thousand separator (if any).<br>Is used if **qUseThou** is set to 1.<br>Example: **,** |

## `FieldDefEx`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qName` | string | N/A | Name of the field. |
| `qType` | string | N/A | Type of data entity.<br><br>One of:<br>- NOT_PRESENT<br>- PRESENT<br>- IS_CYCLIC_GROUP<br>- IS_DRILL_GROUP<br>- IS_VAR<br>- IS_EXPR<br>- IS_IMPLICIT<br>- IS_DETAIL |

## `FieldDescription`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qInternalNumber` | integer | N/A | Internal number of the field. |
| `qName` | string | N/A | Name of the field. |
| `qSrcTables` | array&lt;string> | N/A | List of table names. |
| `qIsSystem` | boolean | N/A | If set to true, it means that the field is a system field.<br>The default value is false. |
| `qIsHidden` | boolean | N/A | If set to true, it means that the field is hidden.<br>The default value is false. |
| `qIsSemantic` | boolean | N/A | If set to true, it means that the field is a semantic.<br>The default value is false. |
| `qDistinctOnly` | boolean | N/A | If set to true, only distinct field values are shown.<br>The default value is false. |
| `qCardinal` | integer | N/A | Number of distinct field values. |
| `qTotalCount` | integer | N/A | Total number of field values. |
| `qPossibleCount_OBSOLETE` | integer | N/A | _No description._ |
| `qHasInfo_OBSOLETE` | boolean | N/A | _No description._ |
| `qIsLocked` | boolean | N/A | If set to true, it means that the field is locked.<br>The default value is false. |
| `qAlwaysOneSelected` | boolean | N/A | If set to true, it means that the field has one and only one selection (not 0 and not more than 1).<br>If this property is set to true, the field cannot be cleared anymore and no more selections can be performed in that field.<br>The default value is false. |
| `qAndMode` | boolean | N/A | If set to true a logical AND (instead of a logical OR) is used when making selections in a field.<br>The default value is false. |
| `qIsNumeric` | boolean | N/A | Is set to true if the value is a numeric.<br>The default value is false. |
| `qComment` | string | N/A | Field comment. |
| `qTags` | array&lt;string> | N/A | Gives information on a field. For example, it can return the type of the field.<br>Examples: key, text, ASCII. |
| `qIsDefinitionOnly` | boolean | N/A | If set to true, it means that the field is a field on the fly.<br>The default value is false. |
| `qByteSize` | integer | N/A | Static RAM memory used in bytes. |

## `FieldInTableData`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qName` | string | N/A | Name of the field. |
| `qOriginalFields` | array&lt;string> | N/A | Is shown for fixed records.<br>_qOriginalFieldName_ and _qName_ are identical if no field names are used in the file.<br>_qOriginalFieldName_ differs from _qName_ if embedded file names are used in the file. |
| `qPresent` | boolean | N/A | _No description._ |
| `qHasNull` | boolean | N/A | This property is set to true if the field contains some Null values. |
| `qHasWild` | boolean | N/A | _No description._ |
| `qHasDuplicates` | boolean | N/A | This property is set to true if the field contains some duplicate values. |
| `qIsSynthetic` | boolean | N/A | This property is set to true if the field contains a synthetic key. |
| `qInformationDensity` | number | N/A | Number of records that have values (for example, not NULL) in the field as compared to the total number of records in the table. |
| `qnNonNulls` | integer | N/A | Number of values that are non Null. |
| `qnRows` | integer | N/A | Number of rows in the field. |
| `qSubsetRatio` | number | N/A | Number of distinct values in the field (in the current table) as compared to the total number of distinct values of this field (in all tables). |
| `qnTotalDistinctValues` | integer | N/A | Number of distinct values in the field. |
| `qnPresentDistinctValues` | integer | N/A | _No description._ |
| `qKeyType` | string | N/A | Tells if the field is a key field.<br><br>One of:<br>- NOT_KEY<br>- ANY_KEY<br>- PRIMARY_KEY<br>- PERFECT_KEY |
| `qComment` | string | N/A | Comment related to the field. |
| `qTags` | array&lt;string> | N/A | List of tags related to the field. |
| `qDerivedFields` | array&lt;[`DerivedFieldsInTableData`](#derivedfieldsintabledata)> | N/A | List of the derived fields. |
| `qIsFieldOnTheFly` | boolean | N/A | _No description._ |
| `qReadableName` | string | N/A | _No description._ |

## `FieldList`

Lists the fields present in the data model viewer. Is the layout for [`FieldListDef`](#fieldlistdef).

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qItems` | array&lt;[`NxFieldDescription`](#nxfielddescription)> | N/A | Array of items. |

## `FieldListDef`

Defines the fields to show.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qShowSystem` | boolean | N/A | Shows the system tables if set to true.<br>Default is false. |
| `qShowHidden` | boolean | N/A | Shows the hidden fields if set to true.<br>Default is false. |
| `qShowSemantic` | boolean | N/A | Show the semantic fields if set to true.<br>Default is false. |
| `qShowSrcTables` | boolean | N/A | Shows the tables and fields present in the data model viewer if set to true.<br>Default is false. |
| `qShowDefinitionOnly` | boolean | N/A | Shows the fields defined on the fly if set to true.<br>Default is false. |
| `qShowDerivedFields` | boolean | N/A | Shows the fields and derived fields if set to true.<br>Default is false. |
| `qShowImplicit` | boolean | N/A | Shows the Direct Discovery measure fields if set to true.<br>Default is false. |

## `FieldOrColumn`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qFieldName` | string | N/A | Name of the field or column to be matched. |
| `qTableName` | string | N/A | Name of the table to be matched on. This parameter is optional. If TableName is set, FieldName represent the Table column with that name. If TableName is not set, FieldName represents the the field with that name. |

## `FieldScores`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qFieldName` | string | N/A | Field name.<br>One of the field names defined in _qFieldPairName._ |
| `qReadableName` | string | N/A | _No description._ |
| `qCardinalRatio` | number | N/A | Cardinality of a column/field divided by the number of rows in the table.<br>If the cardinal ratio is 1, it means that the column is a candidate/primary key. |
| `qSymbolScore` | number | N/A | Number of distinct matches between the two fields defined in _qFieldPairName_ divided by the number of distinct values in the field _qFieldName_ .<br>If 0, it means that there are no common values between the two fields defined in _qFieldPairName_ . |
| `qRowScore` | number | N/A | Number of matches between the two fields defined in _qFieldPairName_ divided by the number of values in the field _qFieldName_ .<br>If 0, it means that there are no common values between the two fields defined in _qFieldPairName_ . |

## `FieldValue`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qText` | string | N/A | Text related to the field value.<br>This parameter is optional. |
| `qIsNumeric` | boolean | N/A | Is set to true if the value is a numeric.<br>This parameter is optional. Default is false. |
| `qNumber` | number | N/A | Numeric value of the field.<br>This parameter is displayed if _qIsNumeric_ is set to true.<br>This parameter is optional. |

## `FileDataFormat`



| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qType` | string | N/A | Type of the file.<br><br>One of:<br>- CSV or FILE_TYPE_CSV<br>- FIX or FILE_TYPE_FIX<br>- DIF or FILE_TYPE_DIF<br>- EXCEL_BIFF or FILE_TYPE_EXCEL_BIFF<br>- EXCEL_OOXML or FILE_TYPE_EXCEL_OOXML<br>- HTML or FILE_TYPE_HTML<br>- QVD or FILE_TYPE_QVD<br>- XML or FILE_TYPE_XML<br>- QVX or FILE_TYPE_QVX<br>- JSON or FILE_TYPE_JSON<br>- KML or FILE_TYPE_KML |
| `qLabel` | string | N/A | One of:<br>- Embedded labels (field names are present in the file)<br>- No labels<br>- Explicit labels (for DIFfiles) |
| `qQuote` | string | N/A | One of:<br>- None (no quotes)<br>- MSQ (Modern Style Quoting)<br>- Standard (quotes " " or ' ' can be used, but only if they are the first and last non blank characters of a field value)<br><br>This property is used for delimited files. |
| `qComment` | string | N/A | String that marks the beginning of the comment line.<br>Example: “#” or “//”<br>The engine ignores the commented lines during the data load.<br>This property is only used for delimited files. |
| `qDelimiter` | [`DelimiterInfo`](#delimiterinfo) | N/A | Information about the delimiter.<br>This property is used for delimited files. |
| `qCodePage` | integer | N/A | Character set used in the file. |
| `qHeaderSize` | integer | N/A | Size of the header.<br>Example: If the header size is 2, the first two rows in the file are considered as header and not as data. The header can contain the field names. |
| `qRecordSize` | integer | N/A | Record length.<br>Each record (row of data) contains a number of columns with a fixed field size.<br>This property is used for fixed record data files. |
| `qTabSize` | integer | N/A | Number of spaces that one tab character represents in the table file.<br>This property is used for fixed record data files. |
| `qIgnoreEOF` | boolean | N/A | Is set to true, the end-of-file character is not taken into account during reload.<br>This property is used for delimited files and fixed record data files. |
| `qFixedWidthDelimiters` | string | N/A | Positions of the field breaks in the table.<br>This property is used for fixed record data files. |

## `FilterInfo`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qType` | string | N/A | One of:<br>- NONE or FILTER_TYPE_NONE<br>- RAW or FILTER_TYPE_RAW |
| `qWherePredicate` | string | N/A | _No description._ |

## `FolderItem`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qName` | string | N/A | Name of the folder item. |
| `qType` | string | N/A | Type of the folder item.<br><br>One of:<br>- FOLDER or FOLDER_ITEM_FOLDER<br>- FILE or FOLDER_ITEM_FILE<br>- OTHER or FOLDER_ITEM_OTHER |

## `Function`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qName` | string | N/A | Name of the script function. |
| `qGroup` | string | N/A | Group of the script function.<br><br>One of:<br>- ALL or FUNC_GROUP_ALL<br>- U or FUNC_GROUP_UNKNOWN<br>- NONE or FUNC_GROUP_NONE<br>- AGGR or FUNC_GROUP_AGGR<br>- NUM or FUNC_GROUP_NUMERIC<br>- RNG or FUNC_GROUP_RANGE<br>- EXP or FUNC_GROUP_EXPONENTIAL_AND_LOGARITHMIC<br>- TRIG or FUNC_GROUP_TRIGONOMETRIC_AND_HYPERBOLIC<br>- FIN or FUNC_GROUP_FINANCIAL<br>- MATH or FUNC_GROUP_MATH_CONSTANT_AND_PARAM_FREE<br>- COUNT or FUNC_GROUP_COUNTER<br>- STR or FUNC_GROUP_STRING<br>- MAPP or FUNC_GROUP_MAPPING<br>- RCRD or FUNC_GROUP_INTER_RECORD<br>- CND or FUNC_GROUP_CONDITIONAL<br>- LOG or FUNC_GROUP_LOGICAL<br>- NULL or FUNC_GROUP_NULL<br>- SYS or FUNC_GROUP_SYSTEM<br>- FILE or FUNC_GROUP_FILE<br>- TBL or FUNC_GROUP_TABLE<br>- DATE or FUNC_GROUP_DATE_AND_TIME<br>- NUMI or FUNC_GROUP_NUMBER_INTERPRET<br>- FRMT or FUNC_GROUP_FORMATTING<br>- CLR or FUNC_GROUP_COLOR<br>- RNK or FUNC_GROUP_RANKING<br>- GEO or FUNC_GROUP_GEO<br>- EXT or FUNC_GROUP_EXTERNAL<br>- PROB or FUNC_GROUP_PROBABILITY<br>- ARRAY or FUNC_GROUP_ARRAY<br>- LEG or FUNC_GROUP_LEGACY |
| `qSignature` | string | N/A | Signature of the script function.<br>Gives general information about the function. |

## `GenericBookmarkEntry`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qProperties` | [`GenericBookmarkProperties`](#genericbookmarkproperties) | N/A | Information about the properties of the bookmark. |
| `qBookmark` | [`NxBookmark`](#nxbookmark) | N/A | Information about the bookmark. |

## `GenericBookmarkLayout`

Is the layout for [`GenericBookmarkProperties`](#genericbookmarkproperties).

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qInfo` | [`NxInfo`](#nxinfo) | N/A | Information about the object. |
| `qMeta` | [`NxMeta`](#nxmeta) | N/A | Information on publishing and permissions. |
| `qBookmark` | [`NxBookmark`](#nxbookmark) | N/A | Information about the bookmark. |
| `qFieldInfos` | array&lt;[`LayoutFieldInfo`](#layoutfieldinfo)> | N/A | Information about the field selections associated with the bookmark. |

## `GenericBookmarkProperties`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qInfo` | [`NxInfo`](#nxinfo) | N/A | Information about the bookmark.<br>This parameter is mandatory. |
| `qMetaDef` | [`NxMetaDef`](#nxmetadef) | N/A | Definition of the dynamic properties. |

## `GenericDimensionInfo`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qApprMaxGlyphCount` | integer | N/A | Length of the longest value in the field. |
| `qCardinal` | integer | N/A | Number of distinct field values |
| `qTags` | array&lt;string> | N/A | Gives information on a field. For example, it can return the type of the field.<br>Examples: key, text, ASCII |
| `qIsSemantic` | boolean | N/A | If set to true, it means that the field is a semantic. |
| `qAndMode` | boolean | N/A | If set to true a logical AND (instead of a logical OR) is used when making selections in a field.<br>The default value is false. |

## `GenericDimensionLayout`

Is the layout for [`GenericDimensionProperties`](#genericdimensionproperties).

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qInfo` | [`NxInfo`](#nxinfo) | N/A | Identifier and type of the dimension. |
| `qMeta` | [`NxMeta`](#nxmeta) | N/A | Information about publishing and permissions. |
| `qDim` | [`NxLibraryDimension`](#nxlibrarydimension) | N/A | Name and label of the dimension, information about grouping. |
| `qDimInfos` | array&lt;[`GenericDimensionInfo`](#genericdimensioninfo)> | N/A | Cardinal and tags related to the dimension.<br>Length of the longest value in the field. |

## `GenericDimensionProperties`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qInfo` | [`NxInfo`](#nxinfo) | N/A | Identifier and type of the dimension.<br>This parameter is mandatory. |
| `qDim` | [`NxLibraryDimensionDef`](#nxlibrarydimensiondef) | N/A | Definition of the dimension.<br>This parameter is mandatory. |
| `qMetaDef` | [`NxMetaDef`](#nxmetadef) | N/A | Definition of the dynamic properties. |

## `GenericMeasureLayout`

Is the layout for [`GenericMeasureProperties`](#genericmeasureproperties).

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qInfo` | [`NxInfo`](#nxinfo) | N/A | Information about the object. |
| `qMeasure` | [`NxLibraryMeasure`](#nxlibrarymeasure) | N/A | Information about the measure. |
| `qMeta` | [`NxMeta`](#nxmeta) | N/A | Information on publishing and permissions. |

## `GenericMeasureProperties`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qInfo` | [`NxInfo`](#nxinfo) | N/A | Information about the measure.<br>This parameter is mandatory. |
| `qMeasure` | [`NxLibraryMeasureDef`](#nxlibrarymeasuredef) | N/A | Definition of the measure.<br>This parameter is mandatory. |
| `qMetaDef` | [`NxMetaDef`](#nxmetadef) | N/A | Definition of the dynamic properties. |

## `GenericObjectEntry`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qProperty` | [`GenericObjectProperties`](#genericobjectproperties) | N/A | Information about the generic object properties. |
| `qChildren` | array&lt;[`GenericObjectEntry`](#genericobjectentry)> | N/A | Information about the children of the generic object. |
| `qEmbeddedSnapshotRef` | [`GenericBookmarkEntry`](#genericbookmarkentry) | N/A | Reference to a bookmark/snapshot that is embedded in the generic object. |

## `GenericObjectLayout`

Is the layout for [`GenericObjectProperties`](#genericobjectproperties).

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qInfo` | [`NxInfo`](#nxinfo) | N/A | Identifier and type of the generic object. |
| `qMeta` | [`NxMeta`](#nxmeta) | N/A | Information about publishing and permissions.<br>This parameter is optional. |
| `qExtendsId` | string | N/A | Should be set to create an object that is linked to another object. Enter the identifier of the object you want to link to.<br>If you do not want to link your object, set this parameter to an empty string. |
| `qHasSoftPatches` | boolean | N/A | Is set to true if the generic object contains some properties that are not persistent (a soft patch was applied). |
| `qError` | [`NxLayoutErrors`](#nxlayouterrors) | N/A | Gives information on the error.<br>This parameter is optional. |
| `qSelectionInfo` | [`NxSelectionInfo`](#nxselectioninfo) | N/A | Information about the selections. |
| `qStateName` | string | N/A | Name of the alternate state.<br>Default is current selections _$_ . |

## `GenericObjectProperties`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qInfo` | [`NxInfo`](#nxinfo) | N/A | Identifier and type of the object.<br>This parameter is mandatory. |
| `qExtendsId` | string | N/A | Should be set to create an object that is linked to another object. Enter the identifier of the linking object (i.e the object you want to link to).<br>If you do not want to link your object, set this parameter to an empty string. |
| `qMetaDef` | [`NxMetaDef`](#nxmetadef) | N/A | Definition of the dynamic properties. |
| `qStateName` | string | N/A | Name of the alternate state.<br>Default is current selections _$_ . |

## `GenericVariableLayout`

Is the layout for [`GenericVariableProperties`](#genericvariableproperties).

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qInfo` | [`NxInfo`](#nxinfo) | N/A | Identifier and type of the object.<br>This parameter is mandatory. |
| `qMeta` | [`NxMeta`](#nxmeta) | N/A | Information about publishing and permissions.<br>This parameter is optional. |
| `qText` | string | N/A | Some text. |
| `qNum` | number | N/A | A value. |
| `qIsScriptCreated` | boolean | N/A | If set to true, it means that the variable was defined via script. |

## `GenericVariableProperties`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qInfo` | [`NxInfo`](#nxinfo) | N/A | Identifier and type of the object.<br>This parameter is mandatory. |
| `qMetaDef` | [`NxMetaDef`](#nxmetadef) | N/A | Meta data. |
| `qName` | string | N/A | Name of the variable.<br>The name must be unique.<br>This parameter is mandatory. |
| `qComment` | string | N/A | Comment related to the variable.<br>This parameter is optional. |
| `qNumberPresentation` | [`FieldAttributes`](#fieldattributes) | N/A | Defines the format of the value.<br>This parameter is optional. |
| `qIncludeInBookmark` | boolean | N/A | Set this property to true to update the variable when applying a bookmark. The variable value will be persisted in the bookmark.<br>The value of a variable can affect the state of the selections.<br>Script variables cannot be persisted in the bookmark.<br>The default value is false. |
| `qDefinition` | string | N/A | Definition of the variable. |

## `HyperCube`

Renders the properties of a hypercube. Is the layout for [`HyperCubeDef`](#hypercubedef).<br>For more information about the definition of a hypercube, see _Generic object_.<br>What is returned in [`HyperCube`](#hypercube) depends on the type of the hypercube (straight, pivot or stacked table, or tree) and on the method called (GetLayout, GetHyperCubeData, GetHyperCubePivotData, GetHyperCubeStackData, GetHyperCubeTreeData).

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qStateName` | string | N/A | Name of the alternate state.<br>Default is current selections _$_ . |
| `qSize` | [`Size`](#size) | N/A | Defines the size of the hypercube. |
| `qError` | [`NxValidationError`](#nxvalidationerror) | N/A | This parameter is optional and is displayed in case of error. |
| `qDimensionInfo` | array&lt;[`NxDimensionInfo`](#nxdimensioninfo)> | N/A | Information on the dimension. |
| `qMeasureInfo` | array&lt;[`NxMeasureInfo`](#nxmeasureinfo)> | N/A | Information on the measure. |
| `qEffectiveInterColumnSortOrder` | array&lt;integer> | N/A | Sort order of the columns in the hypercube.<br>Column numbers are separated by a comma.<br>Example: [1,0,2] means that the first column to be sorted was the column 1, followed by the column 0 and the column 2. |
| `qGrandTotalRow` | array&lt;[`NxCell`](#nxcell)> | N/A | Aggregate for measures of all values in the field.<br>The result value depends on the _qAggrFunc_ defined in [`HyperCubeDef`](#hypercubedef). |
| `qDataPages` | array&lt;[`NxDataPage`](#nxdatapage)> | N/A | Set of data.<br>Is empty if nothing has been defined in **qInitialDataFetch** in [`HyperCubeDef`](#hypercubedef). |
| `qPivotDataPages` | array&lt;[`NxPivotPage`](#nxpivotpage)> | N/A | Set of data for pivot tables.<br>Is empty if nothing has been defined in **qInitialDataFetch** in [`HyperCubeDef`](#hypercubedef). |
| `qStackedDataPages` | array&lt;[`NxStackPage`](#nxstackpage)> | N/A | Set of data for stacked tables.<br>Is empty if nothing has been defined in **qInitialDataFetch** in [`HyperCubeDef`](#hypercubedef). |
| `qMode` | string | N/A | Information about the mode of the visualization.<br><br>One of:<br>- S or DATA_MODE_STRAIGHT<br>- P or DATA_MODE_PIVOT<br>- K or DATA_MODE_PIVOT_STACK<br>- T or DATA_MODE_TREE |
| `qNoOfLeftDims` | integer | N/A | Number of left dimensions.<br>Default value is -1.<br>The index related to each left dimension depends on the position of the pseudo dimension (if any).<br>For example, a pivot table with:<br>- Four dimensions in the following order: Country, City, Product and Category<br>- One pseudo dimension in position 1<br>- Three left dimensions.<br><br>implies that:<br>- The index 0 corresponds to the left dimension Country.<br>- The index 1 corresponds to the pseudo dimension.<br>- The index 2 corresponds to the left dimension City.<br>- Product and Category are top dimensions.<br><br>Another example:<br>- Four dimensions in the following order: Country, City, Product and Category.<br>- One pseudo dimension in position -1.<br>- Three left dimensions.<br><br>implies that:<br>- The index -1 corresponds to the pseudo dimension; the pseudo dimension is the most to the right.<br>- The index 0 corresponds to the left dimension Country.<br>- The index 1 corresponds to the left dimension City.<br>- The index 2 corresponds to the left dimension Product.<br>- Category is a top dimension. |
| `qIndentMode` | boolean | N/A | Is used for pivot tables only.<br>If set to true, the formatting of the results is slightly different.<br>This property is optional. |
| `qLastExpandedPos` | [`NxCellPosition`](#nxcellposition) | N/A | Is used for pivot tables only.<br>Position of the last expended cell.<br>This property is optional. |
| `qHasOtherValues` | boolean | N/A | True if other row exists. |
| `qTitle` | string | N/A | Title of the hypercube, for example the title of a chart. |
| `qTreeNodesOnDim` | array&lt;integer> | N/A | The total number of nodes on each dimension (only applicable when _qMode = T_ ). |
| `qCalcCondMsg` | string | N/A | The message displayed if calculation condition is not fulfilled. |
| `qColumnOrder` | array&lt;integer> | N/A | The order of the columns. |

## `HyperCubeDef`

Defines the properties of a hypercube.<br>For more information about the definition of a hypercube, see _Generic object_.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qStateName` | string | N/A | Name of the alternate state.<br>Default is current selections _$_ . |
| `qDimensions` | array&lt;[`NxDimension`](#nxdimension)> | N/A | Array of dimensions. |
| `qMeasures` | array&lt;[`NxMeasure`](#nxmeasure)> | N/A | Array of measures. |
| `qInterColumnSortOrder` | array&lt;integer> | N/A | Defines the sort order of the columns in the hypercube.<br>Column numbers are separated by a comma.<br>Example: [1,0,2] means that the first column to be sorted should be the column 1, followed by the column 0 and the column 2.<br>The default sort order is the order in which the dimensions and measures have been defined in the hypercube. By default, the pseudo-dimension (if any) is the most to the right in the array.<br>The index of the pseudo-dimension (if any) is -1.<br>Pseudo dimensions only apply for pivot tables with more than one measure.<br>A pseudo dimension groups together the measures defined in a pivot table. You can neither collapse/expand a pseudo dimension nor make any selections in it.<br>Stacked pivot tables can only contain one measure. |
| `qSuppressZero` | boolean | N/A | Removes zero values. |
| `qSuppressMissing` | boolean | N/A | Removes missing values. |
| `qInitialDataFetch` | array&lt;[`NxPage`](#nxpage)> | N/A | Initial data set. |
| `qReductionMode` | string | N/A | One of:<br>- N or DATA_REDUCTION_NONE<br>- D1 or DATA_REDUCTION_ONEDIM<br>- S or DATA_REDUCTION_SCATTERED<br>- C or DATA_REDUCTION_CLUSTERED<br>- ST or DATA_REDUCTION_STACKED |
| `qMode` | string | DATA_MODE_STRAIGHT | Defines the way the data are handled internally by the engine.<br>Default value is _DATA_MODE_STRAIGHT_ .<br>A pivot table can contain several dimensions and measures whereas a stacked pivot table can contain several dimensions but only one measure.<br><br>One of:<br>- S or DATA_MODE_STRAIGHT<br>- P or DATA_MODE_PIVOT<br>- K or DATA_MODE_PIVOT_STACK<br>- T or DATA_MODE_TREE |
| `qPseudoDimPos` | integer | -1 | _No description._ |
| `qNoOfLeftDims` | integer | -1 | Number of left dimensions.<br>Default value is -1. In that case, all dimensions are left dimensions.<br>Hidden dimensions (e.g. due to unfulfilled calc condition on dimension level) is still counted in this context.<br>The index related to each left dimension depends on the position of the pseudo dimension (if any).<br>For example, a pivot table with:<br>- Four dimensions in the following order: Country, City, Product and Category.<br>- One pseudo dimension in position 1 (the position is defined in _qInterColumnSortOrder_ )<br>_qInterColumnSortOrder_ is (0,-1,1,2,3).<br>- Three left dimensions ( _qNoOfLeftDims_ is set to 3).<br><br>implies that:<br>- The index 0 corresponds to the left dimension Country.<br>- The index 1 corresponds to the pseudo dimension.<br>- The index 2 corresponds to the left dimension City.<br>- Product and Category are top dimensions.<br><br>Another example:<br>- Four dimensions in the following order: Country, City, Product and Category.<br>- Three left dimensions ( _qNoOfLeftDims_ is set to 3).<br>- One pseudo dimension.<br>- The property _qInterColumnSortOrder_ is left empty.<br><br>Implies that:<br>- The index 0 corresponds to the left dimension Country.<br>- The index 1 corresponds to the left dimension City.<br>- The index 2 corresponds to the left dimension Product.<br>- Category is a top dimension.<br>- The pseudo dimension is a top dimension. |
| `qAlwaysFullyExpanded` | boolean | N/A | If this property is set to true, the cells are always expanded. It implies that it is not possible to collapse any cells.<br>The default value is false. |
| `qMaxStackedCells` | integer | 5000 | Maximum number of cells for an initial data fetch (set in _qInitialDataFetch_ ) when in stacked mode ( _qMode_ is K).<br>The default value is 5000. |
| `qPopulateMissing` | boolean | N/A | If this property is set to true, the missing symbols (if any) are replaced by 0 if the value is a numeric and by an empty string if the value is a string.<br>The default value is false. |
| `qShowTotalsAbove` | boolean | N/A | If set to true, the total (if any) is shown on the first row.<br>The default value is false. |
| `qIndentMode` | boolean | N/A | This property applies for pivot tables and allows to change the layout of the table. An indentation is added to the beginning of each row.<br>The default value is false. |
| `qCalcCond` | [`ValueExpr`](#valueexpr) | N/A | Specifies a calculation condition, which must be fulfilled for the hypercube to be (re)calculated.<br>As long as the condition is not met, the engine does not perform a new calculation.<br>This property is optional. By default, there is no calculation condition. |
| `qSortbyYValue` | integer | N/A | To enable the sorting by ascending or descending order in the values of a measure.<br>This property applies to pivot tables and stacked pivot tables.<br>In the case of a pivot table, the measure or pseudo dimension should be defined as a top dimension. The sorting is restricted to the values of the first measure in a pivot table. |
| `qTitle` | [`StringExpr`](#stringexpr) | N/A | Title of the hypercube, for example the title of a chart. |
| `qCalcCondition` | [`NxCalcCond`](#nxcalccond) | N/A | Specifies a calculation condition object.<br>If CalcCondition.Cond is not fulfilled, the hypercube is not calculated and CalcCondition.Msg is evaluated.<br>By default, there is no calculation condition.<br>This property is optional. |
| `qColumnOrder` | array&lt;integer> | N/A | The order of the columns. |

## `InteractDef`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qType` | string | N/A | Interaction type.<br><br>One of:<br>- IT_MSGBOX<br>- IT_SCRIPTLINE<br>- IT_BREAK<br>- IT_INPUT<br>- IT_END<br>- IT_PASSWD<br>- IT_USERNAME |
| `qTitle` | string | N/A | Title used in the message box dialog.<br>This property is relevant if _qType_ is *IT_MSGBOX*. |
| `qMsg` | string | N/A | Message used in the message box dialog.<br>This property is relevant if _qType_ is *IT_MSGBOX*. |
| `qButtons` | integer | N/A | Buttons displayed in the message box dialog.<br>This property is relevant if _qType_ is *IT_MSGBOX*.<br>One of:<br>- 0 means that the _qButtons_ property is not relevant.<br>- 17 means that the message box contains the **OK** and **Cancel** buttons or the **stop** -sign icon. |
| `qLine` | string | N/A | Next script statement to be executed.<br>This property is used if the type of interaction is *IT_SCRIPTLINE*. |
| `qOldLineNr` | integer | N/A | First line number of the previously executed statement.<br>This property is used if the type of interaction is *IT_SCRIPTLINE*. |
| `qNewLineNr` | integer | N/A | First line number of the next statement to be executed.<br>This property is used if the type of interaction is *IT_SCRIPTLINE*. |
| `qPath` | string | N/A | Path specified by the **Include** script variable.<br>This property is used if the type of interaction is *IT_SCRIPTLINE*.<br>Example of an **Include** variable:<br>_$(Include=lib:\\\MyDataFiles\abc.txt);_ |
| `qHidden` | boolean | N/A | This property is set to true if the returned statement is an hidden script statement. |
| `qResult` | integer | N/A | Not relevant for describing the requested user interaction. |
| `qInput` | string | N/A | Is not used in Qlik Sense. |



## `LayoutFieldInfo`

Meta data about the selection in a field.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qFieldName` | string | N/A | The name of the field. |
| `qValuesCount` | integer | N/A | Number of selected values in the field. |
| `qExcludedValuesCount` | integer | N/A | Number of excluded values in the field. |

## `LineageInfo`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qDiscriminator` | string | N/A | A string indicating the origin of the data:<br>- [filename]: the data comes from a local file.<br>- INLINE: the data is entered inline in the load script.<br>- RESIDENT: the data comes from a resident table. The table name is listed.<br>- AUTOGENERATE: the data is generated from the load script (no external table of data source).<br>- Provider: the data comes from a data connection. The connector source name is listed.<br>- [webfile]: the data comes from a web-based file.<br>- STORE: path to QVD or TXT file where data is stored.<br>- EXTENSION: the data comes from a Server Side Extension (SSE). |
| `qStatement` | string | N/A | The LOAD and SELECT script statements from the data load script. |

## `ListObject`

Renders the properties of a list object. Is the layout for [`ListObjectDef`](#listobjectdef).<br>For more information about the definition of a list object, see _Generic object_.<br>ListObject is used by the _GetLayout Method_ to display the properties of a list object. 

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qStateName` | string | N/A | Name of the alternate state.<br>Default is current selections _$_ . |
| `qSize` | [`Size`](#size) | N/A | Defines the size of a list object. |
| `qError` | [`NxValidationError`](#nxvalidationerror) | N/A | This parameter is optional and is displayed in case of error. |
| `qDimensionInfo` | [`NxDimensionInfo`](#nxdimensioninfo) | N/A | Information about the dimension. |
| `qExpressions` | array&lt;[`NxListObjectExpression`](#nxlistobjectexpression)> | N/A | Lists the expressions in the list object. |
| `qDataPages` | array&lt;[`NxDataPage`](#nxdatapage)> | N/A | Set of data.<br>Is empty if nothing has been defined in **qInitialDataFetch** in [`ListObjectDef`](#listobjectdef). |

## `ListObjectDef`

Defines the properties of a list object.<br>For more information about the definition of a list object, see _Generic object_.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qStateName` | string | N/A | Name of the alternate state.<br>Default is current selections _$_ . |
| `qLibraryId` | string | N/A | Refers to a dimension stored in the library. |
| `qDef` | [`NxInlineDimensionDef`](#nxinlinedimensiondef) | N/A | Refers to a dimension stored in the list object. |
| `qAutoSortByState` | [`NxAutoSortByStateDef`](#nxautosortbystatedef) | N/A | Defines the sorting by state. |
| `qFrequencyMode` | string | NX_FREQUENCY_NONE | Defines the frequency mode. The frequency mode is used to calculate the frequency of a value in a list object.<br>Default is _NX_FREQUENCY_NONE_ .<br>This parameter is optional.<br><br>One of:<br>- N or NX_FREQUENCY_NONE<br>- V or NX_FREQUENCY_VALUE<br>- P or NX_FREQUENCY_PERCENT<br>- R or NX_FREQUENCY_RELATIVE |
| `qShowAlternatives` | boolean | N/A | If set to true, alternative values are allowed in _qData_ .<br>If set to false, no alternative values are displayed in _qData_ . Values are excluded instead.<br>The default value is false.<br>Note that on the contrary, the _qStateCounts_ parameter counts the excluded values as alternative values.<br>This parameter is optional. |
| `qInitialDataFetch` | array&lt;[`NxPage`](#nxpage)> | N/A | Fetches an initial data set. |
| `qExpressions` | array&lt;[`NxListObjectExpressionDef`](#nxlistobjectexpressiondef)> | N/A | Lists the expressions in the list object.<br>This parameter is optional. |

## `LocaleInfo`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qDecimalSep` | string | N/A | Decimal separator. |
| `qThousandSep` | string | N/A | Thousand separator. |
| `qListSep` | string | N/A | List separator. |
| `qMoneyDecimalSep` | string | N/A | Money decimal separator. |
| `qMoneyThousandSep` | string | N/A | Money thousand separator. |
| `qCurrentYear` | integer | N/A | Current year. |
| `qMoneyFmt` | string | N/A | Money format.<br>Example: _#.##0,00 kr;-#.##0,00 kr_ |
| `qTimeFmt` | string | N/A | Time format.<br>Example: _hh:mm:ss_ |
| `qDateFmt` | string | N/A | Date format.<br>Example: _YYYY-MM-DD_ |
| `qTimestampFmt` | string | N/A | Time stamp format.<br>Example: _YYYY-MM-DD hh:mm:ss[.fff]_ |
| `qCalendarStrings` | [`CalendarStrings`](#calendarstrings) | N/A | Information about the calendar. |
| `qFirstWeekDay` | integer | N/A | First day of the week, starting from 0.<br>According to ISO 8601, _Monday_ is the first day of the week.<br>- 0 = Monday<br>- 1 = Tuesday<br>- ...<br>- 6 = Sunday<br><br>If this property has not been set in a script, the returned value comes from the Windows operating system. |
| `qBrokenWeeks` | boolean | N/A | Is set to true if broken weeks are allowed in a year.<br>According to ISO 8601, no broken weeks should be allowed.<br>This property is not shown if set to false.<br>If _qBrokenWeeks_ is set to true, _qReferenceDay_ is irrelevant.<br>If this property has not been set in a script, the returned value comes from the Windows operating system. |
| `qReferenceDay` | integer | N/A | Day in the year that is always in week 1.<br>According to ISO 8601, January 4th should always be part of the first week of the year ( _qReferenceDay_ =4).<br>Recommended values are in the range 1 and 7.<br>If this property has not been set in a script, the returned value comes from the Windows operating system.<br>This property is not relevant if there are broken weeks in the year. |
| `qFirstMonthOfYear` | integer | N/A | First month of the year, starting from 1.<br>According to ISO 8601, _January_ is the first month of the year.<br>- 1 = January<br>- 2 = February<br>- 12 = January<br><br>If this property has not been set in a script, the returned value comes from the Windows operating system. |
| `qCollation` | string | N/A | Locale name (following language tagging convention RFC 4646):<br>_&lt; language&gt;-&lt;REGION&gt;_<br>Where:<br>- _language_ is a lowercase ISO  639 language code<br>- _REGION_ specifies an uppercase ISO 3166 country code.<br><br>If this property has not been set in a script, the returned value comes from the Windows operating system. |
| `qNumericalAbbreviation` | string | N/A | Number format.<br>Example: 3:k;6:M;9:G;12:T;15:P;18:E;21:Z;24:Y;-3:m;-6:μ;-9:n;-12:p;-15:f;-18:a;-21:z;-24:y |

## `MeasureList`

Lists the measures. Is the layout for [`MeasureListDef`](#measurelistdef).

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qItems` | array&lt;[`NxContainerEntry`](#nxcontainerentry)> | N/A | Information about the list of measures. |

## `MeasureListDef`

Defines the list of measures.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qType` | string | N/A | Type of the list. |
| `qData` | [`JsonObject`](#jsonobject) | N/A | Data |

## `MediaList`

Lists the media files. Is the layout for [`MediaListDef`](#medialistdef).<br>This struct is deprecated.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qItems` | array&lt;[`MediaListItem`](#medialistitem)> | N/A | Information about the list of media files.<br>In Qlik Sense Desktop, the media files are retrieved from:<br>_%userprofile%\Documents\Qlik\Sense\Content\Default_<br>In Qlik Sense Enterprise, the media files are retrieved from:<br>&lt;installation_directory&gt;\Qlik\Sense\Repository\Content\Default<br>The default installation directory is _ProgramData_ . |


## `MediaListItem`

In addition, this structure can return dynamic properties.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qUrlDef` | string | N/A | Relative path to the media file. The URL is static.<br>Media files located:<br>- in the _/content/default/_ folder are outside the qvf file.<br>- in the _/media/ folder_ are embedded in the qvf file. |
| `qUrl` | string | N/A | Relative path to the media file.<br>Media files located:<br>- in the _/content/default/_ folder are outside the qvf file.<br>- in the _/media/ folder_ are embedded in the qvf file. |

## `NxAppLayout`



| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qTitle` | string | N/A | Title of the app. |
| `qFileName` | string | N/A | In Qlik Sense Enterprise, this property corresponds to the app identifier (GUID).<br>In Qlik Sense Desktop, this property corresponds to the full path of the app. |
| `qLastReloadTime` | string | N/A | Date and time of the last reload of the app in ISO format. |
| `qModified` | boolean | N/A | Is set to true if the app has been updated since the last save. |
| `qHasScript` | boolean | N/A | Is set to true if a script is defined in the app. |
| `qStateNames` | array&lt;string> | N/A | Array of alternate states. |
| `qMeta` | [`NxMeta`](#nxmeta) | N/A | Information on publishing and permissions. |
| `qLocaleInfo` | [`LocaleInfo`](#localeinfo) | N/A | Information about the locale. |
| `qHasData` | boolean | N/A | Is set to true if the app contains data following a script reload. |
| `qReadOnly` | boolean | N/A | If set to true, it means that the app is read-only. |
| `qIsOpenedWithoutData` | boolean | N/A | If set to true, it means that the app was opened without loading its data. |
| `qThumbnail` | [`StaticContentUrl`](#staticcontenturl) | N/A | App thumbnail. |

## `NxAppProperties`



| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qTitle` | string | N/A | App title. |
| `qLastReloadTime` | string | N/A | Last reload time of the app. |
| `qMigrationHash` | string | N/A | Internal property reserved for app migration.<br>Patch version of the app.<br>Do not update. |
| `qSavedInProductVersion` | string | N/A | Internal property reserved for app migration.<br>The app is saved in this version of the product.<br>Do not update. |
| `qThumbnail` | [`StaticContentUrlDef`](#staticcontenturldef) | N/A | App thumbnail. |
| `qHasSectionAccess` | boolean | N/A | If true the app has section access configured. |

## `NxAttrDimDef`

Layout for [`NxAttrDimDef`](#nxattrdimdef).

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qDef` | string | N/A | Expression or field name. |
| `qLibraryId` | string | N/A | LibraryId for dimension. |
| `qSortBy` | [`SortCriteria`](#sortcriteria) | N/A | Sorting. |
| `qAttribute` | boolean | N/A | If set to true, this attribute will not affect the number of rows in the cube. |

## `NxAttrDimInfo`

Layout for [`NxAttrDimDef`](#nxattrdimdef).

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qCardinal` | integer | N/A | Cardinality of the attribute expression. |
| `qSize` | [`Size`](#size) | N/A | Number of rows. |
| `qFallbackTitle` | string | N/A | The title for the attribute dimension. |
| `qLocked` | boolean | N/A | The Locked value of the dimension. |
| `qError` | [`NxValidationError`](#nxvalidationerror) | N/A | Validation error. |
| `qIsCalculated` | boolean | N/A | True if this is a calculated dimension. |

## `NxAttrExprDef`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qExpression` | string | N/A | Definition of the attribute expression.<br>Example: _"Max(OrderID)"_ |
| `qLibraryId` | string | N/A | Definition of the attribute expression stored in the library.<br>Example: _"MyGenericMeasure"_ |
| `qAttribute` | boolean | N/A | If set to true, this measure will not affect the number of rows in the cube. |

## `NxAttrExprInfo`

Layout for [`NxAttrExprDef`](#nxattrexprdef).

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qMin` | number | N/A | Minimum value. |
| `qMax` | number | N/A | Maximum value. |
| `qFallbackTitle` | string | N/A | _No description._ |
| `qMinText` | string | N/A | String version of the minimum Value. |
| `qMaxText` | string | N/A | String version of the maximum Value. |

## `NxAttributeDimValues`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qValues` | array&lt;[`NxSimpleDimValue`](#nxsimpledimvalue)> | N/A | List of values. |

## `NxAttributeExpressionValues`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qValues` | array&lt;[`NxSimpleValue`](#nxsimplevalue)> | N/A | List of attribute expressions values. |

## `NxAutoSortByStateDef`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qDisplayNumberOfRows` | integer | N/A | This parameter applies to list objects.<br>If the number of selected values in the list object is greater than the value set in _qDisplayNumberOfRows_ , the selected lines are promoted at the top of the list object.<br>If _qDisplayNumberOfRows_ is set to a negative value or to 0, the sort by state is disabled. |

## `NxAxisData`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qAxis` | array&lt;[`NxAxisTicks`](#nxaxisticks)> | N/A | List of axis data. |

## `NxAxisTicks`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qName` | string | N/A | Name of the derived definition. |
| `qTags` | array&lt;string> | N/A | List of tags. |
| `qTicks` | array&lt;[`NxTickCell`](#nxtickcell)> | N/A | List of ticks. |

## `NxBookmark`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qStateData` | array&lt;[`AlternateStateData`](#alternatestatedata)> | N/A | List of selections for each state. |
| `qUtcModifyTime` | number | N/A | Time when the bookmark was created. |
| `qVariableItems` | array&lt;[`BookmarkVariableItem`](#bookmarkvariableitem)> | N/A | List of the variables in the app at the time the bookmark was created. |

## `NxCalcCond`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qCond` | [`ValueExpr`](#valueexpr) | N/A | Condition for calculating an hypercube, dimension or measure. |
| `qMsg` | [`StringExpr`](#stringexpr) | N/A | Evaluated if Cond is not fullfilled. |

## `NxCardinalities`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qCardinal` | integer | N/A | Number of distinct field values. |
| `qHypercubeCardinal` | integer | N/A | Number of distinct hypercube values. |
| `qAllValuesCardinal` | integer | -1 | Number of distinct values when paging for AllValues in a Tree Structure.<br>Default is -1 if not part of a Tree structure. |

## `NxCell`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qText` | string | N/A | Some text.<br>This parameter is optional. |
| `qNum` | number | N/A | A value.<br>This parameter is optional. |
| `qElemNumber` | integer | N/A | Rank number of the value, starting from 0.<br>If the element number is a negative number, it means that the returned value is not an element number.<br>You can get the following negative values:<br>- -1: the cell is a _Total_ cell. It shows a total.<br>- -2: the cell is collapsed. Applies to pivot tables.<br>- -3: the cell belongs to the group _Others_ .<br>- -4: the cell is empty. Applies to pivot tables. |
| `qState` | string | N/A | State of the value.<br>The default state for a measure is L.<br><br>One of:<br>- L or LOCKED<br>- S or SELECTED<br>- O or OPTION<br>- D or DESELECTED<br>- A or ALTERNATIVE<br>- X or EXCLUDED<br>- XS or EXCL_SELECTED<br>- XL or EXCL_LOCKED<br>- NSTATES |
| `qIsEmpty` | boolean | N/A | Is set to _true_ , if **qText** and **qNum** are empty.<br>This parameter is optional. The default value is _false_ . |
| `qIsTotalCell` | boolean | N/A | Is set to _true_ if a total is displayed in the cell.<br>This parameter is optional. The default value is _false_ .<br>Not applicable to list objects. |
| `qIsOtherCell` | boolean | N/A | Is set to _true_ if the cell belongs to the group _Others_ .<br>Dimension values can be set as _Others_ depending on what has been defined in **OtherTotalSpecProp** .<br>This parameter is optional. The default value is _false_ .<br>Not applicable to list objects. |
| `qFrequency` | string | N/A | Frequency of the value.<br>This parameter is optional. |
| `qHighlightRanges` | [`NxHighlightRanges`](#nxhighlightranges) | N/A | Search hits.<br>The search hits are highlighted.<br>This parameter is optional. |
| `qAttrExps` | [`NxAttributeExpressionValues`](#nxattributeexpressionvalues) | N/A | Attribute expression values. |
| `qAttrDims` | [`NxAttributeDimValues`](#nxattributedimvalues) | N/A | Attribute dimensions values. |
| `qIsNull` | boolean | N/A | Is set to _true_ if the value is Null. |

## `NxCellPosition`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qx` | integer | N/A | Position of the cell on the x-axis. |
| `qy` | integer | N/A | Position of the cell on the y-axis. |


## `NxContainerEntry`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qInfo` | [`NxInfo`](#nxinfo) | N/A | Information about the object. |
| `qMeta` | [`NxMeta`](#nxmeta) | N/A | Information on publishing and permissions. |
| `qData` | [`JsonObject`](#jsonobject) | N/A | Set of data. |

## `NxContinuousDataOptions`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qStart` | number | N/A | Start value. |
| `qEnd` | number | N/A | End value. |
| `qNbrPoints` | integer | N/A | Number of bins for binning. |
| `qMaxNbrTicks` | integer | N/A | Maximum number of ticks. |
| `qMaxNumberLines` | integer | -1 | Maximum number of lines. |

## `NxContinuousRangeSelectInfo`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qRange` | [`Range`](#range) | N/A | [`Range`](#range) information. |
| `qDimIx` | integer | N/A | Dimension index. |

## `NxCurrentSelectionItem`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qTotal` | integer | N/A | Number of values in the field. |
| `qIsNum` | boolean | N/A | This parameter is displayed if its value is true.<br>Is set to true if the field is a numeric.<br>This parameter is optional. |
| `qField` | string | N/A | Name of the field that is selected. |
| `qLocked` | boolean | N/A | This parameter is displayed if its value is true.<br>Is set to true if the field is locked.<br>This parameter is optional. |
| `qOneAndOnlyOne` | boolean | N/A | This parameter is displayed if its value is true.<br>Property that is set to a field. Is set to true if the field cannot be unselected.<br>This parameter is optional. |
| `qTextSearch` | string | N/A | Text that was used for the search. This parameter is filled when searching for a value and selecting it.<br>This parameter is optional. |
| `qSelectedCount` | integer | N/A | Number of values that are selected. |
| `qSelected` | string | N/A | Values that are selected. |
| `qRangeInfo` | array&lt;[`RangeSelectInfo`](#rangeselectinfo)> | N/A | Information about the range of selected values.<br>Is empty if there is no range of selected values. |
| `qSortIndex` | integer | N/A | Sort index of the field. Indexing starts from 0. |
| `qStateCounts` | [`NxStateCounts`](#nxstatecounts) | N/A | Number of values in a particular state. |
| `qSelectedFieldSelectionInfo` | array&lt;[`NxFieldSelectionInfo`](#nxfieldselectioninfo)> | N/A | Information about the fields that are selected. |
| `qNotSelectedFieldSelectionInfo` | array&lt;[`NxFieldSelectionInfo`](#nxfieldselectioninfo)> | N/A | Information about the fields that are not selected. |
| `qSelectionThreshold` | integer | N/A | Maximum values to show in the current selections.<br>The default value is 6. |
| `qReadableName` | string | N/A | Label that, if defined, is displayed in current selections instead of the actual expression. |
| `qIsHidden` | boolean | N/A | Optional parameter. Indicates if the selection is to be hidden in the Selections bar.<br>Is set to true if the current selection is hidden. |

## `NxDataAreaPage`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qLeft` | number | N/A | Position from the left.<br>Corresponds to the lowest possible value of the first measure (the measure on the x-axis). |
| `qTop` | number | N/A | Position from the top.<br>Corresponds to the highest possible value of the second measure (the measure on the y-axis). |
| `qWidth` | number | N/A | Width of the page.<br>Corresponds to the highest possible value of the first measure (the measure on the x-axis). |
| `qHeight` | number | N/A | Height of the page.<br>The difference between _qTop_ and _qHeight_ gives the lowest possible value of the second measure (the measure on the y-axis). |

## `NxDataPage`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qMatrix` | array&lt;[`NxCellRows`](#nxcellrows)> | N/A | Array of data. |
| `qTails` | array&lt;[`NxGroupTail`](#nxgrouptail)> | N/A | Array of tails.<br>Is used for hypercube objects with multiple dimensions. It might happen that due to the window size some elements in a group cannot be displayed in the same page as the other elements of the group. Elements of a group of dimensions can be part of the previous or the next tail.<br>If there is no tail, the array is empty _[ ]_ . |
| `qArea` | [`Rect`](#rect) | N/A | Size and offset of the data in the matrix. |
| `qIsReduced` | boolean | N/A | Is set to true, if the data have been reduced.<br>The default value is false. |

## `NxDerivedField`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qId` | string | N/A | Identifier of the derived field.<br>The identifier is unique. |
| `qName` | string | N/A | Combination of field name, definition and method.<br>Example:<br>_OrderDate.MyDefinition.Year_ |
| `qMethod` | string | N/A | Method name associated to the derived field. |
| `qExpr` | string | N/A | Expression of the derived field.<br>Example:<br>If _qName_ is _OrderDate.MyDefinition.Year_ , the expression is as follows:<br>_=${Mydefinition(OrderDate).Year}_ |
| `qTags` | array&lt;string> | N/A | List of tags. |

## `NxDerivedFieldDescriptionList`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qDerivedFieldLists` | array&lt;[`NxDerivedFieldsData`](#nxderivedfieldsdata)> | N/A | Information about the derived fields. |

## `NxDerivedFieldsData`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qDerivedDefinitionName` | string | N/A | Name of the derived definition. |
| `qFieldDefs` | array&lt;[`NxDerivedField`](#nxderivedfield)> | N/A | List of the derived fields. |
| `qGroupDefs` | array&lt;[`NxDerivedGroup`](#nxderivedgroup)> | N/A | List of the derived groups. |
| `qTags` | array&lt;string> | N/A | List of tags on the derived fields. |

## `NxDerivedGroup`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qId` | string | N/A | Identifier of the group. |
| `qName` | string | N/A | Name of the derived group. |
| `qGrouping` | string | N/A | Grouping type.<br>The grouping should be either H or C (Grouping is mandatory for derived definitions).<br>The parameter is mandatory.<br><br>One of:<br>- N or GRP_NX_NONE<br>- H or GRP_NX_HIEARCHY<br>- C or GRP_NX_COLLECTION |
| `qFieldDefs` | array&lt;string> | N/A | List of the derived fields in the group. |

## `NxDimension`

Either **qDef** or **qLibraryId** must be set, but not both. If the dimension is set in the hypercube and not in the library, this dimension cannot be shared with other objects. A dimension that is set in the library can be used by many objects.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qLibraryId` | string | N/A | Refers to a dimension stored in the library. |
| `qDef` | [`NxInlineDimensionDef`](#nxinlinedimensiondef) | N/A | Refers to a dimension stored in the hypercube. |
| `qNullSuppression` | boolean | N/A | If set to true, no null values are returned. |
| `qIncludeElemValue` | boolean | N/A | _No description._ |
| `qOtherTotalSpec` | [`OtherTotalSpecProp`](#othertotalspecprop) | N/A | Sets the dimension limits. Each dimension of a hypercube is configured separately.<br>Defines if some values (grouped as _Others_ ) should be grouped together in the visualization.<br>For example in a pie chart all values lower than 200 could be grouped together. |
| `qShowTotal` | boolean | N/A | _No description._ |
| `qShowAll` | boolean | N/A | If set to true, all dimension values are shown. |
| `qOtherLabel` | [`StringExpr`](#stringexpr) | N/A | This property is used when some dimension limits are set.<br>Label of the _Others_ group. The default label is _Others_ .<br>Example:<br>_"qOtherLabel":"= &lt;label&gt;"_<br>or<br>_"qOtherLabel":{"qExpr":"= &lt;label&gt;"}_<br>Where:<br>- &lt; _label_ &gt; is the label of the _Others_ group. |
| `qTotalLabel` | [`StringExpr`](#stringexpr) | N/A | If this property is set, the total of the calculated values is returned.<br>The default label is _Total_ .<br>Example:<br>_"qTotalLabel":"= &lt;label&gt;"_<br>or<br>_"qTotalLabel":{"qExpr":"= &lt;label&gt;"}_<br>Where:<br>- &lt; _label_ &gt; is the label of the _Total_ group. |
| `qCalcCond` | [`ValueExpr`](#valueexpr) | N/A | Specifies a calculation condition, which must be fulfilled for the dimension to be calculated.<br>If the calculation condition is not met, the dimension is excluded from the calculation.<br>By default, there is no calculation condition.<br>This property is optional. |
| `qAttributeExpressions` | array&lt;[`NxAttrExprDef`](#nxattrexprdef)> | N/A | List of attribute expressions. |
| `qAttributeDimensions` | array&lt;[`NxAttrDimDef`](#nxattrdimdef)> | N/A | List of attribute dimensions. |
| `qCalcCondition` | [`NxCalcCond`](#nxcalccond) | N/A | Specifies a calculation condition object.<br>If CalcCondition.Cond is not fulfilled, the dimension is excluded from the calculation and CalcCondition.Msg is evaluated.<br>By default, there is no calculation condition.<br>This property is optional. |

## `NxDimensionInfo`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qFallbackTitle` | string | N/A | Corresponds to the label of the dimension that is selected.<br>If the label is not defined then the field name is used. |
| `qApprMaxGlyphCount` | integer | N/A | Length of the longest value in the field. |
| `qCardinal` | integer | N/A | Number of distinct field values. |
| `qLocked` | boolean | N/A | Is set to true if the field is locked. |
| `qSortIndicator` | string | N/A | Sort indicator.<br>The default value is no sorting.<br>This parameter is optional.<br><br>One of:<br>- N or NX_SORT_INDICATE_NONE<br>- A or NX_SORT_INDICATE_ASC<br>- D or NX_SORT_INDICATE_DESC |
| `qGroupFallbackTitles` | array&lt;string> | N/A | Array of dimension labels.<br>Contains the labels of all dimensions in a hierarchy group (for example the labels of all dimensions in a drill down group). |
| `qGroupPos` | integer | N/A | Index of the dimension that is currently in use.<br>_qGroupPos_ is set to 0 if there are no hierarchical groups (drill-down groups) or cycle groups. |
| `qStateCounts` | [`NxStateCounts`](#nxstatecounts) | N/A | Number of values in a particular state. |
| `qTags` | array&lt;string> | N/A | Gives information on a field. For example, it can return the type of the field.<br>Examples: key, text, ASCII |
| `qError` | [`NxValidationError`](#nxvalidationerror) | N/A | This parameter is optional.<br>Gives information on the error. |
| `qDimensionType` | string | N/A | Binary format of the field.<br><br>One of:<br>- D or NX_DIMENSION_TYPE_DISCRETE<br>- N or NX_DIMENSION_TYPE_NUMERIC<br>- T or NX_DIMENSION_TYPE_TIME |
| `qReverseSort` | boolean | N/A | If set to true, it inverts the sort criteria in the field. |
| `qGrouping` | string | N/A | Defines the grouping.<br><br>One of:<br>- N or GRP_NX_NONE<br>- H or GRP_NX_HIEARCHY<br>- C or GRP_NX_COLLECTION |
| `qIsSemantic` | boolean | N/A | If set to true, it means that the field is a semantic. |
| `qNumFormat` | [`FieldAttributes`](#fieldattributes) | N/A | Format of the field.<br>This parameter is optional. |
| `qIsAutoFormat` | boolean | N/A | This parameter is set to true if _qNumFormat_ is set to _U_ (unknown). The engine guesses the type of the field based on the field's definition. |
| `qGroupFieldDefs` | array&lt;string> | N/A | Array of field names. |
| `qMin` | number | N/A | Minimum value. |
| `qMax` | number | N/A | Maximum value. |
| `qContinuousAxes` | boolean | N/A | Is continuous axis used. |
| `qIsCyclic` | boolean | N/A | Is a cyclic dimension used. |
| `qDerivedField` | boolean | N/A | Is derived field is used as a dimension. |
| `qAttrExprInfo` | array&lt;[`NxAttrExprInfo`](#nxattrexprinfo)> | N/A | Array of attribute expressions. |
| `qAttrDimInfo` | array&lt;[`NxAttrDimInfo`](#nxattrdiminfo)> | N/A | Array of attribute dimensions. |
| `qCalcCondMsg` | string | N/A | The message displayed if calculation condition is not fulfilled. |
| `qIsCalculated` | boolean | N/A | True if this is a calculated dimension. |
| `qIsOneAndOnlyOne` | boolean | N/A | If set to true, it means that the field always has one and only one selected value. |
| `qCardinalities` | [`NxCardinalities`](#nxcardinalities) | N/A | Dimension Cardinalities |
| `qLibraryId` | string | N/A | Refers to a dimension stored in the library. |

## `NxEngineVersion`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qComponentVersion` | string | N/A | Version number of the Qlik engine component. |

## `NxFieldDescription`



| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qIsSemantic` | boolean | N/A | If set to true, it means that the field is a semantic. |
| `qIsHidden` | boolean | N/A | If set to true, it means that the field is hidden. |
| `qIsSystem` | boolean | N/A | If set to true, it means that the field is a system field. |
| `qAndMode` | boolean | N/A | If set to true a logical AND (instead of a logical OR) is used when making selections in a field.<br>The default value is false. |
| `qName` | string | N/A | Name of the field |
| `qCardinal` | integer | N/A | Number of distinct field values |
| `qTags` | array&lt;string> | N/A | Gives information on a field. For example, it can return the type of the field.<br>Examples: key, text, ASCII |
| `qIsDefinitionOnly` | boolean | N/A | If set to true, it means that the field is a field on the fly. |
| `qDerivedFieldData` | [`NxDerivedFieldDescriptionList`](#nxderivedfielddescriptionlist) | N/A | Lists the derived fields if any. |
| `qIsDetail` | boolean | N/A | Is used for Direct Discovery.<br>If set to true, it means that the type of the field is detail. |
| `qIsImplicit` | boolean | N/A | Is used for Direct Discovery.<br>If set to true, it means that the type of the field is measure. |
| `qReadableName` | string | N/A | _No description._ |

## `NxFieldProperties`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qOneAndOnlyOne` | boolean | N/A | This parameter is set to true, if the field has one and only one selection (not 0 and not more than 1).<br>If this property is set to true, the field cannot be cleared anymore and no more selections can be performed in that field.<br>The property _OneAndOnlyOne_ can be set to true if one and only value has been selected in the field prior to setting the property.  |

## `NxFieldSelectionInfo`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qName` | string | N/A | Name of the field. |
| `qFieldSelectionMode` | string | N/A | Selection mode. |

## `NxGetBookmarkOptions`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qTypes` | array&lt;string> | N/A | List of object types. |
| `qData` | [`JsonObject`](#jsonobject) | N/A | Set of data. |

## `NxGetObjectOptions`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qTypes` | array&lt;string> | N/A | List of object types. |
| `qIncludeSessionObjects` | boolean | N/A | Set to true to include session objects.<br>The default value is false. |
| `qData` | [`JsonObject`](#jsonobject) | N/A | Set of data. |

## `NxGroupTail`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qUp` | integer | N/A | Number of elements that are part of the previous tail.<br>This number depends on the paging, more particularly it depends on the values defined in _qTop_ and _qHeight_ .<br>Is not shown if the value is 0.<br>This parameter is optional. |
| `qDown` | integer | N/A | Number of elements that are part of the next tail.<br>This number depends on the paging, more particularly it depends on the values defined in _qTop_ and _qHeight_<br>Is not shown if the value is 0.<br>This parameter is optional. |

## `NxHighlightRanges`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qRanges` | array&lt;[`CharRange`](#charrange)> | N/A | Ranges of highlighted values. |

## `NxInfo`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qId` | string | N/A | Identifier of the object.<br>If the chosen identifier is already in use, the engine automatically sets another one.<br>If an identifier is not set, the engine automatically sets one.<br>This parameter is optional. |
| `qType` | string | N/A | Type of the object.<br>This parameter is mandatory. |

## `NxInlineDimensionDef`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qGrouping` | string | N/A | Used to define a cyclic group or drill-down group.<br>Default value is no grouping.<br>This parameter is optional.<br><br>One of:<br>- N or GRP_NX_NONE<br>- H or GRP_NX_HIEARCHY<br>- C or GRP_NX_COLLECTION |
| `qFieldDefs` | array&lt;string> | N/A | Array of field names.<br>When creating a grouped dimension, more than one field name is defined.<br>This parameter is optional. |
| `qFieldLabels` | array&lt;string> | N/A | Array of field labels.<br>This parameter is optional. |
| `qSortCriterias` | array&lt;[`SortCriteria`](#sortcriteria)> | N/A | Defines the sorting criteria in the field.<br>Default is to sort by alphabetical order, ascending.<br>This parameter is optional. |
| `qNumberPresentations` | array&lt;[`FieldAttributes`](#fieldattributes)> | N/A | Defines the format of the value.<br>This parameter is optional. |
| `qReverseSort` | boolean | N/A | If set to true, it inverts the sort criteria in the field. |
| `qActiveField` | integer | N/A | Index of the active field in a cyclic dimension.<br>This parameter is optional. The default value is 0.<br>This parameter is used in case of cyclic dimensions ( _qGrouping_ is C). |
| `qLabelExpression` | string | N/A | Label expression.<br>This parameter is optional. |

## `NxInlineMeasureDef`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qLabel` | string | N/A | Name of the measure.<br>An empty string is returned as a default value.<br>This parameter is optional. |
| `qDescription` | string | N/A | Description of the measure.<br>An empty string is returned as a default value.<br>This parameter is optional. |
| `qTags` | array&lt;string> | N/A | Name connected to the measure that is used for search purposes.<br>A measure can have several tags.<br>This parameter is optional. |
| `qGrouping` | string | N/A | Default value is no grouping.<br>This parameter is optional.<br><br>One of:<br>- N or GRP_NX_NONE<br>- H or GRP_NX_HIEARCHY<br>- C or GRP_NX_COLLECTION |
| `qDef` | string | N/A | Definition of the expression in the measure.<br>Example: _Sum (OrderTotal)_<br>This parameter is mandatory. |
| `qNumFormat` | [`FieldAttributes`](#fieldattributes) | N/A | Format of the field.<br>This parameter is optional. |
| `qRelative` | boolean | N/A | If set to true, percentage values are returned instead of absolute numbers.<br>Default value is false.<br>This parameter is optional. |
| `qBrutalSum` | boolean | N/A | If set to true, the sum of rows total should be used rather than real expression total.<br>This parameter is optional and applies to straight tables.<br>Default value is false.<br>If using the Qlik Sense interface, it means that the total mode is set to **Expression Total** . |
| `qAggrFunc` | string | N/A | Aggregate function.<br>For more information on the aggregate function syntax, see the section Working with Qlik Sense on the online help portal.<br>The default value is 0 (Sum of rows)<br>This parameter is optional. |
| `qAccumulate` | integer | N/A | * 0 means no accumulation<br>                            * 1 means full accumulation (each y-value accumulates all previous y-values of the expression)<br>                            * ≥ 2 means accumulate as many steps as the _qAccumulate_ value<br>Default value is 0.<br>This parameter is optional. |
| `qReverseSort` | boolean | N/A | If set to true, it inverts the sort criteria in the field. |
| `qActiveExpression` | integer | N/A | Index of the active expression in a cyclic measure. The indexing starts from 0.<br>The default value is 0.<br>This parameter is optional. |
| `qExpressions` | array&lt;string> | N/A | Array of expressions. This parameter is used in case of cyclic measures ( _qGrouping_ is C). List of the expressions in the cyclic group. |
| `qLabelExpression` | string | N/A | Label expression.<br>This parameter is optional. |

## `NxLayoutErrors`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qErrorCode` | integer | N/A | Error code. |

## `NxLibraryDimension`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qGrouping` | string | N/A | Information about the grouping.<br><br>One of:<br>- N or GRP_NX_NONE<br>- H or GRP_NX_HIEARCHY<br>- C or GRP_NX_COLLECTION |
| `qFieldDefs` | array&lt;string> | N/A | Array of dimension names. |
| `qFieldLabels` | array&lt;string> | N/A | Array of dimension labels. |
| `qLabelExpression` | string | N/A | _No description._ |

## `NxLibraryDimensionDef`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qGrouping` | string | N/A | Information about the grouping.<br><br>One of:<br>- N or GRP_NX_NONE<br>- H or GRP_NX_HIEARCHY<br>- C or GRP_NX_COLLECTION |
| `qFieldDefs` | array&lt;string> | N/A | Array of dimension names. |
| `qFieldLabels` | array&lt;string> | N/A | Array of dimension labels. |
| `qLabelExpression` | string | N/A | _No description._ |

## `NxLibraryMeasure`

Information about the library measure. Is the layout for [`NxLibraryMeasureDef`](#nxlibrarymeasuredef).

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qLabel` | string | N/A | _No description._ |
| `qDef` | string | N/A | _No description._ |
| `qGrouping` | string | N/A | One of:<br>- N or GRP_NX_NONE<br>- H or GRP_NX_HIEARCHY<br>- C or GRP_NX_COLLECTION |
| `qExpressions` | array&lt;string> | N/A | _No description._ |
| `qActiveExpression` | integer | N/A | _No description._ |
| `qLabelExpression` | string | N/A | _No description._ |

## `NxLibraryMeasureDef`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qLabel` | string | N/A | Label of the measure. |
| `qDef` | string | N/A | Definition of the measure. |
| `qGrouping` | string | N/A | Used to define a cyclic group or drill-down group.<br>Default value is no grouping.<br>This parameter is optional.<br><br>One of:<br>- N or GRP_NX_NONE<br>- H or GRP_NX_HIEARCHY<br>- C or GRP_NX_COLLECTION |
| `qExpressions` | array&lt;string> | N/A | Array of expressions. |
| `qActiveExpression` | integer | N/A | Index to the active expression in a measure. |
| `qLabelExpression` | string | N/A | Optional expression used for dynamic label. |

## `NxLinkedObjectInfo`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qRootId` | string | N/A | Identifier of the root object.<br>If the linked object is a child, the root identifier is the identifier of the parent.<br>If the linked object is an app object, the root identifier is the same than the identifier of the linked object since the linked object is a root object. |
| `qInfo` | [`NxInfo`](#nxinfo) | N/A | Information about the linked object. |

## `NxListObjectExpression`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qExpr` | string | N/A | Value of the expression. |
| `qError` | [`NxLayoutErrors`](#nxlayouterrors) | N/A | Gives information on the error.<br>This parameter is optional. |

## `NxListObjectExpressionDef`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qExpr` | string | N/A | Value of the expression. |
| `qLibraryId` | string | N/A | Refers to an expression stored in the library. |



## `NxMatchingFieldInfo`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qName` | string | N/A | Name of the field. |
| `qTags` | array&lt;string> | N/A | List of tags. |

## `NxMeasure`

Either **qDef** or **qLibraryId** must be set, but not both. If the measure is set in the hypercube and not in the library, this measure cannot be shared with other objects. A measure that is set in the library can be used by many objects. <br>expressions are complementary expressions associated to a measure. For example, you can decide to change the background color of a visualization depending on the values of the measure.<br>Attribute expressions do not affect the layout of an object. The sorting order is unchanged.<br>

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qLibraryId` | string | N/A | Refers to a measure stored in the library. |
| `qDef` | [`NxInlineMeasureDef`](#nxinlinemeasuredef) | N/A | Refers to a measure stored in the hypercube. |
| `qSortBy` | [`SortCriteria`](#sortcriteria) | N/A | Defines the sort criteria.<br>The default value is sort by ascending alphabetic order.<br>This property is optional. |
| `qAttributeExpressions` | array&lt;[`NxAttrExprDef`](#nxattrexprdef)> | N/A | List of attribute expressions. |
| `qAttributeDimensions` | array&lt;[`NxAttrDimDef`](#nxattrdimdef)> | N/A | List of attribute dimensions. |
| `qCalcCond` | [`ValueExpr`](#valueexpr) | N/A | Specifies a calculation condition, which must be fulfilled for the measure to be calculated.<br>If the calculation condition is not met, the measure is excluded from the calculation.<br>By default, there is no calculation condition.<br>This property is optional. |
| `qCalcCondition` | [`NxCalcCond`](#nxcalccond) | N/A | Specifies a calculation condition object.<br>If CalcCondition.Cond is not fulfilled, the measure is excluded from the calculation and CalcCondition.Msg is evaluated.<br>By default, there is no calculation condition.<br>This property is optional. |

## `NxMeasureInfo`

Layout for [`NxInlineMeasureDef`](#nxinlinemeasuredef).

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qFallbackTitle` | string | N/A | Corresponds to the label of the measure.<br>If the label is not defined then the measure name is used. |
| `qApprMaxGlyphCount` | integer | N/A | Length of the longest value in the field. |
| `qCardinal` | integer | N/A | Number of distinct field values. |
| `qSortIndicator` | string | N/A | Sort indicator.<br>The default value is no sorting.<br>This parameter is optional.<br><br>One of:<br>- N or NX_SORT_INDICATE_NONE<br>- A or NX_SORT_INDICATE_ASC<br>- D or NX_SORT_INDICATE_DESC |
| `qNumFormat` | [`FieldAttributes`](#fieldattributes) | N/A | Format of the field.<br>This parameter is optional. |
| `qMin` | number | N/A | Lowest value in the range. |
| `qMax` | number | N/A | Highest value in the range. |
| `qError` | [`NxValidationError`](#nxvalidationerror) | N/A | This parameter is optional.<br>Gives information on the error. |
| `qReverseSort` | boolean | N/A | If set to true, it inverts the sort criteria in the field. |
| `qIsAutoFormat` | boolean | N/A | This parameter is set to true if _qNumFormat_ is set to _U_ (unknown). The engine guesses the type of the field based on the field's expression. |
| `qAttrExprInfo` | array&lt;[`NxAttrExprInfo`](#nxattrexprinfo)> | N/A | List of attribute expressions. |
| `qAttrDimInfo` | array&lt;[`NxAttrDimInfo`](#nxattrdiminfo)> | N/A | List of attribute dimensions. |
| `qCalcCondMsg` | string | N/A | The message displayed if calculation condition is not fulfilled. |
| `qLibraryId` | string | N/A | Refers to a dimension stored in the library. |

## `NxMeta`

Layout for [`NxMetaDef`](#nxmetadef).

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qName` | string | N/A | Name.<br>This property is optional. |


## `NxMultiRangeSelectInfo`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qRanges` | array&lt;[`NxRangeSelectInfo`](#nxrangeselectinfo)> | N/A | _No description._ |
| `qColumnsToSelect` | array&lt;integer> | N/A | _No description._ |

## `NxPage`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qLeft` | integer | N/A | Position from the left.<br>Corresponds to the first column. |
| `qTop` | integer | N/A | Position from the top.<br>Corresponds to the first row. |
| `qWidth` | integer | N/A | Number of columns in the page. The indexing of the columns may vary depending on whether the cells are expanded or not (parameter _qAlwaysFullyExpanded_ in [`HyperCubeDef`](#hypercubedef) ). |
| `qHeight` | integer | N/A | Number of rows or elements in the page. The indexing of the rows may vary depending on whether the cells are expanded or not (parameter _qAlwaysFullyExpanded_ in [`HyperCubeDef`](#hypercubedef) ). |

## `NxPageTreeLevel`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qLeft` | integer | N/A | The first dimension that is to be part of the tree, counted from the left. For example, if qLeft is equal to 1, omit nodes from the first dimension in the current sort order. |
| `qDepth` | integer | -1 | Number of dimensions to include in the tree. |

## `NxPageTreeNode`

Defines an area of the tree to be fetched.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qArea` | [`Rect`](#rect) | N/A | The area of the tree to be fetched. If no area is defined on a dimension, all existing nodes are included. |
| `qAllValues` | boolean | N/A | When set to true, generated nodes (based on current selection) will be inserted into the returned tree even when there is no actual value. For example, suppose you are looking for hybrid car sales at all car dealerships. Normally, only dealerships where hybrid cars are sold would be part of the returned tree but with qAllValues set to true, all available dealerships will be included regardless if they sold any hybrid cars or not. |

## `NxPatch`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qOp` | string | N/A | Operation to perform.<br><br>One of:<br>- add or Add<br>- remove or Remove<br>- replace or Replace |
| `qPath` | string | N/A | Path to the property to add, remove or replace. |
| `qValue` | string | N/A | This parameter is not used in a remove operation.<br>Corresponds to the value of the property to add or to the new value of the property to update.<br>Examples:<br>"false", "2", "\"New title\"" |

## `NxPivotDimensionCell`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qText` | string | N/A | Some text. |
| `qElemNo` | integer | N/A | Rank number of the value.<br>If set to -1, it means that the value is not an element number. |
| `qValue` | number | N/A | Value of the cell.<br>Is set to _NaN_ , if the value is not a number. |
| `qCanExpand` | boolean | N/A | If set to true, it means that the cell can be expanded.<br>This parameter is not returned if it is set to false. |
| `qCanCollapse` | boolean | N/A | If set to true, it means that the cell can be collapsed.<br>This parameter is not returned if it is set to false. |
| `qType` | string | N/A | Type of the cell.<br><br>One of:<br>- V or NX_DIM_CELL_VALUE<br>- E or NX_DIM_CELL_EMPTY<br>- N or NX_DIM_CELL_NORMAL<br>- T or NX_DIM_CELL_TOTAL<br>- O or NX_DIM_CELL_OTHER<br>- A or NX_DIM_CELL_AGGR<br>- P or NX_DIM_CELL_PSEUDO<br>- R or NX_DIM_CELL_ROOT<br>- U or NX_DIM_CELL_NULL<br>- G or NX_DIM_CELL_GENERATED |
| `qUp` | integer | N/A | Number of elements that are part of the previous tail.<br>This number depends on the paging, more particularly it depends on the values defined in _qTop_ and _qHeight_ . |
| `qDown` | integer | N/A | Number of elements that are part of the next tail.<br>This number depends on the paging, more particularly it depends on the values defined in _qTop_ and _qHeight_ . |
| `qSubNodes` | array&lt;[`NxPivotDimensionCell`](#nxpivotdimensioncell)> | N/A | Information about sub nodes (or sub cells).<br>The array is empty _[ ]_ when there is no sub nodes. |
| `qAttrExps` | [`NxAttributeExpressionValues`](#nxattributeexpressionvalues) | N/A | Information about attribute expressions.<br>The array is empty _[ ]_ when there is no attribute expressions. |
| `qAttrDims` | [`NxAttributeDimValues`](#nxattributedimvalues) | N/A | Information about attribute dimensions. |

## `NxPivotPage`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qLeft` | array&lt;[`NxPivotDimensionCell`](#nxpivotdimensioncell)> | N/A | Information about the left dimension values of a pivot table. |
| `qTop` | array&lt;[`NxPivotDimensionCell`](#nxpivotdimensioncell)> | N/A | Information about the top dimension values of a pivot table. If there is no top dimension in the pivot table, information about the measures are given. |
| `qData` | array&lt;[`ArrayOfNxValuePoint`](#arrayofnxvaluepoint)> | N/A | Array of data. |
| `qArea` | [`Rect`](#rect) | N/A | Size and offset of the data in the matrix. |

## `NxPivotValuePoint`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qLabel` | string | N/A | Label of the cell.<br>This parameter is optional. |
| `qText` | string | N/A | Some text related to the cell. |
| `qNum` | number | N/A | Value of the cell. |
| `qType` | string | N/A | Type of the cell.<br><br>One of:<br>- V or NX_DIM_CELL_VALUE<br>- E or NX_DIM_CELL_EMPTY<br>- N or NX_DIM_CELL_NORMAL<br>- T or NX_DIM_CELL_TOTAL<br>- O or NX_DIM_CELL_OTHER<br>- A or NX_DIM_CELL_AGGR<br>- P or NX_DIM_CELL_PSEUDO<br>- R or NX_DIM_CELL_ROOT<br>- U or NX_DIM_CELL_NULL<br>- G or NX_DIM_CELL_GENERATED |
| `qAttrExps` | [`NxAttributeExpressionValues`](#nxattributeexpressionvalues) | N/A | Attribute expressions values. |
| `qAttrDims` | [`NxAttributeDimValues`](#nxattributedimvalues) | N/A | _No description._ |

## `NxRange`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qFrom` | integer | N/A | Position in the expression of the first character of the field name. |
| `qCount` | integer | N/A | Number of characters in the field name. |

## `NxRangeSelectInfo`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qRange` | [`Range`](#range) | N/A | [`Range`](#range) of values. |
| `qMeasureIx` | integer | N/A | Number of the measure to select.<br>Numbering starts from 0. |

## `NxSelectionCell`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qType` | string | N/A | Type of cells to select.<br><br>One of:<br>- D or NX_CELL_DATA<br>- T or NX_CELL_TOP<br>- L or NX_CELL_LEFT |
| `qCol` | integer | N/A | Column index to select.<br>Indexing starts from 0.<br>If the cell's type is:<br>- D, the index is based on the data matrix.<br>- T, the index is based on the data matrix.<br>- L, the index is based on the left dimensions indexes. |
| `qRow` | integer | N/A | Row index to select.<br>Indexing starts from 0.<br>If the cell's type is:<br>- D, the index is based on the data matrix.<br>- T, the index is based on the top dimensions indexes.<br>- L, the index is based on the data matrix. |

## `NxSelectionInfo`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qInSelections` | boolean | N/A | Is set to true if the visualization is in selection mode.<br>For more information about the selection mode, see _BeginSelections Method_. |
| `qMadeSelections` | boolean | N/A | Is set to true if the visualization is in selection mode and if some selections have been made while in selection mode.<br>For more information about the selection mode, see _BeginSelections Method_. |

## `NxSimpleDimValue`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qText` | string | N/A | Text related to the attribute expression value.<br>This property is optional. No text is returned if the attribute expression value is a numeric. |
| `qElemNo` | integer | N/A | Element number. |

## `NxSimpleValue`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qText` | string | N/A | Text related to the attribute expression value. |
| `qNum` | number | N/A | Numeric value of the attribute expression.<br>Set to NaN (Not a Number) if the attribute expression value is not numeric. |

## `NxStackPage`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qData` | array&lt;[`NxStackedPivotCell`](#nxstackedpivotcell)> | N/A | Array of data. |
| `qArea` | [`Rect`](#rect) | N/A | Size and offset of the data in the matrix. |

## `NxStackedPivotCell`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qText` | string | N/A | Some text. |
| `qElemNo` | integer | N/A | Rank number of the value.<br>If set to -1, it means that the value is not an element number. |
| `qValue` | number | N/A | Value of the cell.<br>Is set to _NaN_ , if the value is not a number. |
| `qCanExpand` | boolean | N/A | If set to true, it means that the cell can be expanded.<br>This parameter is not returned if it is set to false. |
| `qCanCollapse` | boolean | N/A | If set to true, it means that the cell can be collapsed.<br>This parameter is not returned if it is set to false. |
| `qType` | string | N/A | Type of the cell.<br><br>One of:<br>- V or NX_DIM_CELL_VALUE<br>- E or NX_DIM_CELL_EMPTY<br>- N or NX_DIM_CELL_NORMAL<br>- T or NX_DIM_CELL_TOTAL<br>- O or NX_DIM_CELL_OTHER<br>- A or NX_DIM_CELL_AGGR<br>- P or NX_DIM_CELL_PSEUDO<br>- R or NX_DIM_CELL_ROOT<br>- U or NX_DIM_CELL_NULL<br>- G or NX_DIM_CELL_GENERATED |
| `qMaxPos` | number | N/A | Total of the positive values in the current group of cells. |
| `qMinNeg` | number | N/A | Total of the negative values in the current group of cells. |
| `qUp` | integer | N/A | Number of elements that are part of the previous tail. |
| `qDown` | integer | N/A | Number of elements that are part of the next tail. |
| `qRow` | integer | N/A | Row index in the data matrix.<br>The indexing starts from 0. |
| `qSubNodes` | array&lt;[`NxStackedPivotCell`](#nxstackedpivotcell)> | N/A | Information about sub nodes (or sub cells).<br>The array is empty _[ ]_ when there are no sub nodes. |
| `qAttrExps` | [`NxAttributeExpressionValues`](#nxattributeexpressionvalues) | N/A | Attribute expressions values. |
| `qAttrDims` | [`NxAttributeDimValues`](#nxattributedimvalues) | N/A | Attribute dimensions values. |

## `NxStateCounts`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qLocked` | integer | N/A | Number of values in locked state. |
| `qSelected` | integer | N/A | Number of values in selected state. |
| `qOption` | integer | N/A | Number of values in optional state. |
| `qDeselected` | integer | N/A | Number of values in deselected state. |
| `qAlternative` | integer | N/A | Number of values in alternative state. |
| `qExcluded` | integer | N/A | Number of values in excluded state. |
| `qSelectedExcluded` | integer | N/A | Number of values in selected excluded state. |
| `qLockedExcluded` | integer | N/A | Number of values in locked excluded state. |

## `NxStreamListEntry`

!!! warning "Deprecated"
    This definition is deprecated and should not be used

This struct is deprecated (not recommended to use).

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qName` | string | N/A | Name of the stream. |
| `qId` | string | N/A | Identifier of the stream. |

## `NxTickCell`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qText` | string | N/A | Tick's label. |
| `qStart` | number | N/A | Start value. |
| `qEnd` | number | N/A | End value. |

## `NxTreeDataOption`

Specifies all the paging filters needed to define the tree to be fetched.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qMaxNbrOfNodes` | integer | N/A | Maximum number of nodes in the tree. If this limit is exceeded, no nodes are returned. All nodes are counted. |
| `qTreeNodes` | array&lt;[`NxPageTreeNode`](#nxpagetreenode)> | N/A | Defines areas of the tree to be fetched. Areas must be defined left to right. |
| `qTreeLevels` | [`NxPageTreeLevel`](#nxpagetreelevel) | N/A | Filters out complete dimensions from the fetched tree. |

## `NxTreeDimensionDef`

**Stability Index: Experimental**

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qLibraryId` | string | N/A | Refers to a dimension stored in the library. |
| `qDef` | [`NxInlineDimensionDef`](#nxinlinedimensiondef) | N/A | Refers to a dimension. |
| `qValueExprs` | array&lt;[`NxMeasure`](#nxmeasure)> | N/A | List of measures. |
| `qNullSuppression` | boolean | N/A | If set to true, no null values are returned. |
| `qOtherTotalSpec` | [`OtherTotalSpecProp`](#othertotalspecprop) | N/A | Sets the dimension limits. Each dimension of a hypercube is configured separately.<br>Defines if some values (grouped as _Others_ ) should be grouped together in the visualization.<br>For example in a pie chart all values lower than 200 could be grouped together. |
| `qShowAll` | boolean | N/A | If set to true, all dimension values are shown. |
| `qOtherLabel` | [`StringExpr`](#stringexpr) | N/A | This property is used when some dimension limits are set.<br>Label of the _Others_ group. The default label is _Others_ .<br>Example:<br>_"qOtherLabel":"= &lt;label&gt;"_<br>or<br>_"qOtherLabel":{"qExpr":"= &lt;label&gt;"}_<br>Where:<br>- &lt; _label_ &gt; is the label of the _Others_ group. |
| `qTotalLabel` | [`StringExpr`](#stringexpr) | N/A | If this property is set, the total of the calculated values is returned.<br>The default label is _Total_ .<br>Example:<br>_"qTotalLabel":"= &lt;label&gt;"_<br>or<br>_"qTotalLabel":{"qExpr":"= &lt;label&gt;"}_<br>Where:<br>- &lt; _label_ &gt; is the label of the _Total_ group. |
| `qCalcCondition` | [`NxCalcCond`](#nxcalccond) | N/A | Specifies a calculation condition object.<br>If CalcCondition.Cond is not fulfilled, the dimension is excluded from the calculation and CalcCondition.Msg is evaluated.<br>By default, there is no calculation condition.<br>This property is optional. |
| `qAttributeExpressions` | array&lt;[`NxAttrExprDef`](#nxattrexprdef)> | N/A | List of attribute expressions. |
| `qAttributeDimensions` | array&lt;[`NxAttrDimDef`](#nxattrdimdef)> | N/A | List of attribute dimensions. |

## `NxTreeDimensionInfo`

**Stability Index: Experimental**

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qFallbackTitle` | string | N/A | Corresponds to the label of the dimension that is selected.<br>If the label is not defined then the field name is used. |
| `qApprMaxGlyphCount` | integer | N/A | Length of the longest value in the field. |
| `qCardinal` | integer | N/A | Number of distinct field values. |
| `qLocked` | boolean | N/A | Is set to true if the field is locked. |
| `qSortIndicator` | string | N/A | Sort indicator.<br>The default value is no sorting.<br>This parameter is optional.<br><br>One of:<br>- N or NX_SORT_INDICATE_NONE<br>- A or NX_SORT_INDICATE_ASC<br>- D or NX_SORT_INDICATE_DESC |
| `qGroupFallbackTitles` | array&lt;string> | N/A | Array of dimension labels.<br>Contains the labels of all dimensions in a hierarchy group (for example the labels of all dimensions in a drill down group). |
| `qGroupPos` | integer | N/A | Index of the dimension that is currently in use.<br>_qGroupPos_ is set to 0 if there are no hierarchical groups (drill-down groups) or cycle groups. |
| `qStateCounts` | [`NxStateCounts`](#nxstatecounts) | N/A | Number of values in a particular state. |
| `qTags` | array&lt;string> | N/A | Gives information on a field. For example, it can return the type of the field.<br>Examples: key, text, ASCII |
| `qError` | [`NxValidationError`](#nxvalidationerror) | N/A | This parameter is optional.<br>Gives information on the error. |
| `qDimensionType` | string | N/A | Binary format of the field.<br><br>One of:<br>- D or NX_DIMENSION_TYPE_DISCRETE<br>- N or NX_DIMENSION_TYPE_NUMERIC<br>- T or NX_DIMENSION_TYPE_TIME |
| `qReverseSort` | boolean | N/A | If set to true, it inverts the sort criteria in the field. |
| `qGrouping` | string | N/A | Defines the grouping.<br><br>One of:<br>- N or GRP_NX_NONE<br>- H or GRP_NX_HIEARCHY<br>- C or GRP_NX_COLLECTION |
| `qIsSemantic` | boolean | N/A | If set to true, it means that the field is a semantic. |
| `qNumFormat` | [`FieldAttributes`](#fieldattributes) | N/A | Format of the field.<br>This parameter is optional. |
| `qIsAutoFormat` | boolean | N/A | This parameter is set to true if _qNumFormat_ is set to _U_ (unknown). The engine guesses the type of the field based on the field's definition. |
| `qGroupFieldDefs` | array&lt;string> | N/A | Array of field names. |
| `qMin` | number | N/A | Minimum value. |
| `qMax` | number | N/A | Maximum value. |
| `qContinuousAxes` | boolean | N/A | Is continuous axis used. |
| `qIsCyclic` | boolean | N/A | Is a cyclic dimension used. |
| `qDerivedField` | boolean | N/A | Is derived field is used as a dimension. |
| `qMeasureInfo` | array&lt;[`NxMeasureInfo`](#nxmeasureinfo)> | N/A | A List of measures to be calculated on this TreeDimension. |
| `qAttrExprInfo` | array&lt;[`NxAttrExprInfo`](#nxattrexprinfo)> | N/A | List of attribute expressions. |
| `qAttrDimInfo` | array&lt;[`NxAttrDimInfo`](#nxattrdiminfo)> | N/A | List of attribute dimensions. |
| `qCalcCondMsg` | string | N/A | The message displayed if calculation condition is not fulfilled. |
| `qIsCalculated` | boolean | N/A | True if this is a calculated dimension. |
| `qIsOneAndOnlyOne` | boolean | N/A | If set to true, it means that the field always has one and only one selected value. |
| `qCardinalities` | [`NxCardinalities`](#nxcardinalities) | N/A | Dimension Cardinalities |
| `qLibraryId` | string | N/A | Refers to a dimension stored in the library. |

## `NxTreeMultiRangeSelectInfo`

**Stability Index: Experimental**

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qRanges` | array&lt;[`NxTreeRangeSelectInfo`](#nxtreerangeselectinfo)> | N/A | An array of Ranges. |

## `NxTreeNode`

Represents a dimension in the tree.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qText` | string | N/A | The text version of the value, if available. |
| `qValue` | number | N/A | Value of the cell.<br>Is set to _NaN_ , if the value is not a number. |
| `qElemNo` | integer | N/A | Element number. |
| `qNodeNr` | integer | N/A | A generated number applicable to this page only. Used so that children can easily identify who their parents are. |
| `qParentNode` | integer | N/A | The qNodeNr of this node's parent for the current page. |
| `qRow` | integer | N/A | Row index in the data matrix.<br>The indexing starts from 0. |
| `qType` | string | N/A | Type of the cell.<br><br>One of:<br>- V or NX_DIM_CELL_VALUE<br>- E or NX_DIM_CELL_EMPTY<br>- N or NX_DIM_CELL_NORMAL<br>- T or NX_DIM_CELL_TOTAL<br>- O or NX_DIM_CELL_OTHER<br>- A or NX_DIM_CELL_AGGR<br>- P or NX_DIM_CELL_PSEUDO<br>- R or NX_DIM_CELL_ROOT<br>- U or NX_DIM_CELL_NULL<br>- G or NX_DIM_CELL_GENERATED |
| `qValues` | array&lt;[`NxTreeValue`](#nxtreevalue)> | N/A | The measures for this node. |
| `qNodes` | array&lt;[`NxTreeNode`](#nxtreenode)> | N/A | The children of this node in the tree structure. |
| `qAttrExps` | [`NxAttributeExpressionValues`](#nxattributeexpressionvalues) | N/A | Attribute expression values. |
| `qAttrDims` | [`NxAttributeDimValues`](#nxattributedimvalues) | N/A | Attribute dimension values. |
| `qMaxPos` | array&lt;number> | N/A | Total of the positive values in the current group of cells. |
| `qMinNeg` | array&lt;number> | N/A | Total of the negative values in the current group of cells. |
| `qCanExpand` | boolean | N/A | If set to true, it means that the cell can be expanded.<br>This parameter is not returned if it is set to false. |
| `qCanCollapse` | boolean | N/A | If set to true, it means that the cell can be collapsed.<br>This parameter is not returned if it is set to false. |
| `qState` | string | N/A | Selection State of the value.<br>The default state for a measure is L(Locked).<br><br>One of:<br>- L or LOCKED<br>- S or SELECTED<br>- O or OPTION<br>- D or DESELECTED<br>- A or ALTERNATIVE<br>- X or EXCLUDED<br>- XS or EXCL_SELECTED<br>- XL or EXCL_LOCKED<br>- NSTATES |

## `NxTreeRangeSelectInfo`

**Stability Index: Experimental**

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qRange` | [`Range`](#range) | N/A | [`Range`](#range) of values. |
| `qMeasureIx` | integer | N/A | Number of the measure to select.<br>Numbering starts from 0. |
| `qDimensionIx` | integer | N/A | Number of the dimension to select<br>measure from. Numbering starts from 0. |

## `NxTreeValue`

Represents a measure.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qText` | string | N/A | The text version of the value, if available. |
| `qValue` | number | N/A | Value of the cell.<br>Is set to _NaN_ , if the value is not a number. |
| `qAttrExps` | [`NxAttributeExpressionValues`](#nxattributeexpressionvalues) | N/A | Attribute expression values. |
| `qAttrDims` | [`NxAttributeDimValues`](#nxattributedimvalues) | N/A | Attribute dimension values. |

## `NxValidationError`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qErrorCode` | integer | N/A | Error code.<br>This parameter is always displayed in case of error. |
| `qContext` | string | N/A | Context related to the error, from the user app domain.<br>It can be the identifier of an object, a field name, a table name.<br>This parameter is optional. |
| `qExtendedMessage` | string | N/A | Internal information from the server.<br>This parameter is optional. |

## `NxVariableListItem`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qName` | string | N/A | Name of the variable. |
| `qDescription` | string | N/A | Description of the variable. |
| `qDefinition` | string | N/A | Definition of the variable. It can be a value or an expression. |
| `qIsConfig` | boolean | N/A | If set to true, it means that the variable is a system variable.<br>A system variable provides information about the system and is set by the engine. The content cannot be changed by the user.<br>This parameter is optional.<br>The default value is false. |
| `qIsReserved` | boolean | N/A | If set to true, it means that the variable is reserved.<br>The default value is false.<br>This parameter is optional.<br>Examples:<br>- _ScriptError_ is a reserved variable, set by the engine.<br>- _DayNames_ is a reserved variable, set by the user. |
| `qMeta` | [`NxMeta`](#nxmeta) | N/A | Information about publishing and permissions.<br>This parameter is optional. |
| `qInfo` | [`NxInfo`](#nxinfo) | N/A | Identifier and type of the object.<br>This parameter is mandatory. |
| `qData` | [`JsonObject`](#jsonobject) | N/A | Data. |
| `qIsScriptCreated` | boolean | N/A | If set to true, it means that the variable was defined via script. |

## `NxVariableProperties`

!!! warning "Deprecated"
    This definition is deprecated and should not be used

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qName` | string | N/A | Name of the variable. |
| `qNumberPresentation` | [`FieldAttributes`](#fieldattributes) | N/A | Defines the format of the value of a variable. |
| `qIncludeInBookmark` | boolean | N/A | Set this property to true to update the variable when applying a bookmark.<br>The value of a variable can affect the state of the selections.<br>The default value is false. |
| `qUsePredefListedValues` | boolean | N/A | The value of a variable can be an enumeration.<br>Set this property to true to reflect the predefined values in an enumeration. |
| `qPreDefinedList` | array&lt;string> | N/A | List of enumerations.<br>This property is used if _qUsePredefListedValues_ is set to true. |

## `NxViewPort`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qWidth` | integer | N/A | Width of the canvas in pixels. |
| `qHeight` | integer | N/A | Height of the canvas in pixels. |
| `qZoomLevel` | integer | N/A | Zoom level. |

## `ObjectInterface`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qType` | string | N/A | The native type of the object. |
| `qHandle` | integer | N/A | The handle used to connect to object. |
| `qGenericType` | string | N/A | The type of the object. |
| `qGenericId` | string | N/A | Object ID. |

## `OdbcDsn`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qName` | string | N/A | Name of the ODBC connection. |
| `qDescription` | string | N/A | Description of the ODBC connection. |
| `qBit32` | boolean | N/A | Is set to true if the version of ODBC is 32-bit.<br>This parameter is optional. Default is false. |
| `qUserOnly` | boolean | N/A | Is set to true if the connection is User DSN. The connection works only for a specific user.<br>Default is false.<br>This parameter is optional. |

## `OleDbProvider`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qName` | string | N/A | Name of the OLEDB provider. |
| `qDescription` | string | N/A | Description of the OLEDB provider. |
| `qBit32` | boolean | N/A | Is set to true if the version of the OLEDB provider is 32-bit.<br>Default is false.<br>This parameter is optional. |

## `OtherTotalSpecProp`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qOtherMode` | string | OTHER_OFF | Determines how many dimension values are displayed.<br>The default value is _OTHER_OFF_ .<br><br>One of:<br>- OTHER_OFF<br>- OTHER_COUNTED<br>- OTHER_ABS_LIMITED<br>- OTHER_ABS_ACC_TARGET<br>- OTHER_REL_LIMITED<br>- OTHER_REL_ACC_TARGET |
| `qOtherCounted` | [`ValueExpr`](#valueexpr) | N/A | Number of values to display. The number of values can be entered as a calculated formula.<br>This parameter is used when _qOtherMode_ is set to _OTHER_COUNTED_ . |
| `qOtherLimit` | [`ValueExpr`](#valueexpr) | N/A | Value used to limit the dimension values. The limit can be entered as a calculated formula.<br>This parameter is used when _qOtherMode_ is set to:<br>- OTHER_ABS_LIMITED<br>- OTHER_REL_LIMITED<br>- OTHER_ABS_ACC_TARGET<br>OTHER_REL_ACC_TARGET |
| `qOtherLimitMode` | string | OTHER_GT_LIMIT | Sets the limit for the _Others_ mode.<br>This parameter is used when _qOtherMode_ is set to:<br>- OTHER_ABS_LIMITED<br>- OTHER_REL_LIMITED<br>- OTHER_ABS_ACC_TARGET<br>OTHER_REL_ACC_TARGET<br><br>One of:<br>- OTHER_GE_LIMIT<br>- OTHER_LE_LIMIT<br>- OTHER_GT_LIMIT<br>- OTHER_LT_LIMIT |
| `qSuppressOther` | boolean | N/A | If set to true, the group _Others_ is not displayed as a dimension value.<br>The default value is false. |
| `qForceBadValueKeeping` | boolean | true | This parameter is used when _qOtherMode_ is set to:<br>- OTHER_ABS_LIMITED<br>- OTHER_REL_LIMITED<br>- OTHER_ABS_ACC_TARGET<br>OTHER_REL_ACC_TARGET<br><br>and when the dimension values include not numeric values.<br>Set this parameter to true to include text values in the returned values.<br>The default value is true. |
| `qApplyEvenWhenPossiblyWrongResult` | boolean | true | Set this parameter to true to allow the calculation of _Others_ even if the engine detects some potential mistakes.<br>For example the country Russia is part of the continent Europe and Asia. If you have an hypercube with two dimensions Country and Continent and one measure Population, the engine can detect that the population of Russia is included in both the continent Asia and Europe.<br>The default value is true. |
| `qGlobalOtherGrouping` | boolean | N/A | This parameter applies to inner dimensions.<br>If this parameter is set to true, the restrictions are calculated on the selected dimension only. All previous dimensions are ignored.<br>The default value is false. |
| `qOtherCollapseInnerDimensions` | boolean | N/A | If set to true, it collapses the inner dimensions (if any) in the group _Others_ .<br>The default value is false. |
| `qOtherSortMode` | string | OTHER_SORT_DESCENDING | Defines the sort order of the dimension values.<br>The default value is _OTHER_SORT_DESCENDING_ .<br><br>One of:<br>- OTHER_SORT_DEFAULT<br>- OTHER_SORT_DESCENDING<br>- OTHER_SORT_ASCENDING |
| `qTotalMode` | string | TOTAL_OFF | If set to _TOTAL_EXPR_ , the total of the dimension values is returned.<br>The default value is _TOTAL_OFF_ .<br><br>One of:<br>- TOTAL_OFF<br>- TOTAL_EXPR |
| `qReferencedExpression` | [`StringExpr`](#stringexpr) | N/A | This parameter applies when there are several measures.<br>Name of the measure to use for the calculation of _Others_ for a specific dimension. |

## `Point`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qx` | integer | N/A | x-coordinate in pixels.<br>The origin is the top left of the screen. |
| `qy` | integer | N/A | y-coordinate in pixels.<br>The origin is the top left of the screen. |

## `ProgressData`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qStarted` | boolean | N/A | True if the request is started. |
| `qFinished` | boolean | N/A | True if the request is finished. |
| `qCompleted` | integer | N/A | This property is not used. |
| `qTotal` | integer | N/A | This property is not used. |
| `qKB` | integer | N/A | This property is not used. |
| `qMillisecs` | integer | N/A | Request duration in milliseconds. |
| `qUserInteractionWanted` | boolean | N/A | True when the engine pauses the script execution and waits for a user interaction. |
| `qPersistentProgress` | string | N/A | A progress message is persistent when it informs about the start or end of a statement. For example, it can inform about the total number of lines fetched from a data source or tell that the app was saved. All persistent progress messages between two *GetProgress* calls are summarized in this string. Contrarily to *qPersistentProgressMessages*, the content of the localized message string is displayed (not its message code). |
| `qTransientProgress` | string | N/A | A progress message is transient when it informs about the progress of an ongoing statement. For example, it can tell how many lines are currently fetched from a data source. All transient progress messages between two *GetProgress* calls are summarized in this string. Contrarily to *qTransientProgressMessage*, the content of the localized message string is displayed (not its message code). |
| `qErrorData` | array&lt;[`ErrorData`](#errordata)> | N/A | Information about the error messages that occur during the script execution. |
| `qPersistentProgressMessages` | array&lt;[`ProgressMessage`](#progressmessage)> | N/A | List of persistent progress messages. |
| `qTransientProgressMessage` | [`ProgressMessage`](#progressmessage) | N/A | Transient progress message. |

## `ProgressMessage`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qMessageCode` | integer | N/A | Code number to the corresponding localized message string. |
| `qMessageParameters` | array&lt;string> | N/A | Parameters to be inserted in the localized message string. |

## `Range`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qMin` | number | N/A | Lowest value in the range |
| `qMax` | number | N/A | Highest value in the range |
| `qMinInclEq` | boolean | N/A | If set to true, the range includes the lowest value in the range of selections (Equals to ). [bn(50500)]<br>Example:<br>The range is [1,10]. If _qMinInclEq_ is set to true it means that 1 is included in the range of selections. |
| `qMaxInclEq` | boolean | N/A | If set to true, the range includes the highest value in the range of selections (Equals to ). [bn(50500)]<br>Example:<br>The range is [1,10]. If _qMinInclEq_ is set to true it means that 10 is included in the range of selections. |

## `RangeSelectInfo`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qRangeLo` | number | -1e+300 | Lowest value in the range. |
| `qRangeHi` | number | -1e+300 | Highest value in the range. |
| `qMeasure` | string | N/A | Label of the measure. |

## `Rect`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qLeft` | integer | N/A | Position from the left.<br>Corresponds to the first column. |
| `qTop` | integer | N/A | Position from the top.<br>Corresponds to the first row. |
| `qWidth` | integer | N/A | Number of columns in the page. The indexing of the columns may vary depending on whether the cells are expanded or not (parameter _qAlwaysFullyExpanded_ in [`HyperCubeDef`](#hypercubedef) ). |
| `qHeight` | integer | N/A | Number of rows or elements in the page. The indexing of the rows may vary depending on whether the cells are expanded or not (parameter _qAlwaysFullyExpanded_ in [`HyperCubeDef`](#hypercubedef) ). |

## `SampleResult`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qFieldOrColumn` | [`FieldOrColumn`](#fieldorcolumn) | N/A | Name of field or column. |
| `qValues` | array&lt;[`FieldValue`](#fieldvalue)> | N/A | Matched values part of the sample. |

## `ScriptSyntaxError`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qErrLen` | integer | N/A | Length of the word where the error is located. |
| `qTabIx` | integer | N/A | Number of the faulty section. |
| `qLineInTab` | integer | N/A | Line number in the section where the error is located. |
| `qColInLine` | integer | N/A | Position of the erroneous text from the beginning of the line. |
| `qTextPos` | integer | N/A | Position of the erroneous text from the beginning of the script. |
| `qSecondaryFailure` | boolean | N/A | The default value is false. |

## `SearchAssociationResult`

!!! warning "Deprecated"
    This definition is deprecated and should not be used

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qFieldNames` | array&lt;string> | N/A | List of the fields that contains search associations. |
| `qSearchTerms` | array&lt;string> | N/A | List of the search terms. |
| `qFieldDictionaries` | array&lt;[`SearchFieldDictionary`](#searchfielddictionary)> | N/A | Information about the fields containing search hits. |
| `qSearchTermsMatched` | array&lt;[`SearchMatchCombinations`](#searchmatchcombinations)> | N/A | List of search results.<br>The maximum number of search results in this list is set by _qPage/qCount_ . |
| `qTotalSearchResults` | integer | N/A | Total number of search results.<br>This number is not limited by _qPage/qCount_ . |

## `SearchAttribute`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qKey` | string | N/A | String corresponding to _SearchObjectOptions.qAttributes_. It will be _qProperty_ for [`SearchObjectOptions`](#searchobjectoptions). |
| `qValue` | string | N/A | String corresponding to _qKey_ for the current [`SearchGroupItemMatch`](#searchgroupitemmatch). For example, if the match is _Make by Price_ found in the title of a generic object, _qValue_ will be _qMetaDef/title_. |

## `SearchCharRange`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qCharPos` | integer | N/A | Starting position of the match in the search result, starting from 0. |
| `qCharCount` | integer | N/A | Length of the match in the search result. |
| `qTerm` | integer | N/A | Position of the term in the list of search terms, starting from 0. |

## `SearchCombinationOptions`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qSearchFields` | array&lt;string> | N/A | List of the search fields.<br>If empty, the search is performed in all fields of the app. |
| `qContext` | string | CONTEXT_LOCKED_FIELDS_ONLY | Search context.<br>The default value is _LockedFieldsOnly_ .<br><br>One of:<br>- Cleared or CONTEXT_CLEARED<br>- LockedFieldsOnly or CONTEXT_LOCKED_FIELDS_ONLY<br>- CurrentSelections or CONTEXT_CURRENT_SELECTIONS |
| `qCharEncoding` | string | CHAR_ENCODING_UTF8 | Encoding used to compute qRanges of type SearchCharRange.<br>Only affects the computation of the ranges. It does not impact the encoding of the text.<br><br>One of:<br>- Utf8 or CHAR_ENCODING_UTF8<br>- Utf16 or CHAR_ENCODING_UTF16 |
| `qAttributes` | array&lt;string> | N/A | Optional.<br>- For SearchSuggest method, this array is empty.<br>- For SearchObjects method, this array is empty or contain _qProperty_ .<br>- For SearchResults method, this array is empty, or contains _qNum_ and/or _qElemNum_ . It allows the user to request details in the outputted [`SearchGroupItemMatch`](#searchgroupitemmatch) . For more information, see [`SearchGroupItemMatch`](#searchgroupitemmatch). |

## `SearchFieldDictionary`

!!! warning "Deprecated"
    This definition is deprecated and should not be used

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qField` | integer | N/A | Position of the field in the list of fields, starting from 0.<br>The list of fields is defined in _qResults/qFieldNames_ and contains the search associations. |
| `qResult` | array&lt;[`SearchTermResult`](#searchtermresult)> | N/A | List of the matching values.<br>The maximum number of values in this list is set by _qMaxNbrFieldMatches_ . |

## `SearchFieldMatch`

!!! warning "Deprecated"
    This definition is deprecated and should not be used

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qField` | integer | N/A | Position of the field in the list of fields, starting from 0.<br>The list of fields is defined in _qResults/qFieldNames_ and contains the search associations. |
| `qValues` | array&lt;integer> | N/A | Positions of the matching values in the search results.<br>The maximum number of values in this list is defined by _qMaxNbrFieldMatches_ . |
| `qTerms` | array&lt;integer> | N/A | Positions of the search terms, starting from 0. |
| `qNoOfMatches` | integer | N/A | Number of search hits in the field.<br>The number of values in _qValues_ and the value of _qNoOfMatches_ are equal if _qMaxNbrFieldMatches_ is -1. |

## `SearchGroup`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qId` | integer | N/A | Identifier of the search group. |
| `qGroupType` | string | N/A | Type of the search group.<br><br>One of:<br>- DatasetType or DATASET_GROUP<br>- GenericObjectsType or GENERIC_OBJECTS_GROUP |
| `qSearchTermsMatched` | array&lt;integer> | N/A | Indexes of the search terms that are included in the group. These search terms are related to the list of terms defined in _SearchResult.qSearchTerms_ . |
| `qTotalNumberOfItems` | integer | N/A | Total number of distinct items in the search group. |
| `qItems` | array&lt;[`SearchGroupItem`](#searchgroupitem)> | N/A | List of items in the search group.<br>The group items are numbered from the value of _SearchGroupOptions.qOffset_ to the value of _SearchGroupOptions.qOffset_ \+ _SearchGroupOptions.qCount_ |

## `SearchGroupItem`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qItemType` | string | N/A | Type of the group item.<br><br>One of:<br>- Field or FIELD<br>- GenericObject or GENERIC_OBJECT |
| `qTotalNumberOfMatches` | integer | N/A | Total number of distinct matches in the search group item. |
| `qIdentifier` | string | N/A | Identifier of the item.<br>It corresponds to:<br>- The name of the field, if the type of the search group is data set.<br>- The id of the generic object if the type of the search group is generic object. |
| `qItemMatches` | array&lt;[`SearchGroupItemMatch`](#searchgroupitemmatch)> | N/A | List of matches in the search group item.<br>The group item matches are numbered from the value of _SearchGroupItemOptions.qOffset_ to the value of _SearchGroupItemOptions.qOffset_ \+ _SearchGroupItemOptions.qCount_ . |
| `qSearchTermsMatched` | array&lt;integer> | N/A | Indexes of the search terms that are included in the group item. These search terms are related to the list of terms defined in _SearchResult.qSearchTerms_ . |

## `SearchGroupItemMatch`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qText` | string | N/A | Search match value.<br>Value of the search group item.<br>If the match is found in a field, it corresponds to the value of the field.<br>If the match is found in a generic object property, it corresponds to the property value. |
| `qFieldSelectionMode` | undefined | N/A | Selection mode of a field.<br>Suppressed by default. One and always one field value is selected when set to _OneAndOnlyOne_. |
| `qRanges` | array&lt;[`SearchCharRange`](#searchcharrange)> | N/A | List of ranges.<br>For example, if the search terms are Price and Make, and the search group item value is Make by Price vs Mileage, then there are two ranges: one for Price and one for Make. |
| `qAttributes` | array&lt;[`SearchAttribute`](#searchattribute)> | N/A | Provides detail of the match as requested by the user in _SearchObjectsOptions.qAttributes_ or _SearchCombinationOptions.qAttributes_<br>If the user requests _SearchObjects_ or _SearchResults_ with an empty _qAttributes_ option, the outputted _qAttributes_ is returned empty.<br>For _SearchObjects_ requested with _qProperty_ , the _SearchGroupItemMatch.qAttributes_ return value contains _[“qProperty”, "qMetaDef/title”]_ if the match has been found in the title of the item. For dimension values, the returned _qProperty_ will be _“*”_ .<br>For _SearchResults_ requested with _qNum_ , the _SearchGroupItemMatch.qAttributes_ return value contains _["qNum", N]_ where _N_ is the numeric value of the element or _NaN_ if the value is not numeric.<br>For _SearchResults_ requested with _qElemNum_ , the _SearchGroupItemMatch.qAttributes_ return value contains _["qElemNum", N]_ where _N_ is the value index of the element. |

## `SearchGroupItemOptions`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qGroupItemType` | string | N/A | Type of the group item. Can be:<br>- GenericObject: the type of the search group item is a generic object. Group items have this type when you are calling _SearchObjects_ .<br>- Field: the type of the search group item is a field. Group items have this type when you are calling _SearchResults_ .<br><br>One of:<br>- Field or FIELD<br>- GenericObject or GENERIC_OBJECT |
| `qOffset` | integer | N/A | Position starting from 0.<br>The default value is 0. |
| `qCount` | integer | -1 | Maximum number of matches per item (in _qItemMatches[ ]_ ).<br>The default value is -1: all values are returned. |

## `SearchGroupOptions`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qGroupType` | string | N/A | Type of the group. Can be:<br>- GenericObjectType: the type of the search group item is a generic object. Groups have this type when you are calling _SearchObjects_ .<br>- DatasetType: type of the search group item is a dataset association. Groups have this type when you are calling _SearchResults_ .<br><br>One of:<br>- DatasetType or DATASET_GROUP<br>- GenericObjectsType or GENERIC_OBJECTS_GROUP |
| `qOffset` | integer | N/A | Position starting from 0.<br>The default value is 0. |
| `qCount` | integer | -1 | Maximum number of items per group (in _qItems[ ]_ ).<br>The default value is -1; all values are returned. |

## `SearchMatchCombination`

!!! warning "Deprecated"
    This definition is deprecated and should not be used

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qId` | integer | N/A | Index of the search result, starting from 0. |
| `qFieldMatches` | array&lt;[`SearchFieldMatch`](#searchfieldmatch)> | N/A | Information about the search matches. |


## `SearchObjectOptions`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qAttributes` | array&lt;string> | N/A | This array is either empty or contains _qProperty_ . |
| `qCharEncoding` | string | CHAR_ENCODING_UTF8 | Encoding used to compute qRanges of type SearchCharRange.<br>Only affects the computation of the ranges. It does not impact the encoding of the text.<br><br>One of:<br>- Utf8 or CHAR_ENCODING_UTF8<br>- Utf16 or CHAR_ENCODING_UTF16 |

## `SearchPage`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qOffset` | integer | N/A | Position from the top, starting from 0.<br>If the offset is set to 0, the first search result to be returned is at position 0. |
| `qCount` | integer | N/A | Number of search groups to return (in _qSearchGroupArray_ ). |
| `qMaxNbrFieldMatches` | integer | -1 | Maximum number of matching values to return per search result.<br>The default value is -1; all values are returned.<br>This property is to be used with the _SearchAssociations method_. |
| `qGroupOptions` | array&lt;[`SearchGroupOptions`](#searchgroupoptions)> | N/A | Options of the search groups.<br>If this property is not set, all values are returned.<br>This property is to be used with the _SearchResults method_ or the _SearchObjects method_. |
| `qGroupItemOptions` | array&lt;[`SearchGroupItemOptions`](#searchgroupitemoptions)> | N/A | Options of the search group items.<br>If this property is not set, all values are returned.<br>This property is to be used with the _SearchResults method_ or the _SearchObjects method_. |

## `SearchResult`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qSearchTerms` | array&lt;string> | N/A | List of the search terms. |
| `qTotalNumberOfGroups` | integer | N/A | Total number of groups. |
| `qSearchGroupArray` | array&lt;[`SearchGroup`](#searchgroup)> | N/A | List of search groups.<br>The groups are numbered from the value of _SearchPage.qOffset_ to the value of _SearchPage.qOffset + SearchPage.qCount_ . |

## `SearchSuggestItem`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qValue` | string | N/A | Value of the suggestion. |
| `qTerm` | integer | N/A | Index of the suggestion value.<br>The indexing starts from 0 and from the left. |

## `SearchSuggestionResult`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qSuggestions` | array&lt;[`SearchSuggestItem`](#searchsuggestitem)> | N/A | List of suggestions. |
| `qFieldNames` | array&lt;string> | N/A | List of field names that contain search hits. |

## `SearchTermResult`

!!! warning "Deprecated"
    This definition is deprecated and should not be used

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qText` | string | N/A | Text of the associated value. |
| `qElemNumber` | integer | N/A | Element number of the associated value. |
| `qRanges` | array&lt;[`SearchCharRange`](#searchcharrange)> | N/A | List of ranges.<br>For example, if the user searches the term _read_ and the associative value is _Reading_ , then the corresponding range would be _Read_ in _Reading_ . |

## `SelectInfo`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qTextSearch` | string | N/A | Text search string.<br>Everything that matches the text is selected.<br>This parameter is optional. |
| `qRangeLo` | number | -1e+300 | Lower value of the search range.<br>This parameter is used when performing range selections or text searches in dimensions.<br>Default is Null. |
| `qRangeHi` | number | -1e+300 | Highest value of the search range.<br>This parameter is used when performing range selections or text searches in dimensions.<br>Default is Null. |
| `qNumberFormat` | [`FieldAttributes`](#fieldattributes) | N/A | Gives information about the formatting of the range.<br>This parameter is used when performing range selections or text searches in dimensions. |
| `qRangeInfo` | array&lt;[`RangeSelectInfo`](#rangeselectinfo)> | N/A | This parameter is used when performing range selections or text searches in measures.<br>Gives information about the range of selections. |
| `qSoftLock` | boolean | N/A | Set to true to ignore locks; in that case, locked fields can be selected.<br>The default value is false. |
| `qContinuousRangeInfo` | array&lt;[`Range`](#range)> | N/A | List of information about ranges for selections. |
| `qSelectFieldSearch` | boolean | N/A | This parameter is true if the TextSearch is a result of a Select Field operation. |

## `SelectionObject`

Indicates which selections are currently applied. It gives the current selections. Is the layout for [`SelectionObjectDef`](#selectionobjectdef).

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qBackCount` | integer | N/A | Number of steps back. |
| `qForwardCount` | integer | N/A | Number of steps forward. |
| `qSelections` | array&lt;[`NxCurrentSelectionItem`](#nxcurrentselectionitem)> | N/A | Lists the fields that are selected. |
| `qStateName` | string | N/A | Name of the alternate state.<br>Default is current selections _$_ . |

## `SelectionObjectDef`

To display the current selections.<br>Can be added to any generic object but is particularly meaningful when using session objects to monitor an app.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qStateName` | string | N/A | Name of the alternate state.<br>Default is current selections _$_ . |

## `Size`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qcx` | integer | N/A | Number of pixels on the _x_ axis. |
| `qcy` | integer | N/A | Number of pixels on the _y_ axis. |

## `SortCriteria`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qSortByState` | integer | N/A | Sorts the field values according to their logical state (selected, optional, alternative or excluded). |
| `qSortByFrequency` | integer | N/A | Sorts the field values by frequency (number of occurrences in the field). |
| `qSortByNumeric` | integer | N/A | Sorts the field values by numeric value. |
| `qSortByAscii` | integer | N/A | Sorts the field by alphabetical order. |
| `qSortByLoadOrder` | integer | N/A | Sorts the field values by the initial load order. |
| `qSortByExpression` | integer | N/A | Sorts the field by expression. |
| `qExpression` | [`ValueExpr`](#valueexpr) | N/A | Sort by expression. |
| `qSortByGreyness` | integer | N/A | _No description._ |

## `SourceKeyRecord`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qKeyFields` | array&lt;string> | N/A | Name of the key field. |
| `qTables` | array&lt;string> | N/A | Table the key belongs to. |

## `StaticContentList`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qItems` | array&lt;[`StaticContentListItem`](#staticcontentlistitem)> | N/A | Information about the list of content files. |

## `StaticContentListItem`

In addition, this structure can return dynamic properties.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qUrlDef` | string | N/A | Relative path to the content file. The URL is static.<br>In Qlik Sense Enterprise, content files located:<br>- In the _/content/ &lt;content library name&gt;/_ folder are part of a global content library.<br>- In the _/appcontent/_ folder are part of the app specific library.<br>The content files are never embedded in the _qvf_ file.<br>In Qlik Sense Desktop, content files located:<br>- In the _/content/default/_ folder are outside the qvf file.<br>- In the _/media/ folder_ are embedded in the qvf file. |
| `qUrl` | string | N/A | Relative path to the content file. The URL is static.<br>In Qlik Sense Enterprise, content files located:<br>- In the _/content/ &lt;content library name&gt;/_ folder are part of a global content library.<br>- In the _/appcontent/_ folder are part of the app specific library.<br>The content files are never embedded in the _qvf_ file.<br>In Qlik Sense Desktop, content files located:<br>- In the _/content/default/_ folder are outside the qvf file.<br>- In the _/media/ folder_ are embedded in the qvf file. |

## `StaticContentUrl`

In addition, this structure can return dynamic properties.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qUrl` | string | N/A | Relative path of the thumbnail. |

## `StaticContentUrlDef`

In addition, this structure can contain dynamic properties.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qUrl` | string | N/A | Relative path of the thumbnail. |

## `StringExpr`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qv` | string | N/A | Expression evaluated to string. |

## `StringExpression`



| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qExpr` | string | N/A | _No description._ |

## `TableRecord`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qName` | string | N/A | Name of the table. |
| `qLoose` | boolean | N/A | This property is set to true if the table is loose. |
| `qNoOfRows` | integer | N/A | Number of rows in the table. |
| `qFields` | array&lt;[`FieldInTableData`](#fieldintabledata)> | N/A | Information about the fields in the table. |
| `qPos` | [`Point`](#point) | N/A | Information about the position of the table. |
| `qComment` | string | N/A | Comment related to the table. |
| `qIsDirectDiscovery` | boolean | N/A | If set to true, Direct Discovery is used.<br>Direct Discovery fields are not loaded into memory and remain in the external database. |
| `qIsSynthetic` | boolean | N/A | This property is set to true if the table contains a synthetic key. |

## `TableRow`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qValue` | array&lt;[`FieldValue`](#fieldvalue)> | N/A | Array of field values. |

## `TableViewBroomPointSaveInfo`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qPos` | [`Point`](#point) | N/A | Information about the position of the broom point. |
| `qTable` | string | N/A | Name of the table. |
| `qFields` | array&lt;string> | N/A | List of fields in the table. |

## `TableViewConnectionPointSaveInfo`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qPos` | [`Point`](#point) | N/A | Information about the position of the connection point. |
| `qFields` | array&lt;string> | N/A | List of the fields in the table. |

## `TableViewCtlSaveInfo`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qInternalView` | [`TableViewSaveInfo`](#tableviewsaveinfo) | N/A | Internal view mode. |
| `qSourceView` | [`TableViewSaveInfo`](#tableviewsaveinfo) | N/A | Source view mode. |

## `TableViewDlgSaveInfo`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qPos` | [`Rect`](#rect) | N/A | Information about the position of the dialog window.<br>Not used in Qlik Sense. |
| `qCtlInfo` | [`TableViewCtlSaveInfo`](#tableviewctlsaveinfo) | N/A | Set of data for internal and source view modes. |
| `qMode` | integer | N/A | View mode to display when opening Qlik Sense data model viewer.<br>One of:<br>- 0 for internal view mode.<br>- 1 for source view mode. |

## `TableViewSaveInfo`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qTables` | array&lt;[`TableViewTableWinSaveInfo`](#tableviewtablewinsaveinfo)> | N/A | List of the tables in the database model viewer. |
| `qBroomPoints` | array&lt;[`TableViewBroomPointSaveInfo`](#tableviewbroompointsaveinfo)> | N/A | List of the broom points in the database model viewer.<br>Not used in Qlik Sense. |
| `qConnectionPoints` | array&lt;[`TableViewConnectionPointSaveInfo`](#tableviewconnectionpointsaveinfo)> | N/A | List of connection points in the database model viewer.<br>Not used in Qlik Sense. |
| `qZoomFactor` | number | 1 | Zoom factor in the database model viewer.<br>The default value is 1.0. |

## `TableViewTableWinSaveInfo`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qPos` | [`Rect`](#rect) | N/A | Information about the position of the table. |
| `qCaption` | string | N/A | Table name. |

## `TextMacro`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qTag` | string | N/A | Name of the variable. |
| `qRefSeqNo` | integer | N/A | Order in which the variable was referenced during the script execution.<br>The same number sequence is used for both _qRefSeqNo_ and _qSetSeqNo_ . |
| `qSetSeqNo` | integer | N/A | Order in which the variable was updated during the script execution.<br>The same number sequence is used for both _qRefSeqNo_ and _qSetSeqNo_ . |
| `qDisplayString` | string | N/A | Variable value. |
| `qIsSystem` | boolean | N/A | Is set to true if the variable is a system variable. |
| `qIsReserved` | boolean | N/A | Is set to true if the variable is a reserved variable. |

## `TreeData`

**Stability Index: Experimental**

Renders the properties of a [`TreeData`](#treedata) object. Is the layout for TreeDataDef.<br>For more information about the definition of TreeData, see _Generic object_.<br>To retrieve data from the [`TreeData`](#treedata) object, use the method called GetHyperCubeTreeData.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qStateName` | string | N/A | Name of the alternate state.<br>Default is current selections _$_ . |
| `qNodesOnDim` | array&lt;integer> | N/A | The total number of nodes on each dimension. |
| `qError` | [`NxValidationError`](#nxvalidationerror) | N/A | This parameter is optional and is displayed in case of error. |
| `qDimensionInfo` | array&lt;[`NxTreeDimensionInfo`](#nxtreedimensioninfo)> | N/A | Information on the dimension. |
| `qEffectiveInterColumnSortOrder` | array&lt;integer> | N/A | Defines the order of the dimenion levels/columns in the [`TreeData`](#treedata) object.<br>Column numbers are separated by a comma.<br>Example: [1,0,2] means that the first level in the tree structure is dimension 1, followed by dimension 0 and dimension 2. |
| `qHasOtherValues` | boolean | N/A | True if other row exists. |
| `qTitle` | string | N/A | Title of the [`TreeData`](#treedata) object, for example the title of a chart. |
| `qLastExpandedPos` | [`NxCellPosition`](#nxcellposition) | N/A | Position of the last expended cell.<br>This property is optional. |
| `qCalcCondMsg` | string | N/A | The message displayed if calculation condition is not fulfilled. |
| `qTreeDataPages` | array&lt;[`NxTreeNode`](#nxtreenode)> | N/A | Set of data.<br>Is empty if nothing has been defined in **qInitialDataFetch** in [`TreeDataDef`](#treedatadef). |

## `TreeDataDef`

**Stability Index: Experimental**

Defines the properties of a [`TreeData`](#treedata) object.<br>For more information about the definition of a [`TreeData`](#treedata) object, see _Generic object_.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qStateName` | string | N/A | Name of the alternate state.<br>Default is current selections _$_ . |
| `qDimensions` | array&lt;[`NxTreeDimensionDef`](#nxtreedimensiondef)> | N/A | Array of dimensions. |
| `qInterColumnSortOrder` | array&lt;integer> | N/A | Defines the order of the dimension levels/columns in the [`TreeData`](#treedata) object.<br>Column numbers are separated by a comma.<br>Example: [1,0,2] means that the first level in the tree structure is dimension 1, followed by dimension 0 and dimension 2.<br>The default sort order is the order in which the dimensions and measures have been defined in the TreeDataDef. |
| `qSuppressZero` | boolean | N/A | Removes zero values. |
| `qSuppressMissing` | boolean | N/A | Removes missing values. |
| `qOpenFullyExpanded` | boolean | N/A | If this property is set to true, the cells are opened expanded. The default value is false. |
| `qPopulateMissing` | boolean | N/A | If this property is set to true, the missing symbols (if any) are replaced by 0 if the value is a numeric and by an empty string if the value is a string.<br>The default value is false. |
| `qCalcCondition` | [`NxCalcCond`](#nxcalccond) | N/A | Specifies a calculation condition object.<br>If CalcCondition.Cond is not fulfilled, the [`TreeData`](#treedata) is excluded from the calculation and CalcCondition.Msg is evaluated.<br>By default, there is no calculation condition.<br>This property is optional. |
| `qTitle` | [`StringExpr`](#stringexpr) | N/A | Title of the [`TreeData`](#treedata) object, for example the title of a chart. |
| `qInitialDataFetch` | array&lt;[`NxTreeDataOption`](#nxtreedataoption)> | N/A | Initial data set.<br>This property is optional. |

## `UndoInfo`

Displays information about the number of possible undos and redos. Is the layout for [`UndoInfoDef`](#undoinfodef).

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qUndoCount` | integer | N/A | Number of possible undos. |
| `qRedoCount` | integer | N/A | Number of possible redos. |


## `ValueExpr`

_No description._

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qv` | string | N/A | Expression evaluated to dual. |

## `ValueExpression`



| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qExpr` | string | N/A | _No description._ |

## `VariableList`

Lists the variables in an app. Is the layout for [`VariableListDef`](#variablelistdef).

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qItems` | array&lt;[`NxVariableListItem`](#nxvariablelistitem)> | N/A | List of the variables. |

## `VariableListDef`

Defines the list of variables in an app.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `qType` | string | N/A | Type of variables to include in the list. |
| `qShowReserved` | boolean | N/A | Shows the reserved variables if set to true. |
| `qShowConfig` | boolean | N/A | Shows the system variables if set to true. |
| `qData` | [`JsonObject`](#jsonobject) | N/A | Data |
| `qShowSession` | boolean | N/A | Shows the session variables if set to true. |