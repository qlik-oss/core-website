# Frontira QIX Engine documentation

_Probably basic information in Frontira context and then providing links to other resources._

## Logging

The QIX Engine follows the logging format and levels specified in the [Frontira Service Contract](../contract.md#logging).

### Log Types

The QIX Engine uses different log types depending on the category of the log event.
Each of these log types can have individual log verbosity as described in [log levels](#log-levels),
and can be toggled depending on scenario.
Below is a list of the different log types that are available and the default verbosity level for each.

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

Configuration of the log levels is done by providing settings through command line parameters when starting the docker container.

The QIX Engine uses the [log levels](../contract.md#logging-levels) defined in the _Frontira Service Contract_,
but each log level is also mapped to a numeric value used to set the verbosity level of QIX Engine logging.

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

In addition to the required fields in the _Frontira Service Contract_ the QIX Engine also has a few log fields that
are common to all log types:

| Field | Description |
| ----- | ----------- |
| user_id | Current active user |
| log_type | Type of log, one of the following [types](#log-types) |
| thread_id | Thread identifier |

Apart from the common fields some of the log types contain additional fields,
and the fields are listed below in separate sections.

#### Audit

| Field | Description |
| ----- | ----------- |
| doc_id | Document identifier |
| object_id | Object identifier |
| session_id | Session identifier |

#### Performance

| Field | Description |
| ----- | ----------- |
| version | QIX Engine component version |
| entry_type | The state (Server Starting, Normal) |
| active_doc_sessions | Number of sessions with a connected client |
| doc_sessions | Number of idle sessions waiting for termination |
| active_anonymous_doc_sessions | Number of sessions with a connected anonymous client |
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
| doc_id | Document identifier |
| title | Document title |
| doc_modified | Document last modified time |
| exit_reason | Reason for exit e.g. socket closed by client |
| session_start | Session start time |
| session_duration | Duration of the session in milliseconds |
| cpu_spent_s | CPU spent in seconds |
| bytes_received | Bytes received |
| bytes_sent | Bytes sent |
| calls | Number of RPC calls |
| selections | Number of selections made |
| secure_protocol | Is the HTTP connection secure or not |

#### QixPerformance

Log of each request and metrics around resource utilization.
Should be used with caution as it will produce a lot of log entries.

| Field | Description |
| ----- | ----------- |
| server_id | Server identifier |
| session_id | Session identifier |
| request_id | Request identifier |
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
| doc_id | Document identifier |
| title | Document title |
| plugin_name | The name of the plugin |
| plugin_host | URL to the host endpoint |

#### SmartSearchQuery

| Field | Description |
| ----- | ----------- |
| doc_id | Document identifier |
| session_id | Session identifier |
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
| doc_id | Document identifier |
| data_model_ix | |
| field_ix | Field Index |
| field_name | Field name |
| field_type | Field type |
| field_symbol_count | Field Symbol count |
| field_memory | Memory used by field |
| ix_elem_count | Number of element in index |
| ix_memory | Used memory by the index |

## API Lockdown

The QIX Engine can be configured to restrict access to certain APIs (known as _API lockdown_). The lockdown level is
set on the QIX Engine instance, meaning that API restrictions is applied to all connections served by the specific QIX
Engine instance.

The QIX Engine can be configured to lockdown API access using the following command line parameter:

`-S EnableAccessControl=1`

The access level is set using the command line parameter:

`-S GlobalAccessFlags=<access attribute>`

where `access attribute` is one or more of:

| Level  | Description |
| ------ | ----------- |
| create | Allow create operations |
| update | Allow update operations |
| delete | Allow delete operations |
| reload | Allow reload operations |
| import | Allow import operations |

The access attributes can be combined into a mask of access attributes separated by a semi-colon. For example, to allow
creation and reload, one would set the command line parameter:

`-S GlobalAccessFlags="create;reload"`

The default set of access attributes is to allow all operations:

`-S GlobalAccessFlags="create;update;delete;reload;import"`

To set the QIX Engine in a read-only mode, leave the access mask empty:

`-S GlobalAccessFlags=""`

When a request is received, the QIX Engine checks the access mask to determine if the operation is allowed. If access
is denied, the request is aborted and an error stating that access is denied is returned to the caller.

Please see the [QIX Engine API Documentaion](_insert_link_here) for access attributes associated with each QIX method.
