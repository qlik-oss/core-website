# Getting Started

To get started with Qlik Core and Qlik Associative Engine, and learn the basic concepts,
a number of examples and tutorials are provided.
Here, a recommended path through the examples is provided that introduces different concepts step by step.

The tutorials often contain runnable examples,
with source code that is available in separate open source repositories on GitHub.

## Hello Qlik Core!

Users new to Qlik products and Qlik Associative Engine should start here.

The first set of examples introduce basic operations and usage of Qlik Associative Engine. Think of
it as the "Hello World" of the engine and the next steps after that. This is divided into three separate parts

- [Hello Engine](./tutorials/hello-engine.md) - Running Qlik Associative Engine as a Docker container and using
    [enigma.js](https://github.com/qlik-oss/enigma.js/) to communicate with it
- [Hello Data](./tutorials/hello-data.md) - Loading user data into Qlik Associative Engine using
    [halyard.js](https://github.com/qlik-oss/halyard.js)
- [Hello Visualization](./tutorials/hello-visualization.md) - Building a visualization using picasso.js

## Orchestration

Users with previous knowledge about Qlik Associative Engine, its supporting libraries,
and Qlik products, but that are new to container technologies such as Docker, will benefit
from looking at:

- [Orchestration](./tutorials/orchestration.md)

This tutorial covers aspects such as:

- Configuring and using a license for Qlik Associative Engine
- Using Qlik Associative Engine in different container orchestration tools
- Using Mira - the Qlik Associative Engine discovery service - when running multiple
  instances of Qlik Associative Engine in a cluster

## In-Depth Tutorials

The in-depth tutorials provide more detailed examples of how to work with more specific aspects of Qlik Core. These
tutorials are; in recommended order to explore:

- [Data Loading](./tutorials/data-loading.md) - Loading user data into Qlik Associative Engine
- [Document Distribution](./tutorials/document-distribution.md) - Distributing updated documents/data
    in a cluster of Qlik Associative Engine instances
- [Monitoring and Scaling](./tutorials/scalability/overview.md)
    - Taking decisions on when to scale up or down the number of Qlik Associative Engine instances
    - Placing and scheduling of Qlik Associative Engine sessions
- [Authorization](./tutorials/authorization.md)
    - Using JWTs and JWT validation in Qlik Associative Engine
    - Making sure users only see the data they are supposed to see
