# Logging Level Guidelines

Below follows guidelines and semantics for each log level used by Frontira services.

## `Fatal`

Used for _errors_ that:

- Force a shutdown of the service to prevent data loss (or further data loss).
- Prevent the service from starting successfully, and starting it renders the service or system unusable.
- During operation will render the service or other part of the system unusable.
- Force sysadmin intervention (alerts, wake-up calls, pager notifications etc.)

Examples:

_TODO_

## `Error`

Used for _errors_ that:

- Are fatal to a specific operation in the service, but not the full service or system.
- The service can continue normal operation after error recovery.
- Force user (sysadmin, or direct user) intervention.

Examples:

- The operation fails to open a required file, is missing data, etc.
- Incorrect connection strings, missing services, etc.

## `Warn`

Used for events that:

- Indicate a rare state in the service or system, but where automatic recovery is possible.
- May indicate a service or system state that a sysadmin should be aware of, and possibly investigate.
- Are normally not expected in the service.
- Do not prevent correct operation of the system from end-user perspective.

Examples:

- Switching from a primary to backup server.
- Operation fails first time, succeeds after retrying.
- Some kind of unusal delay or long response time was detected.

## `Info`

Used for events that:

- Show normal operation in the service. 
- Indicate some important operation or state in the service.
- Logging at Info level does not prevent the service or system from operating at full speed, i.e. they can always be enabled in production.
- Logging at Info level does not cause log overflow, i.e. they are rare enough to not make system logs too verbose.

Examples:

- Service start/stop.
- Service or system configuration details.

## `Debug`

Used for messages that:

- Help isolate a problem in a service, by containing information on what code that is executed, together with context information that would be useful for problem identification.
- Are normally not needed or enabled in production operation.
- Will typically be enabled for some period of time, to investigate service or system behavior.
- Have information that is relevant to people in many different roles, not just developers.

Examples.

_TODO_

## `Trace`

_TODO_

"Tracing" the code. Mainly useful to developers.
