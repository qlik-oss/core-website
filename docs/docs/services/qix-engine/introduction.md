# QIX Engine

The QIX Engine is the central service in the Qlik Core stack. It has a lot of features and configuration options
which we have dedicated pages for. Please use the menu on your left to read more about the unique capabilities
of QIX Engine, and check out our tutorials how to configure your instances of QIX Engine.

## Distribution

QIX Engine is distributed as a Docker image and is available on Docker Hub as
[qlikea/engine](https://hub.docker.com/r/qlikea/engine).

The QIX Engine is developed by Qlik as closed source.

## API

QIX Engine supports multiple APIs, designed for specific use cases.

API | Description
--- | -----------
[Data loading](./apis/data-loading/data-loading.md) | High-performance data loading using the gRPC protocol.
[QIX](./apis/qix/introduction.md) | Document consumption using JSONRPC and WebSocket protocols.
