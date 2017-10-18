# Information repository

This is the top-level repo containing general information around this project; concepts, specifications, examples, can be found here (or linked to from here).

## Terminology

Terminology used can be found in [Terminology](./docs/terminology.md).

## Deliverables

The offering consists of different deliverables:

- Use Cases
- Recipes
- Core Components
- Custom Qliktive Commponents

### Use Cases

A fictive company, called **Qliktive**, implements solutions on top of this project. These solutions realize different use cases that leverage the power of the QIX Engine and are used as our showcases. Each Qliktive use case is developed in a repo of its own.

Currently, this use case is provided:

- [Custom Analytics UI](./docs/use-cases/use-case-custom-analytics/README.md)

### Recipes

Recipes set a more limited scope than the use cases. A recipe typically answers a question of the form "_How do I ...?_". It is a way to describe important concepts in more isolation. Some examples of recipes could be to answer questions like:

- _How do I get my data into my solution?_
- _How do I decide when it is time to scale up or down the number of running QIX Engine instances?_

More information on recipes is provided in [RECIPES.md](./docs/recipes/RECIPES.md).

### Core Components

These components are packages and microservices that can be considered as being core parts of the offering. They are typically available as ready-to-use components (e.g. as Docker images or as npm packages). The components are developed to be generic and it is likely that they will be used in most solutions. Each such component is developed in a separate repo. Some of these components are available as open source, and some are not.

Closed source components, available as Docker images:

- qlik/engine - The QIX Engine.
- qlik/license-service - The License Service, required to run the QIX Engine.

Open source components, available as Docker images:

- qlik/mira - The QIX Engine discovery service.

Open source components, available as

- enigma.js - JavaScript library to communicates with Qlik QIX Engine.
- halyard.js - JavaScript library to simplify data loading into the Qlik QIX Engine.



### Custom Qliktive Components

These components are packages and microservices that are developed specifically for a certain Qliktive use case. As such, they are not generally re-usable between different solutions. The idea is rather to provide examples and with some parts that can be further built upon for any new solution. Each such component is developed in a separate repo.

Since these components are more of example implementations, they do not come with the same level of support from Qlik as the core Components described above.

We use the prefix `qliktive-` to make it clear that these components are specific for Qliktive use cases.

## Testing Strategy

Components, microservices, and the example use case implementations are subject to the [Testing Strategy](./docs/testing-strategy.md).
