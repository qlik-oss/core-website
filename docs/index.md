# Home

![Frontira](./images/frontira-banner.png "Frontira")
This is the top-level repo containing general information, concepts, specifications, examples, and links to other useful resources.

This is the top-level repo containing general information, concepts, specifications, examples, and links to other useful resources.

## Terminology

Terminology used can be found in [Terminology](./terminology.md).

## Deliverables

Frontira consists of different deliverables:

- Use cases
- Recipes
- Core components
- Custom Qliktive components

### Recipes

A recipe typically answers a question of the form "_How do I ...?_". It is a way to describe important concepts in more isolation.

One example can be: _How do I load my own data into QIX Engine?_

More information on recipes is provided in the [Recipes](./docs/recipes/) overview.

### Services

This is an overview of the services provided in Frontira. Further information on each service can be found by following the provided links.

| Service    | Feature | Docker Image | Source Code |
| ---------- | ------- | ------------ | ----------- |
| [QIX Engine](./docs/services/qix-engine/) | The powerful associative indexing engine from Qlik and the foundation of Frontira | [qlikea/engine](https://hub.docker.com/r/qlikea/engine) | Closed source |
| [License Service](./docs/services/license-service/) | Service required to run QIX Engine with a valid license | [qlikea/license-service](https://hub.docker.com/r/qlikea/license-service) | Closed source |
| [Mira](./docs/services/mira/) | QIX Engine discovery service | [qlikea/mira](https://hub.docker.com/r/qlikea/mira) | [GitHub](https://github.com/qlik-ea/mira) |

All services follow a [contract](./documentation/contract.md).

### Libraries

There are also several open source libraries that are useful when working with Frontira:

| Library | Feature | Source Code |
| ------- | ------- | ----------- |
| [enigma.js](https://github.com/qlik-oss/enigma.js/) | Communication with the QIX Engine | [GitHub](https://github.com/qlik-oss/enigma.js/) |
| [halyard.js](https://github.com/qlik-oss/halyard.js) | Simplifies data loading into the QIX Engine | [GitHub](https://github.com/qlik-oss/halyard.js) |
| [after-work.js](https://github.com/qlik-oss/after-work.js) | Unified testing framework for different test levels | [GitHub](https://github.com/qlik-oss/after-work.js) |
| picasso.js | Visualization library on top of the QIX Engine | Not released yet |

### Custom Qliktive Components

These components are packages and microservices that are developed specifically for a certain Qliktive use case. As such, they are not generally re-usable between different solutions. The idea is rather to provide examples and with some parts that can be further built upon for any new solution. Each such component is developed in a separate repo.

Since these components are more of example implementations, they do not come with the same level of support from Qlik as the core Components described above.

We use the prefix `qliktive-` to make it clear that these components are specific for Qliktive use cases.
