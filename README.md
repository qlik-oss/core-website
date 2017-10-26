# Frontira Information

This is the top-level repo containing general information, concepts, specifications, examples, and links to other useful resources.

## Terminology

Terminology used can be found in [Terminology](./docs/terminology.md).

## Deliverables

Frontira consists of different deliverables:

- Use cases
- Recipes
- Core components
- Custom Qliktive components

### Use Cases

A fictive company, called **Qliktive**, implements solutions on top of this project. These solutions realize different use cases that leverage the power of the QIX Engine and are used as our showcases. Each Qliktive use case is developed in a repo of its own.

Currently, this use case is provided:

- [Custom Analytics UI](./docs/use-cases/use-case-custom-analytics/README.md)

### Recipes

A recipe typically answers a question of the form "_How do I ...?_". It is a way to describe important concepts in more isolation.

One example can be: _How do I load my own data into QIX Engine?_

More information on recipes is provided in the [Recipes Overview](./docs/recipes-overview.md).

### Services

This is an overview of the services provided in Frontira. Detailed documentation on each service can be found by following the provided links.

#### QIX Engine

The foundation of Frontira is the [QIX Engine](./docs/services/qix-engine/) - the powerful associative indexing engine from Qlik. QIX Engine is available as a [Docker image](https://hub.docker.com/r/qlikea/engine/). QIX Engine is closed source.

#### License Service

The [License Service](./docs/services/license-service/) is required to run QIX Engine with a valid license

- Provided as a [Docker image](https://hub.docker.com/r/qlikea/license-service/)
- Closed source

#### Mira

[Mira](./docs/services/mira/) is a QIX Engine discovery service used to find QIX Engine instances in containerized environments

- Provided as a [Docker image](https://hub.docker.com/r/qlikea/mira/)
- Open source at [GitHub](https://github.com/qlik-ea/mira)

### Web-development Libraries

There are also several open source web-development libraries that are useful when working with Frontira:

- [enigma.js](https://github.com/qlik-oss/enigma.js/) - Communication with QIX Engine.
- [halyard.js](https://github.com/qlik-oss/halyard.js) - Simplifies data loading into the QIX Engine.
- [after-work.js](https://github.com/qlik-oss/after-work.js) - Provides a unified testing framework for different test levels.
- [picasso.js](https://github.com/qlik-trial/picasso.js) - Charting library streamlined for building visualizations on top of QIX Engine.

### Custom Qliktive Components

These components are packages and microservices that are developed specifically for a certain Qliktive use case. As such, they are not generally re-usable between different solutions. The idea is rather to provide examples and with some parts that can be further built upon for any new solution. Each such component is developed in a separate repo.

Since these components are more of example implementations, they do not come with the same level of support from Qlik as the core Components described above.

We use the prefix `qliktive-` to make it clear that these components are specific for Qliktive use cases.

## Testing Strategy

Components, microservices, and the example use case implementations are subject to the [Testing Strategy](./docs/testing-strategy.md).
