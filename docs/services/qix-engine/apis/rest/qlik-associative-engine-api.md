
<!-- markdownlint-disable -->
<!-- proselint-disable -->
# Qlik Associative Engine API

_Qlik Associative Engine API for version 12.190.0._

[Qlik Associative Engine API specification](./qlik-associative-engine-api.json)


## Paths

### `GET /health`

Checks if the Engine service is healthy.<br/>&bull; If response code 200 is returned; engine is healthy and ready to serve requests.<br/>&bull; If the setting `EnableLameDuckHealthCheck` is set to 1, response code 429 is returned if the engine is alive but too busy to serve new requests.<br/>&bull; Other response code means that Engine is not healthy.

| Metadata | Value |
| -------- | ----- |
| Stability Index | Locked |
| Produces | application/json |

**Parameters**

_No parameters_


**Responses**

| Status | Description | Schema |
| ------ | ----------- | ------ |
| `200` | OK | _No schema_ |

### `GET /healthcheck`

Checks if the Engine service is healthy and returns basic status information about the running instance.

| Metadata | Value |
| -------- | ----- |
| Stability Index | Locked |
| Produces | application/json |

**Parameters**

_No parameters_


**Responses**

| Status | Description | Schema |
| ------ | ----------- | ------ |
| `200` | OK | [HealthcheckStatus](#healthcheckstatus) |

### `POST /v1/apps/import`

Imports an app to the system. <div class=note>This operation in autoreplace mode is supported only in EFE mode.</div>

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `filedata` | body | [FileData](#filedata) | true | Path of the source app. |
| `name` | query | string | false | The name of the target app. |
| `mode` | query | string | false | The import mode. In `new` mode (default), the source app will be imported as a new app with generated meta-data. In `autoreplace` mode, the meta-data from the source app will be retained and imported with the app. The app-id is extracted from the source app and used as the target app-id. If the app exists, it will be replaced. Approved objects in the target app which are not availble in the source app will be removed. Non-approved objects in the target app will not be removed.  One of:<br/>&bull; NEW<br/>&bull; AUTOREPLACE |

**Responses**

| Status | Description | Schema |
| ------ | ----------- | ------ |
| `200` | OK | [NxApp](#nxapp) |

### `DELETE /v1/apps/{appId}`

Delete an app in the system.

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Identifier of the app to delete. |

**Responses**

| Status | Description | Schema |
| ------ | ----------- | ------ |
| `200` | OK | _No schema_ |

### `GET /v1/apps/{appId}/data/metadata`

Retrieves the data model and reload statistics meta data of an app.

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Identifier of the app. |

**Responses**

| Status | Description | Schema |
| ------ | ----------- | ------ |
| `200` | OK | [DataModelMetadata](#datamodelmetadata) |

### `GET /v1/apps/{appId}/media/files/{path}`

Get media content from file. Returns a stream of bytes containing the media file content on success, or error if file is not found.

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

| Status | Description | Schema |
| ------ | ----------- | ------ |
| `200` | OK | _No schema_ |
| `404` | Not Found | _No schema_ |

### `GET /v1/apps/{appId}/media/list/{path}`

List media content. Returns a JSON formatted array of strings describing the available media content or error if the optional path supplied is not found.

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Unique application identifier. |
| `path` | path | string | true | The path to sub folder with static content, path is relative to the root folder. Use empty path to access the root folder. |
| `show` | query | string | false | Optional. List output can include files and folders in different ways:<br/>&bull; Not recursive, default if show option is not supplied or incorrectly specified, results in output with files and empty directories for the path specified only.<br/>&bull; Recursive(r), use ?show=r or ?show=recursive, results in a recursive output with files, all empty folders are excluded.<br/>&bull; All(a), use ?show=a or ?show=all, results in a recursive output with files and empty directories. |

**Responses**

| Status | Description | Schema |
| ------ | ----------- | ------ |
| `200` | OK | _No schema_ |
| `404` | Not Found | _No schema_ |

### `GET /v1/apps/{appId}/media/thumbnail`

Get media content from file currently used as application thumbnail. Returns a stream of bytes containing the media file content on success, or error if file is not found. <div class=note>The image selected as thumbnail is only updated when application is saved.</div>

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/octet-stream |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Unique application identifier. |

**Responses**

| Status | Description | Schema |
| ------ | ----------- | ------ |
| `200` | OK | _No schema_ |
| `404` | Not Found | _No schema_ |

## Definitions

### `HealthcheckStatus`


_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `version` | string | _No description._ |
| `started` | string | _No description._ |
| `mem` | [MemoryUsage](#MemoryUsage) | _No description._ |
| `cpu` | [CPUUsage](#CPUUsage) | _No description._ |
| `session` | [SessionUsage](#SessionUsage) | _No description._ |
| `apps` | [AppUsage](#AppUsage) | _No description._ |
| `users` | [UserUsage](#UserUsage) | _No description._ |
| `cache` | [CacheUsage](#CacheUsage) | _No description._ |
| `saturated` | boolean | _No description._ |

### `MemoryUsage`


_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `committed` | number | _No description._ |
| `allocated` | number | _No description._ |
| `free` | number | _No description._ |

### `CPUUsage`


_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `total` | number | _No description._ |

### `SessionUsage`


_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `active` | integer | _No description._ |
| `total` | integer | _No description._ |

### `AppUsage`


_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `active_docs` | array&lt;string> | _No description._ |
| `loaded_docs` | array&lt;string> | _No description._ |
| `in_memory_docs` | array&lt;string> | _No description._ |
| `calls` | integer | _No description._ |
| `selections` | integer | _No description._ |

### `UserUsage`


_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `active` | integer | _No description._ |
| `total` | integer | _No description._ |

### `CacheUsage`


_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `hits` | integer | _No description._ |
| `lookups` | integer | _No description._ |
| `added` | integer | _No description._ |
| `replaced` | integer | _No description._ |
| `bytes_added` | integer | _No description._ |

### `FileData`


_Type: string_


_Format: binary_



### `NxApp`


_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `attributes` | [NxAttributes](#NxAttributes) | App attributes. |
| `privileges` | array&lt;string> | App privileges. Hints to the client on what actions the user are allowed. |
| `create` | array&lt;[NxAppCreatePrivileges](#NxAppCreatePrivileges)> | Object create privileges. Hints to the client on what type of objects the user are allowed to create. |

### `NxAttributes`


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
| `dynamicColor` | string | The dynamic color of the app. |
| `published` | boolean | True if the app is published, false if not. |
| `publishTime` | string | The date and time when the app was published. Empty if unpublished. |
| `custom` | [JsonObject](#JsonObject) | Custom attributes. |

### `JsonObject`


_Type: object_



### `NxAppCreatePrivileges`


_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `resource` | string | Type of resources. |
| `canCreate` | boolean | true if resource is allowed to create. |

### `DataModelMetadata`


_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `reload_meta` | [LastReloadMetadata](#LastReloadMetadata) | Meta data for the last app reload. |
| `static_byte_size` | integer | Static memory usage for the app. |
| `fields` | array&lt;[FieldMetadata](#FieldMetadata)> | List of field descriptions. |
| `tables` | array&lt;[TableMetadata](#TableMetadata)> | List of table descriptions. |

### `LastReloadMetadata`


_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `cpu_time_spent_ms` | integer | Number of CPU milliseconds it took to reload the app. |
| `hardware` | [HardwareMeta](#HardwareMeta) | Hardware available for the engine doing the reload. |

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