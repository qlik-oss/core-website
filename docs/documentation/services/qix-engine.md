# QIX Engine documentation

This page contains documentation on a subset of the QIX Engine features/
that are commonly used in a containerized environment.

## Monitoring and scaling

The QIX Engine has some unique resource charateristics and are here presented
along with some ways to monitor it for health and scaling purposes.

## QIX engine memory management

The main memory RAM is the primary
storage for all data to be analyzed by QIX engine. The engine mainly
allocates memory for:

* The unaggregated dataset that is defined by the document data model.
* The aggregated data (that is, cached result sets) and the calculations
  defined by the user interface.
* The session state for each user of the document.
* Temporary allocations for helper tables during calculations.

When a user requests a document, QIX engine loads it into memory, if it
has not been previously loaded. The dataset for a document is only loaded
once and is not duplicated for multiple users who concurrently access and
analyze it. As the user makes selections in the document, QIX engine
performs the needed calculations in real time. To render a chart, the
engine must first access the core unaggregated dataset and then calculate
and store the totals. The user session states and aggregates are stored
in the RAM above and beyond the RAM used to store the core unaggregated
dataset. Most of the session information is shared between sessions in
the same state. Aggregates are shared across all users in a central cache.

### Controlling the allocation of memory

There are two fundamental settings for controlling how QIX engine
allocates and releases memory:

* Working set Low / Min memory usage: This setting defines the amount of
  memory that QIX engine will use. Prior to this point, the engine will
  not try to minimize its allocation of memory. For example, if the
  physical RAM on your server is 256 GB and Working set Low / Min memory
  usage is set to 70%, the engine will not try to minimize its memory
  allocation until 179.2 GB of RAM is used. On the other hand, the engine
  will not use any memory if it is not used for a beneficial purpose and
  employs compression algorithms to minimize the memory consumption.
* Working set High / Max memory usage: This setting is the point above
  which QIX engine cannot allocate any memory. Obviously, Working set
  Low / Min memory usage must be lower than Working set High / Max memory
  usage and leave enough room for handling of transients (that is, the
  amount of RAM temporarily allocated while the engine purges cached
  result sets) without reaching Working set High / Max memory usage in
  an environment. For example, if the physical RAM on your server is 256
  GB and Working set High / Max memory usage is set to 90%, the engine
  cannot allocate any RAM above 230.4 GB.

It is recommended to leave these settings with their default values.
However, on servers with large RAM (256 GB and upwards), the settings can
be changed to allocate a couple of GBs of RAM for the operating system and
allow the remaining RAM to be used by QIX engine. QIX engine depends on
the operating system to allocate RAM for it to use. When the engine starts,
it attempts to reserve RAM based on the Working set Min / Min memory usage
setting. The engine allocates all allowed memory with cached results sets
as quickly as possible, but this does not mean that the engine will lack
in performance once the allowed amount of memory is reached. If the allowed
amount of RAM is exceeded, the engine purges cached result sets to make
place for new documents, calculated aggregates, and session state information.
This means that an environment can operate on the boundary of the Working
set Low / Min memory usage setting without impacting the user-perceived
performance as long as there are old result sets that can be purged. The
prioritization of which result sets to purge is based on the age, size,
and time of calculation of the result sets currently in the cache.
If the RAM becomes scarce, the operating system may, at its discretion,
perform paging, which means that some of the QIX engine memory is swapped
from physical RAM to Virtual Memory (that is, secondary storage). When the
engine is allocated Virtual Memory it may become orders of magnitude slower
than when using 100% RAM. This is undesirable and may lead to poor user
experience. Note that this is not unique to QIX engine as the RAM is handled
by the operating system. There is no guarantee that such paging will not
occur between the Working set Low / Min memory usage setting and the Working
set High / Max memory usage setting, but above the Working set High / Max
memory usage setting paging will definitively occur.

### Example: Allocation of memory when loading a single documents

The following figure shows an example of the memory allocation by QIX engine
over time when a clean server is started and users begin to interact with a
document. The document is first loaded into memory, which corresponds to a
peak in memory consumption. Whilst the users continue to interact with the
document, result sets from requested calculations are stored in RAM.
Additional requests for already cached result sets can then be served
without any additional calculations. The engine must also keep track of
the state of each active user session, but the portion of RAM allocated for
that is small in comparison to the memory allocated for the document and
its cached result sets.

