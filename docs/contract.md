# Contract

This document contains a contract for Frontira services to keep the services aligned in aspects such as logging formats, health checks and metrics. Any addition to or deviation from these guidelines _are_ documented by each [service](../README.md#services).

## Logging

Services must log enough information for a developer to be able to debug and fix issues using the information available in the logs. In general, developers will not have access to production environments in order to debug services, but instead access to real-time historical logs for analysis. A service's logs is the main visibility into the behavior of the service. A service should not concern itself with the routing or storage/aggregation of its logs. A service should also not attempt to write to or manage logfiles. Instead a service should write its logs to `stdout` and concern itself with making sure that the content of the logs are sufficient for monitoring and fixing issues. In staging and production environments each service's log output will be captured by the execution environment and aggregated in near real-time.

1. Only output events on `stdout`, never output events to files.
    * Events _must_ be on `stdout` and not `stderr`.
    * It is _not_ the job of the service to store, transmit or buffer log events.
    * During local development, the developer will view the service's event stream in their terminal or console, or manually redirect (with a pipe or similar) to a local file.
    * When the service is deployed, it is the responsibility of the execution environment to capture and direct logs appropriately for later analysis.
1. Events must be outputted as valid JSON, with a minimum of standard fields:

    | Field | Description | Requirements |
    | ----- | ----------- | ------------ |
    | `timestamp` | The date/time that the event occurred at. | <ul><li>The system clock must be set for the UTC 00:00 timezone (a.k.a _Zulu_), and events must be logged in this timezone.</li><li>Timestamps must be formatted in the RFC3339 format _with fractional seconds_: `2006-01-02T15:04:05.999999999Z`</li><li>Not all systems will report fractions of a second at the same precision - it doesn't matter whether this is provided a millisecond or nanosecond precision, as long as it's provided.</li></ul> |
    | `message` | A message describing the event. | <ul><li>The message _should not_ contain metadata. Any metadata about the event should be presented in seperate fields.</li></ul> |
    | `logseverity` | String value indicating the level of importance of the log message. | <ul><li>The `logseverity` specified in the log _must_ be one of the following values; `TRACE`, `DEBUG`, `INFO`, `WARNING`, `ERROR` or `FATAL`. The definition of each level is further described [here](#logging-levels).</li></ul> |

1. Additional fields will be required in specific contexts, and should be coordinated between services so that analysis can be correctly aggregated across different services.
    * If multiple services track e.g. session IDs, they should agree on a common field name, such as `session_id`.
    * Case & word separation style must be consistent. The _snake_case_ style should be preferred (e.g. use `session_id`, _not_ `SessionId`)

### Logging Levels

In this section each of the allowed log levels are specified and followed with a set of examples where each log level is applicable.

* `TRACE`
  * Fine-grained debug message, typically used to capture a flow of events.
* `DEBUG`
  * Mostly used for debugging purposes.
  * Typically not enabled by default in production.
* `INFO`
  * Normal operations of the service that should be logged.
  * Indicate some important operation or state in the service.
* `WARNING`
  * Indicate an event or state that was not part of common operations, but was handled.
  * Event that potentially can become an error.
  * Event that does not prevent correct operation of the system from an end-user perspective.
* `ERROR`
  * Unhandled error that was unexpected to the service.
  * Service can continue normal operation after error recovery.
* `FATAL`
  * Non-recoverable error that forces the service to terminate.

## Health Checks

todo

## Metrics

todo
