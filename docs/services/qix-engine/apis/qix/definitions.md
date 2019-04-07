
<!-- markdownlint-disable -->
<!-- proselint-disable -->
# Definitions

_QIX definitions for version 12.350.0._

## `AlfaNumString`

!!! warning "Deprecated"
    This definition is deprecated and should not be used

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qString` | string | Calculated value. |
| `qIsNum` | boolean | Is set to true if the value is a numeric. |

## `AlternateStateData`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qStateName` | string | Name of the alternate state.<br>Default is current selections: $ |
| `qFieldItems` | array&lt;[`BookmarkFieldItem`](#bookmarkfielditem)> | List of the selections. |

## `AppEntry`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qID` | string | Identifier of the app. |
| `qTitle` | string | Title of the app. |
| `qPath` | string | Path of the app. |
| `qLastReloadTime` | string | Last reload time of the app. |
| `qReadOnly` | boolean | Is set to true if the app is read-only. |
| `qMeta` | [`NxMeta`](#nxmeta) | Meta data. |
| `qThumbnail` | [`StaticContentUrl`](#staticcontenturl) | App thumbnail. |
| `qFileSize` | integer | _No description._ |
| `qHasSectionAccess` | boolean | If true the app has section access configured. |

## `AppObjectList`

Lists the app objects. Is the layout for [`AppObjectListDef`](#appobjectlistdef).<br>An app object is a generic object created at app level.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qItems` | array&lt;[`NxContainerEntry`](#nxcontainerentry)> | Information about the list of dimensions. |

## `AppObjectListDef`

Defines the list of objects in an app.<br>An app object is a generic object created at app level.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qType` | string | Type of the app list. |
| `qData` | [`JsonObject`](#jsonobject) | Data that you want to include in the app list definition.<br>You need to enter the paths to the information you want to retrieve. |

## `AppScript`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qScript` | string | Script text. |
| `qMeta` | [`NxMeta`](#nxmeta) | Information about publishing and permissions.<br>This parameter is optional. |


## `AssociationScore`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qFieldPairName` | string | Pair of fields.<br>_&lt; FieldName1&gt;_ / _&lt; FieldName2&gt;_<br>Where:<br>&lt; _FieldName1_ &gt; is a field in the table 1 (defined in _qTable1_ )<br>&lt; _FieldName2_ &gt; is a field in the table 2 (defined in _qTable2_ )<br>If the field is a synthetic key, the name of the field is preceded by _[Synthetic key]:_ . |
| `qScoreSummary` | integer | Flag used to interpret calculated scores.<br>One of the following values or sum of values that apply:<br>- 0: The cardinal ratio cannot be zero but the symbol score and the row score can be zero.<br>- -1: The fields do not have the same type.<br>- -2: The number of rows of the field _FieldName1_ is zero.<br>- -4: The number of distinct values of the field _FieldName1_ is zero.<br>- -8: The number of rows of the field _FieldName2_ is zero.<br>- -16: The number of distinct values of the field _FieldName2_ is zero.<br><br>Example:<br>The number of rows of the field _FieldName1_ is zero, and the number of distinct values of the field _FieldName2_ is zero, then _qScoreSummary_ is -18. |
| `qField1Scores` | [`FieldScores`](#fieldscores) | Association information about the field _FieldName1_ defined in _qFieldPairName_ . |
| `qField2Scores` | [`FieldScores`](#fieldscores) | Association information about the field _FieldName2_ defined in _qFieldPairName_ . |

## `BNFDef`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qBnf` | array&lt;integer> | Array of token references that all together build up the definition of the current token.<br>Generally, if the array is not empty, the definition is a BNF rule (_qIsBnfRule_ is set to true). However, some BNF  rules do have an empty array (_qIsBnfRule_ is set to true, but _qBnf_ is empty). |
| `qNbr` | integer | Number of the current token definition. |
| `qPNbr` | integer | Number of the parent rule definition. |
| `qHelpId` | integer | Reference identifier to a function described in the documentation. The identifier is stored in the definition of the token containing the function name.<br>Is not used in Qlik Sense. |
| `qName` | string | Token name.<br>One of:<br>- A rule name<br>- An identifier<br>- A literal value |
| `qStr` | string | Literal string of the token.<br>Examples: 'Round' and '('. |
| `qIsBnfRule` | boolean | If set to true, a list of related rule tokens is assigned to _qBnf_ .<br>This parameter is optional. The default value is false. |
| `qScriptStatement` | boolean | If set to true, the definition specifies a script statement.<br>This parameter is optional. The default value is false. |
| `qControlStatement` | boolean | If set to true, the definition specifies a control statement.<br>This parameter is optional. The default value is false. |
| `qBnfLiteral` | boolean | If set to true, the definition specifies a literal token.<br>This parameter is optional. The default value is false. |
| `qQvFunc` | boolean | If set to true, the definition is related to a Qlik Sense function. It cannot be an aggregation function.<br>This parameter is optional. The default value is false. |
| `qAggrFunc` | boolean | If set to true, the definition is related to an aggregation function.<br>This parameter is optional. The default value is false. |
| `qFG` | string | Group of the function.<br><br>One of:<br>- ALL or FUNC_GROUP_ALL<br>- U or FUNC_GROUP_UNKNOWN<br>- NONE or FUNC_GROUP_NONE<br>- AGGR or FUNC_GROUP_AGGR<br>- NUM or FUNC_GROUP_NUMERIC<br>- RNG or FUNC_GROUP_RANGE<br>- EXP or FUNC_GROUP_EXPONENTIAL_AND_LOGARITHMIC<br>- TRIG or FUNC_GROUP_TRIGONOMETRIC_AND_HYPERBOLIC<br>- FIN or FUNC_GROUP_FINANCIAL<br>- MATH or FUNC_GROUP_MATH_CONSTANT_AND_PARAM_FREE<br>- COUNT or FUNC_GROUP_COUNTER<br>- STR or FUNC_GROUP_STRING<br>- MAPP or FUNC_GROUP_MAPPING<br>- RCRD or FUNC_GROUP_INTER_RECORD<br>- CND or FUNC_GROUP_CONDITIONAL<br>- LOG or FUNC_GROUP_LOGICAL<br>- NULL or FUNC_GROUP_NULL<br>- SYS or FUNC_GROUP_SYSTEM<br>- FILE or FUNC_GROUP_FILE<br>- TBL or FUNC_GROUP_TABLE<br>- DATE or FUNC_GROUP_DATE_AND_TIME<br>- NUMI or FUNC_GROUP_NUMBER_INTERPRET<br>- FRMT or FUNC_GROUP_FORMATTING<br>- CLR or FUNC_GROUP_COLOR<br>- RNK or FUNC_GROUP_RANKING<br>- GEO or FUNC_GROUP_GEO<br>- EXT or FUNC_GROUP_EXTERNAL<br>- PROB or FUNC_GROUP_PROBABILITY<br>- ARRAY or FUNC_GROUP_ARRAY<br>- LEG or FUNC_GROUP_LEGACY |
| `qFieldFlag` | boolean | If set to true, the definition is related to a field.<br>This parameter is optional. The default value is false. |
| `qMT` | string | Type of the data.<br><br>One of:<br>- N or NOT_META<br>- D or META_DOC_NAME<br>- R or META_RET_TYPE<br>- V or META_DEFAULT_VALUE |
| `qDepr` | boolean | Indicates whether a script statement, a chart or a script function is deprecated (not recommended for use).<br>If set to true, the script statement or the function is not recommended for use in Qlik Sense.<br>This parameter is optional. The default value is false. |
| `qFGList` | undefined | List of groups the function belongs to. |

## `BookmarkFieldItem`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qDef` | [`FieldDefEx`](#fielddefex) | Name and type of the field. |
| `qLocked` | boolean | Indicates if the field is locked.<br>Default is false. |
| `qSelectInfo` | [`SelectInfo`](#selectinfo) | Information on the selections criteria. |
| `qValues` | array&lt;[`FieldValue`](#fieldvalue)> | _No description._ |
| `qExcludedValues` | array&lt;[`FieldValue`](#fieldvalue)> | List of excluded values.<br>Either the list of selected values or the list of excluded values is displayed. |
| `qAndMode` | boolean | If set to true, selections within a list object are made in AND mode; If you have a list object that lists all customers, by selecting Customer 1 and Customer 2 while in and-mode, all records that are associated with Customer 1 **and** Customer 2 are selected.<br>The default value is false; selections within a list object are made in OR mode. If you have a list object that lists all customers, by selecting Customer 1 and Customer 2 while in or-mode, all records that are associated with either Customer 1 **or** Customer 2 are selected.<br>This parameter is not returned if set to false. |
| `qOneAndOnlyOne` | boolean | If set to true, the field has always one selection (not 0 and not more than 1). If another value is selected, the previous one is unselected.<br>The default value is false. This parameter is not returned if set to false. |

## `BookmarkFieldPage`

Defines the range of the bookmark fields that are returned.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qStartIndex` | integer | The start value of the range. |
| `qEndIndex` | integer | The end value of the range. |

## `BookmarkList`

Lists the bookmarks. Is the layout for [`BookmarkListDef`](#bookmarklistdef).

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qItems` | array&lt;[`NxContainerEntry`](#nxcontainerentry)> | Information about the list of bookmarks. |

## `BookmarkListDef`

Defines the list of bookmarks.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qType` | string | Type of the list. |
| `qData` | [`JsonObject`](#jsonobject) | Data |

## `BookmarkVariableItem`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qName` | string | Name of the variable. |
| `qValue` | [`FieldValue`](#fieldvalue) | Value of the variable. |

## `CalendarStrings`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qDayNames` | array&lt;string> | List of short day names. |
| `qMonthNames` | array&lt;string> | List of short month names. |
| `qLongDayNames` | array&lt;string> | List of long day names. |
| `qLongMonthNames` | array&lt;string> | List of long month names. |

## `CharRange`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qCharPos` | integer | Position of the first search occurrence. |
| `qCharCount` | integer | Number of occurrences found. |

## `ChildList`

Lists the children of a generic object. Is the layout for [`ChildListDef`](#childlistdef).<br>ChildList is used by the _GetLayout Method_ to list the children of a generic object. 

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qItems` | array&lt;[`NxContainerEntry`](#nxcontainerentry)> | Information about the items in the app object. |

## `ChildListDef`

Defines the list of children of a generic object.<br>What is defined in [`ChildListDef`](#childlistdef) has an impact on what the _GetLayout_ method returns. See _Example_ for more information.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qData` | [`JsonObject`](#jsonobject) | Data that you want to include in the child list definition.<br>You need to enter the paths to the information you want to retrieve. |

## `CodePage`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qNumber` | integer | Number of the code page. |
| `qName` | string | Name of the code page. |
| `qDescription` | string | Description of the code page. |

## `Connection`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qId` | string | Identifier of the connection.<br>Is generated by the engine and is unique. |
| `qName` | string | Name of the connection.<br>This parameter is mandatory and must be set when creating or modifying a connection. |
| `qConnectionString` | string | One of:<br>- ODBC CONNECT TO [&lt;provider name&gt;]<br>- OLEDB CONNECT TO [&lt;provider name&gt;]<br>- CUSTOM CONNECT TO [&lt;provider name&gt;]<br>- "&lt;local absolute or relative path, UNC path&gt;"<br>- "&lt;URL&gt;"<br><br>Connection string.<br>This parameter is mandatory and must be set when creating or modifying a connection. |
| `qType` | string | One of:<br>- ODBC<br>- OLEDB<br>- &lt;Name of the custom connection file&gt;<br>- folder<br>- internet<br><br>Type of the connection.<br>This parameter is mandatory and must be set when creating or modifying a connection.<br>For ODBC, OLEDB and custom connections, the engine checks that the connection type matches the connection string.<br>The type is not case sensitive. |
| `qUserName` | string | Name of the user who creates the connection.<br>This parameter is optional; it is only used for OLEDB, ODBC and CUSTOM connections.<br>A call to _GetConnection Method_ does not return the user name. |
| `qPassword` | string | Password of the user who creates the connection.<br>This parameter is optional; it is only used for OLEDB, ODBC and CUSTOM connections.<br>A call to _GetConnection Method_ does not return the password. |
| `qModifiedDate` | string | Is generated by the engine.<br>Creation date of the connection or last modification date of the connection. |
| `qMeta` | [`NxMeta`](#nxmeta) | Information about the connection. |
| `qLogOn` | string | Select which user credentials to use to connect to the source.<br>- LOG_ON_SERVICE_USER: Disables<br>- LOG_ON_CURRENT_USER: Enables<br><br>One of:<br>- LOG_ON_SERVICE_USER<br>- LOG_ON_CURRENT_USER |

## `ContentLibraryList`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qItems` | array&lt;[`ContentLibraryListItem`](#contentlibrarylistitem)> | Information about the content library. |

## `ContentLibraryListItem`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qName` | string | Name of the library. |
| `qAppSpecific` | boolean | Is set to true if the library is specific to the app (not a global content library). |
| `qMeta` | [`NxMeta`](#nxmeta) | Information about publishing and permissions. |

## `CustomConnector`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qProvider` | string | Name of the custom connector file. |
| `qParent` | string | Name of the parent folder that contains the custom connector file. |
| `qDisplayName` | string | Name of the custom connector as displayed in the Qlik interface. |
| `qMachineMode` | string | Mode of the machine (64 or 32 bits).<br><br>One of:<br>- CONNECT_DEFAULT<br>- CONNECT_64<br>- CONNECT_32 |
| `qSupportFileStreaming` | boolean | _No description._ |

## `DataField`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qName` | string | Name of the field. |
| `qIsKey` | boolean | Is set to true if the field is a primary key. |
| `qOriginalFieldName` | string | Is shown for fixed records.<br>_qOriginalFieldName_ and _qName_ are identical if no field names are used in the file.<br>_qOriginalFieldName_ differs from _qName_ if embedded file names are used in the file. |

## `DataRecord`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qValues` | array&lt;string> | List of values inside the table.<br>The first values (in _result/qPreview/0/qValues_ ) correspond to the field names in the table.<br>The following values (from _result/qPreview/1/qValues_ ) are the values of the fields in the table. |

## `DataTable`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qName` | string | Name of the table. |
| `qType` | string | Type of the table.<br>For example: Table or View. |

## `DataTableEx`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qName` | string | Name of the table. |
| `qFields` | array&lt;[`DataField`](#datafield)> | List of the fields in the table. |
| `qFormatSpec` | string | List of format specification items, within brackets.<br>Examples of specification items:<br>- file type<br>- embedded labels, no labels<br>- table is &lt;table name&gt; |

## `Database`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qName` | string | Name of the database. |
| `qIsDefault` | boolean | Is set to true if the database is set by default. |

## `DatabaseInfo`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qDBMSName` | string | Name of the product accessed by the provider. |
| `qDBUsage` | boolean | If set to true, it means that the data source contains some databases. |
| `qOwnerUsage` | boolean | If set to true, it means that the data source contains some owners. |
| `qDBSeparator` | string | Character string used after the database name.<br>Example with separator " **.** ":<br>FROM LinkedTablesData.dbo.Months<br>Where:<br>- **LinkedTablesData** is the database name<br>- **dbo** is the owner name<br>- **Months** is the table name |
| `qOwnerSeparator` | string | Character string used after the owner name.<br>Example with separator " **.** ":<br>FROM LinkedTablesData.dbo.Months<br>Where:<br>- **LinkedTablesData** is the database name<br>- **dbo** is the owner name<br>- **Months** is the table name |
| `qDBFirst` | boolean | If set to true, it means that the database is displayed first, before the owners and tables. |
| `qQuotePreffix` | string | Prefix used with field, database or owner names that contain special characters or keywords. |
| `qQuoteSuffix` | string | Suffix used with field, database or owner names that contain special characters or keywords. |
| `qSpecialChars` | string | List of the special characters. |
| `qDefaultDatabase` | string | Name of the default database. |
| `qKeywords` | array&lt;string> | List of the script keywords. |

## `DatabaseOwner`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qName` | string | Name of the owner. |

## `DelimiterInfo`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qName` | string | Name of the delimiter.<br>Example:<br>"Tab_DELIMITER" |
| `qScriptCode` | string | Representation of the delimiter value that is used in the script.<br>Example:<br>"'\t'" |
| `qNumber` | integer | Delimiter character number used by the engine to determine how to separate the values. |
| `qIsMultiple` | boolean | Is set to true if multiple spaces are used to separate the values. |

## `DerivedFieldsInTableData`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qDefinitionName` | string | Name of the derived definition. |
| `qTags` | array&lt;string> | List of tags. |
| `qActive` | boolean | Is set to true is the derived field is in use. |

## `DimensionList`

Lists the dimensions. Is the layout for [`DimensionListDef`](#dimensionlistdef).

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qItems` | array&lt;[`NxContainerEntry`](#nxcontainerentry)> | Information about the list of dimensions. |

## `DimensionListDef`

Defines the lists of dimensions.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qType` | string | Type of the list. |
| `qData` | [`JsonObject`](#jsonobject) | Data |

## `DoReloadExParams`

Parameters for a reload.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qMode` | integer | 0: for default mode.<br>1: for ABEND; the reload of the script ends if an error occurs.<br>2: for ignore; the reload of the script continues even if an error is detected in the script. |
| `qPartial` | boolean | Set to true for partial reload.<br>The default value is false. |
| `qDebug` | boolean | Set to true to debug reload.<br>The default value is false. |
| `qReloadId` | string | Optional reload ID.<br>ID will be automatically generated if not set. |

## `DoReloadExResult`

The result and path to script log for a reload.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuccess` | boolean | The reload is successful if True. |
| `qScriptLogFile` | string | Path to the script log file. |

## `DocListEntry`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qDocName` | string | Name of the app. |
| `qConnectedUsers` | integer | Not used. |
| `qFileTime` | number | Last modified time stamp of the app.<br>This property is used only with Qlik Sense Desktop.<br>It is set to 0 for Qlik Sense Enterprise. |
| `qFileSize` | number | Size of remote app.<br>This property is used only with Qlik Sense Desktop.<br>It is set to 0 for Qlik Sense Enterprise. |
| `qDocId` | string | Identifier of the app.<br>- In Qlik Sense Desktop, the identifier is the path and name of the app.<br>- In Qlik Sense Enterprise, the identifier is the app's GUID. |
| `qMeta` | [`NxMeta`](#nxmeta) | Meta data related to the app. |
| `qLastReloadTime` | string | Last reload time of the app. |
| `qReadOnly` | boolean | If set to true, the app is read-only. |
| `qTitle` | string | Title of the app. |
| `qThumbnail` | [`StaticContentUrl`](#staticcontenturl) | Thumbnail of the app. |
| `qHasSectionAccess` | boolean | If true the app has section access configured. |

## `DriveInfo`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qDrive` | string | Value of the drive.<br>Examples:<br>C:\\\, E:\\\ |
| `qType` | string | Type of the drive.<br>_Fixed_ means physical drive. |
| `qName` | string | Name of the drive. |
| `qTypeIdentifier` | string | Information about the drive type.<br><br>One of:<br>- REMOVABLE<br>- FIXED<br>- NETWORK<br>- CD_ROM<br>- RAM<br>- UNKNOWN_TYPE |
| `qUnnamedDrive` | boolean | _No description._ |

## `EditorBreakpoint`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qbufferName` | string | Name of the breakpoint. |
| `qlineIx` | integer | Line number in the script where the breakpoint is set. |
| `qEnabled` | boolean | If set to true then the breakpoint is enabled (in use). |



## `ErrorData`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qErrorString` | string | Detailed information about the error message. |
| `qLineEnd` | string | Line termination characters. |
| `qLine` | string | Script statement where the error occurs. |
| `qErrorDataCode` | string | Type of the error messages.<br><br>One of:<br>- EDC_ERROR<br>- EDC_WARNING<br>- EDC_CIRCULAR_REFERENCE |
| `qMessage` | [`ProgressMessage`](#progressmessage) | _No description._ |

## `ExtensionList`

Obsolete, use qrs API's to fetch extensions.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qItems` | array&lt;string> | _No description._ |


## `FieldAttributes`

Sets the formatting of a field.<br>The properties of _qFieldAttributes_ and the formatting mechanism are described below.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qType` | string | Type of the field.<br>Default is U.<br><br>One of:<br>- U or UNKNOWN<br>- A or ASCII<br>- I or INTEGER<br>- R or REAL<br>- F or FIX<br>- M or MONEY<br>- D or DATE<br>- T or TIME<br>- TS or TIMESTAMP<br>- IV or INTERVAL |
| `qnDec` | integer | Number of decimals.<br>Default is 10. |
| `qUseThou` | integer | Defines whether or not a thousands separator must be used.<br>Default is 0. |
| `qFmt` | string | Defines the format pattern that applies to _qText_ .<br>Is used in connection to the type of the field (parameter **qType** ).<br>For more information, see _Formatting mechanism_.<br>Example: _YYYY-MM-DD_ for a date. |
| `qDec` | string | Defines the decimal separator.<br>Example: **.** |
| `qThou` | string | Defines the thousand separator (if any).<br>Is used if **qUseThou** is set to 1.<br>Example: **,** |

## `FieldDefEx`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qName` | string | Name of the field. |
| `qType` | string | Type of data entity.<br><br>One of:<br>- NOT_PRESENT<br>- PRESENT<br>- IS_CYCLIC_GROUP<br>- IS_DRILL_GROUP<br>- IS_VAR<br>- IS_EXPR<br>- IS_IMPLICIT<br>- IS_DETAIL |

## `FieldDescription`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qInternalNumber` | integer | Internal number of the field. |
| `qName` | string | Name of the field. |
| `qSrcTables` | array&lt;string> | List of table names. |
| `qIsSystem` | boolean | If set to true, it means that the field is a system field.<br>The default value is false. |
| `qIsHidden` | boolean | If set to true, it means that the field is hidden.<br>The default value is false. |
| `qIsSemantic` | boolean | If set to true, it means that the field is a semantic.<br>The default value is false. |
| `qDistinctOnly` | boolean | If set to true, only distinct field values are shown.<br>The default value is false. |
| `qCardinal` | integer | Number of distinct field values. |
| `qTotalCount` | integer | Total number of field values. |
| `qPossibleCount_OBSOLETE` | integer | _No description._ |
| `qHasInfo_OBSOLETE` | boolean | _No description._ |
| `qIsLocked` | boolean | If set to true, it means that the field is locked.<br>The default value is false. |
| `qAlwaysOneSelected` | boolean | If set to true, it means that the field has one and only one selection (not 0 and not more than 1).<br>If this property is set to true, the field cannot be cleared anymore and no more selections can be performed in that field.<br>The default value is false. |
| `qAndMode` | boolean | If set to true a logical AND (instead of a logical OR) is used when making selections in a field.<br>The default value is false. |
| `qIsNumeric` | boolean | Is set to true if the value is a numeric.<br>The default value is false. |
| `qComment` | string | Field comment. |
| `qTags` | array&lt;string> | Gives information on a field. For example, it can return the type of the field.<br>Examples: key, text, ASCII. |
| `qIsDefinitionOnly` | boolean | If set to true, it means that the field is a field on the fly.<br>The default value is false. |
| `qByteSize` | integer | Static RAM memory used in bytes. |

## `FieldInTableData`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qName` | string | Name of the field. |
| `qOriginalFields` | array&lt;string> | Is shown for fixed records.<br>_qOriginalFieldName_ and _qName_ are identical if no field names are used in the file.<br>_qOriginalFieldName_ differs from _qName_ if embedded file names are used in the file. |
| `qPresent` | boolean | _No description._ |
| `qHasNull` | boolean | This property is set to true if the field contains some Null values. |
| `qHasWild` | boolean | _No description._ |
| `qHasDuplicates` | boolean | This property is set to true if the field contains some duplicate values. |
| `qIsSynthetic` | boolean | This property is set to true if the field contains a synthetic key. |
| `qInformationDensity` | number | Number of records that have values (for example, not NULL) in the field as compared to the total number of records in the table. |
| `qnNonNulls` | integer | Number of values that are non Null. |
| `qnRows` | integer | Number of rows in the field. |
| `qSubsetRatio` | number | Number of distinct values in the field (in the current table) as compared to the total number of distinct values of this field (in all tables). |
| `qnTotalDistinctValues` | integer | Number of distinct values in the field. |
| `qnPresentDistinctValues` | integer | _No description._ |
| `qKeyType` | string | Tells if the field is a key field.<br><br>One of:<br>- NOT_KEY<br>- ANY_KEY<br>- PRIMARY_KEY<br>- PERFECT_KEY |
| `qComment` | string | Comment related to the field. |
| `qTags` | array&lt;string> | List of tags related to the field. |
| `qDerivedFields` | array&lt;[`DerivedFieldsInTableData`](#derivedfieldsintabledata)> | List of the derived fields. |
| `qIsFieldOnTheFly` | boolean | _No description._ |
| `qReadableName` | string | _No description._ |

## `FieldList`

Lists the fields present in the data model viewer. Is the layout for [`FieldListDef`](#fieldlistdef).

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qItems` | array&lt;[`NxFieldDescription`](#nxfielddescription)> | Array of items. |

## `FieldListDef`

Defines the fields to show.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qShowSystem` | boolean | Shows the system tables if set to true.<br>Default is false. |
| `qShowHidden` | boolean | Shows the hidden fields if set to true.<br>Default is false. |
| `qShowSemantic` | boolean | Show the semantic fields if set to true.<br>Default is false. |
| `qShowSrcTables` | boolean | Shows the tables and fields present in the data model viewer if set to true.<br>Default is false. |
| `qShowDefinitionOnly` | boolean | Shows the fields defined on the fly if set to true.<br>Default is false. |
| `qShowDerivedFields` | boolean | Shows the fields and derived fields if set to true.<br>Default is false. |
| `qShowImplicit` | boolean | Shows the Direct Discovery measure fields if set to true.<br>Default is false. |

## `FieldOrColumn`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qFieldName` | string | Name of the field or column to be matched. |
| `qTableName` | string | Name of the table to be matched on. This parameter is optional. If TableName is set, FieldName represent the Table column with that name. If TableName is not set, FieldName represents the the field with that name. |

## `FieldScores`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qFieldName` | string | Field name.<br>One of the field names defined in _qFieldPairName._ |
| `qReadableName` | string | _No description._ |
| `qCardinalRatio` | number | Cardinality of a column/field divided by the number of rows in the table.<br>If the cardinal ratio is 1, it means that the column is a candidate/primary key. |
| `qSymbolScore` | number | Number of distinct matches between the two fields defined in _qFieldPairName_ divided by the number of distinct values in the field _qFieldName_ .<br>If 0, it means that there are no common values between the two fields defined in _qFieldPairName_ . |
| `qRowScore` | number | Number of matches between the two fields defined in _qFieldPairName_ divided by the number of values in the field _qFieldName_ .<br>If 0, it means that there are no common values between the two fields defined in _qFieldPairName_ . |

## `FieldValue`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qText` | string | Text related to the field value.<br>This parameter is optional. |
| `qIsNumeric` | boolean | Is set to true if the value is a numeric.<br>This parameter is optional. Default is false. |
| `qNumber` | number | Numeric value of the field.<br>This parameter is displayed if _qIsNumeric_ is set to true.<br>This parameter is optional. |

## `FileDataFormat`



| Name | Type | Description |
| ---- | ---- | ----------- |
| `qType` | string | Type of the file.<br><br>One of:<br>- CSV or FILE_TYPE_CSV<br>- FIX or FILE_TYPE_FIX<br>- DIF or FILE_TYPE_DIF<br>- EXCEL_BIFF or FILE_TYPE_EXCEL_BIFF<br>- EXCEL_OOXML or FILE_TYPE_EXCEL_OOXML<br>- HTML or FILE_TYPE_HTML<br>- QVD or FILE_TYPE_QVD<br>- XML or FILE_TYPE_XML<br>- QVX or FILE_TYPE_QVX<br>- JSON or FILE_TYPE_JSON<br>- KML or FILE_TYPE_KML |
| `qLabel` | string | One of:<br>- Embedded labels (field names are present in the file)<br>- No labels<br>- Explicit labels (for DIFfiles) |
| `qQuote` | string | One of:<br>- None (no quotes)<br>- MSQ (Modern Style Quoting)<br>- Standard (quotes " " or ' ' can be used, but only if they are the first and last non blank characters of a field value)<br><br>This property is used for delimited files. |
| `qComment` | string | String that marks the beginning of the comment line.<br>Example: “#” or “//”<br>The engine ignores the commented lines during the data load.<br>This property is only used for delimited files. |
| `qDelimiter` | [`DelimiterInfo`](#delimiterinfo) | Information about the delimiter.<br>This property is used for delimited files. |
| `qCodePage` | integer | Character set used in the file. |
| `qHeaderSize` | integer | Size of the header.<br>Example: If the header size is 2, the first two rows in the file are considered as header and not as data. The header can contain the field names. |
| `qRecordSize` | integer | Record length.<br>Each record (row of data) contains a number of columns with a fixed field size.<br>This property is used for fixed record data files. |
| `qTabSize` | integer | Number of spaces that one tab character represents in the table file.<br>This property is used for fixed record data files. |
| `qIgnoreEOF` | boolean | Is set to true, the end-of-file character is not taken into account during reload.<br>This property is used for delimited files and fixed record data files. |
| `qFixedWidthDelimiters` | string | Positions of the field breaks in the table.<br>This property is used for fixed record data files. |

## `FilterInfo`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qType` | string | One of:<br>- NONE or FILTER_TYPE_NONE<br>- RAW or FILTER_TYPE_RAW |
| `qWherePredicate` | string | _No description._ |

## `FolderItem`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qName` | string | Name of the folder item. |
| `qType` | string | Type of the folder item.<br><br>One of:<br>- FOLDER or FOLDER_ITEM_FOLDER<br>- FILE or FOLDER_ITEM_FILE<br>- OTHER or FOLDER_ITEM_OTHER |

## `Function`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qName` | string | Name of the script function. |
| `qGroup` | string | Group of the script function.<br><br>One of:<br>- ALL or FUNC_GROUP_ALL<br>- U or FUNC_GROUP_UNKNOWN<br>- NONE or FUNC_GROUP_NONE<br>- AGGR or FUNC_GROUP_AGGR<br>- NUM or FUNC_GROUP_NUMERIC<br>- RNG or FUNC_GROUP_RANGE<br>- EXP or FUNC_GROUP_EXPONENTIAL_AND_LOGARITHMIC<br>- TRIG or FUNC_GROUP_TRIGONOMETRIC_AND_HYPERBOLIC<br>- FIN or FUNC_GROUP_FINANCIAL<br>- MATH or FUNC_GROUP_MATH_CONSTANT_AND_PARAM_FREE<br>- COUNT or FUNC_GROUP_COUNTER<br>- STR or FUNC_GROUP_STRING<br>- MAPP or FUNC_GROUP_MAPPING<br>- RCRD or FUNC_GROUP_INTER_RECORD<br>- CND or FUNC_GROUP_CONDITIONAL<br>- LOG or FUNC_GROUP_LOGICAL<br>- NULL or FUNC_GROUP_NULL<br>- SYS or FUNC_GROUP_SYSTEM<br>- FILE or FUNC_GROUP_FILE<br>- TBL or FUNC_GROUP_TABLE<br>- DATE or FUNC_GROUP_DATE_AND_TIME<br>- NUMI or FUNC_GROUP_NUMBER_INTERPRET<br>- FRMT or FUNC_GROUP_FORMATTING<br>- CLR or FUNC_GROUP_COLOR<br>- RNK or FUNC_GROUP_RANKING<br>- GEO or FUNC_GROUP_GEO<br>- EXT or FUNC_GROUP_EXTERNAL<br>- PROB or FUNC_GROUP_PROBABILITY<br>- ARRAY or FUNC_GROUP_ARRAY<br>- LEG or FUNC_GROUP_LEGACY |
| `qSignature` | string | Signature of the script function.<br>Gives general information about the function. |

## `GenericBookmarkEntry`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qProperties` | [`GenericBookmarkProperties`](#genericbookmarkproperties) | Information about the properties of the bookmark. |
| `qBookmark` | [`NxBookmark`](#nxbookmark) | Information about the bookmark. |

## `GenericBookmarkLayout`

Is the layout for [`GenericBookmarkProperties`](#genericbookmarkproperties).

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qInfo` | [`NxInfo`](#nxinfo) | Information about the object. |
| `qMeta` | [`NxMeta`](#nxmeta) | Information on publishing and permissions. |
| `qBookmark` | [`NxBookmark`](#nxbookmark) | Information about the bookmark. |
| `qFieldInfos` | array&lt;[`LayoutFieldInfo`](#layoutfieldinfo)> | Information about the field selections associated with the bookmark. |

## `GenericBookmarkProperties`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qInfo` | [`NxInfo`](#nxinfo) | Information about the bookmark.<br>This parameter is mandatory. |
| `qMetaDef` | [`NxMetaDef`](#nxmetadef) | Definition of the dynamic properties. |

## `GenericDimensionInfo`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qApprMaxGlyphCount` | integer | Length of the longest value in the field. |
| `qCardinal` | integer | Number of distinct field values |
| `qTags` | array&lt;string> | Gives information on a field. For example, it can return the type of the field.<br>Examples: key, text, ASCII |
| `qIsSemantic` | boolean | If set to true, it means that the field is a semantic. |
| `qAndMode` | boolean | If set to true a logical AND (instead of a logical OR) is used when making selections in a field.<br>The default value is false. |

## `GenericDimensionLayout`

Is the layout for [`GenericDimensionProperties`](#genericdimensionproperties).

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qInfo` | [`NxInfo`](#nxinfo) | Identifier and type of the dimension. |
| `qMeta` | [`NxMeta`](#nxmeta) | Information about publishing and permissions. |
| `qDim` | [`NxLibraryDimension`](#nxlibrarydimension) | Name and label of the dimension, information about grouping. |
| `qDimInfos` | array&lt;[`GenericDimensionInfo`](#genericdimensioninfo)> | Cardinal and tags related to the dimension.<br>Length of the longest value in the field. |

## `GenericDimensionProperties`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qInfo` | [`NxInfo`](#nxinfo) | Identifier and type of the dimension.<br>This parameter is mandatory. |
| `qDim` | [`NxLibraryDimensionDef`](#nxlibrarydimensiondef) | Definition of the dimension.<br>This parameter is mandatory. |
| `qMetaDef` | [`NxMetaDef`](#nxmetadef) | Definition of the dynamic properties. |

## `GenericMeasureLayout`

Is the layout for [`GenericMeasureProperties`](#genericmeasureproperties).

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qInfo` | [`NxInfo`](#nxinfo) | Information about the object. |
| `qMeasure` | [`NxLibraryMeasure`](#nxlibrarymeasure) | Information about the measure. |
| `qMeta` | [`NxMeta`](#nxmeta) | Information on publishing and permissions. |

## `GenericMeasureProperties`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qInfo` | [`NxInfo`](#nxinfo) | Information about the measure.<br>This parameter is mandatory. |
| `qMeasure` | [`NxLibraryMeasureDef`](#nxlibrarymeasuredef) | Definition of the measure.<br>This parameter is mandatory. |
| `qMetaDef` | [`NxMetaDef`](#nxmetadef) | Definition of the dynamic properties. |

## `GenericObjectEntry`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qProperty` | [`GenericObjectProperties`](#genericobjectproperties) | Information about the generic object properties. |
| `qChildren` | array&lt;[`GenericObjectEntry`](#genericobjectentry)> | Information about the children of the generic object. |
| `qEmbeddedSnapshotRef` | [`GenericBookmarkEntry`](#genericbookmarkentry) | Reference to a bookmark/snapshot that is embedded in the generic object. |

## `GenericObjectLayout`

Is the layout for [`GenericObjectProperties`](#genericobjectproperties).

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qInfo` | [`NxInfo`](#nxinfo) | Identifier and type of the generic object. |
| `qMeta` | [`NxMeta`](#nxmeta) | Information about publishing and permissions.<br>This parameter is optional. |
| `qExtendsId` | string | Should be set to create an object that is linked to another object. Enter the identifier of the object you want to link to.<br>If you do not want to link your object, set this parameter to an empty string. |
| `qHasSoftPatches` | boolean | Is set to true if the generic object contains some properties that are not persistent (a soft patch was applied). |
| `qError` | [`NxLayoutErrors`](#nxlayouterrors) | Gives information on the error.<br>This parameter is optional. |
| `qSelectionInfo` | [`NxSelectionInfo`](#nxselectioninfo) | Information about the selections. |
| `qStateName` | string | Name of the alternate state.<br>Default is current selections _$_ . |

## `GenericObjectProperties`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qInfo` | [`NxInfo`](#nxinfo) | Identifier and type of the object.<br>This parameter is mandatory. |
| `qExtendsId` | string | Should be set to create an object that is linked to another object. Enter the identifier of the linking object (i.e the object you want to link to).<br>If you do not want to link your object, set this parameter to an empty string. |
| `qMetaDef` | [`NxMetaDef`](#nxmetadef) | Definition of the dynamic properties. |
| `qStateName` | string | Name of the alternate state.<br>Default is current selections _$_ . |

## `GenericVariableLayout`

Is the layout for [`GenericVariableProperties`](#genericvariableproperties).

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qInfo` | [`NxInfo`](#nxinfo) | Identifier and type of the object.<br>This parameter is mandatory. |
| `qMeta` | [`NxMeta`](#nxmeta) | Information about publishing and permissions.<br>This parameter is optional. |
| `qText` | string | Some text. |
| `qNum` | number | A value. |
| `qIsScriptCreated` | boolean | If set to true, it means that the variable was defined via script. |

## `GenericVariableProperties`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qInfo` | [`NxInfo`](#nxinfo) | Identifier and type of the object.<br>This parameter is mandatory. |
| `qMetaDef` | [`NxMetaDef`](#nxmetadef) | Meta data. |
| `qName` | string | Name of the variable.<br>The name must be unique.<br>This parameter is mandatory. |
| `qComment` | string | Comment related to the variable.<br>This parameter is optional. |
| `qNumberPresentation` | [`FieldAttributes`](#fieldattributes) | Defines the format of the value.<br>This parameter is optional. |
| `qIncludeInBookmark` | boolean | Set this property to true to update the variable when applying a bookmark. The variable value will be persisted in the bookmark.<br>The value of a variable can affect the state of the selections.<br>Script variables cannot be persisted in the bookmark.<br>The default value is false. |
| `qDefinition` | string | Definition of the variable. |

## `HyperCube`

Renders the properties of a hypercube. Is the layout for [`HyperCubeDef`](#hypercubedef).<br>For more information about the definition of a hypercube, see _Generic object_.<br>What is returned in [`HyperCube`](#hypercube) depends on the type of the hypercube (straight, pivot or stacked table, or tree) and on the method called (GetLayout, GetHyperCubeData, GetHyperCubePivotData, GetHyperCubeStackData, GetHyperCubeTreeData).

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qStateName` | string | Name of the alternate state.<br>Default is current selections _$_ . |
| `qSize` | [`Size`](#size) | Defines the size of the hypercube. |
| `qError` | [`NxValidationError`](#nxvalidationerror) | This parameter is optional and is displayed in case of error. |
| `qDimensionInfo` | array&lt;[`NxDimensionInfo`](#nxdimensioninfo)> | Information on the dimension. |
| `qMeasureInfo` | array&lt;[`NxMeasureInfo`](#nxmeasureinfo)> | Information on the measure. |
| `qEffectiveInterColumnSortOrder` | array&lt;integer> | Sort order of the columns in the hypercube.<br>Column numbers are separated by a comma.<br>Example: [1,0,2] means that the first column to be sorted was the column 1, followed by the column 0 and the column 2. |
| `qGrandTotalRow` | array&lt;[`NxCell`](#nxcell)> | Aggregate for measures of all values in the field.<br>The result value depends on the _qAggrFunc_ defined in [`HyperCubeDef`](#hypercubedef). |
| `qDataPages` | array&lt;[`NxDataPage`](#nxdatapage)> | Set of data.<br>Is empty if nothing has been defined in **qInitialDataFetch** in [`HyperCubeDef`](#hypercubedef). |
| `qPivotDataPages` | array&lt;[`NxPivotPage`](#nxpivotpage)> | Set of data for pivot tables.<br>Is empty if nothing has been defined in **qInitialDataFetch** in [`HyperCubeDef`](#hypercubedef). |
| `qStackedDataPages` | array&lt;[`NxStackPage`](#nxstackpage)> | Set of data for stacked tables.<br>Is empty if nothing has been defined in **qInitialDataFetch** in [`HyperCubeDef`](#hypercubedef). |
| `qMode` | string | Information about the mode of the visualization.<br><br>One of:<br>- S or DATA_MODE_STRAIGHT<br>- P or DATA_MODE_PIVOT<br>- K or DATA_MODE_PIVOT_STACK<br>- T or DATA_MODE_TREE |
| `qNoOfLeftDims` | integer | Number of left dimensions.<br>Default value is -1.<br>The index related to each left dimension depends on the position of the pseudo dimension (if any).<br>For example, a pivot table with:<br>- Four dimensions in the following order: Country, City, Product and Category<br>- One pseudo dimension in position 1<br>- Three left dimensions.<br><br>implies that:<br>- The index 0 corresponds to the left dimension Country.<br>- The index 1 corresponds to the pseudo dimension.<br>- The index 2 corresponds to the left dimension City.<br>- Product and Category are top dimensions.<br><br>Another example:<br>- Four dimensions in the following order: Country, City, Product and Category.<br>- One pseudo dimension in position -1.<br>- Three left dimensions.<br><br>implies that:<br>- The index -1 corresponds to the pseudo dimension; the pseudo dimension is the most to the right.<br>- The index 0 corresponds to the left dimension Country.<br>- The index 1 corresponds to the left dimension City.<br>- The index 2 corresponds to the left dimension Product.<br>- Category is a top dimension. |
| `qIndentMode` | boolean | Is used for pivot tables only.<br>If set to true, the formatting of the results is slightly different.<br>This property is optional. |
| `qLastExpandedPos` | [`NxCellPosition`](#nxcellposition) | Is used for pivot tables only.<br>Position of the last expended cell.<br>This property is optional. |
| `qHasOtherValues` | boolean | True if other row exists. |
| `qTitle` | string | Title of the hypercube, for example the title of a chart. |
| `qTreeNodesOnDim` | array&lt;integer> | The total number of nodes on each dimension (only applicable when _qMode = T_ ). |
| `qCalcCondMsg` | string | The message displayed if calculation condition is not fulfilled. |
| `qColumnOrder` | array&lt;integer> | The order of the columns. |

## `HyperCubeDef`

Defines the properties of a hypercube.<br>For more information about the definition of a hypercube, see _Generic object_.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qStateName` | string | Name of the alternate state.<br>Default is current selections _$_ . |
| `qDimensions` | array&lt;[`NxDimension`](#nxdimension)> | Array of dimensions. |
| `qMeasures` | array&lt;[`NxMeasure`](#nxmeasure)> | Array of measures. |
| `qInterColumnSortOrder` | array&lt;integer> | Defines the sort order of the columns in the hypercube.<br>Column numbers are separated by a comma.<br>Example: [1,0,2] means that the first column to be sorted should be the column 1, followed by the column 0 and the column 2.<br>The default sort order is the order in which the dimensions and measures have been defined in the hypercube. By default, the pseudo-dimension (if any) is the most to the right in the array.<br>The index of the pseudo-dimension (if any) is -1.<br>Pseudo dimensions only apply for pivot tables with more than one measure.<br>A pseudo dimension groups together the measures defined in a pivot table. You can neither collapse/expand a pseudo dimension nor make any selections in it.<br>Stacked pivot tables can only contain one measure. |
| `qSuppressZero` | boolean | Removes zero values. |
| `qSuppressMissing` | boolean | Removes missing values. |
| `qInitialDataFetch` | array&lt;[`NxPage`](#nxpage)> | Initial data set. |
| `qReductionMode` | string | One of:<br>- N or DATA_REDUCTION_NONE<br>- D1 or DATA_REDUCTION_ONEDIM<br>- S or DATA_REDUCTION_SCATTERED<br>- C or DATA_REDUCTION_CLUSTERED<br>- ST or DATA_REDUCTION_STACKED |
| `qMode` | string | Defines the way the data are handled internally by the engine.<br>Default value is _DATA_MODE_STRAIGHT_ .<br>A pivot table can contain several dimensions and measures whereas a stacked pivot table can contain several dimensions but only one measure.<br><br>One of:<br>- S or DATA_MODE_STRAIGHT<br>- P or DATA_MODE_PIVOT<br>- K or DATA_MODE_PIVOT_STACK<br>- T or DATA_MODE_TREE |
| `qPseudoDimPos` | integer | _No description._ |
| `qNoOfLeftDims` | integer | Number of left dimensions.<br>Default value is -1. In that case, all dimensions are left dimensions.<br>Hidden dimensions (e.g. due to unfulfilled calc condition on dimension level) is still counted in this context.<br>The index related to each left dimension depends on the position of the pseudo dimension (if any).<br>For example, a pivot table with:<br>- Four dimensions in the following order: Country, City, Product and Category.<br>- One pseudo dimension in position 1 (the position is defined in _qInterColumnSortOrder_ )<br>_qInterColumnSortOrder_ is (0,-1,1,2,3).<br>- Three left dimensions ( _qNoOfLeftDims_ is set to 3).<br><br>implies that:<br>- The index 0 corresponds to the left dimension Country.<br>- The index 1 corresponds to the pseudo dimension.<br>- The index 2 corresponds to the left dimension City.<br>- Product and Category are top dimensions.<br><br>Another example:<br>- Four dimensions in the following order: Country, City, Product and Category.<br>- Three left dimensions ( _qNoOfLeftDims_ is set to 3).<br>- One pseudo dimension.<br>- The property _qInterColumnSortOrder_ is left empty.<br><br>Implies that:<br>- The index 0 corresponds to the left dimension Country.<br>- The index 1 corresponds to the left dimension City.<br>- The index 2 corresponds to the left dimension Product.<br>- Category is a top dimension.<br>- The pseudo dimension is a top dimension. |
| `qAlwaysFullyExpanded` | boolean | If this property is set to true, the cells are always expanded. It implies that it is not possible to collapse any cells.<br>The default value is false. |
| `qMaxStackedCells` | integer | Maximum number of cells for an initial data fetch (set in _qInitialDataFetch_ ) when in stacked mode ( _qMode_ is K).<br>The default value is 5000. |
| `qPopulateMissing` | boolean | If this property is set to true, the missing symbols (if any) are replaced by 0 if the value is a numeric and by an empty string if the value is a string.<br>The default value is false. |
| `qShowTotalsAbove` | boolean | If set to true, the total (if any) is shown on the first row.<br>The default value is false. |
| `qIndentMode` | boolean | This property applies for pivot tables and allows to change the layout of the table. An indentation is added to the beginning of each row.<br>The default value is false. |
| `qCalcCond` | [`ValueExpr`](#valueexpr) | Specifies a calculation condition, which must be fulfilled for the hypercube to be (re)calculated.<br>As long as the condition is not met, the engine does not perform a new calculation.<br>This property is optional. By default, there is no calculation condition. |
| `qSortbyYValue` | integer | To enable the sorting by ascending or descending order in the values of a measure.<br>This property applies to pivot tables and stacked pivot tables.<br>In the case of a pivot table, the measure or pseudo dimension should be defined as a top dimension. The sorting is restricted to the values of the first measure in a pivot table. |
| `qTitle` | [`StringExpr`](#stringexpr) | Title of the hypercube, for example the title of a chart. |
| `qCalcCondition` | [`NxCalcCond`](#nxcalccond) | Specifies a calculation condition object.<br>If CalcCondition.Cond is not fulfilled, the hypercube is not calculated and CalcCondition.Msg is evaluated.<br>By default, there is no calculation condition.<br>This property is optional. |
| `qColumnOrder` | array&lt;integer> | The order of the columns. |

## `InteractDef`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qType` | string | Interaction type.<br><br>One of:<br>- IT_MSGBOX<br>- IT_SCRIPTLINE<br>- IT_BREAK<br>- IT_INPUT<br>- IT_END<br>- IT_PASSWD<br>- IT_USERNAME |
| `qTitle` | string | Title used in the message box dialog.<br>This property is relevant if _qType_ is *IT_MSGBOX*. |
| `qMsg` | string | Message used in the message box dialog.<br>This property is relevant if _qType_ is *IT_MSGBOX*. |
| `qButtons` | integer | Buttons displayed in the message box dialog.<br>This property is relevant if _qType_ is *IT_MSGBOX*.<br>One of:<br>- 0 means that the _qButtons_ property is not relevant.<br>- 17 means that the message box contains the **OK** and **Cancel** buttons or the **stop** -sign icon. |
| `qLine` | string | Next script statement to be executed.<br>This property is used if the type of interaction is *IT_SCRIPTLINE*. |
| `qOldLineNr` | integer | First line number of the previously executed statement.<br>This property is used if the type of interaction is *IT_SCRIPTLINE*. |
| `qNewLineNr` | integer | First line number of the next statement to be executed.<br>This property is used if the type of interaction is *IT_SCRIPTLINE*. |
| `qPath` | string | Path specified by the **Include** script variable.<br>This property is used if the type of interaction is *IT_SCRIPTLINE*.<br>Example of an **Include** variable:<br>_$(Include=lib:\\\MyDataFiles\abc.txt);_ |
| `qHidden` | boolean | This property is set to true if the returned statement is an hidden script statement. |
| `qResult` | integer | Not relevant for describing the requested user interaction. |
| `qInput` | string | Is not used in Qlik Sense. |



## `LayoutFieldInfo`

Meta data about the selection in a field.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qFieldName` | string | The name of the field. |
| `qValuesCount` | integer | Number of selected values in the field. |
| `qExcludedValuesCount` | integer | Number of excluded values in the field. |

## `LineageInfo`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qDiscriminator` | string | A string indicating the origin of the data:<br>- [filename]: the data comes from a local file.<br>- INLINE: the data is entered inline in the load script.<br>- RESIDENT: the data comes from a resident table. The table name is listed.<br>- AUTOGENERATE: the data is generated from the load script (no external table of data source).<br>- Provider: the data comes from a data connection. The connector source name is listed.<br>- [webfile]: the data comes from a web-based file.<br>- STORE: path to QVD or TXT file where data is stored.<br>- EXTENSION: the data comes from a Server Side Extension (SSE). |
| `qStatement` | string | The LOAD and SELECT script statements from the data load script. |

## `ListObject`

Renders the properties of a list object. Is the layout for [`ListObjectDef`](#listobjectdef).<br>For more information about the definition of a list object, see _Generic object_.<br>ListObject is used by the _GetLayout Method_ to display the properties of a list object. 

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qStateName` | string | Name of the alternate state.<br>Default is current selections _$_ . |
| `qSize` | [`Size`](#size) | Defines the size of a list object. |
| `qError` | [`NxValidationError`](#nxvalidationerror) | This parameter is optional and is displayed in case of error. |
| `qDimensionInfo` | [`NxDimensionInfo`](#nxdimensioninfo) | Information about the dimension. |
| `qExpressions` | array&lt;[`NxListObjectExpression`](#nxlistobjectexpression)> | Lists the expressions in the list object. |
| `qDataPages` | array&lt;[`NxDataPage`](#nxdatapage)> | Set of data.<br>Is empty if nothing has been defined in **qInitialDataFetch** in [`ListObjectDef`](#listobjectdef). |

## `ListObjectDef`

Defines the properties of a list object.<br>For more information about the definition of a list object, see _Generic object_.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qStateName` | string | Name of the alternate state.<br>Default is current selections _$_ . |
| `qLibraryId` | string | Refers to a dimension stored in the library. |
| `qDef` | [`NxInlineDimensionDef`](#nxinlinedimensiondef) | Refers to a dimension stored in the list object. |
| `qAutoSortByState` | [`NxAutoSortByStateDef`](#nxautosortbystatedef) | Defines the sorting by state. |
| `qFrequencyMode` | string | Defines the frequency mode. The frequency mode is used to calculate the frequency of a value in a list object.<br>Default is _NX_FREQUENCY_NONE_ .<br>This parameter is optional.<br><br>One of:<br>- N or NX_FREQUENCY_NONE<br>- V or NX_FREQUENCY_VALUE<br>- P or NX_FREQUENCY_PERCENT<br>- R or NX_FREQUENCY_RELATIVE |
| `qShowAlternatives` | boolean | If set to true, alternative values are allowed in _qData_ .<br>If set to false, no alternative values are displayed in _qData_ . Values are excluded instead.<br>The default value is false.<br>Note that on the contrary, the _qStateCounts_ parameter counts the excluded values as alternative values.<br>This parameter is optional. |
| `qInitialDataFetch` | array&lt;[`NxPage`](#nxpage)> | Fetches an initial data set. |
| `qExpressions` | array&lt;[`NxListObjectExpressionDef`](#nxlistobjectexpressiondef)> | Lists the expressions in the list object.<br>This parameter is optional. |

## `LocaleInfo`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qDecimalSep` | string | Decimal separator. |
| `qThousandSep` | string | Thousand separator. |
| `qListSep` | string | List separator. |
| `qMoneyDecimalSep` | string | Money decimal separator. |
| `qMoneyThousandSep` | string | Money thousand separator. |
| `qCurrentYear` | integer | Current year. |
| `qMoneyFmt` | string | Money format.<br>Example: _#.##0,00 kr;-#.##0,00 kr_ |
| `qTimeFmt` | string | Time format.<br>Example: _hh:mm:ss_ |
| `qDateFmt` | string | Date format.<br>Example: _YYYY-MM-DD_ |
| `qTimestampFmt` | string | Time stamp format.<br>Example: _YYYY-MM-DD hh:mm:ss[.fff]_ |
| `qCalendarStrings` | [`CalendarStrings`](#calendarstrings) | Information about the calendar. |
| `qFirstWeekDay` | integer | First day of the week, starting from 0.<br>According to ISO 8601, _Monday_ is the first day of the week.<br>- 0 = Monday<br>- 1 = Tuesday<br>- ...<br>- 6 = Sunday<br><br>If this property has not been set in a script, the returned value comes from the Windows operating system. |
| `qBrokenWeeks` | boolean | Is set to true if broken weeks are allowed in a year.<br>According to ISO 8601, no broken weeks should be allowed.<br>This property is not shown if set to false.<br>If _qBrokenWeeks_ is set to true, _qReferenceDay_ is irrelevant.<br>If this property has not been set in a script, the returned value comes from the Windows operating system. |
| `qReferenceDay` | integer | Day in the year that is always in week 1.<br>According to ISO 8601, January 4th should always be part of the first week of the year ( _qReferenceDay_ =4).<br>Recommended values are in the range 1 and 7.<br>If this property has not been set in a script, the returned value comes from the Windows operating system.<br>This property is not relevant if there are broken weeks in the year. |
| `qFirstMonthOfYear` | integer | First month of the year, starting from 1.<br>According to ISO 8601, _January_ is the first month of the year.<br>- 1 = January<br>- 2 = February<br>- 12 = January<br><br>If this property has not been set in a script, the returned value comes from the Windows operating system. |
| `qCollation` | string | Locale name (following language tagging convention RFC 4646):<br>_&lt; language&gt;-&lt;REGION&gt;_<br>Where:<br>- _language_ is a lowercase ISO  639 language code<br>- _REGION_ specifies an uppercase ISO 3166 country code.<br><br>If this property has not been set in a script, the returned value comes from the Windows operating system. |
| `qNumericalAbbreviation` | string | Number format.<br>Example: 3:k;6:M;9:G;12:T;15:P;18:E;21:Z;24:Y;-3:m;-6:μ;-9:n;-12:p;-15:f;-18:a;-21:z;-24:y |

## `MeasureList`

Lists the measures. Is the layout for [`MeasureListDef`](#measurelistdef).

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qItems` | array&lt;[`NxContainerEntry`](#nxcontainerentry)> | Information about the list of measures. |

## `MeasureListDef`

Defines the list of measures.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qType` | string | Type of the list. |
| `qData` | [`JsonObject`](#jsonobject) | Data |

## `MediaList`

Lists the media files. Is the layout for [`MediaListDef`](#medialistdef).<br>This struct is deprecated.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qItems` | array&lt;[`MediaListItem`](#medialistitem)> | Information about the list of media files.<br>In Qlik Sense Desktop, the media files are retrieved from:<br>_%userprofile%\Documents\Qlik\Sense\Content\Default_<br>In Qlik Sense Enterprise, the media files are retrieved from:<br>&lt;installation_directory&gt;\Qlik\Sense\Repository\Content\Default<br>The default installation directory is _ProgramData_ . |


## `MediaListItem`

In addition, this structure can return dynamic properties.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qUrlDef` | string | Relative path to the media file. The URL is static.<br>Media files located:<br>- in the _/content/default/_ folder are outside the qvf file.<br>- in the _/media/ folder_ are embedded in the qvf file. |
| `qUrl` | string | Relative path to the media file.<br>Media files located:<br>- in the _/content/default/_ folder are outside the qvf file.<br>- in the _/media/ folder_ are embedded in the qvf file. |

## `NxAppLayout`



| Name | Type | Description |
| ---- | ---- | ----------- |
| `qTitle` | string | Title of the app. |
| `qFileName` | string | In Qlik Sense Enterprise, this property corresponds to the app identifier (GUID).<br>In Qlik Sense Desktop, this property corresponds to the full path of the app. |
| `qLastReloadTime` | string | Date and time of the last reload of the app in ISO format. |
| `qModified` | boolean | Is set to true if the app has been updated since the last save. |
| `qHasScript` | boolean | Is set to true if a script is defined in the app. |
| `qStateNames` | array&lt;string> | Array of alternate states. |
| `qMeta` | [`NxMeta`](#nxmeta) | Information on publishing and permissions. |
| `qLocaleInfo` | [`LocaleInfo`](#localeinfo) | Information about the locale. |
| `qHasData` | boolean | Is set to true if the app contains data following a script reload. |
| `qReadOnly` | boolean | If set to true, it means that the app is read-only. |
| `qIsOpenedWithoutData` | boolean | If set to true, it means that the app was opened without loading its data. |
| `qThumbnail` | [`StaticContentUrl`](#staticcontenturl) | App thumbnail. |

## `NxAppProperties`



| Name | Type | Description |
| ---- | ---- | ----------- |
| `qTitle` | string | App title. |
| `qLastReloadTime` | string | Last reload time of the app. |
| `qMigrationHash` | string | Internal property reserved for app migration.<br>Patch version of the app.<br>Do not update. |
| `qSavedInProductVersion` | string | Internal property reserved for app migration.<br>The app is saved in this version of the product.<br>Do not update. |
| `qThumbnail` | [`StaticContentUrlDef`](#staticcontenturldef) | App thumbnail. |
| `qHasSectionAccess` | boolean | If true the app has section access configured. |

## `NxAttrDimDef`

Layout for [`NxAttrDimDef`](#nxattrdimdef).

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qDef` | string | Expression or field name. |
| `qLibraryId` | string | LibraryId for dimension. |
| `qSortBy` | [`SortCriteria`](#sortcriteria) | Sorting. |
| `qAttribute` | boolean | If set to true, this attribute will not affect the number of rows in the cube. |

## `NxAttrDimInfo`

Layout for [`NxAttrDimDef`](#nxattrdimdef).

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qCardinal` | integer | Cardinality of the attribute expression. |
| `qSize` | [`Size`](#size) | Number of rows. |
| `qFallbackTitle` | string | The title for the attribute dimension. |
| `qLocked` | boolean | The Locked value of the dimension. |
| `qError` | [`NxValidationError`](#nxvalidationerror) | Validation error. |
| `qIsCalculated` | boolean | True if this is a calculated dimension. |

## `NxAttrExprDef`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qExpression` | string | Definition of the attribute expression.<br>Example: _"Max(OrderID)"_ |
| `qLibraryId` | string | Definition of the attribute expression stored in the library.<br>Example: _"MyGenericMeasure"_ |
| `qAttribute` | boolean | If set to true, this measure will not affect the number of rows in the cube. |

## `NxAttrExprInfo`

Layout for [`NxAttrExprDef`](#nxattrexprdef).

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qMin` | number | Minimum value. |
| `qMax` | number | Maximum value. |
| `qFallbackTitle` | string | _No description._ |
| `qMinText` | string | String version of the minimum Value. |
| `qMaxText` | string | String version of the maximum Value. |

## `NxAttributeDimValues`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qValues` | array&lt;[`NxSimpleDimValue`](#nxsimpledimvalue)> | List of values. |

## `NxAttributeExpressionValues`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qValues` | array&lt;[`NxSimpleValue`](#nxsimplevalue)> | List of attribute expressions values. |

## `NxAutoSortByStateDef`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qDisplayNumberOfRows` | integer | This parameter applies to list objects.<br>If the number of selected values in the list object is greater than the value set in _qDisplayNumberOfRows_ , the selected lines are promoted at the top of the list object.<br>If _qDisplayNumberOfRows_ is set to a negative value or to 0, the sort by state is disabled. |

## `NxAxisData`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qAxis` | array&lt;[`NxAxisTicks`](#nxaxisticks)> | List of axis data. |

## `NxAxisTicks`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qName` | string | Name of the derived definition. |
| `qTags` | array&lt;string> | List of tags. |
| `qTicks` | array&lt;[`NxTickCell`](#nxtickcell)> | List of ticks. |

## `NxBookmark`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qStateData` | array&lt;[`AlternateStateData`](#alternatestatedata)> | List of selections for each state. |
| `qUtcModifyTime` | number | Time when the bookmark was created. |
| `qVariableItems` | array&lt;[`BookmarkVariableItem`](#bookmarkvariableitem)> | List of the variables in the app at the time the bookmark was created. |

## `NxCalcCond`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qCond` | [`ValueExpr`](#valueexpr) | Condition for calculating an hypercube, dimension or measure. |
| `qMsg` | [`StringExpr`](#stringexpr) | Evaluated if Cond is not fullfilled. |

## `NxCardinalities`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qCardinal` | integer | Number of distinct field values. |
| `qHypercubeCardinal` | integer | Number of distinct hypercube values. |

## `NxCell`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qText` | string | Some text.<br>This parameter is optional. |
| `qNum` | number | A value.<br>This parameter is optional. |
| `qElemNumber` | integer | Rank number of the value, starting from 0.<br>If the element number is a negative number, it means that the returned value is not an element number.<br>You can get the following negative values:<br>- -1: the cell is a _Total_ cell. It shows a total.<br>- -2: the cell is collapsed. Applies to pivot tables.<br>- -3: the cell belongs to the group _Others_ .<br>- -4: the cell is empty. Applies to pivot tables. |
| `qState` | string | State of the value.<br>The default state for a measure is L.<br><br>One of:<br>- L or LOCKED<br>- S or SELECTED<br>- O or OPTION<br>- D or DESELECTED<br>- A or ALTERNATIVE<br>- X or EXCLUDED<br>- XS or EXCL_SELECTED<br>- XL or EXCL_LOCKED<br>- NSTATES |
| `qIsEmpty` | boolean | Is set to _true_ , if **qText** and **qNum** are empty.<br>This parameter is optional. The default value is _false_ . |
| `qIsTotalCell` | boolean | Is set to _true_ if a total is displayed in the cell.<br>This parameter is optional. The default value is _false_ .<br>Not applicable to list objects. |
| `qIsOtherCell` | boolean | Is set to _true_ if the cell belongs to the group _Others_ .<br>Dimension values can be set as _Others_ depending on what has been defined in **OtherTotalSpecProp** .<br>This parameter is optional. The default value is _false_ .<br>Not applicable to list objects. |
| `qFrequency` | string | Frequency of the value.<br>This parameter is optional. |
| `qHighlightRanges` | [`NxHighlightRanges`](#nxhighlightranges) | Search hits.<br>The search hits are highlighted.<br>This parameter is optional. |
| `qAttrExps` | [`NxAttributeExpressionValues`](#nxattributeexpressionvalues) | Attribute expression values. |
| `qAttrDims` | [`NxAttributeDimValues`](#nxattributedimvalues) | Attribute dimensions values. |
| `qIsNull` | boolean | Is set to _true_ if the value is Null. |

## `NxCellPosition`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qx` | integer | Position of the cell on the x-axis. |
| `qy` | integer | Position of the cell on the y-axis. |


## `NxContainerEntry`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qInfo` | [`NxInfo`](#nxinfo) | Information about the object. |
| `qMeta` | [`NxMeta`](#nxmeta) | Information on publishing and permissions. |
| `qData` | [`JsonObject`](#jsonobject) | Set of data. |

## `NxContinuousDataOptions`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qStart` | number | Start value. |
| `qEnd` | number | End value. |
| `qNbrPoints` | integer | Number of bins for binning. |
| `qMaxNbrTicks` | integer | Maximum number of ticks. |
| `qMaxNumberLines` | integer | Maximum number of lines. |

## `NxContinuousRangeSelectInfo`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qRange` | [`Range`](#range) | [`Range`](#range) information. |
| `qDimIx` | integer | Dimension index. |

## `NxCurrentSelectionItem`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qTotal` | integer | Number of values in the field. |
| `qIsNum` | boolean | This parameter is displayed if its value is true.<br>Is set to true if the field is a numeric.<br>This parameter is optional. |
| `qField` | string | Name of the field that is selected. |
| `qLocked` | boolean | This parameter is displayed if its value is true.<br>Is set to true if the field is locked.<br>This parameter is optional. |
| `qOneAndOnlyOne` | boolean | This parameter is displayed if its value is true.<br>Property that is set to a field. Is set to true if the field cannot be unselected.<br>This parameter is optional. |
| `qTextSearch` | string | Text that was used for the search. This parameter is filled when searching for a value and selecting it.<br>This parameter is optional. |
| `qSelectedCount` | integer | Number of values that are selected. |
| `qSelected` | string | Values that are selected. |
| `qRangeInfo` | array&lt;[`RangeSelectInfo`](#rangeselectinfo)> | Information about the range of selected values.<br>Is empty if there is no range of selected values. |
| `qSortIndex` | integer | Sort index of the field. Indexing starts from 0. |
| `qStateCounts` | [`NxStateCounts`](#nxstatecounts) | Number of values in a particular state. |
| `qSelectedFieldSelectionInfo` | array&lt;[`NxFieldSelectionInfo`](#nxfieldselectioninfo)> | Information about the fields that are selected. |
| `qNotSelectedFieldSelectionInfo` | array&lt;[`NxFieldSelectionInfo`](#nxfieldselectioninfo)> | Information about the fields that are not selected. |
| `qSelectionThreshold` | integer | Maximum values to show in the current selections.<br>The default value is 6. |
| `qReadableName` | string | Label that, if defined, is displayed in current selections instead of the actual expression. |
| `qIsHidden` | boolean | Optional parameter. Indicates if the selection is to be hidden in the Selections bar.<br>Is set to true if the current selection is hidden. |

## `NxDataAreaPage`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qLeft` | number | Position from the left.<br>Corresponds to the lowest possible value of the first measure (the measure on the x-axis). |
| `qTop` | number | Position from the top.<br>Corresponds to the highest possible value of the second measure (the measure on the y-axis). |
| `qWidth` | number | Width of the page.<br>Corresponds to the highest possible value of the first measure (the measure on the x-axis). |
| `qHeight` | number | Height of the page.<br>The difference between _qTop_ and _qHeight_ gives the lowest possible value of the second measure (the measure on the y-axis). |

## `NxDataPage`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qMatrix` | array&lt;[`NxCellRows`](#nxcellrows)> | Array of data. |
| `qTails` | array&lt;[`NxGroupTail`](#nxgrouptail)> | Array of tails.<br>Is used for hypercube objects with multiple dimensions. It might happen that due to the window size some elements in a group cannot be displayed in the same page as the other elements of the group. Elements of a group of dimensions can be part of the previous or the next tail.<br>If there is no tail, the array is empty _[ ]_ . |
| `qArea` | [`Rect`](#rect) | Size and offset of the data in the matrix. |
| `qIsReduced` | boolean | Is set to true, if the data have been reduced.<br>The default value is false. |

## `NxDerivedField`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qId` | string | Identifier of the derived field.<br>The identifier is unique. |
| `qName` | string | Combination of field name, definition and method.<br>Example:<br>_OrderDate.MyDefinition.Year_ |
| `qMethod` | string | Method name associated to the derived field. |
| `qExpr` | string | Expression of the derived field.<br>Example:<br>If _qName_ is _OrderDate.MyDefinition.Year_ , the expression is as follows:<br>_=${Mydefinition(OrderDate).Year}_ |
| `qTags` | array&lt;string> | List of tags. |

## `NxDerivedFieldDescriptionList`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qDerivedFieldLists` | array&lt;[`NxDerivedFieldsData`](#nxderivedfieldsdata)> | Information about the derived fields. |

## `NxDerivedFieldsData`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qDerivedDefinitionName` | string | Name of the derived definition. |
| `qFieldDefs` | array&lt;[`NxDerivedField`](#nxderivedfield)> | List of the derived fields. |
| `qGroupDefs` | array&lt;[`NxDerivedGroup`](#nxderivedgroup)> | List of the derived groups. |
| `qTags` | array&lt;string> | List of tags on the derived fields. |

## `NxDerivedGroup`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qId` | string | Identifier of the group. |
| `qName` | string | Name of the derived group. |
| `qGrouping` | string | Grouping type.<br>The grouping should be either H or C (Grouping is mandatory for derived definitions).<br>The parameter is mandatory.<br><br>One of:<br>- N or GRP_NX_NONE<br>- H or GRP_NX_HIEARCHY<br>- C or GRP_NX_COLLECTION |
| `qFieldDefs` | array&lt;string> | List of the derived fields in the group. |

## `NxDimension`

Either **qDef** or **qLibraryId** must be set, but not both. If the dimension is set in the hypercube and not in the library, this dimension cannot be shared with other objects. A dimension that is set in the library can be used by many objects.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qLibraryId` | string | Refers to a dimension stored in the library. |
| `qDef` | [`NxInlineDimensionDef`](#nxinlinedimensiondef) | Refers to a dimension stored in the hypercube. |
| `qNullSuppression` | boolean | If set to true, no null values are returned. |
| `qIncludeElemValue` | boolean | _No description._ |
| `qOtherTotalSpec` | [`OtherTotalSpecProp`](#othertotalspecprop) | Sets the dimension limits. Each dimension of a hypercube is configured separately.<br>Defines if some values (grouped as _Others_ ) should be grouped together in the visualization.<br>For example in a pie chart all values lower than 200 could be grouped together. |
| `qShowTotal` | boolean | _No description._ |
| `qShowAll` | boolean | If set to true, all dimension values are shown. |
| `qOtherLabel` | [`StringExpr`](#stringexpr) | This property is used when some dimension limits are set.<br>Label of the _Others_ group. The default label is _Others_ .<br>Example:<br>_"qOtherLabel":"= &lt;label&gt;"_<br>or<br>_"qOtherLabel":{"qExpr":"= &lt;label&gt;"}_<br>Where:<br>- &lt; _label_ &gt; is the label of the _Others_ group. |
| `qTotalLabel` | [`StringExpr`](#stringexpr) | If this property is set, the total of the calculated values is returned.<br>The default label is _Total_ .<br>Example:<br>_"qTotalLabel":"= &lt;label&gt;"_<br>or<br>_"qTotalLabel":{"qExpr":"= &lt;label&gt;"}_<br>Where:<br>- &lt; _label_ &gt; is the label of the _Total_ group. |
| `qCalcCond` | [`ValueExpr`](#valueexpr) | Specifies a calculation condition, which must be fulfilled for the dimension to be calculated.<br>If the calculation condition is not met, the dimension is excluded from the calculation.<br>By default, there is no calculation condition.<br>This property is optional. |
| `qAttributeExpressions` | array&lt;[`NxAttrExprDef`](#nxattrexprdef)> | List of attribute expressions. |
| `qAttributeDimensions` | array&lt;[`NxAttrDimDef`](#nxattrdimdef)> | List of attribute dimensions. |
| `qCalcCondition` | [`NxCalcCond`](#nxcalccond) | Specifies a calculation condition object.<br>If CalcCondition.Cond is not fulfilled, the dimension is excluded from the calculation and CalcCondition.Msg is evaluated.<br>By default, there is no calculation condition.<br>This property is optional. |

## `NxDimensionInfo`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qFallbackTitle` | string | Corresponds to the label of the dimension that is selected.<br>If the label is not defined then the field name is used. |
| `qApprMaxGlyphCount` | integer | Length of the longest value in the field. |
| `qCardinal` | integer | Number of distinct field values. |
| `qLocked` | boolean | Is set to true if the field is locked. |
| `qSortIndicator` | string | Sort indicator.<br>The default value is no sorting.<br>This parameter is optional.<br><br>One of:<br>- N or NX_SORT_INDICATE_NONE<br>- A or NX_SORT_INDICATE_ASC<br>- D or NX_SORT_INDICATE_DESC |
| `qGroupFallbackTitles` | array&lt;string> | Array of dimension labels.<br>Contains the labels of all dimensions in a hierarchy group (for example the labels of all dimensions in a drill down group). |
| `qGroupPos` | integer | Index of the dimension that is currently in use.<br>_qGroupPos_ is set to 0 if there are no hierarchical groups (drill-down groups) or cycle groups. |
| `qStateCounts` | [`NxStateCounts`](#nxstatecounts) | Number of values in a particular state. |
| `qTags` | array&lt;string> | Gives information on a field. For example, it can return the type of the field.<br>Examples: key, text, ASCII |
| `qError` | [`NxValidationError`](#nxvalidationerror) | This parameter is optional.<br>Gives information on the error. |
| `qDimensionType` | string | Binary format of the field.<br><br>One of:<br>- D or NX_DIMENSION_TYPE_DISCRETE<br>- N or NX_DIMENSION_TYPE_NUMERIC<br>- T or NX_DIMENSION_TYPE_TIME |
| `qReverseSort` | boolean | If set to true, it inverts the sort criteria in the field. |
| `qGrouping` | string | Defines the grouping.<br><br>One of:<br>- N or GRP_NX_NONE<br>- H or GRP_NX_HIEARCHY<br>- C or GRP_NX_COLLECTION |
| `qIsSemantic` | boolean | If set to true, it means that the field is a semantic. |
| `qNumFormat` | [`FieldAttributes`](#fieldattributes) | Format of the field.<br>This parameter is optional. |
| `qIsAutoFormat` | boolean | This parameter is set to true if _qNumFormat_ is set to _U_ (unknown). The engine guesses the type of the field based on the field's definition. |
| `qGroupFieldDefs` | array&lt;string> | Array of field names. |
| `qMin` | number | Minimum value. |
| `qMax` | number | Maximum value. |
| `qContinuousAxes` | boolean | Is continuous axis used. |
| `qIsCyclic` | boolean | Is a cyclic dimension used. |
| `qDerivedField` | boolean | Is derived field is used as a dimension. |
| `qAttrExprInfo` | array&lt;[`NxAttrExprInfo`](#nxattrexprinfo)> | Array of attribute expressions. |
| `qAttrDimInfo` | array&lt;[`NxAttrDimInfo`](#nxattrdiminfo)> | Array of attribute dimensions. |
| `qCalcCondMsg` | string | The message displayed if calculation condition is not fulfilled. |
| `qIsCalculated` | boolean | True if this is a calculated dimension. |
| `qIsOneAndOnlyOne` | boolean | If set to true, it means that the field always has one and only one selected value. |
| `qCardinalities` | [`NxCardinalities`](#nxcardinalities) | Dimension Cardinalities |
| `qLibraryId` | string | Refers to a dimension stored in the library. |

## `NxEngineVersion`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qComponentVersion` | string | Version number of the Qlik engine component. |

## `NxFieldDescription`



| Name | Type | Description |
| ---- | ---- | ----------- |
| `qIsSemantic` | boolean | If set to true, it means that the field is a semantic. |
| `qIsHidden` | boolean | If set to true, it means that the field is hidden. |
| `qIsSystem` | boolean | If set to true, it means that the field is a system field. |
| `qAndMode` | boolean | If set to true a logical AND (instead of a logical OR) is used when making selections in a field.<br>The default value is false. |
| `qName` | string | Name of the field |
| `qCardinal` | integer | Number of distinct field values |
| `qTags` | array&lt;string> | Gives information on a field. For example, it can return the type of the field.<br>Examples: key, text, ASCII |
| `qIsDefinitionOnly` | boolean | If set to true, it means that the field is a field on the fly. |
| `qDerivedFieldData` | [`NxDerivedFieldDescriptionList`](#nxderivedfielddescriptionlist) | Lists the derived fields if any. |
| `qIsDetail` | boolean | Is used for Direct Discovery.<br>If set to true, it means that the type of the field is detail. |
| `qIsImplicit` | boolean | Is used for Direct Discovery.<br>If set to true, it means that the type of the field is measure. |
| `qReadableName` | string | _No description._ |

## `NxFieldProperties`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qOneAndOnlyOne` | boolean | This parameter is set to true, if the field has one and only one selection (not 0 and not more than 1).<br>If this property is set to true, the field cannot be cleared anymore and no more selections can be performed in that field.<br>The property _OneAndOnlyOne_ can be set to true if one and only value has been selected in the field prior to setting the property.  |

## `NxFieldSelectionInfo`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qName` | string | Name of the field. |
| `qFieldSelectionMode` | string | Selection mode. |

## `NxGetBookmarkOptions`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qTypes` | array&lt;string> | List of object types. |
| `qData` | [`JsonObject`](#jsonobject) | Set of data. |

## `NxGetObjectOptions`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qTypes` | array&lt;string> | List of object types. |
| `qIncludeSessionObjects` | boolean | Set to true to include session objects.<br>The default value is false. |
| `qData` | [`JsonObject`](#jsonobject) | Set of data. |

## `NxGroupTail`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qUp` | integer | Number of elements that are part of the previous tail.<br>This number depends on the paging, more particularly it depends on the values defined in _qTop_ and _qHeight_ .<br>Is not shown if the value is 0.<br>This parameter is optional. |
| `qDown` | integer | Number of elements that are part of the next tail.<br>This number depends on the paging, more particularly it depends on the values defined in _qTop_ and _qHeight_<br>Is not shown if the value is 0.<br>This parameter is optional. |

## `NxHighlightRanges`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qRanges` | array&lt;[`CharRange`](#charrange)> | Ranges of highlighted values. |

## `NxInfo`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qId` | string | Identifier of the object.<br>If the chosen identifier is already in use, the engine automatically sets another one.<br>If an identifier is not set, the engine automatically sets one.<br>This parameter is optional. |
| `qType` | string | Type of the object.<br>This parameter is mandatory. |

## `NxInlineDimensionDef`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qGrouping` | string | Used to define a cyclic group or drill-down group.<br>Default value is no grouping.<br>This parameter is optional.<br><br>One of:<br>- N or GRP_NX_NONE<br>- H or GRP_NX_HIEARCHY<br>- C or GRP_NX_COLLECTION |
| `qFieldDefs` | array&lt;string> | Array of field names.<br>When creating a grouped dimension, more than one field name is defined.<br>This parameter is optional. |
| `qFieldLabels` | array&lt;string> | Array of field labels.<br>This parameter is optional. |
| `qSortCriterias` | array&lt;[`SortCriteria`](#sortcriteria)> | Defines the sorting criteria in the field.<br>Default is to sort by alphabetical order, ascending.<br>This parameter is optional. |
| `qNumberPresentations` | array&lt;[`FieldAttributes`](#fieldattributes)> | Defines the format of the value.<br>This parameter is optional. |
| `qReverseSort` | boolean | If set to true, it inverts the sort criteria in the field. |
| `qActiveField` | integer | Index of the active field in a cyclic dimension.<br>This parameter is optional. The default value is 0.<br>This parameter is used in case of cyclic dimensions ( _qGrouping_ is C). |
| `qLabelExpression` | string | Label expression.<br>This parameter is optional. |

## `NxInlineMeasureDef`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qLabel` | string | Name of the measure.<br>An empty string is returned as a default value.<br>This parameter is optional. |
| `qDescription` | string | Description of the measure.<br>An empty string is returned as a default value.<br>This parameter is optional. |
| `qTags` | array&lt;string> | Name connected to the measure that is used for search purposes.<br>A measure can have several tags.<br>This parameter is optional. |
| `qGrouping` | string | Default value is no grouping.<br>This parameter is optional.<br><br>One of:<br>- N or GRP_NX_NONE<br>- H or GRP_NX_HIEARCHY<br>- C or GRP_NX_COLLECTION |
| `qDef` | string | Definition of the expression in the measure.<br>Example: _Sum (OrderTotal)_<br>This parameter is mandatory. |
| `qNumFormat` | [`FieldAttributes`](#fieldattributes) | Format of the field.<br>This parameter is optional. |
| `qRelative` | boolean | If set to true, percentage values are returned instead of absolute numbers.<br>Default value is false.<br>This parameter is optional. |
| `qBrutalSum` | boolean | If set to true, the sum of rows total should be used rather than real expression total.<br>This parameter is optional and applies to straight tables.<br>Default value is false.<br>If using the Qlik Sense interface, it means that the total mode is set to **Expression Total** . |
| `qAggrFunc` | string | Aggregate function.<br>For more information on the aggregate function syntax, see the section Working with Qlik Sense on the online help portal.<br>The default value is 0 (Sum of rows)<br>This parameter is optional. |
| `qAccumulate` | integer | * 0 means no accumulation<br>                            * 1 means full accumulation (each y-value accumulates all previous y-values of the expression)<br>                            * ≥ 2 means accumulate as many steps as the _qAccumulate_ value<br>Default value is 0.<br>This parameter is optional. |
| `qReverseSort` | boolean | If set to true, it inverts the sort criteria in the field. |
| `qActiveExpression` | integer | Index of the active expression in a cyclic measure. The indexing starts from 0.<br>The default value is 0.<br>This parameter is optional. |
| `qExpressions` | array&lt;string> | Array of expressions. This parameter is used in case of cyclic measures ( _qGrouping_ is C). List of the expressions in the cyclic group. |
| `qLabelExpression` | string | Label expression.<br>This parameter is optional. |

## `NxLayoutErrors`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qErrorCode` | integer | Error code. |

## `NxLibraryDimension`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qGrouping` | string | Information about the grouping.<br><br>One of:<br>- N or GRP_NX_NONE<br>- H or GRP_NX_HIEARCHY<br>- C or GRP_NX_COLLECTION |
| `qFieldDefs` | array&lt;string> | Array of dimension names. |
| `qFieldLabels` | array&lt;string> | Array of dimension labels. |
| `qLabelExpression` | string | _No description._ |

## `NxLibraryDimensionDef`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qGrouping` | string | Information about the grouping.<br><br>One of:<br>- N or GRP_NX_NONE<br>- H or GRP_NX_HIEARCHY<br>- C or GRP_NX_COLLECTION |
| `qFieldDefs` | array&lt;string> | Array of dimension names. |
| `qFieldLabels` | array&lt;string> | Array of dimension labels. |
| `qLabelExpression` | string | _No description._ |

## `NxLibraryMeasure`

Information about the library measure. Is the layout for [`NxLibraryMeasureDef`](#nxlibrarymeasuredef).

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qLabel` | string | _No description._ |
| `qDef` | string | _No description._ |
| `qGrouping` | string | One of:<br>- N or GRP_NX_NONE<br>- H or GRP_NX_HIEARCHY<br>- C or GRP_NX_COLLECTION |
| `qExpressions` | array&lt;string> | _No description._ |
| `qActiveExpression` | integer | _No description._ |
| `qLabelExpression` | string | _No description._ |

## `NxLibraryMeasureDef`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qLabel` | string | Label of the measure. |
| `qDef` | string | Definition of the measure. |
| `qGrouping` | string | Used to define a cyclic group or drill-down group.<br>Default value is no grouping.<br>This parameter is optional.<br><br>One of:<br>- N or GRP_NX_NONE<br>- H or GRP_NX_HIEARCHY<br>- C or GRP_NX_COLLECTION |
| `qExpressions` | array&lt;string> | Array of expressions. |
| `qActiveExpression` | integer | Index to the active expression in a measure. |
| `qLabelExpression` | string | Optional expression used for dynamic label. |

## `NxLinkedObjectInfo`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qRootId` | string | Identifier of the root object.<br>If the linked object is a child, the root identifier is the identifier of the parent.<br>If the linked object is an app object, the root identifier is the same than the identifier of the linked object since the linked object is a root object. |
| `qInfo` | [`NxInfo`](#nxinfo) | Information about the linked object. |

## `NxListObjectExpression`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qExpr` | string | Value of the expression. |
| `qError` | [`NxLayoutErrors`](#nxlayouterrors) | Gives information on the error.<br>This parameter is optional. |

## `NxListObjectExpressionDef`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qExpr` | string | Value of the expression. |
| `qLibraryId` | string | Refers to an expression stored in the library. |



## `NxMatchingFieldInfo`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qName` | string | Name of the field. |
| `qTags` | array&lt;string> | List of tags. |

## `NxMeasure`

Either **qDef** or **qLibraryId** must be set, but not both. If the measure is set in the hypercube and not in the library, this measure cannot be shared with other objects. A measure that is set in the library can be used by many objects. <br>expressions are complementary expressions associated to a measure. For example, you can decide to change the background color of a visualization depending on the values of the measure.<br>Attribute expressions do not affect the layout of an object. The sorting order is unchanged.<br>

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qLibraryId` | string | Refers to a measure stored in the library. |
| `qDef` | [`NxInlineMeasureDef`](#nxinlinemeasuredef) | Refers to a measure stored in the hypercube. |
| `qSortBy` | [`SortCriteria`](#sortcriteria) | Defines the sort criteria.<br>The default value is sort by ascending alphabetic order.<br>This property is optional. |
| `qAttributeExpressions` | array&lt;[`NxAttrExprDef`](#nxattrexprdef)> | List of attribute expressions. |
| `qAttributeDimensions` | array&lt;[`NxAttrDimDef`](#nxattrdimdef)> | List of attribute dimensions. |
| `qCalcCond` | [`ValueExpr`](#valueexpr) | Specifies a calculation condition, which must be fulfilled for the measure to be calculated.<br>If the calculation condition is not met, the measure is excluded from the calculation.<br>By default, there is no calculation condition.<br>This property is optional. |
| `qCalcCondition` | [`NxCalcCond`](#nxcalccond) | Specifies a calculation condition object.<br>If CalcCondition.Cond is not fulfilled, the measure is excluded from the calculation and CalcCondition.Msg is evaluated.<br>By default, there is no calculation condition.<br>This property is optional. |

## `NxMeasureInfo`

Layout for [`NxInlineMeasureDef`](#nxinlinemeasuredef).

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qFallbackTitle` | string | Corresponds to the label of the measure.<br>If the label is not defined then the measure name is used. |
| `qApprMaxGlyphCount` | integer | Length of the longest value in the field. |
| `qCardinal` | integer | Number of distinct field values. |
| `qSortIndicator` | string | Sort indicator.<br>The default value is no sorting.<br>This parameter is optional.<br><br>One of:<br>- N or NX_SORT_INDICATE_NONE<br>- A or NX_SORT_INDICATE_ASC<br>- D or NX_SORT_INDICATE_DESC |
| `qNumFormat` | [`FieldAttributes`](#fieldattributes) | Format of the field.<br>This parameter is optional. |
| `qMin` | number | Lowest value in the range. |
| `qMax` | number | Highest value in the range. |
| `qError` | [`NxValidationError`](#nxvalidationerror) | This parameter is optional.<br>Gives information on the error. |
| `qReverseSort` | boolean | If set to true, it inverts the sort criteria in the field. |
| `qIsAutoFormat` | boolean | This parameter is set to true if _qNumFormat_ is set to _U_ (unknown). The engine guesses the type of the field based on the field's expression. |
| `qAttrExprInfo` | array&lt;[`NxAttrExprInfo`](#nxattrexprinfo)> | List of attribute expressions. |
| `qAttrDimInfo` | array&lt;[`NxAttrDimInfo`](#nxattrdiminfo)> | List of attribute dimensions. |
| `qCalcCondMsg` | string | The message displayed if calculation condition is not fulfilled. |
| `qLibraryId` | string | Refers to a dimension stored in the library. |

## `NxMeta`

Layout for [`NxMetaDef`](#nxmetadef).

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qName` | string | Name.<br>This property is optional. |


## `NxMultiRangeSelectInfo`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qRanges` | array&lt;[`NxRangeSelectInfo`](#nxrangeselectinfo)> | _No description._ |
| `qColumnsToSelect` | array&lt;integer> | _No description._ |

## `NxPage`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qLeft` | integer | Position from the left.<br>Corresponds to the first column. |
| `qTop` | integer | Position from the top.<br>Corresponds to the first row. |
| `qWidth` | integer | Number of columns in the page. The indexing of the columns may vary depending on whether the cells are expanded or not (parameter _qAlwaysFullyExpanded_ in [`HyperCubeDef`](#hypercubedef) ). |
| `qHeight` | integer | Number of rows or elements in the page. The indexing of the rows may vary depending on whether the cells are expanded or not (parameter _qAlwaysFullyExpanded_ in [`HyperCubeDef`](#hypercubedef) ). |

## `NxPageTreeLevel`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qLeft` | integer | The first dimension that is to be part of the tree, counted from the left. For example, if qLeft is equal to 1, omit nodes from the first dimension in the current sort order. |
| `qDepth` | integer | Number of dimensions to include in the tree. |

## `NxPageTreeNode`

Defines an area of the tree to be fetched.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qArea` | [`Rect`](#rect) | The area of the tree to be fetched. If no area is defined on a dimension, all existing nodes are included. |
| `qAllValues` | boolean | When set to true, generated nodes (based on current selection) will be inserted into the returned tree even when there is no actual value. For example, suppose you are looking for hybrid car sales at all car dealerships. Normally, only dealerships where hybrid cars are sold would be part of the returned tree but with qAllValues set to true, all available dealerships will be included regardless if they sold any hybrid cars or not. |

## `NxPatch`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qOp` | string | Operation to perform.<br><br>One of:<br>- add or Add<br>- remove or Remove<br>- replace or Replace |
| `qPath` | string | Path to the property to add, remove or replace. |
| `qValue` | string | This parameter is not used in a remove operation.<br>Corresponds to the value of the property to add or to the new value of the property to update.<br>Examples:<br>"false", "2", "\"New title\"" |

## `NxPivotDimensionCell`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qText` | string | Some text. |
| `qElemNo` | integer | Rank number of the value.<br>If set to -1, it means that the value is not an element number. |
| `qValue` | number | Value of the cell.<br>Is set to _NaN_ , if the value is not a number. |
| `qCanExpand` | boolean | If set to true, it means that the cell can be expanded.<br>This parameter is not returned if it is set to false. |
| `qCanCollapse` | boolean | If set to true, it means that the cell can be collapsed.<br>This parameter is not returned if it is set to false. |
| `qType` | string | Type of the cell.<br><br>One of:<br>- V or NX_DIM_CELL_VALUE<br>- E or NX_DIM_CELL_EMPTY<br>- N or NX_DIM_CELL_NORMAL<br>- T or NX_DIM_CELL_TOTAL<br>- O or NX_DIM_CELL_OTHER<br>- A or NX_DIM_CELL_AGGR<br>- P or NX_DIM_CELL_PSEUDO<br>- R or NX_DIM_CELL_ROOT<br>- U or NX_DIM_CELL_NULL<br>- G or NX_DIM_CELL_GENERATED |
| `qUp` | integer | Number of elements that are part of the previous tail.<br>This number depends on the paging, more particularly it depends on the values defined in _qTop_ and _qHeight_ . |
| `qDown` | integer | Number of elements that are part of the next tail.<br>This number depends on the paging, more particularly it depends on the values defined in _qTop_ and _qHeight_ . |
| `qSubNodes` | array&lt;[`NxPivotDimensionCell`](#nxpivotdimensioncell)> | Information about sub nodes (or sub cells).<br>The array is empty _[ ]_ when there is no sub nodes. |
| `qAttrExps` | [`NxAttributeExpressionValues`](#nxattributeexpressionvalues) | Information about attribute expressions.<br>The array is empty _[ ]_ when there is no attribute expressions. |
| `qAttrDims` | [`NxAttributeDimValues`](#nxattributedimvalues) | Information about attribute dimensions. |

## `NxPivotPage`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qLeft` | array&lt;[`NxPivotDimensionCell`](#nxpivotdimensioncell)> | Information about the left dimension values of a pivot table. |
| `qTop` | array&lt;[`NxPivotDimensionCell`](#nxpivotdimensioncell)> | Information about the top dimension values of a pivot table. If there is no top dimension in the pivot table, information about the measures are given. |
| `qData` | array&lt;[`ArrayOfNxValuePoint`](#arrayofnxvaluepoint)> | Array of data. |
| `qArea` | [`Rect`](#rect) | Size and offset of the data in the matrix. |

## `NxPivotValuePoint`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qLabel` | string | Label of the cell.<br>This parameter is optional. |
| `qText` | string | Some text related to the cell. |
| `qNum` | number | Value of the cell. |
| `qType` | string | Type of the cell.<br><br>One of:<br>- V or NX_DIM_CELL_VALUE<br>- E or NX_DIM_CELL_EMPTY<br>- N or NX_DIM_CELL_NORMAL<br>- T or NX_DIM_CELL_TOTAL<br>- O or NX_DIM_CELL_OTHER<br>- A or NX_DIM_CELL_AGGR<br>- P or NX_DIM_CELL_PSEUDO<br>- R or NX_DIM_CELL_ROOT<br>- U or NX_DIM_CELL_NULL<br>- G or NX_DIM_CELL_GENERATED |
| `qAttrExps` | [`NxAttributeExpressionValues`](#nxattributeexpressionvalues) | Attribute expressions values. |
| `qAttrDims` | [`NxAttributeDimValues`](#nxattributedimvalues) | _No description._ |

## `NxRange`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qFrom` | integer | Position in the expression of the first character of the field name. |
| `qCount` | integer | Number of characters in the field name. |

## `NxRangeSelectInfo`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qRange` | [`Range`](#range) | [`Range`](#range) of values. |
| `qMeasureIx` | integer | Number of the measure to select.<br>Numbering starts from 0. |

## `NxSelectionCell`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qType` | string | Type of cells to select.<br><br>One of:<br>- D or NX_CELL_DATA<br>- T or NX_CELL_TOP<br>- L or NX_CELL_LEFT |
| `qCol` | integer | Column index to select.<br>Indexing starts from 0.<br>If the cell's type is:<br>- D, the index is based on the data matrix.<br>- T, the index is based on the data matrix.<br>- L, the index is based on the left dimensions indexes. |
| `qRow` | integer | Row index to select.<br>Indexing starts from 0.<br>If the cell's type is:<br>- D, the index is based on the data matrix.<br>- T, the index is based on the top dimensions indexes.<br>- L, the index is based on the data matrix. |

## `NxSelectionInfo`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qInSelections` | boolean | Is set to true if the visualization is in selection mode.<br>For more information about the selection mode, see _BeginSelections Method_. |
| `qMadeSelections` | boolean | Is set to true if the visualization is in selection mode and if some selections have been made while in selection mode.<br>For more information about the selection mode, see _BeginSelections Method_. |

## `NxSimpleDimValue`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qText` | string | Text related to the attribute expression value.<br>This property is optional. No text is returned if the attribute expression value is a numeric. |
| `qElemNo` | integer | Element number. |

## `NxSimpleValue`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qText` | string | Text related to the attribute expression value. |
| `qNum` | number | Numeric value of the attribute expression.<br>Set to NaN (Not a Number) if the attribute expression value is not numeric. |

## `NxStackPage`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qData` | array&lt;[`NxStackedPivotCell`](#nxstackedpivotcell)> | Array of data. |
| `qArea` | [`Rect`](#rect) | Size and offset of the data in the matrix. |

## `NxStackedPivotCell`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qText` | string | Some text. |
| `qElemNo` | integer | Rank number of the value.<br>If set to -1, it means that the value is not an element number. |
| `qValue` | number | Value of the cell.<br>Is set to _NaN_ , if the value is not a number. |
| `qCanExpand` | boolean | If set to true, it means that the cell can be expanded.<br>This parameter is not returned if it is set to false. |
| `qCanCollapse` | boolean | If set to true, it means that the cell can be collapsed.<br>This parameter is not returned if it is set to false. |
| `qType` | string | Type of the cell.<br><br>One of:<br>- V or NX_DIM_CELL_VALUE<br>- E or NX_DIM_CELL_EMPTY<br>- N or NX_DIM_CELL_NORMAL<br>- T or NX_DIM_CELL_TOTAL<br>- O or NX_DIM_CELL_OTHER<br>- A or NX_DIM_CELL_AGGR<br>- P or NX_DIM_CELL_PSEUDO<br>- R or NX_DIM_CELL_ROOT<br>- U or NX_DIM_CELL_NULL<br>- G or NX_DIM_CELL_GENERATED |
| `qMaxPos` | number | Total of the positive values in the current group of cells. |
| `qMinNeg` | number | Total of the negative values in the current group of cells. |
| `qUp` | integer | Number of elements that are part of the previous tail. |
| `qDown` | integer | Number of elements that are part of the next tail. |
| `qRow` | integer | Row index in the data matrix.<br>The indexing starts from 0. |
| `qSubNodes` | array&lt;[`NxStackedPivotCell`](#nxstackedpivotcell)> | Information about sub nodes (or sub cells).<br>The array is empty _[ ]_ when there are no sub nodes. |
| `qAttrExps` | [`NxAttributeExpressionValues`](#nxattributeexpressionvalues) | Attribute expressions values. |
| `qAttrDims` | [`NxAttributeDimValues`](#nxattributedimvalues) | Attribute dimensions values. |

## `NxStateCounts`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qLocked` | integer | Number of values in locked state. |
| `qSelected` | integer | Number of values in selected state. |
| `qOption` | integer | Number of values in optional state. |
| `qDeselected` | integer | Number of values in deselected state. |
| `qAlternative` | integer | Number of values in alternative state. |
| `qExcluded` | integer | Number of values in excluded state. |
| `qSelectedExcluded` | integer | Number of values in selected excluded state. |
| `qLockedExcluded` | integer | Number of values in locked excluded state. |

## `NxStreamListEntry`

!!! warning "Deprecated"
    This definition is deprecated and should not be used

This struct is deprecated (not recommended to use).

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qName` | string | Name of the stream. |
| `qId` | string | Identifier of the stream. |

## `NxTickCell`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qText` | string | Tick's label. |
| `qStart` | number | Start value. |
| `qEnd` | number | End value. |

## `NxTreeDataOption`

Specifies all the paging filters needed to define the tree to be fetched.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qMaxNbrOfNodes` | integer | Maximum number of nodes in the tree. If this limit is exceeded, no nodes are returned. All nodes are counted. |
| `qTreeNodes` | array&lt;[`NxPageTreeNode`](#nxpagetreenode)> | Defines areas of the tree to be fetched. Areas must be defined left to right. |
| `qTreeLevels` | [`NxPageTreeLevel`](#nxpagetreelevel) | Filters out complete dimensions from the fetched tree. |

## `NxTreeDimensionDef`

**Stability Index: Experimental**

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qLibraryId` | string | Refers to a dimension stored in the library. |
| `qDef` | [`NxInlineDimensionDef`](#nxinlinedimensiondef) | Refers to a dimension. |
| `qValueExprs` | array&lt;[`NxMeasure`](#nxmeasure)> | List of measures. |
| `qNullSuppression` | boolean | If set to true, no null values are returned. |
| `qOtherTotalSpec` | [`OtherTotalSpecProp`](#othertotalspecprop) | Sets the dimension limits. Each dimension of a hypercube is configured separately.<br>Defines if some values (grouped as _Others_ ) should be grouped together in the visualization.<br>For example in a pie chart all values lower than 200 could be grouped together. |
| `qShowAll` | boolean | If set to true, all dimension values are shown. |
| `qOtherLabel` | [`StringExpr`](#stringexpr) | This property is used when some dimension limits are set.<br>Label of the _Others_ group. The default label is _Others_ .<br>Example:<br>_"qOtherLabel":"= &lt;label&gt;"_<br>or<br>_"qOtherLabel":{"qExpr":"= &lt;label&gt;"}_<br>Where:<br>- &lt; _label_ &gt; is the label of the _Others_ group. |
| `qTotalLabel` | [`StringExpr`](#stringexpr) | If this property is set, the total of the calculated values is returned.<br>The default label is _Total_ .<br>Example:<br>_"qTotalLabel":"= &lt;label&gt;"_<br>or<br>_"qTotalLabel":{"qExpr":"= &lt;label&gt;"}_<br>Where:<br>- &lt; _label_ &gt; is the label of the _Total_ group. |
| `qCalcCondition` | [`NxCalcCond`](#nxcalccond) | Specifies a calculation condition object.<br>If CalcCondition.Cond is not fulfilled, the dimension is excluded from the calculation and CalcCondition.Msg is evaluated.<br>By default, there is no calculation condition.<br>This property is optional. |
| `qAttributeExpressions` | array&lt;[`NxAttrExprDef`](#nxattrexprdef)> | List of attribute expressions. |
| `qAttributeDimensions` | array&lt;[`NxAttrDimDef`](#nxattrdimdef)> | List of attribute dimensions. |

## `NxTreeDimensionInfo`

**Stability Index: Experimental**

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qFallbackTitle` | string | Corresponds to the label of the dimension that is selected.<br>If the label is not defined then the field name is used. |
| `qApprMaxGlyphCount` | integer | Length of the longest value in the field. |
| `qCardinal` | integer | Number of distinct field values. |
| `qLocked` | boolean | Is set to true if the field is locked. |
| `qSortIndicator` | string | Sort indicator.<br>The default value is no sorting.<br>This parameter is optional.<br><br>One of:<br>- N or NX_SORT_INDICATE_NONE<br>- A or NX_SORT_INDICATE_ASC<br>- D or NX_SORT_INDICATE_DESC |
| `qGroupFallbackTitles` | array&lt;string> | Array of dimension labels.<br>Contains the labels of all dimensions in a hierarchy group (for example the labels of all dimensions in a drill down group). |
| `qGroupPos` | integer | Index of the dimension that is currently in use.<br>_qGroupPos_ is set to 0 if there are no hierarchical groups (drill-down groups) or cycle groups. |
| `qStateCounts` | [`NxStateCounts`](#nxstatecounts) | Number of values in a particular state. |
| `qTags` | array&lt;string> | Gives information on a field. For example, it can return the type of the field.<br>Examples: key, text, ASCII |
| `qError` | [`NxValidationError`](#nxvalidationerror) | This parameter is optional.<br>Gives information on the error. |
| `qDimensionType` | string | Binary format of the field.<br><br>One of:<br>- D or NX_DIMENSION_TYPE_DISCRETE<br>- N or NX_DIMENSION_TYPE_NUMERIC<br>- T or NX_DIMENSION_TYPE_TIME |
| `qReverseSort` | boolean | If set to true, it inverts the sort criteria in the field. |
| `qGrouping` | string | Defines the grouping.<br><br>One of:<br>- N or GRP_NX_NONE<br>- H or GRP_NX_HIEARCHY<br>- C or GRP_NX_COLLECTION |
| `qIsSemantic` | boolean | If set to true, it means that the field is a semantic. |
| `qNumFormat` | [`FieldAttributes`](#fieldattributes) | Format of the field.<br>This parameter is optional. |
| `qIsAutoFormat` | boolean | This parameter is set to true if _qNumFormat_ is set to _U_ (unknown). The engine guesses the type of the field based on the field's definition. |
| `qGroupFieldDefs` | array&lt;string> | Array of field names. |
| `qMin` | number | Minimum value. |
| `qMax` | number | Maximum value. |
| `qContinuousAxes` | boolean | Is continuous axis used. |
| `qIsCyclic` | boolean | Is a cyclic dimension used. |
| `qDerivedField` | boolean | Is derived field is used as a dimension. |
| `qMeasureInfo` | array&lt;[`NxMeasureInfo`](#nxmeasureinfo)> | A List of measures to be calculated on this TreeDimension. |
| `qAttrExprInfo` | array&lt;[`NxAttrExprInfo`](#nxattrexprinfo)> | List of attribute expressions. |
| `qAttrDimInfo` | array&lt;[`NxAttrDimInfo`](#nxattrdiminfo)> | List of attribute dimensions. |
| `qCalcCondMsg` | string | The message displayed if calculation condition is not fulfilled. |
| `qIsCalculated` | boolean | True if this is a calculated dimension. |
| `qIsOneAndOnlyOne` | boolean | If set to true, it means that the field always has one and only one selected value. |
| `qCardinalities` | [`NxCardinalities`](#nxcardinalities) | Dimension Cardinalities |
| `qLibraryId` | string | Refers to a dimension stored in the library. |

## `NxTreeMultiRangeSelectInfo`

**Stability Index: Experimental**

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qRanges` | array&lt;[`NxTreeRangeSelectInfo`](#nxtreerangeselectinfo)> | An array of Ranges. |

## `NxTreeNode`

Represents a dimension in the tree.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qText` | string | The text version of the value, if available. |
| `qValue` | number | Value of the cell.<br>Is set to _NaN_ , if the value is not a number. |
| `qElemNo` | integer | Element number. |
| `qNodeNr` | integer | A generated number applicable to this page only. Used so that children can easily identify who their parents are. |
| `qParentNode` | integer | The qNodeNr of this node's parent for the current page. |
| `qRow` | integer | Row index in the data matrix.<br>The indexing starts from 0. |
| `qType` | string | Type of the cell.<br><br>One of:<br>- V or NX_DIM_CELL_VALUE<br>- E or NX_DIM_CELL_EMPTY<br>- N or NX_DIM_CELL_NORMAL<br>- T or NX_DIM_CELL_TOTAL<br>- O or NX_DIM_CELL_OTHER<br>- A or NX_DIM_CELL_AGGR<br>- P or NX_DIM_CELL_PSEUDO<br>- R or NX_DIM_CELL_ROOT<br>- U or NX_DIM_CELL_NULL<br>- G or NX_DIM_CELL_GENERATED |
| `qValues` | array&lt;[`NxTreeValue`](#nxtreevalue)> | The measures for this node. |
| `qNodes` | array&lt;[`NxTreeNode`](#nxtreenode)> | The children of this node in the tree structure. |
| `qAttrExps` | [`NxAttributeExpressionValues`](#nxattributeexpressionvalues) | Attribute expression values. |
| `qAttrDims` | [`NxAttributeDimValues`](#nxattributedimvalues) | Attribute dimension values. |
| `qMaxPos` | array&lt;number> | Total of the positive values in the current group of cells. |
| `qMinNeg` | array&lt;number> | Total of the negative values in the current group of cells. |

## `NxTreeRangeSelectInfo`

**Stability Index: Experimental**

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qRange` | [`Range`](#range) | [`Range`](#range) of values. |
| `qMeasureIx` | integer | Number of the measure to select.<br>Numbering starts from 0. |
| `qDimensionIx` | integer | Number of the dimension to select<br>measure from. Numbering starts from 0. |

## `NxTreeValue`

Represents a measure.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qText` | string | The text version of the value, if available. |
| `qValue` | number | Value of the cell.<br>Is set to _NaN_ , if the value is not a number. |
| `qAttrExps` | [`NxAttributeExpressionValues`](#nxattributeexpressionvalues) | Attribute expression values. |
| `qAttrDims` | [`NxAttributeDimValues`](#nxattributedimvalues) | Attribute dimension values. |

## `NxValidationError`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qErrorCode` | integer | Error code.<br>This parameter is always displayed in case of error. |
| `qContext` | string | Context related to the error, from the user app domain.<br>It can be the identifier of an object, a field name, a table name.<br>This parameter is optional. |
| `qExtendedMessage` | string | Internal information from the server.<br>This parameter is optional. |

## `NxVariableListItem`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qName` | string | Name of the variable. |
| `qDescription` | string | Description of the variable. |
| `qDefinition` | string | Definition of the variable. It can be a value or an expression. |
| `qIsConfig` | boolean | If set to true, it means that the variable is a system variable.<br>A system variable provides information about the system and is set by the engine. The content cannot be changed by the user.<br>This parameter is optional.<br>The default value is false. |
| `qIsReserved` | boolean | If set to true, it means that the variable is reserved.<br>The default value is false.<br>This parameter is optional.<br>Examples:<br>- _ScriptError_ is a reserved variable, set by the engine.<br>- _DayNames_ is a reserved variable, set by the user. |
| `qMeta` | [`NxMeta`](#nxmeta) | Information about publishing and permissions.<br>This parameter is optional. |
| `qInfo` | [`NxInfo`](#nxinfo) | Identifier and type of the object.<br>This parameter is mandatory. |
| `qData` | [`JsonObject`](#jsonobject) | Data. |
| `qIsScriptCreated` | boolean | If set to true, it means that the variable was defined via script. |

## `NxVariableProperties`

!!! warning "Deprecated"
    This definition is deprecated and should not be used

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qName` | string | Name of the variable. |
| `qNumberPresentation` | [`FieldAttributes`](#fieldattributes) | Defines the format of the value of a variable. |
| `qIncludeInBookmark` | boolean | Set this property to true to update the variable when applying a bookmark.<br>The value of a variable can affect the state of the selections.<br>The default value is false. |
| `qUsePredefListedValues` | boolean | The value of a variable can be an enumeration.<br>Set this property to true to reflect the predefined values in an enumeration. |
| `qPreDefinedList` | array&lt;string> | List of enumerations.<br>This property is used if _qUsePredefListedValues_ is set to true. |

## `NxViewPort`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qWidth` | integer | Width of the canvas in pixels. |
| `qHeight` | integer | Height of the canvas in pixels. |
| `qZoomLevel` | integer | Zoom level. |

## `ObjectInterface`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qType` | string | The native type of the object. |
| `qHandle` | integer | The handle used to connect to object. |
| `qGenericType` | string | The type of the object. |
| `qGenericId` | string | Object ID. |

## `OdbcDsn`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qName` | string | Name of the ODBC connection. |
| `qDescription` | string | Description of the ODBC connection. |
| `qBit32` | boolean | Is set to true if the version of ODBC is 32-bit.<br>This parameter is optional. Default is false. |
| `qUserOnly` | boolean | Is set to true if the connection is User DSN. The connection works only for a specific user.<br>Default is false.<br>This parameter is optional. |

## `OleDbProvider`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qName` | string | Name of the OLEDB provider. |
| `qDescription` | string | Description of the OLEDB provider. |
| `qBit32` | boolean | Is set to true if the version of the OLEDB provider is 32-bit.<br>Default is false.<br>This parameter is optional. |

## `OtherTotalSpecProp`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qOtherMode` | string | Determines how many dimension values are displayed.<br>The default value is _OTHER_OFF_ .<br><br>One of:<br>- OTHER_OFF<br>- OTHER_COUNTED<br>- OTHER_ABS_LIMITED<br>- OTHER_ABS_ACC_TARGET<br>- OTHER_REL_LIMITED<br>- OTHER_REL_ACC_TARGET |
| `qOtherCounted` | [`ValueExpr`](#valueexpr) | Number of values to display. The number of values can be entered as a calculated formula.<br>This parameter is used when _qOtherMode_ is set to _OTHER_COUNTED_ . |
| `qOtherLimit` | [`ValueExpr`](#valueexpr) | Value used to limit the dimension values. The limit can be entered as a calculated formula.<br>This parameter is used when _qOtherMode_ is set to:<br>- OTHER_ABS_LIMITED<br>- OTHER_REL_LIMITED<br>- OTHER_ABS_ACC_TARGET<br>OTHER_REL_ACC_TARGET |
| `qOtherLimitMode` | string | Sets the limit for the _Others_ mode.<br>This parameter is used when _qOtherMode_ is set to:<br>- OTHER_ABS_LIMITED<br>- OTHER_REL_LIMITED<br>- OTHER_ABS_ACC_TARGET<br>OTHER_REL_ACC_TARGET<br><br>One of:<br>- OTHER_GE_LIMIT<br>- OTHER_LE_LIMIT<br>- OTHER_GT_LIMIT<br>- OTHER_LT_LIMIT |
| `qSuppressOther` | boolean | If set to true, the group _Others_ is not displayed as a dimension value.<br>The default value is false. |
| `qForceBadValueKeeping` | boolean | This parameter is used when _qOtherMode_ is set to:<br>- OTHER_ABS_LIMITED<br>- OTHER_REL_LIMITED<br>- OTHER_ABS_ACC_TARGET<br>OTHER_REL_ACC_TARGET<br><br>and when the dimension values include not numeric values.<br>Set this parameter to true to include text values in the returned values.<br>The default value is true. |
| `qApplyEvenWhenPossiblyWrongResult` | boolean | Set this parameter to true to allow the calculation of _Others_ even if the engine detects some potential mistakes.<br>For example the country Russia is part of the continent Europe and Asia. If you have an hypercube with two dimensions Country and Continent and one measure Population, the engine can detect that the population of Russia is included in both the continent Asia and Europe.<br>The default value is true. |
| `qGlobalOtherGrouping` | boolean | This parameter applies to inner dimensions.<br>If this parameter is set to true, the restrictions are calculated on the selected dimension only. All previous dimensions are ignored.<br>The default value is false. |
| `qOtherCollapseInnerDimensions` | boolean | If set to true, it collapses the inner dimensions (if any) in the group _Others_ .<br>The default value is false. |
| `qOtherSortMode` | string | Defines the sort order of the dimension values.<br>The default value is _OTHER_SORT_DESCENDING_ .<br><br>One of:<br>- OTHER_SORT_DEFAULT<br>- OTHER_SORT_DESCENDING<br>- OTHER_SORT_ASCENDING |
| `qTotalMode` | string | If set to _TOTAL_EXPR_ , the total of the dimension values is returned.<br>The default value is _TOTAL_OFF_ .<br><br>One of:<br>- TOTAL_OFF<br>- TOTAL_EXPR |
| `qReferencedExpression` | [`StringExpr`](#stringexpr) | This parameter applies when there are several measures.<br>Name of the measure to use for the calculation of _Others_ for a specific dimension. |

## `Point`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qx` | integer | x-coordinate in pixels.<br>The origin is the top left of the screen. |
| `qy` | integer | y-coordinate in pixels.<br>The origin is the top left of the screen. |

## `ProgressData`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qStarted` | boolean | True if the request is started. |
| `qFinished` | boolean | True if the request is finished. |
| `qCompleted` | integer | This property is not used. |
| `qTotal` | integer | This property is not used. |
| `qKB` | integer | This property is not used. |
| `qMillisecs` | integer | Request duration in milliseconds. |
| `qUserInteractionWanted` | boolean | True when the engine pauses the script execution and waits for a user interaction. |
| `qPersistentProgress` | string | A progress message is persistent when it informs about the start or end of a statement. For example, it can inform about the total number of lines fetched from a data source or tell that the app was saved. All persistent progress messages between two *GetProgress* calls are summarized in this string. Contrarily to *qPersistentProgressMessages*, the content of the localized message string is displayed (not its message code). |
| `qTransientProgress` | string | A progress message is transient when it informs about the progress of an ongoing statement. For example, it can tell how many lines are currently fetched from a data source. All transient progress messages between two *GetProgress* calls are summarized in this string. Contrarily to *qTransientProgressMessage*, the content of the localized message string is displayed (not its message code). |
| `qErrorData` | array&lt;[`ErrorData`](#errordata)> | Information about the error messages that occur during the script execution. |
| `qPersistentProgressMessages` | array&lt;[`ProgressMessage`](#progressmessage)> | List of persistent progress messages. |
| `qTransientProgressMessage` | [`ProgressMessage`](#progressmessage) | Transient progress message. |

## `ProgressMessage`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qMessageCode` | integer | Code number to the corresponding localized message string. |
| `qMessageParameters` | array&lt;string> | Parameters to be inserted in the localized message string. |

## `Range`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qMin` | number | Lowest value in the range |
| `qMax` | number | Highest value in the range |
| `qMinInclEq` | boolean | If set to true, the range includes the lowest value in the range of selections (Equals to ). [bn(50500)]<br>Example:<br>The range is [1,10]. If _qMinInclEq_ is set to true it means that 1 is included in the range of selections. |
| `qMaxInclEq` | boolean | If set to true, the range includes the highest value in the range of selections (Equals to ). [bn(50500)]<br>Example:<br>The range is [1,10]. If _qMinInclEq_ is set to true it means that 10 is included in the range of selections. |

## `RangeSelectInfo`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qRangeLo` | number | Lowest value in the range. |
| `qRangeHi` | number | Highest value in the range. |
| `qMeasure` | string | Label of the measure. |

## `Rect`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qLeft` | integer | Position from the left.<br>Corresponds to the first column. |
| `qTop` | integer | Position from the top.<br>Corresponds to the first row. |
| `qWidth` | integer | Number of columns in the page. The indexing of the columns may vary depending on whether the cells are expanded or not (parameter _qAlwaysFullyExpanded_ in [`HyperCubeDef`](#hypercubedef) ). |
| `qHeight` | integer | Number of rows or elements in the page. The indexing of the rows may vary depending on whether the cells are expanded or not (parameter _qAlwaysFullyExpanded_ in [`HyperCubeDef`](#hypercubedef) ). |

## `SampleResult`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qFieldOrColumn` | [`FieldOrColumn`](#fieldorcolumn) | Name of field or column. |
| `qValues` | array&lt;[`FieldValue`](#fieldvalue)> | Matched values part of the sample. |

## `ScriptSyntaxError`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qErrLen` | integer | Length of the word where the error is located. |
| `qTabIx` | integer | Number of the faulty section. |
| `qLineInTab` | integer | Line number in the section where the error is located. |
| `qColInLine` | integer | Position of the erroneous text from the beginning of the line. |
| `qTextPos` | integer | Position of the erroneous text from the beginning of the script. |
| `qSecondaryFailure` | boolean | The default value is false. |

## `SearchAssociationResult`

!!! warning "Deprecated"
    This definition is deprecated and should not be used

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qFieldNames` | array&lt;string> | List of the fields that contains search associations. |
| `qSearchTerms` | array&lt;string> | List of the search terms. |
| `qFieldDictionaries` | array&lt;[`SearchFieldDictionary`](#searchfielddictionary)> | Information about the fields containing search hits. |
| `qSearchTermsMatched` | array&lt;[`SearchMatchCombinations`](#searchmatchcombinations)> | List of search results.<br>The maximum number of search results in this list is set by _qPage/qCount_ . |
| `qTotalSearchResults` | integer | Total number of search results.<br>This number is not limited by _qPage/qCount_ . |

## `SearchAttribute`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qKey` | string | String corresponding to _SearchObjectOptions.qAttributes_. It will be _qProperty_ for [`SearchObjectOptions`](#searchobjectoptions). |
| `qValue` | string | String corresponding to _qKey_ for the current [`SearchGroupItemMatch`](#searchgroupitemmatch). For example, if the match is _Make by Price_ found in the title of a generic object, _qValue_ will be _qMetaDef/title_. |

## `SearchCharRange`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qCharPos` | integer | Starting position of the match in the search result, starting from 0. |
| `qCharCount` | integer | Length of the match in the search result. |
| `qTerm` | integer | Position of the term in the list of search terms, starting from 0. |

## `SearchCombinationOptions`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSearchFields` | array&lt;string> | List of the search fields.<br>If empty, the search is performed in all fields of the app. |
| `qContext` | string | Search context.<br>The default value is _LockedFieldsOnly_ .<br><br>One of:<br>- Cleared or CONTEXT_CLEARED<br>- LockedFieldsOnly or CONTEXT_LOCKED_FIELDS_ONLY<br>- CurrentSelections or CONTEXT_CURRENT_SELECTIONS |
| `qCharEncoding` | string | Encoding used to compute qRanges of type SearchCharRange.<br>Only affects the computation of the ranges. It does not impact the encoding of the text.<br><br>One of:<br>- Utf8 or CHAR_ENCODING_UTF8<br>- Utf16 or CHAR_ENCODING_UTF16 |
| `qAttributes` | array&lt;string> | Optional.<br>- For SearchSuggest method, this array is empty.<br>- For SearchObjects method, this array is empty or contain _qProperty_ .<br>- For SearchResults method, this array is empty, or contains _qNum_ and/or _qElemNum_ . It allows the user to request details in the outputted [`SearchGroupItemMatch`](#searchgroupitemmatch) . For more information, see [`SearchGroupItemMatch`](#searchgroupitemmatch). |

## `SearchFieldDictionary`

!!! warning "Deprecated"
    This definition is deprecated and should not be used

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qField` | integer | Position of the field in the list of fields, starting from 0.<br>The list of fields is defined in _qResults/qFieldNames_ and contains the search associations. |
| `qResult` | array&lt;[`SearchTermResult`](#searchtermresult)> | List of the matching values.<br>The maximum number of values in this list is set by _qMaxNbrFieldMatches_ . |

## `SearchFieldMatch`

!!! warning "Deprecated"
    This definition is deprecated and should not be used

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qField` | integer | Position of the field in the list of fields, starting from 0.<br>The list of fields is defined in _qResults/qFieldNames_ and contains the search associations. |
| `qValues` | array&lt;integer> | Positions of the matching values in the search results.<br>The maximum number of values in this list is defined by _qMaxNbrFieldMatches_ . |
| `qTerms` | array&lt;integer> | Positions of the search terms, starting from 0. |
| `qNoOfMatches` | integer | Number of search hits in the field.<br>The number of values in _qValues_ and the value of _qNoOfMatches_ are equal if _qMaxNbrFieldMatches_ is -1. |

## `SearchGroup`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qId` | integer | Identifier of the search group. |
| `qGroupType` | string | Type of the search group.<br><br>One of:<br>- DatasetType or DATASET_GROUP<br>- GenericObjectsType or GENERIC_OBJECTS_GROUP |
| `qSearchTermsMatched` | array&lt;integer> | Indexes of the search terms that are included in the group. These search terms are related to the list of terms defined in _SearchResult.qSearchTerms_ . |
| `qTotalNumberOfItems` | integer | Total number of distinct items in the search group. |
| `qItems` | array&lt;[`SearchGroupItem`](#searchgroupitem)> | List of items in the search group.<br>The group items are numbered from the value of _SearchGroupOptions.qOffset_ to the value of _SearchGroupOptions.qOffset_ \+ _SearchGroupOptions.qCount_ |

## `SearchGroupItem`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qItemType` | string | Type of the group item.<br><br>One of:<br>- Field or FIELD<br>- GenericObject or GENERIC_OBJECT |
| `qTotalNumberOfMatches` | integer | Total number of distinct matches in the search group item. |
| `qIdentifier` | string | Identifier of the item.<br>It corresponds to:<br>- The name of the field, if the type of the search group is data set.<br>- The id of the generic object if the type of the search group is generic object. |
| `qItemMatches` | array&lt;[`SearchGroupItemMatch`](#searchgroupitemmatch)> | List of matches in the search group item.<br>The group item matches are numbered from the value of _SearchGroupItemOptions.qOffset_ to the value of _SearchGroupItemOptions.qOffset_ \+ _SearchGroupItemOptions.qCount_ . |
| `qSearchTermsMatched` | array&lt;integer> | Indexes of the search terms that are included in the group item. These search terms are related to the list of terms defined in _SearchResult.qSearchTerms_ . |

## `SearchGroupItemMatch`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qText` | string | Search match value.<br>Value of the search group item.<br>If the match is found in a field, it corresponds to the value of the field.<br>If the match is found in a generic object property, it corresponds to the property value. |
| `qFieldSelectionMode` | undefined | Selection mode of a field.<br>Suppressed by default. One and always one field value is selected when set to _OneAndOnlyOne_. |
| `qRanges` | array&lt;[`SearchCharRange`](#searchcharrange)> | List of ranges.<br>For example, if the search terms are Price and Make, and the search group item value is Make by Price vs Mileage, then there are two ranges: one for Price and one for Make. |
| `qAttributes` | array&lt;[`SearchAttribute`](#searchattribute)> | Provides detail of the match as requested by the user in _SearchObjectsOptions.qAttributes_ or _SearchCombinationOptions.qAttributes_<br>If the user requests _SearchObjects_ or _SearchResults_ with an empty _qAttributes_ option, the outputted _qAttributes_ is returned empty.<br>For _SearchObjects_ requested with _qProperty_ , the _SearchGroupItemMatch.qAttributes_ return value contains _[“qProperty”, "qMetaDef/title”]_ if the match has been found in the title of the item. For dimension values, the returned _qProperty_ will be _“*”_ .<br>For _SearchResults_ requested with _qNum_ , the _SearchGroupItemMatch.qAttributes_ return value contains _["qNum", N]_ where _N_ is the numeric value of the element or _NaN_ if the value is not numeric.<br>For _SearchResults_ requested with _qElemNum_ , the _SearchGroupItemMatch.qAttributes_ return value contains _["qElemNum", N]_ where _N_ is the value index of the element. |

## `SearchGroupItemOptions`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qGroupItemType` | string | Type of the group item. Can be:<br>- GenericObject: the type of the search group item is a generic object. Group items have this type when you are calling _SearchObjects_ .<br>- Field: the type of the search group item is a field. Group items have this type when you are calling _SearchResults_ .<br><br>One of:<br>- Field or FIELD<br>- GenericObject or GENERIC_OBJECT |
| `qOffset` | integer | Position starting from 0.<br>The default value is 0. |
| `qCount` | integer | Maximum number of matches per item (in _qItemMatches[ ]_ ).<br>The default value is -1: all values are returned. |

## `SearchGroupOptions`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qGroupType` | string | Type of the group. Can be:<br>- GenericObjectType: the type of the search group item is a generic object. Groups have this type when you are calling _SearchObjects_ .<br>- DatasetType: type of the search group item is a dataset association. Groups have this type when you are calling _SearchResults_ .<br><br>One of:<br>- DatasetType or DATASET_GROUP<br>- GenericObjectsType or GENERIC_OBJECTS_GROUP |
| `qOffset` | integer | Position starting from 0.<br>The default value is 0. |
| `qCount` | integer | Maximum number of items per group (in _qItems[ ]_ ).<br>The default value is -1; all values are returned. |

## `SearchMatchCombination`

!!! warning "Deprecated"
    This definition is deprecated and should not be used

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qId` | integer | Index of the search result, starting from 0. |
| `qFieldMatches` | array&lt;[`SearchFieldMatch`](#searchfieldmatch)> | Information about the search matches. |


## `SearchObjectOptions`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qAttributes` | array&lt;string> | This array is either empty or contains _qProperty_ . |
| `qCharEncoding` | string | Encoding used to compute qRanges of type SearchCharRange.<br>Only affects the computation of the ranges. It does not impact the encoding of the text.<br><br>One of:<br>- Utf8 or CHAR_ENCODING_UTF8<br>- Utf16 or CHAR_ENCODING_UTF16 |

## `SearchPage`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qOffset` | integer | Position from the top, starting from 0.<br>If the offset is set to 0, the first search result to be returned is at position 0. |
| `qCount` | integer | Number of search groups to return (in _qSearchGroupArray_ ). |
| `qMaxNbrFieldMatches` | integer | Maximum number of matching values to return per search result.<br>The default value is -1; all values are returned.<br>This property is to be used with the _SearchAssociations method_. |
| `qGroupOptions` | array&lt;[`SearchGroupOptions`](#searchgroupoptions)> | Options of the search groups.<br>If this property is not set, all values are returned.<br>This property is to be used with the _SearchResults method_ or the _SearchObjects method_. |
| `qGroupItemOptions` | array&lt;[`SearchGroupItemOptions`](#searchgroupitemoptions)> | Options of the search group items.<br>If this property is not set, all values are returned.<br>This property is to be used with the _SearchResults method_ or the _SearchObjects method_. |

## `SearchResult`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSearchTerms` | array&lt;string> | List of the search terms. |
| `qTotalNumberOfGroups` | integer | Total number of groups. |
| `qSearchGroupArray` | array&lt;[`SearchGroup`](#searchgroup)> | List of search groups.<br>The groups are numbered from the value of _SearchPage.qOffset_ to the value of _SearchPage.qOffset + SearchPage.qCount_ . |

## `SearchSuggestItem`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qValue` | string | Value of the suggestion. |
| `qTerm` | integer | Index of the suggestion value.<br>The indexing starts from 0 and from the left. |

## `SearchSuggestionResult`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSuggestions` | array&lt;[`SearchSuggestItem`](#searchsuggestitem)> | List of suggestions. |
| `qFieldNames` | array&lt;string> | List of field names that contain search hits. |

## `SearchTermResult`

!!! warning "Deprecated"
    This definition is deprecated and should not be used

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qText` | string | Text of the associated value. |
| `qElemNumber` | integer | Element number of the associated value. |
| `qRanges` | array&lt;[`SearchCharRange`](#searchcharrange)> | List of ranges.<br>For example, if the user searches the term _read_ and the associative value is _Reading_ , then the corresponding range would be _Read_ in _Reading_ . |

## `SelectInfo`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qTextSearch` | string | Text search string.<br>Everything that matches the text is selected.<br>This parameter is optional. |
| `qRangeLo` | number | Lower value of the search range.<br>This parameter is used when performing range selections or text searches in dimensions.<br>Default is Null. |
| `qRangeHi` | number | Highest value of the search range.<br>This parameter is used when performing range selections or text searches in dimensions.<br>Default is Null. |
| `qNumberFormat` | [`FieldAttributes`](#fieldattributes) | Gives information about the formatting of the range.<br>This parameter is used when performing range selections or text searches in dimensions. |
| `qRangeInfo` | array&lt;[`RangeSelectInfo`](#rangeselectinfo)> | This parameter is used when performing range selections or text searches in measures.<br>Gives information about the range of selections.<br>bool SoftLock = false; |
| `qSoftLock` | boolean | _No description._ |
| `qContinuousRangeInfo` | array&lt;[`Range`](#range)> | List of information about ranges for selections. |

## `SelectionObject`

Indicates which selections are currently applied. It gives the current selections. Is the layout for [`SelectionObjectDef`](#selectionobjectdef).

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qBackCount` | integer | Number of steps back. |
| `qForwardCount` | integer | Number of steps forward. |
| `qSelections` | array&lt;[`NxCurrentSelectionItem`](#nxcurrentselectionitem)> | Lists the fields that are selected. |
| `qStateName` | string | Name of the alternate state.<br>Default is current selections _$_ . |

## `SelectionObjectDef`

To display the current selections.<br>Can be added to any generic object but is particularly meaningful when using session objects to monitor an app.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qStateName` | string | Name of the alternate state.<br>Default is current selections _$_ . |

## `Size`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qcx` | integer | Number of pixels on the _x_ axis. |
| `qcy` | integer | Number of pixels on the _y_ axis. |

## `SortCriteria`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qSortByState` | integer | Sorts the field values according to their logical state (selected, optional, alternative or excluded). |
| `qSortByFrequency` | integer | Sorts the field values by frequency (number of occurrences in the field). |
| `qSortByNumeric` | integer | Sorts the field values by numeric value. |
| `qSortByAscii` | integer | Sorts the field by alphabetical order. |
| `qSortByLoadOrder` | integer | Sorts the field values by the initial load order. |
| `qSortByExpression` | integer | Sorts the field by expression. |
| `qExpression` | [`ValueExpr`](#valueexpr) | Sort by expression. |
| `qSortByGreyness` | integer | _No description._ |

## `SourceKeyRecord`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qKeyFields` | array&lt;string> | Name of the key field. |
| `qTables` | array&lt;string> | Table the key belongs to. |

## `StaticContentList`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qItems` | array&lt;[`StaticContentListItem`](#staticcontentlistitem)> | Information about the list of content files. |

## `StaticContentListItem`

In addition, this structure can return dynamic properties.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qUrlDef` | string | Relative path to the content file. The URL is static.<br>In Qlik Sense Enterprise, content files located:<br>- In the _/content/ &lt;content library name&gt;/_ folder are part of a global content library.<br>- In the _/appcontent/_ folder are part of the app specific library.<br>The content files are never embedded in the _qvf_ file.<br>In Qlik Sense Desktop, content files located:<br>- In the _/content/default/_ folder are outside the qvf file.<br>- In the _/media/ folder_ are embedded in the qvf file. |
| `qUrl` | string | Relative path to the content file. The URL is static.<br>In Qlik Sense Enterprise, content files located:<br>- In the _/content/ &lt;content library name&gt;/_ folder are part of a global content library.<br>- In the _/appcontent/_ folder are part of the app specific library.<br>The content files are never embedded in the _qvf_ file.<br>In Qlik Sense Desktop, content files located:<br>- In the _/content/default/_ folder are outside the qvf file.<br>- In the _/media/ folder_ are embedded in the qvf file. |

## `StaticContentUrl`

In addition, this structure can return dynamic properties.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qUrl` | string | Relative path of the thumbnail. |

## `StaticContentUrlDef`

In addition, this structure can contain dynamic properties.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qUrl` | string | Relative path of the thumbnail. |

## `StringExpr`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qv` | string | Expression evaluated to string. |

## `StringExpression`



| Name | Type | Description |
| ---- | ---- | ----------- |
| `qExpr` | string | _No description._ |

## `TableRecord`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qName` | string | Name of the table. |
| `qLoose` | boolean | This property is set to true if the table is loose. |
| `qNoOfRows` | integer | Number of rows in the table. |
| `qFields` | array&lt;[`FieldInTableData`](#fieldintabledata)> | Information about the fields in the table. |
| `qPos` | [`Point`](#point) | Information about the position of the table. |
| `qComment` | string | Comment related to the table. |
| `qIsDirectDiscovery` | boolean | If set to true, Direct Discovery is used.<br>Direct Discovery fields are not loaded into memory and remain in the external database. |
| `qIsSynthetic` | boolean | This property is set to true if the table contains a synthetic key. |

## `TableRow`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qValue` | array&lt;[`FieldValue`](#fieldvalue)> | Array of field values. |

## `TableViewBroomPointSaveInfo`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qPos` | [`Point`](#point) | Information about the position of the broom point. |
| `qTable` | string | Name of the table. |
| `qFields` | array&lt;string> | List of fields in the table. |

## `TableViewConnectionPointSaveInfo`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qPos` | [`Point`](#point) | Information about the position of the connection point. |
| `qFields` | array&lt;string> | List of the fields in the table. |

## `TableViewCtlSaveInfo`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qInternalView` | [`TableViewSaveInfo`](#tableviewsaveinfo) | Internal view mode. |
| `qSourceView` | [`TableViewSaveInfo`](#tableviewsaveinfo) | Source view mode. |

## `TableViewDlgSaveInfo`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qPos` | [`Rect`](#rect) | Information about the position of the dialog window.<br>Not used in Qlik Sense. |
| `qCtlInfo` | [`TableViewCtlSaveInfo`](#tableviewctlsaveinfo) | Set of data for internal and source view modes. |
| `qMode` | integer | View mode to display when opening Qlik Sense data model viewer.<br>One of:<br>- 0 for internal view mode.<br>- 1 for source view mode. |

## `TableViewSaveInfo`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qTables` | array&lt;[`TableViewTableWinSaveInfo`](#tableviewtablewinsaveinfo)> | List of the tables in the database model viewer. |
| `qBroomPoints` | array&lt;[`TableViewBroomPointSaveInfo`](#tableviewbroompointsaveinfo)> | List of the broom points in the database model viewer.<br>Not used in Qlik Sense. |
| `qConnectionPoints` | array&lt;[`TableViewConnectionPointSaveInfo`](#tableviewconnectionpointsaveinfo)> | List of connection points in the database model viewer.<br>Not used in Qlik Sense. |
| `qZoomFactor` | number | Zoom factor in the database model viewer.<br>The default value is 1.0. |

## `TableViewTableWinSaveInfo`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qPos` | [`Rect`](#rect) | Information about the position of the table. |
| `qCaption` | string | Table name. |

## `TextMacro`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qTag` | string | Name of the variable. |
| `qRefSeqNo` | integer | Order in which the variable was referenced during the script execution.<br>The same number sequence is used for both _qRefSeqNo_ and _qSetSeqNo_ . |
| `qSetSeqNo` | integer | Order in which the variable was updated during the script execution.<br>The same number sequence is used for both _qRefSeqNo_ and _qSetSeqNo_ . |
| `qDisplayString` | string | Variable value. |
| `qIsSystem` | boolean | Is set to true if the variable is a system variable. |
| `qIsReserved` | boolean | Is set to true if the variable is a reserved variable. |

## `TreeData`

**Stability Index: Experimental**

Renders the properties of a [`TreeData`](#treedata) object. Is the layout for TreeDataDef.<br>For more information about the definition of TreeData, see _Generic object_.<br>To retrieve data from the [`TreeData`](#treedata) object, use the method called GetHyperCubeTreeData.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qStateName` | string | Name of the alternate state.<br>Default is current selections _$_ . |
| `qNodesOnDim` | array&lt;integer> | The total number of nodes on each dimension. |
| `qError` | [`NxValidationError`](#nxvalidationerror) | This parameter is optional and is displayed in case of error. |
| `qDimensionInfo` | array&lt;[`NxTreeDimensionInfo`](#nxtreedimensioninfo)> | Information on the dimension. |
| `qEffectiveInterColumnSortOrder` | array&lt;integer> | Defines the order of the dimenion levels/columns in the [`TreeData`](#treedata) object.<br>Column numbers are separated by a comma.<br>Example: [1,0,2] means that the first level in the tree structure is dimension 1, followed by dimension 0 and dimension 2. |
| `qHasOtherValues` | boolean | True if other row exists. |
| `qTitle` | string | Title of the [`TreeData`](#treedata) object, for example the title of a chart. |
| `qLastExpandedPos` | [`NxCellPosition`](#nxcellposition) | Position of the last expended cell.<br>This property is optional. |
| `qCalcCondMsg` | string | The message displayed if calculation condition is not fulfilled. |
| `qTreeDataPages` | array&lt;[`NxTreeNode`](#nxtreenode)> | Set of data.<br>Is empty if nothing has been defined in **qInitialDataFetch** in [`TreeDataDef`](#treedatadef). |

## `TreeDataDef`

**Stability Index: Experimental**

Defines the properties of a [`TreeData`](#treedata) object.<br>For more information about the definition of a [`TreeData`](#treedata) object, see _Generic object_.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qStateName` | string | Name of the alternate state.<br>Default is current selections _$_ . |
| `qDimensions` | array&lt;[`NxTreeDimensionDef`](#nxtreedimensiondef)> | Array of dimensions. |
| `qInterColumnSortOrder` | array&lt;integer> | Defines the order of the dimension levels/columns in the [`TreeData`](#treedata) object.<br>Column numbers are separated by a comma.<br>Example: [1,0,2] means that the first level in the tree structure is dimension 1, followed by dimension 0 and dimension 2.<br>The default sort order is the order in which the dimensions and measures have been defined in the TreeDataDef. |
| `qSuppressZero` | boolean | Removes zero values. |
| `qSuppressMissing` | boolean | Removes missing values. |
| `qOpenFullyExpanded` | boolean | If this property is set to true, the cells are opened expanded. The default value is false. |
| `qPopulateMissing` | boolean | If this property is set to true, the missing symbols (if any) are replaced by 0 if the value is a numeric and by an empty string if the value is a string.<br>The default value is false. |
| `qCalcCondition` | [`NxCalcCond`](#nxcalccond) | Specifies a calculation condition object.<br>If CalcCondition.Cond is not fulfilled, the [`TreeData`](#treedata) is excluded from the calculation and CalcCondition.Msg is evaluated.<br>By default, there is no calculation condition.<br>This property is optional. |
| `qTitle` | [`StringExpr`](#stringexpr) | Title of the [`TreeData`](#treedata) object, for example the title of a chart. |
| `qInitialDataFetch` | array&lt;[`NxTreeDataOption`](#nxtreedataoption)> | Initial data set.<br>This property is optional. |

## `UndoInfo`

Displays information about the number of possible undos and redos. Is the layout for [`UndoInfoDef`](#undoinfodef).

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qUndoCount` | integer | Number of possible undos. |
| `qRedoCount` | integer | Number of possible redos. |


## `ValueExpr`

_No description._

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qv` | string | Expression evaluated to dual. |

## `ValueExpression`



| Name | Type | Description |
| ---- | ---- | ----------- |
| `qExpr` | string | _No description._ |

## `VariableList`

Lists the variables in an app. Is the layout for [`VariableListDef`](#variablelistdef).

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qItems` | array&lt;[`NxVariableListItem`](#nxvariablelistitem)> | List of the variables. |

## `VariableListDef`

Defines the list of variables in an app.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qType` | string | Type of variables to include in the list. |
| `qShowReserved` | boolean | Shows the reserved variables if set to true. |
| `qShowConfig` | boolean | Shows the system variables if set to true. |
| `qData` | [`JsonObject`](#jsonobject) | Data |
| `qShowSession` | boolean | Shows the session variables if set to true. |