# Logging

The QIX Engine follows the logging format and levels specified in the [Logging](../../conventions/logging.md) conventions.

## Log Types

The QIX Engine uses different log types depending on the category of the log event.
Each of these log types can have individual log verbosity as described in [log levels](#log-levels),
and can be toggled depending on scenario.

The following table lists the log types that are available and the default verbosity level for each.

| Type | Description | CLI parameter | Default verbosity level |
| ---- | ----------- | ------------- | ----------------------- |
| System | All _standard_ debug messages | SystemLogVerbosity | 4 |
| Performance | Performance log, typically containing metrics (for example, NbrActiveUsers and CPULoad). | PerformanceLogVerbosity | 4 |
| Audit | User based detailed logging (for example, when the user makes a selection in a document). | AuditLogVerbosity | 0 |
| Session |  Information about a client session (for example, user, machine ID, ip-address, port). | SessionLogVerbosity | 4 |
| Traffic | JSON traffic to and from the QIX Engine. | TrafficLogVerbosity | 0 |
| QixPerformance | QIX protocol performance. | QixPerformanceLogVerbosity | 0 |
| SmartSearchQuery | Smart Search query log. | SmartSearchQueryLogVerbosity | 3 |
| SmartSearchIndex | Smart Search index log. | SmartSearchIndexLogVerbosity | 3 |
| SSE | Server Side Extension log. | SSELogVerbosity | 4 |

## Log Levels

You configure the log levels by providing settings through command line parameters when you start the docker container.

!!! Note
    While the QIX Engine follows the [Logging](../../conventions/logging.md#logging-levels) conventions,
    each log level is also mapped to a numeric value used to set the logging verbosity level.

| Log level | Value |
| --------- | ----- |
| OFF (disabled) | 0 |
| FATAL | 1 |
| ERROR | 2 |
| WARNING | 3 |
| INFO | 4 |
| DEBUG | 5 |

The following example shows how to set the `System` log verbosity to `DEBUG` in a `docker-compose` file.

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

## Log Format

In addition to the required fields in the [Logging](../../conventions/logging.md) conventions, the QIX Engine also
has a few log fields that are common to all log types:

| Field | Description |
| ----- | ----------- |
| user_id | The ID of the current active user. |
| log_type | The type of the log. Must be one of the listed [types](#log-types). |
| thread_id | Thread identifier. |

Apart from the common fields, some of the log types contain additional fields.
These fields are listed in the sections that follow.

### Audit

| Field | Description |
| ----- | ----------- |
| doc_id | Document identifier. |
| object_id | Object identifier. |
| session_id | Session identifier. |

### Performance

| Field | Description |
| ----- | ----------- |
| version | The QIX Engine component version. |
| entry_type | The state (Server Starting, Normal). |
| active_doc_sessions | Number of active engine sessions. A session is active when a user is currently performing some action on an document, for example, making selections or creating content. |
| doc_sessions | Number of idle sessions waiting for termination. |
| active_anonymous_doc_sessions | Number of active sessions with a connected anonymous client. |
| anonymous_doc_sessions | Number of idle sessions with anonymous users waiting for termination. |
| active_tunneled_doc_sessions | |
| tunneled_doc_sessions| |
| doc_sessions_start | |
| active_docs | Number of active documents. An document is active when a user is currently performing some action on it. |
| ref_docs | Number of documents currently loaded into the memory, even if they do not have any open sessions or connections. |
| loaded_docs| Number of documents currently loaded into memory that have open sessions or connections. |
| doc_loads | |
| doc_loads_fails | |
| calls | Total number of requests made to the engine. |
| selections | Total number of selections made to the engine. |
| active_ip_addrs | |
| ip_addrs | |
| active_users | Number of distinct active users. An active user is one who is currently performing an action on an app. |
| users | Total number of distinct users within the current engine sessions. |
| cpu_loads | |
| vm_commited_mb | The total amount of committed memory for the engine process in MB. |
| vm_allocated_mb | The total amount of allocated memory (committed + reserved) from the operating system in MB. |
| vm_free_mb | The total amount of free memory (minimum of free virtual and physical memory) in MB. |
| vm_largest_free_block_mb | |
| cache_hits | Number of cache hits. |
| cache_lookups | Number of cache lookups. |
| cache_objects_added | Number of cache objects added. |
| cache_bytes_added | Size in bytes of cache objects added. |
| cache_times_added |  |
| cache_replaced | Number of cache objects replaced. |

### Session

This entry is logged on each session termination.

| Field | Description |
| ----- | ----------- |
| version | Engine component version. |
| doc_id | Document identifier. |
| title | Document title. |
| doc_modified | Document last modified time. |
| exit_reason | Reason for exit (for example, socket closed by client). |
| session_start | Session start time. |
| session_duration | Duration of the session in milliseconds. |
| cpu_spent_s | CPU spent in seconds. |
| bytes_received | Bytes received. |
| bytes_sent | Bytes sent. |
| calls | Number of RPC calls. |
| selections | Number of selections made. |
| secure_protocol | Indicates whether the HTTP session is secure. |

### QixPerformance

This log type includes each request as well as metrics around resource utilization.
Use this log type with caution because it will produce a lot of log entries.

| Field | Description |
| ----- | ----------- |
| server_id | Server identifier. |
| session_id | Session identifier. |
| request_id | Request identifier .|
| method | RPC method. |
| target |
| handle | Object identifier. |
| exception | Exception information. |
| exception_extra | Extra exception information. |
| process_time | The process time (start until end of request). |
| work_time | Actual work time spent. |
| lock_time | Time spent suspended. |
| validation_time | Time spent calculating an object. |
| traverse_time | Time spent in the inference engine. |

### SSE

| Field | Description |
| ----- | ----------- |
| doc_id | Document identifier. |
| title | Document title. |
| plugin_name | The name of the plugin. |
| plugin_host | URL to the host endpoint. |

### SmartSearchQuery

| Field | Description |
| ----- | ----------- |
| doc_id | Document identifier. |
| session_id | Session identifier. |
| query_type | Query type. |
| query_terms | Query terms. |
| query_terms_count | Number of query terms. |
| caret_pos | Caret position. |
| sub_task | Sub task. |
| sub_task_args | Sub task arguments. |
| calc_time | Calculation time. |
| description | Text message. |

### SmartSearchIndex

| Field | Description |
| ----- | ----------- |
| doc_id | Document identifier. |
| data_model_ix | Data model index. |
| field_ix | Field index. |
| field_name | Field name. |
| field_type | Field type. |
| field_symbol_count | Field symbol count. |
| field_memory | Memory used by field. |
| ix_elem_count | Number of element in index. |
| ix_memory | Used memory by the index. |
