# Qlik Associative Engine

The Qlik Associative Engine is the central service in the Qlik Core stack. It has a lot of features and configuration options
which we have dedicated pages for. Please use the menu on your left to read more about the unique capabilities
of Qlik Associative Engine, and check out our tutorials how to configure your instances of Qlik Associative Engine.

## Distribution

Qlik Associative Engine is distributed as a Docker image and is available on Docker Hub as
[qlikea/engine](https://hub.docker.com/r/qlikea/engine).

The Qlik Associative Engine is developed by Qlik as closed source.

## API

Qlik Associative Engine supports multiple APIs, designed for specific use cases.

API | Description
--- | -----------
[Data Connector](./apis/data-loading/introduction.md) | High-performance data loading using the gRPC protocol.
[QIX](./apis/qix/introduction.md) | Document consumption using JSONRPC and WebSocket protocols.

## Metrics

Following the [Metrics](../../conventions/metrics.md) conventions, Qlik Associative Engine exposes
metrics that can be used to monitor the service.

Qlik Associative Engine exposes the metrics data on a separate port from its other APIs, this separation
was made to ensure that exposing the default API (port 9076) wouldn't also expose potentially
sensitive data from the metrics endpoint.

The metrics endpoint can be found on port 9090 by default (example: `http://localhost:9090/metrics`),
you may configure this by starting Qlik Associative Engine with `-S PrometheusPort <port number>`.
