# Getting Started

To get started with Frontira and QIX Engine, and learn the basic concepts, a number of examples and tutorials are
provided. Here, a recommended path through the examples is provided that introduces different concepts step by step.

The tutorials often contain runnable examples, with source code that is available in separate open source repositories
on GitHub.

## Hello Frontira!

Users new to Qlik products and QIX Engine should start here.

The first set of examples introduce basic operations and usage of QIX Engine. Think of it as the "Hello World" of QIX
Engine and the next steps after that. This is divided into three separate parts

- [Hello Engine](./tutorials/hello-engine.md) - Running QIX Engine as a Docker container and using
    [enigma.js](https://github.com/qlik-oss/enigma.js/) to communicate with it
- [Hello Data](./tutorials/hello-data.md) - Loading user data into QIX Engine using
    [halyard.js](https://github.com/qlik-oss/halyard.js)
- [Hello Visualization](./tutorials/hello-visualization.md) - Building a visualization using picasso.js

## The Core Services and Orchestration

Users with previous knowledge about QIX Engine, its supporting libraries, and Qlik products, but that are new to
container technologies such as Docker, will benefit from looking at:

- [Setting up the Core Services](./tutorials/core.md)

This tutorial covers aspects such as:

- Configuring and using a license for QIX Engine
- Using QIX Engine in different container orchestration tools
- Using Mira - the QIX Engine discovery service - when running multiple instances of QIX Engine in a cluster

## In-Depth Tutorials

The in-depth tutorials provide more detailed examples of how to work with more specific aspects of Frontira. These
tutorials are; in recommended order to explore:

- [Data Loading](./tutorials/data-loading.md) - Loading user data into QIX Engine
- [Document Distribution](./tutorials/document-distribution.md) - Distributing updated documents/data
    in a cluster of QIX Engine instances
- [Monitoring and Scaling](./tutorials/scalability/overview.md)
    - Taking decisions on when to scale up or down the number of QIX Engine instances
    - Placing and scheduling of QIX Engine sessions
- [Authorization](./tutorials/authorization.md)
    - Using JWTs and JWT validation in QIX Engine
    - Making sure users only see the data they are supposed to see
