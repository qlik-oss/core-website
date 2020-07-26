
<!-- markdownlint-disable -->
<!-- proselint-disable -->
# Qlik Associative Engine API

_Qlik Associative Engine API for version 12.754.0._

[Qlik Associative Engine API specification](./qlik-associative-engine-api.json)


## Paths

### `POST /v1/apps`

Creates a new app.

Required permissions: [`create`](https://core.qlik.com/services/qix-engine/access-control/#actions)

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `attr` | body | [CreateApp](#createapp) | true | Attributes that the user wants to set in new app. |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | [NxApp](#nxapp) |

### `POST /v1/apps/import`

Imports an app into the system.
<div class=note>This operation in autoreplace mode is supported only in EFE mode.</div>

Required permissions: [`import`](https://core.qlik.com/services/qix-engine/access-control/#actions)

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Consumes | application/octet-stream |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `filedata` | body | [FileData](#filedata) | false | Path of the source app. |
| `name` | query | string | false | The name of the target app. |
| `spaceId` | query | string | false | The space id of the target app. |
| `mode` | query | string | false | The import mode. In `new` mode (default), the source app will be imported as a new app with generated attributes. In `autoreplace` mode, the attributes from the source app will be retained and imported with the app. The app-id is extracted from the source app and used as the target app-id. If the app exists, it will be replaced. Approved objects in the target app that are not available in the source app will be removed. Non-approved objects in the target app will not be removed.  One of:<br/>&bull; NEW<br/>&bull; AUTOREPLACE |
| `appId` | query | string | false | The app id of the target app when source is qvw file. |
| `fileId` | query | string | false | The file id to be downloaded from TCS and used during import. |
| `fallbackName` | query | string | false | The name of the target app when source not has a specified name, applicable if source is qvw file. |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | [NxApp](#nxapp) |
| `404` | Not Found | _No schema_ |

### `GET /v1/apps/privileges`

Gets the app privileges for the current user, such as create app and import app. Empty means that the current user has no app privileges.

Required permissions: [`read`](https://core.qlik.com/services/qix-engine/access-control/#actions)

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

_No parameters_


**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | array&lt;string> |

### `GET /v1/apps/{appId}`

Retrieves information for a specific app.

Required permissions: [`read`](https://core.qlik.com/services/qix-engine/access-control/#actions)

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Identifier of the app. |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | [NxApp](#nxapp) |

### `DELETE /v1/apps/{appId}`

Deletes a specific app.

Required permissions: [`delete`](https://core.qlik.com/services/qix-engine/access-control/#actions)

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Identifier of the app. |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | _No schema_ |

### `PUT /v1/apps/{appId}`

Updates the information for a specific app.

Required permissions: [`update`](https://core.qlik.com/services/qix-engine/access-control/#actions)

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Identifier of the app. |
| `update` | body | [UpdateApp](#updateapp) | true | Attributes that user wants to set. |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | [NxApp](#nxapp) |

### `POST /v1/apps/{appId}/copy`

Copies a specific app.

Required permissions: [`duplicate`](https://core.qlik.com/services/qix-engine/access-control/#actions)

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Identifier of the app. |
| `dstUpdate` | body | [UpdateApp](#updateapp) | true | Attributes that should be set in the copy. |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | [NxApp](#nxapp) |

### `GET /v1/apps/{appId}/data/lineage`

Retrieves the lineage for an app.
Returns a JSON formatted array of strings describing the lineage of the app.

Required permissions: [`reload`](https://core.qlik.com/services/qix-engine/access-control/#actions)

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Identifier of the app. |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | array&lt;[LineageInfoRest](#lineageinforest)> |

### `GET /v1/apps/{appId}/data/metadata`

Retrieves the data model and reload statistics metadata of an app.
<div class=note>An empty metadata structure is returned if the metadata is not available in the app.</div>

Required permissions: [`read`](https://core.qlik.com/services/qix-engine/access-control/#actions)

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Identifier of the app. |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | [DataModelMetadata](#datamodelmetadata) |

### `POST /v1/apps/{appId}/export`

Export a specific app.

Required permissions: [`read`](https://core.qlik.com/services/qix-engine/access-control/#actions)

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Identifier of the app. |
| `NoData` | query | boolean | false | The flag indicating if only object contents should be exported. |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `201` | Created | _No schema_ |
| `400` | Bad request | _No schema_ |
| `403` | Forbidden | _No schema_ |
| `404` | Not Found | _No schema_ |

### `GET /v1/apps/{appId}/media/files/{path}`

Get media content from file.
Returns a stream of bytes containing the media file content on success, or error if file is not found.

Required permissions: [`read`](https://core.qlik.com/services/qix-engine/access-control/#actions)

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/octet-stream |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Unique application identifier. |
| `path` | path | string | true | Path to file content. |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | binary |
| `403` | Forbidden | _No schema_ |
| `404` | Not Found | _No schema_ |

### `PUT /v1/apps/{appId}/media/files/{path}`

Stores the media content file.
Returns OK if the bytes containing the media file content was successfully stored, or error in case of failure, lack of permission or file already exists on the supplied path.

Required permissions: [`update`](https://core.qlik.com/services/qix-engine/access-control/#actions)

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Consumes | application/octet-stream |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Unique application identifier. |
| `path` | path | string | true | Path to file content. |
| `filedata` | body | [FileData](#filedata) | true | _No description._ |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | _No schema_ |
| `403` | Forbidden | _No schema_ |
| `404` | Not Found | _No schema_ |

### `DELETE /v1/apps/{appId}/media/files/{path}`

Deletes a media content file or complete directory.
Returns OK if the bytes containing the media file (or the complete content of a directory) was successfully deleted, or error in case of failure or lack of permission.

Required permissions: [`update`](https://core.qlik.com/services/qix-engine/access-control/#actions)

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Unique application identifier. |
| `path` | path | string | true | Path to file content. |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | _No schema_ |
| `403` | Forbidden | _No schema_ |
| `404` | Not Found | _No schema_ |

### `GET /v1/apps/{appId}/media/list/{path}`

List media content.
Returns a JSON formatted array of strings describing the available media content or error if the optional path supplied is not found.

Required permissions: [`read`](https://core.qlik.com/services/qix-engine/access-control/#actions)

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Unique application identifier. |
| `path` | path | string | true | The path to sub folder with static content relative to the root folder. Use empty path to access the root folder. |
| `show` | query | string | false | Optional. List output can include files and folders in different ways:<br/>&bull; Not recursive, default if show option is not supplied or incorrectly specified, results in output with files and empty directories for the path specified only.<br/>&bull; Recursive(r), use ?show=r or ?show=recursive, results in a recursive output with files, all empty folders are excluded.<br/>&bull; All(a), use ?show=a or ?show=all, results in a recursive output with files and empty directories. |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | [AppContentList](#appcontentlist) |
| `403` | Forbidden | _No schema_ |
| `404` | Not Found | _No schema_ |

### `GET /v1/apps/{appId}/media/thumbnail`

Get media content from file currently used as application thumbnail.
Returns a stream of bytes containing the media file content on success, or error if file is not found.
<div class=note>The image selected as thumbnail is only updated when application is saved.</div>

Required permissions: [`read`](https://core.qlik.com/services/qix-engine/access-control/#actions)

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/octet-stream |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Unique application identifier. |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | binary |
| `403` | Forbidden | _No schema_ |
| `404` | Not Found | _No schema_ |

### `PUT /v1/apps/{appId}/owner`

Change owner of the app.

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Identifier of the app. |
| `owner` | body | [UpdateOwner](#updateowner) | true | New owner. |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | [NxApp](#nxapp) |
| `403` | Forbidden | _No schema_ |
| `404` | Not Found | _No schema_ |

### `POST /v1/apps/{appId}/publish`

Publish a specific app to a managed space.

Required permissions: [`publish`](https://core.qlik.com/services/qix-engine/access-control/#actions)

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Identifier of the app. |
| `publish` | body | [PublishApp](#publishapp) | true | Publish information for the app. |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | [NxApp](#nxapp) |

### `PUT /v1/apps/{appId}/publish`

Republish a published app to a managed space.

Required permissions: [`publish`](https://core.qlik.com/services/qix-engine/access-control/#actions)

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Identifier of the app. |
| `republish` | body | [RepublishApp](#republishapp) | true | Republish information for the app. |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | [NxApp](#nxapp) |

### `PUT /v1/apps/{appId}/space`

Set space on a specific app.

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Identifier of the app. |
| `dstUpdate` | body | [UpdateSpace](#updatespace) | true | New space. |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | [NxApp](#nxapp) |

### `DELETE /v1/apps/{appId}/space`

Remove space from a specific app.

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Identifier of the app. |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | [NxApp](#nxapp) |

## Definitions

### `CreateApp`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `attributes` | [AppAttributes](#appattributes) | Attributes used when creating an application |

### `AppAttributes`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `name` | string | The name (title) of the application |
| `description` | string | The description of the application |
| `spaceId` | string | The space id of the application |

### `NxApp`

Application attributes and user privileges.

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `attributes` | [NxAttributes](#nxattributes) | Application attributes. |
| `privileges` | array&lt;string> | Application privileges. Hints to the client what actions the user are allowed to perform. Could be any of:<br/>&bull; read<br/>&bull; create<br/>&bull; update<br/>&bull; delete<br/>&bull; reload<br/>&bull; import<br/>&bull; publish<br/>&bull; duplicate<br/>&bull; export<br/>&bull; exportdata<br/>&bull; change_owner<br/>&bull; change_space |
| `create` | array&lt;[NxAppCreatePrivileges](#nxappcreateprivileges)> | Object create privileges. Hints to the client what type of objects the user is allowed to create. |

### `NxAttributes`

App attributes. This structure can also contain extra user defined attributes.

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `id` | string | The App ID. |
| `name` | string | App name. |
| `description` | string | App description. |
| `thumbnail` | string | App thumbnail. |
| `lastReloadTime` | string | Date and time of the last reload of the app. |
| `createdDate` | string | The date and time when the app was created. |
| `modifiedDate` | string | The date and time when the app was modified. |
| `owner` | string | The owner of the app. |
| `ownerId` | string | _No description._ |
| `dynamicColor` | string | The dynamic color of the app. |
| `published` | boolean | True if the app is published, false if not. |
| `publishTime` | string | The date and time when the app was published. Empty if unpublished. |
| `custom` | [JsonObject](#jsonobject) | Custom attributes. |
| `hasSectionAccess` | boolean | If true the app has section access configured, |
| `encrypted` | boolean | If true, the app is encrypted. |
| `originAppId` | string | The Origin App ID, for published apps. |

### `JsonObject`

Contains dynamic JSON data specified by the client.

_Type: object_



### `NxAppCreatePrivileges`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `resource` | string | Type of resources. For example sheet, story, bookmark etc. |
| `canCreate` | boolean | Is set to true if the user has privileges to create the resource. |

### `FileData`

_Type: string_


_Format: binary_



### `UpdateApp`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `attributes` | [AppAttributes](#appattributes) | Attribute used when updating the application |

### `LineageInfoRest`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `discriminator` | string | A string indicating the origin of the data:<br/>&bull; [filename]: the data comes from a local file.<br/>&bull; INLINE: the data is entered inline in the load script.<br/>&bull; RESIDENT: the data comes from a resident table. The table name is listed.<br/>&bull; AUTOGENERATE: the data is generated from the load script (no external table of data source).<br/>&bull; Provider: the data comes from a data connection. The connector source name is listed.<br/>&bull; [webfile]: the data comes from a web-based file.<br/>&bull; STORE: path to QVD or TXT file where data is stored.<br/>&bull; EXTENSION: the data comes from a Server Side Extension (SSE). |
| `statement` | string | The LOAD and SELECT script statements from the data load script. |

### `DataModelMetadata`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `reload_meta` | [LastReloadMetadata](#lastreloadmetadata) | Metadata for the last app reload. |
| `static_byte_size` | integer | Static memory usage for the app. |
| `fields` | array&lt;[FieldMetadata](#fieldmetadata)> | List of field descriptions. |
| `tables` | array&lt;[TableMetadata](#tablemetadata)> | List of table descriptions. |
| `has_section_access` | boolean | If true the app has section access configured, |

### `LastReloadMetadata`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `cpu_time_spent_ms` | integer | Number of CPU milliseconds it took to reload the app. |
| `hardware` | [HardwareMeta](#hardwaremeta) | Hardware available for the engine doing the reload. |
| `peak_memory_bytes` | integer | Max number of bytes used during reload of the app. |

### `HardwareMeta`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `logical_cores` | integer | Number of logical cores available. |
| `total_memory` | integer | RAM available. |

### `FieldMetadata`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `name` | string | Name of the field. |
| `src_tables` | array&lt;string> | List of table names. |
| `is_system` | boolean | If set to true, it means that the field is a system field. The default value is false. |
| `is_hidden` | boolean | If set to true, it means that the field is hidden. The default value is false. |
| `is_semantic` | boolean | If set to true, it means that the field is a semantic. The default value is false. |
| `distinct_only` | boolean | If set to true, only distinct field values are shown. The default value is false. |
| `cardinal` | integer | Number of distinct field values. |
| `total_count` | integer | Total number of field values. |
| `is_locked` | boolean | If set to true, it means that the field is locked. The default value is false. |
| `always_one_selected` | boolean | If set to true, it means that the field has one and only one selection (not 0 and not more than 1). If this property is set to true, the field cannot be cleared anymore and no more selections can be performed in that field. The default value is false. |
| `is_numeric` | boolean | Is set to true if the value is a numeric. The default value is false. |
| `comment` | string | Field comment. |
| `tags` | array&lt;string> | Gives information on a field. For example, it can return the type of the field. Examples: key, text, ASCII. |
| `byte_size` | integer | Static RAM memory used in bytes. |
| `hash` | string | Hash of the data in the field. If the data in a reload is the same, the hash will be consistent. |

### `TableMetadata`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `name` | string | Name of the table. |
| `is_system` | boolean | If set to true, it means that the table is a system table. The default value is false. |
| `is_semantic` | boolean | If set to true, it means that the table is a semantic. The default value is false. |
| `is_loose` | boolean | If set to true, it means that the table is loose due to circular connection. The default value is false. |
| `no_of_rows` | integer | Number of rows. |
| `no_of_fields` | integer | Number of fields. |
| `no_of_key_fields` | integer | Number of key fields. |
| `comment` | string | Table comment. |
| `byte_size` | integer | Static RAM memory used in bytes. |

### `AppContentList`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `library` | string | Content library name. |
| `subpath` | string | Content library relative listing path. Empty in case of root listed or representing actual subpath listed. |
| `data` | array&lt;[AppContentListItem](#appcontentlistitem)> | Content list items. |

### `AppContentListItem`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `type` | string | Content type. |
| `id` | string | Unique content identifier. |
| `link` | string | Unique content link. |
| `name` | string | Content name. |

### `UpdateOwner`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `ownerId` | string | _No description._ |

### `PublishApp`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `spaceId` | string | The managed space id where the app will be published. |
| `data` | string | The published app will have data from source or target app. The default is source <br/>&bull; source: Publish with source data<br/>&bull; target: Publish with target data |

### `RepublishApp`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `targetId` | string | The target id to be republished. |
| `data` | string | The republished app will have data from source or target app. The default is source <br/>&bull; source: Publish with source data<br/>&bull; target: Publish with target data |

### `UpdateSpace`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `spaceId` | string | _No description._ |