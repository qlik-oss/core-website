# TODO - Frontira QIX Engine documentation

_Probably basic information in Frontira context and then providing links to other resources._

## Logging

The QIX Engine follows the logging format and levels specified in the [contract](../contract.md#logging).

### Log Types

The QIX Engine uses a number of different log types depending on the category of the log event. Each of these log types can have individual log verbosity as described in [log levels](#log-levels), and can be toggled depending on scenario. Below is a list of the different log types that are available and the default verbosity level for each.

| Type | Description | CLI parameter | Default verbosity level |
| ---- | ----------- | ------------- | ----------------------- |
| System | All _standard_ debug messages | SystemLogVerbosity | 4 |
| Performance | Performance log, typically containing metrics e.g. NbrActiveUsers and CPULoad | PerformanceLogVerbosity | 4 |
| Audit | User based detailed logging e.g. when the user makes a selection in a doc | AuditLogVerbosity | 0 |
| Session |  Information about a client session e.g. user, machine id, ip-address, port | SessionLogVerbosity | 4 |
| Traffic | JSON traffic to and from the QIX Engine | TrafficLogVerbosity | 0 |
| QixPerformance | QIX protocol performance | QixPerformanceLogVerbosity | 0 |
| SmartSearchQuery | Smart Search query log | SmartSearchQueryLogVerbosity | 3 |
| SmartSearchIndex | Smart Search index log | SmartSearchIndexLogVerbosity | 3 |
| SSE | Server Side Extension log | SSELogVerbosity | 4 |

### Log Levels

Configuration of the log levels are done by providing settings through command line parameters when starting the docker container.

The QIX Engine uses the [log levels](../contract.md#logging-levels) defined in the _contract_, but each log level is also mapped to a numeric value used to set the verbosity level of QIX Engine logging.

| Log level | Value |
| --------- | ----- |
| OFF (disabled) | 0 |
| FATAL | 1 |
| ERROR | 2 |
| WARNING | 3 |
| INFO | 4 |
| DEBUG | 5 |

An example of how to set the `System` log verbosity to `DEBUG` in a `docker-compose` file.

```yaml
version: "3.1"

services:
  qix-engine:
    image: qlikea/engine
    command: -S SystemLogVerbosity=5
    labels:
      qix-engine: ""
      ...
```

### Log Format

In addition to the required fields in the [contract](../contract.md#logging) the QIX Engine also has a few log fields that are common to all log types:

| Field | Description |
| ----- | ----------- |
| user_id | Current active user |
| log_type | Type of log, one of the following [types](#log-types) |
| thread_id | Thread id |

Apart from the common fields some of the log types contain additional fields, and the fields are listed below in separate sections.

#### Audit

| Field | Description |
| ----- | ----------- |
| doc_id | Document id |
| object_id | Object id |
| Session_id | Session id |

#### Performance

| Field | Description |
| ----- | ----------- |
| version | Engine component version |
| entry_type | The state (Server Starting, Normal) |
| active_doc_sessions | Number of sessions with a connected client |
| doc_sessions | Number of idle sessions waiting for termination |
| active_anonymous_doc_sessions | Number of sessions with an connected anonymous client |
| anonymous_doc_sessions | Number of idle sessions with anonymous users waiting for termination |
| active_tunneled_doc_sessions | |
| tunneled_doc_sessions| |
| doc_sessions_start | |
| active_docs | |
| ref_docs | |
| loaded_docs| |
| doc_loads | |
| doc_loads_fails | |
| calls | |
| selections | |
| active_ip_addrs | |
| ip_addrs | |
| active_users | |
| users | |
| cpu_loads | |
| vm_commited_mb | |
| vm_allocated_mb | |
| vm_free_mb | |
| vm_largest_free_bock_mb | |
| cache_hits | |
| cache_lookups | |
| cache_objects_added | |
| cache_bytes_added | |
| cache_times_added | |
| cache_replaced | |

#### Session

This entry is logged on each session termination.

| Field | Description |
| ----- | ----------- |
| version | Engine component version |
| doc_id | Document id |
| title | Document title |
| doc_modified | Document last modified time |
| exit_reason | Reason for exit e.g. Socket closed by client |
| session_start | Session start time |
| session_duration | Duration of the session in milliseconds |
| cpu_spent_s | CPU spent in seconds |
| bytes_received | Bytes received |
| bytes_sent | Bytes sent |
| calls | Number of RPC calls |
| selections | Number of selections made |
| secure_protocol | Is the http connection secure or not |

#### QixPerformance

Log of each request and metrics around resource utilization. Should be used with caution as it will produce a lot of log entries.

| Field | Description |
| ----- | ----------- |
| server_id | Server id |
| session_id | Session id |
| request_id | Request id |
| method | RPC method |
| target |
| handle | Object identifier |
| exception | Exception information |
| exception_extra | Extra exception information |
| process_time | The process time (start until end of request) |
| work_time | Actual work time spent |
| lock_time | Time spent suspended |
| validation_time | Time spent calculating an object |
| traverse_time | Time spent in the inference engine |

#### SSE

| Field | Description |
| ----- | ----------- |
| doc_id | The document id |
| title | The document title |
| plugin_name | The name of the plugin |
| plugin_host | URL to the host endpoint |

#### SmartSearchQuery

| Field | Description |
| ----- | ----------- |
| user_id | User id |
| doc_id | Document id |
| session_id | Session id |
| query_type | Query type |
| query_terms | Query terms |
| query_terms_count | Number of query terms |
| caret_pos | Caret position |
| sub_task | Sub task |
| sub_task_args | Sub task arguments |
| calc_time | Calculation time |
| description | Text message |

#### SmartSearchIndex

| Field | Description |
| ----- | ----------- |
| user_id | User id |
| doc_id | Document id |
| data_model_ix | |
| field_ix | Field Index |
| field_name | Field name |
| field_type | Field type |
| field_symbol_count | Field Symbol count |
| field_memory | Memory used by field |
| ix_elem_count | Number of element in index |
| ix_memory | Used memory by the index |
