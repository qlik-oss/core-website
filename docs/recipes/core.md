# Core Recipe

This recipe demonstrates how to deploy a minimal Frontira stack using different orchestration tools. The purpose is to help you get started with building on Frontira.

Since it is minimal it does not provide any real functionality. It rather demonstrates the foundation to build full solutions on where more aspects must also be considered, like authorization, document/data handling, vizualization, logging, monitoring etc. There are other recipies that cover such aspects separately.

## Orchestration tools

The recipe demonstrates how to get up and running with Docker Swarm, Kubernetes, and Nomad.

## Services

The core Frontira stack constists of the following services (links to Docker Hub):

- [QIX Engine](https://hub.docker.com/r/qlikea/engine)
- [License Service](https://hub.docker.com/r/qlikea/license-service)
- [mira](https://hub.docker.com/r/qlikea/mira)

In a typical solution, these are all deployed on the sever side.
