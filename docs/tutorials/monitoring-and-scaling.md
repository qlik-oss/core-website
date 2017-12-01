# Monitoring and Scaling Recipe

These documents provide an overview of what drives performance and how 
to think about performance, scalability and monitoring.

## General principles and scaling characteristics of QIX

It is a good start to read up on how the most resource intensive
service (QIX) works, handles resource and what drives it.
That is available in the following document.

[Monitoring and scaling QIX](./../documentation/services/qix-engine.md)

## The real world use cases

Frontira can be used in many different ways. The documents available here cover vastly 
different, but relevant, implementations.

- Newspaper: In this scenario, documents are hosted as a backend with a custom-built
  user interface and embedded in newspaper site for storytelling or interactive
  charts. [The newspaper case](./newspaper.md)

## Questions addressed by the use cases

- How do I get an overview of my system?
  What metrics are interesting to look at?

- How do I know where to place a session?
  Which metrics can be used for session placement, describe a couple of scenarios.

- How do I know when to scale up and down?
  Good indicators for when I need to scale up and down, describe a couple of scenarios.

- How do I know what system (“size” of infrastructure) I need?
  Algorithm that can be applied to get a rough estimation (e.g. container memory
  when doc is loaded, add 10% per session)?

[Internal docs](https://confluence/x/UJmBB)
