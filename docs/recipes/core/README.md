# Core Recipe

This recipe demonstrates how to deploy a minimal Frontira stack using different orchestration tools. The purpose is to help you get started with Frontira.

It demonstrates a foundation to build full solutions on, where more aspects must also be considered, like authorization, document/data handling, vizualization, logging, monitoring etc. There are other recipes that cover such aspects separately.

## GitHub repo

The recipe assets are located at https://github.com/qlik-ea/core.

## Container Orchestration

This recipe provides examples of deployment of the Frontira core services using the following container orchestration platforms:

- [Docker Swarm](./docker-swarm.md)
- [Kubernetes](./kubernetes.md)
- [Nomad](./nomad.md) (Experimental)

## Services

The core Frontira stack consists of the following services (links to Docker Hub):

- [QIX Engine](https://hub.docker.com/r/qlikea/engine)
- [License Service](https://hub.docker.com/r/qlikea/license-service)
- [Mira](https://hub.docker.com/r/qlikea/mira)

In a typical solution, these are all deployed on the server side.

## Licensing

Since QIX Engine runs under a license model, the examples require licensing configuration to be done. It should be clear in each example, and with the information provided below, how to do this.

**NOTE**: The examples do not yet contain these configuration options since QIX Engine does not yet support it. Examples will be updated as soon as this becomes available.

### Configuring the License Service

The License Service must be provided two environment variables that tells the service which license to use. These are:

- `LEF_SERIAL` - The LEF serial number which identifies the license to use.
- `LEF_CONTROL` - A control number used to validate the LEF serial number.

Both these will be provided by Qlik when receiving license details of the QIX Engine. In a docker-compose file, this could be done like this:

```yml
version: "3.0"
services:
  license-service:
    image: qlikea/license-service:<version>
    ports:
      - 9200:9200
    environment:
      - LEF_SERIAL=<LEF serial number here>
      - LEF_CONTROL=<LEF control number here>
...      
```

### Configuring the QIX Engine

When running, the QIX Engine periodically communicates with the License Service to ensure that it is running under a valid license. QIX Engine deployments must be configured with the URL to use for accessing the Licence Service REST API. This is done by providing the `LicenseServiceURL` command switch to the engine. In a docker-compose file this would typically look like:

```yml
version: "3.0"
services:
  qix-engine:
    image: qlikea/engine:<version>
    ...
    command: -S LicenseServiceURL=license-service:9200
...
```