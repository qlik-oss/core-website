# Scaling Recipe

These documents provide an overview of what drives performance and how
to think about performance, scalability and monitoring.

## General principles and scaling characteristics

It is recommended to start by reading up on how the most resource intensive
service (QIX) works, handles resource and what drives it.

[QIX Engine documentation](./../../documentation/services/qix-engine.md)

## Real world use case

Frontira can be used in many different ways. The documents available here cover vastly
different, but relevant, implementations.

[The newspaper case](./newspaper.md)

In this scenario, documents are hosted as a backendcwith a custom-built user
interface and embedded in newspaper site for storytelling or interactive charts.
