
<!-- markdownlint-disable -->
<!-- proselint-disable -->
# Qlik Associative Engine API

_Qlik Associative Engine API for version 12.156.0._

[Qlik Associative Engine API specification](./qlik-associative-engine-api.json)


## Paths

### `GET /docs/{docId}/metadata`

Retrieves the data model and reload statistics meta data of an app.

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Required | Description |
| --------- | -- | ---- | -------- | ----------- |
| `docId` | path | string | true | Identifier of the app. One of:<br/>&bull; Path and name of the app (Qlik Sense Desktop)<br/>&bull; GUID (Qlik Sense Enterprise)<br/>&bull; Relativ path and name of the app (Qlik Core) |

**Responses**

| Status | Description | Schema |
| ------ | ----------- | ------ |
| `200` | OK | [NxAppMetadata](#nxappmetadata) |

### `GET /health`

_No description._

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

_No description._

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

## Definitions

### `NxAppMetadata`

| Metadata | Value |
| -------- | ----- |
| Stability Index | Locked |
| Type | object |

**Properties**

| Name | Type | Schema | Items | Format | Description |
| ---- | ---- | ------ | ----- | ------ | ----------- |
| `reload_meta` | object | [NxLastReloadMetadata](#nxlastreloadmetadata) | _No items_ | _No format_ | Meta data for the last app reload. |
| `static_byte_size` | integer | _No schema_ | _No items_ | int64 | Static memory usage for the app. |
| `fields` | array | _No schema_ | [RestFieldDescription](#restfielddescription) | _No format_ | List of field descriptions. |
| `tables` | array | _No schema_ | [RestTableDescription](#resttabledescription) | _No format_ | List of table descriptions. |

### `NxLastReloadMetadata`

| Metadata | Value |
| -------- | ----- |
| Stability Index | Locked |
| Type | object |

**Properties**

| Name | Type | Schema | Items | Format | Description |
| ---- | ---- | ------ | ----- | ------ | ----------- |
| `cpu_time_spent_ms` | integer | _No schema_ | _No items_ | int64 | Number of CPU milliseconds it took to reload the app. |
| `hardware` | object | [NxHardwareMeta](#nxhardwaremeta) | _No items_ | _No format_ | Hardware available for the engine doing the reload. |

### `NxHardwareMeta`

| Metadata | Value |
| -------- | ----- |
| Stability Index | Locked |
| Type | object |

**Properties**

| Name | Type | Schema | Items | Format | Description |
| ---- | ---- | ------ | ----- | ------ | ----------- |
| `logical_cores` | integer | _No schema_ | _No items_ | int32 | Number of logical cores available. |
| `total_memory` | integer | _No schema_ | _No items_ | int64 | RAM available. |

### `RestFieldDescription`

| Metadata | Value |
| -------- | ----- |
| Stability Index | Locked |
| Type | object |

**Properties**

| Name | Type | Schema | Items | Format | Description |
| ---- | ---- | ------ | ----- | ------ | ----------- |
| `name` | string | _No schema_ | _No items_ | _No format_ | Name of the field. |
| `src_tables` | array | _No schema_ | string | _No format_ | List of table names. |
| `is_system` | boolean | _No schema_ | _No items_ | _No format_ | If set to true, it means that the field is a system field. The default value is false. |
| `is_hidden` | boolean | _No schema_ | _No items_ | _No format_ | If set to true, it means that the field is hidden. The default value is false. |
| `is_semantic` | boolean | _No schema_ | _No items_ | _No format_ | If set to true, it means that the field is a semantic. The default value is false. |
| `distinct_only` | boolean | _No schema_ | _No items_ | _No format_ | If set to true, only distinct field values are shown. The default value is false. |
| `cardinal` | integer | _No schema_ | _No items_ | int32 | Number of distinct field values. |
| `total_count` | integer | _No schema_ | _No items_ | int64 | Total number of field values. |
| `is_locked` | boolean | _No schema_ | _No items_ | _No format_ | If set to true, it means that the field is locked. The default value is false. |
| `always_one_selected` | boolean | _No schema_ | _No items_ | _No format_ | If set to true, it means that the field has one and only one selection (not 0 and not more than 1). If this property is set to true, the field cannot be cleared anymore and no more selections can be performed in that field. The default value is false. |
| `is_numeric` | boolean | _No schema_ | _No items_ | _No format_ | Is set to true if the value is a numeric. The default value is false. |
| `comment` | string | _No schema_ | _No items_ | _No format_ | Field comment. |
| `tags` | array | _No schema_ | string | _No format_ | Gives information on a field. For example, it can return the type of the field. Examples: key, text, ASCII. |
| `byte_size` | integer | _No schema_ | _No items_ | int64 | Static RAM memory used in bytes. |

### `RestTableDescription`

| Metadata | Value |
| -------- | ----- |
| Stability Index | Locked |
| Type | object |

**Properties**

| Name | Type | Schema | Items | Format | Description |
| ---- | ---- | ------ | ----- | ------ | ----------- |
| `name` | string | _No schema_ | _No items_ | _No format_ | Name of the table. |
| `is_system` | boolean | _No schema_ | _No items_ | _No format_ | If set to true, it means that the table is a system table. The default value is false. |
| `is_semantic` | boolean | _No schema_ | _No items_ | _No format_ | If set to true, it means that the table is a semantic. The default value is false. |
| `is_loose` | boolean | _No schema_ | _No items_ | _No format_ | If set to true, it means that the table is loose due to circular connection. The default value is false. |
| `no_of_rows` | integer | _No schema_ | _No items_ | int64 | Number of rows. |
| `no_of_fields` | integer | _No schema_ | _No items_ | int32 | Number of fields. |
| `no_of_key_fields` | integer | _No schema_ | _No items_ | int32 | Number of key fields. |
| `comment` | string | _No schema_ | _No items_ | _No format_ | Table comment. |
| `byte_size` | integer | _No schema_ | _No items_ | int64 | Static RAM memory used in bytes. |

### `HealthcheckStatus`

| Metadata | Value |
| -------- | ----- |
| Stability Index | Locked |
| Type | object |

**Properties**

| Name | Type | Schema | Items | Format | Description |
| ---- | ---- | ------ | ----- | ------ | ----------- |
| `version` | string | _No schema_ | _No items_ | _No format_ | _No description._ |
| `started` | string | _No schema_ | _No items_ | _No format_ | _No description._ |
| `mem` | object | [MemoryUsage](#memoryusage) | _No items_ | _No format_ | _No description._ |
| `cpu` | object | [CPUUsage](#cpuusage) | _No items_ | _No format_ | _No description._ |
| `session` | object | [SessionUsage](#sessionusage) | _No items_ | _No format_ | _No description._ |
| `apps` | object | [AppUsage](#appusage) | _No items_ | _No format_ | _No description._ |
| `users` | object | [UserUsage](#userusage) | _No items_ | _No format_ | _No description._ |
| `cache` | object | [CacheUsage](#cacheusage) | _No items_ | _No format_ | _No description._ |
| `saturated` | boolean | _No schema_ | _No items_ | _No format_ | _No description._ |

### `MemoryUsage`

| Metadata | Value |
| -------- | ----- |
| Stability Index | Locked |
| Type | object |

**Properties**

| Name | Type | Schema | Items | Format | Description |
| ---- | ---- | ------ | ----- | ------ | ----------- |
| `committed` | number | _No schema_ | _No items_ | double | _No description._ |
| `allocated` | number | _No schema_ | _No items_ | double | _No description._ |
| `free` | number | _No schema_ | _No items_ | double | _No description._ |

### `CPUUsage`

| Metadata | Value |
| -------- | ----- |
| Stability Index | Locked |
| Type | object |

**Properties**

| Name | Type | Schema | Items | Format | Description |
| ---- | ---- | ------ | ----- | ------ | ----------- |
| `total` | number | _No schema_ | _No items_ | double | _No description._ |

### `SessionUsage`

| Metadata | Value |
| -------- | ----- |
| Stability Index | Locked |
| Type | object |

**Properties**

| Name | Type | Schema | Items | Format | Description |
| ---- | ---- | ------ | ----- | ------ | ----------- |
| `active` | integer | _No schema_ | _No items_ | int32 | _No description._ |
| `total` | integer | _No schema_ | _No items_ | int32 | _No description._ |

### `AppUsage`

| Metadata | Value |
| -------- | ----- |
| Stability Index | Locked |
| Type | object |

**Properties**

| Name | Type | Schema | Items | Format | Description |
| ---- | ---- | ------ | ----- | ------ | ----------- |
| `active_docs` | array | _No schema_ | string | _No format_ | _No description._ |
| `loaded_docs` | array | _No schema_ | string | _No format_ | _No description._ |
| `in_memory_docs` | array | _No schema_ | string | _No format_ | _No description._ |
| `calls` | integer | _No schema_ | _No items_ | int32 | _No description._ |
| `selections` | integer | _No schema_ | _No items_ | int32 | _No description._ |

### `UserUsage`

| Metadata | Value |
| -------- | ----- |
| Stability Index | Locked |
| Type | object |

**Properties**

| Name | Type | Schema | Items | Format | Description |
| ---- | ---- | ------ | ----- | ------ | ----------- |
| `active` | integer | _No schema_ | _No items_ | int32 | _No description._ |
| `total` | integer | _No schema_ | _No items_ | int32 | _No description._ |

### `CacheUsage`

| Metadata | Value |
| -------- | ----- |
| Stability Index | Locked |
| Type | object |

**Properties**

| Name | Type | Schema | Items | Format | Description |
| ---- | ---- | ------ | ----- | ------ | ----------- |
| `hits` | integer | _No schema_ | _No items_ | int32 | _No description._ |
| `lookups` | integer | _No schema_ | _No items_ | int32 | _No description._ |
| `added` | integer | _No schema_ | _No items_ | int32 | _No description._ |
| `replaced` | integer | _No schema_ | _No items_ | int32 | _No description._ |
| `bytes_added` | integer | _No schema_ | _No items_ | int32 | _No description._ |