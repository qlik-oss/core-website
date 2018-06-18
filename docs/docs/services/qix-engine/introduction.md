# Qlik Associative Engine

The Qlik Associative Engine is the central service in the Qlik Core stack. It has a lot of features and configuration options
which we have dedicated pages for. Please use the menu on your left to read more about the unique capabilities
of Qlik Associative Engine, and check out our tutorials how to configure your instances of Qlik Associative Engine.

## Distribution

Qlik Associative Engine is distributed as a Docker image and is available on Docker Hub as
[qlikcore/engine](https://hub.docker.com/r/qlikcore/engine).
New versions of the Qlik Analytics Engine docker image will regularly be published to the Docker Hub repository.
To find the last published or all available versions look [here](https://hub.docker.com/r/qlikcore/engine/tags/).

!!! Note
    Qlik Core does not make use of the opinionated `latest` image tag,
    due to that the concept is often misinterpreted.
    Fetching an image with the `latest` tag using for example `docker pull`,
    does not necessarily retrieve the _last published_ image,
    and since the Qlik Analytics Engine version is essential for us to be able to provide support,
    we have decided to keep all published docker images versioned.

The Qlik Associative Engine is developed by Qlik as closed source.

## API

Qlik Associative Engine supports multiple APIs, designed for specific use cases.

API | Description
--- | -----------
[QIX](./apis/qix/introduction.md) | Document consumption using JSONRPC and WebSocket protocols.
[REST](./apis/rest/qlik-associative-engine-api.md) | REST API.
[Data Connector](./apis/data-loading/introduction.md) | High-performance data loading using the gRPC protocol.
[Analytical Connector](./apis/server-side-extension/analytical-connector-api.md) | Server side extensions using the gRPC protocol.

## Metrics

Following the [Metrics](../../conventions/metrics.md) conventions, Qlik Associative Engine exposes
metrics that can be used to monitor the service.

Qlik Associative Engine exposes the metrics data on a separate port from its other APIs, this separation
was made to ensure that exposing the default API (port 9076) wouldn't also expose potentially
sensitive data from the metrics endpoint.

The metrics endpoint can be found on port 9090 by default (example: `http://localhost:9090/metrics`),
you may configure this by starting Qlik Associative Engine with `-S PrometheusPort <port number>`.
