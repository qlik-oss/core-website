# Information repository

This is the top-level repo containing general information around this project; concepts, specifications, examples, can be found here (or linked to from here).

## Terminology

Terminology used can be found in [Terminology](./docs/terminology.md).

## Deliverables

The offering consists of deliverables of different categories.

![Deliverables](./docs/images/deliverables.png)

Each category of deliverables is described below.

### Use Cases

A fictive company, called **Qliktive**, implements solutions on top of this project. These solutions realize different use cases that leverage the power of the QIX Engine and are used as our showcases. Each Qliktive use case is developed in a repo of its own.

Currently, this use case is provided:

- [Custom Analytics UI](./docs/use-cases/use-case-custom-analytics/README.md)

### Recipes

Recipes is a way for us to describe important concepts, it can be how to get data into your solution or how to decide when it is time to scale your QIX Engine instances, etc.

Please look at the recipes inside the [recipes/](./docs/recipes) folder.

### Components

These components are packages and microservices that can be considered as being core parts of the offering. They are typically available as ready-to-use components (e.g. as Docker images or as npm packages). The components are developed to be generic and it is likely that they will be used in most solutions. Each such component is developed in a separate repo. Some of these components will be available as open source, and some may not. For example, the QIX Engine is only available as a Docker image while Mira will be open sourced.

### Custom Qliktive Components

These components are packages and microservices that are developed specifically for a certain Qliktive use case. As such, they are not generally re-usable between different solutions. The idea is rather to provide examples and with some parts that can be further built upon for any new solution. Each such component is developed in a separate repo.

Since these components are more of example implementations, they do not come with the same level of support from Qlik as the core Components described above.

We use the prefix `qliktive-` to make it clear that these components are specific for Qliktive use cases.

## Testing Strategy
Components, microservices, and the example use case implementations are subject to the [Testing Strategy](./docs/testing-strategy.md).
