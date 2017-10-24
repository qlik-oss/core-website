# Logging Recipe

* Describe how to config Frontira services for logging, i.e. how do I enable the logs, specify output format and log levels.
* Provide specification on the logging format

The recipe does NOT contain:

* Specific logging stacks like ELK
* Specific dashboards for e.g. Kibana

Internal docs: https://confluence/x/ZZaBB

## Logging Formats

_TODO_

## Logging Fields

_TODO_

## Logging Levels

Frontira services use the following logging levels, in decreasing order of severity:

- Fatal
- Error
- Warn
- Info
- Debug
- Trace

Below follows guidelines and semantics of each log level.

### Fatal

Used for _errors_ that:

- Force a shutdown of the service to prevent data loss (or further data loss).
- Prevent the service from starting successfully, and starting it renders the service or system unusable.
- During operation will render the service or system unusable.
- Force sysadmin intervention (alerts, wake-up calls, pager notifications etc.)

Examples:

_TODO_


### Error

Used for _errors_ that:

- Are fatal to a specific operation, but not the full system.
- The system can continue normal operation after error recovery.
- Force user (sysadmin, or direct user) intervention.

Examples:

- The operation fails to open a required file, is missing data, etc.
- Incorrect connection strings, missing services, etc.

### Warn

Used for events that:

- Indicate a rare system state, but where automatic recovery is possible.
- May indicate a system state that a sysadmin should be aware of, and possibly investigate.
- Are normally not expected in the system.
- Do not prevent correct operation of the system from end-user perspective.

Examples:

- Switching from a primary to backup server.
- Operation fails first time, succeeds after retrying.
- Some kind of unusal delay or long response time was detected.

### Info

Used for events that:

- Show normal operation in the system. 
- Indicate some important operation or state in the system.
- Logging them at Info level does not prevent the system from operating at full speed, i.e. they can always be enabled in production.
- Logging them at Info level does not cause log overflow, i.e. they are rare enough to not make system logs too verbose.

Examples:

- Service start/stop.
- System or service configuration details.

### Debug

Used for messages that:

- Help isolate a problem in a service, by containing information on what code that is executed, together with context information that would be useful for problem identification.
- Are normally not needed or enabled in production operation.
- Will typically be enabled for some period of time, to investigate service or system behavior.
- Have information that is relevant to people in many different roles, not just developers.

Examples.

_TODO_

### Trace

_TODO_

"Tracing" the code. Mainly useful to developers.
