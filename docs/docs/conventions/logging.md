# Logging

Service logs provide visibility into the behavior of the service.
Services must log enough information for a developer to be able to debug and fix an issue using the information
available in the logs. In general, developers will not have access to production environments to debug services.
They instead rely on real-time historical logs for analysis.

A service should write its logs to `stdout`. A service should also ensure that it writes sufficient content to the log
for monitoring and troubleshooting issues. A service should _not_ manage the routing, storage, or aggregation of its logs.

## Logging conventions

1. Write events only on `stdout`. Do not write events to files.
    * Events _must_ be on `stdout` and not `stderr`.
    * It is _not_ the job of the service to store, transmit, or buffer log events.
    * During local development, the developer will view the service's event stream in their terminal or console,
      or manually redirect (with a pipe or similar) to a local file.
    * When the service is deployed,
      it is the responsibility of the execution environment to capture and direct logs for later analysis.
1. Events must be written as valid JSON, with the following minimum standard fields:

    | Field                 | Description                               | Requirements      |
    | -----                 | -----------                               | ------------      |
    | `timestamp`           | The date/time at which the event occurred. | <ul><li>The system clock must be set for the UTC 00:00 timezone (a.k.a _Zulu_), and events must be logged in this timezone.</li><li>Timestamps must be formatted in the RFC3339 format _with fractional seconds_: `2006-01-02T15:04:05.999999999Z`</li><li>Not all systems will report fractions of a second at the same precision&mdash;it doesn't matter whether this is provided at millisecond or nanosecond precision, as long as it's provided.</li></ul>                                                                    |
    | `message`             | A message that describes the event.           | <ul><li>The message _should not_ contain metadata. Any metadata about the event should be presented in separate fields.</li></ul>             |
    | `logseverity`         | String value indicating the level of importance of the log message. | <ul><li>The `logseverity` specified in the log _must_ be one of the following values: `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR` or `FATAL`. The definition of each level is further described in [Logging level definitions](#logging-levels).</li></ul>                    |

1. Some contexts require additional fields.
    Fields should be coordinated between services so analysis is correctly aggregated across services.
    For example, if two services track session IDs, then both services should track the common field name
    that is case and style specific.
    We recommend that you use snake case `session_id` rather than Pascal case `SessionId`.

## Logging level definitions

* `TRACE`
    * Fine-grained debug message, typically used to capture a flow of events.
* `DEBUG`
    * Mostly used for debugging purposes.
    * Typically not enabled by default in production.
* `INFO`
    * Normal operations of the service that should be logged.
    * Indicates some important operation or state in the service.
* `WARN`
    * Indicates an event or state that was not part of common operations, but was handled.
    * An event that potentially can become an error.
    * An event that does not prevent correct operation of the system from an end-user perspective.
* `ERROR`
    * An error that was not handled and was unexpected to the service.
    * Service can continue normal operation after error recovery.
* `FATAL`
    * Non-recoverable error that forces the service to terminate.
