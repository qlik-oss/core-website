# System Design - Custom Analytics UI
_NOTE: This design documentation is work in progress. More information will be added on a regular basis._

This use case is about scaling the QIX Engine in a configuration of
- One document
- Multiple users

Scaling up engines needs to be done only to reduce load as a consequence of multiple users access the system simultaneously. All engine instances are equivalent and there is no need to have a certain engine service a certain user since all users access the same single document.

Currently, two aspects of the design are described
- [Authentication](./authentication.md)
- [QIX Engine Session Management](./session-management.md)