![Single doc allocation](../../images/qix-service/qix_allocation_single_doc.png)

QIX engine does not allow persistent allocation of more memory than specified
by the Working set Low / Min memory usage setting. When the total amount of
allocated RAM goes beyond that setting, previously cached result sets are
purged to make room for new ones. When the document is unloaded from memory,
the total amount of allocated memory drops by the same amount as was originally
allocated by the document. If there are no requests to use the allocated memory,
the cached result sets stay in memory since there is no reason to remove result
sets that might be useful later on. Note the “User activity ends” and “All
sessions timed out” entries in Figure 1. In QlikView, a session ends a configurable
amount of time after the user closes the browser tab where the session is
running (that is, at “All sessions timed out”). In Qlik Sense, which uses
WebSocket, the session ends when the user closes the browser tab (that is,
at “User activity ends”).

### Example: Allocation of memory when loading multiple documents

The following figure shows how multiple documents can fit into RAM, even
when the total amount of allocated memory touches the Working set Low /
Min memory usage limit. This is achieved by purging cached result sets, so
that memory is released to load new documents. The amount of RAM that can
be used for the cached result sets can be seen as a floating amount between
the Working set Low / Min memory usage setting and the amount consumed by
the documents and session state information.

![Multiple doc allocation](../../images/qix-service/qix_allocation_multiple_docs.png)

### Investigating memory usage

It is good practice to investigate how QIX engine uses memory. When the
memory curve fluctuates a lot, it usually means that the engine needs to
allocate extra memory during a calculation. The memory is released when the
result set is cached. Jitter on the memory curve might indicate poor document
design that may be worth investigating as it often means slow response times.

![Monitoring RAM](../../images/qix-service/monitoring_ram.png)

### Summary of QIX engine memory management

The following is important to consider when it comes to memory management:

* QIX engine caches all result sets as long as there is RAM available for
  allocation.
* QIX engine will only release memory when unloading documents. When a document
  is unloaded from memory, the total amount of allocated memory drops by the
  same amount as originally allocated by the document. If there are no requests
  to use the allocated memory, the cached result sets will stay in memory since
  there is no reason to remove result sets that might be useful later on.
* When the Working set Low / Min memory usage limit is reached, old sessions
  and cached results are purged to make room for new values.
* The age, size, and time of calculation are factors in the prioritization
  of which values to purge.
* QIX engine purges old sessions when the “maximum inactive session time”
  value is reached.
* High memory usage is usually the result of many cached results. As long
  as paging does not occur, high memory usage is a good thing.

## QIX engine CPU utilization and scaling over cores

!! Insert actual text

## Linear scaling of QIX engine resources

QIX engine consumes approximately the same amount of resources when documents
are loaded and accessed at the same time on a server as when they are loaded
and accessed in sequence on the server. So, by adding up the resource usage
of individual documents, you can get a close approximation of the resources
(that is, CPU and memory) needed when loading all of the documents in parallel.
In addition, the throughput is similar (as long as the CPU does not become
saturated) no matter if the documents are loaded in parallel or in sequence.

Note, however, that the average response times are likely to be longer when
the documents are loaded in parallel. This is because the processing requests
from the documents compete with each other and are queued.

This linear scaling provides predictability when managing documents in a
shared environment: by examining the resource usage of individual documents,
you can get an estimate of the total amount of resources needed to load and
access the documents at the same time.

### Summary - Linear scaling of QIX engine resources

The following is important to consider when it comes to how QIX engine
linear scaling

* No matter if documents are loaded and accessed in parallel or in sequence
  on a specific server, they consume approximately the same amount of resources
  and provide the same throughput (as long as the CPU does not become saturated).
* The average response times are likely to be longer when the documents are
  loaded in parallel. This is because the processing requests from the documents
  compete with each other and are queued.

## Frequency analysis of warnings to determine RAM saturation

!! Insert actual text

## Scaling up versus scaling out

!! Insert actual text

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

!!! note
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
