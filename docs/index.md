# Home

![Frontira](./images/frontira-banner.jpg "Frontira")

Frontira by [Qlik](http://qlik.com) provides a development platform for building custom data exploration and data
visualization solutions on top of QIX Engine, the powerful associative indexing engine from Qlik.

QIX Engine differentiates from other vendors by dynamically calculating and providing associations based on data
selections, without the need to rely on query-based analysis which restricts to linear exploration within a partial view
of the data.

## Containers

Frontira is designed to utilize the power of container-based solutions and microservice architectures, such as
[Docker](http://docker.com).

The QIX Engine on Linux, provided as a Docker image, forms the foundation of this.

Developers building their solutions on Frontira are provided with a large range of powerful technologies, for example
[Kubernetes](https://kubernetes.io).

## Services

These are the services provided in Frontira:

| Service    | Feature | Docker Image | Source Code |
| ---------- | ------- | ------------ | ----------- |
| [QIX Engine](./docs/services/qix-engine/) | The powerful associative indexing engine from Qlik and the foundation of Frontira | [qlikea/engine](https://hub.docker.com/r/qlikea/engine) | Closed source |
| [License Service](./docs/services/license-service/) | Service required to run QIX Engine with a valid license | [qlikea/license-service](https://hub.docker.com/r/qlikea/license-service) | Closed source |
| [Mira](./docs/services/mira/) | QIX Engine discovery service | [qlikea/mira](https://hub.docker.com/r/qlikea/mira) | [GitHub](https://github.com/qlik-ea/mira) |

All services in Frontira follows a common [contract](./documentation/contract.md).

## Libraries

Several open source libraries exist that are useful when working with Frontira:

| Library | Feature | Source Code |
| ------- | ------- | ----------- |
| [enigma.js](https://github.com/qlik-oss/enigma.js/) | Communication with the QIX Engine | [GitHub](https://github.com/qlik-oss/enigma.js/) |
| [halyard.js](https://github.com/qlik-oss/halyard.js) | Simplifies data loading into the QIX Engine | [GitHub](https://github.com/qlik-oss/halyard.js) |
| [after-work.js](https://github.com/qlik-oss/after-work.js) | Unified testing framework for different test levels | [GitHub](https://github.com/qlik-oss/after-work.js) |
| picasso.js | Visualization library on top of the QIX Engine | Not released yet |
