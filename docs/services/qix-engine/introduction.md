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
[Analytical Connector](./apis/server-side-extension/introduction.md) | Server side extensions using the gRPC protocol.

## Command Line Parameters

The Qlik Associative Engine has a number of command line parameters that can be used to toggle functionality.
These parameters are passed when starting a Qlik Associative Engine docker container:

Using `docker run`:

`docker run qlikcore/engine:<version> -S <setting1>=<value> -S <setting2>=<value> ...`

or using a `docker-compose` file:

```yaml
version: "3.1"

services:
  engine:
    image: qlikcore/engine:<version>
    command: -S ValidateJsonWebTokens=2 -S JsonWebTokenSecret=passw0rd
  ...
```

Below is a list of Qlik Associative Engine command line parameters used in Qlik Core:

| Parameter | Values | Description | Default |
| --------- | ------ | ----------- | ------- |
| AcceptEULA | `yes` or `no` | Whether the EULA for running the container is accepted or not. For more information please see the [Licensing chapter](../../licensing.md). | `no` |
| LicenseServiceUrl | URL string | URL to the `licenses` service. If not configured the **Community** version will be used. For more information please see the [Licensing chapter](../../licensing.md). | n/a |
| DocumentDirectory | File path | Directory that Qlik Associative Engine should use for documents inside the docker container. | `/home/nobody/Qlik/Sense/Apps` |
| EnableFilePolling | `0` (disabled) or `1` (enabled) | Feature for sharing and synchronizing documents between Qlik Associative Engine instances sharing the same filesystem. For more details see [Document Synchronization](./doc-synchronization.md). | `0` (disabled) |
| EnableABAC | `0` (disabled) or `1` (enabled) | Attribute-Based Access Control feature that can be used for controlling application access through rules. For more details see [Access Control](./access-control.md). | `0` (disabled) |
| SystemAllowRulePath | File path | File path to the Allow rules file. Requires the `EnableABAC` parameter to be enabled. | n/a |
| SystemDenyRulePath | File path | File path to the Deny rules file. Requires the `EnableABAC` parameter to be enabled. | n/a |
| ValidateJsonWebTokens | <p>`0` (Not enforced)</p>`1` (Enforce unsigned or signed JWTs)<p>or</p>`2` (Enforce signed JWTs) | Parameter for enforcing validation of JWT. For more details see the [Authorization chapter](../../tutorials/authorization.md). | `0` (Not enforced) |
| JsonWebTokenSecret | string | Requires the `ValidateJsonWebTokens` parameter to be set. For more details see the [Authorization chapter](../../tutorials/authorization.md). | n/a |
| JsonWebTokenPath | File path | Path to pem file. For more details see the [Authorization chapter](../../tutorials/authorization.md). | n/a |
| EnableGrpcCustomConnectors | `0` (disabled) or `1` (enabled) | Enables gRPC connectors in the Qlik Associative Engine. For more details see the [Data Loading chapter](../../tutorials/data-loading.md). | `0` (disabled) |
| GrpcConnectorPlugins | `<connector identifier>,<connector host>:<connector port>` e.g. `jdbc,jdbc-connector:50051` | Registers a connector with identifier **connector identifier**, which we tell the Qlik Associative Engine exists on **connector host** and listening on **connector port**. Requires `EnableGrpcConnectorPlugins` to be enabled. For more details see the [Data Loading chapter](../../tutorials/data-loading.md). | n/a |
| SSEPlugin | `<PluginConfig>[;<PluginConfig>]` | A **PluginConfig** is a comma-separated list of configuration elements in the format `<PluginName>,<Address>[,<PathToCertFile>,<RequestTimeout>,<ReconnectTimeout>]`.<p>For further details on each element see [How to configure an Analytical Connector in Qlik Core](./apis/server-side-extension/introduction.md#how-to-configure-an-analytical-connector-in-qlik-core).</p> | n/a |

In addition to the command line parameters above
it is also possible to increase or decrease log level on different Qlik Associative Engine logging types.
The logging types and levels is in more detail described in the [Logging section](./logging.md).

## Load Script Reference

To load and model data the Qlik Associative Engine uses a load script syntax
that is further described in the [Load Script Reference chapter](./script_reference/introduction.md).

## Metrics

Following the [Metrics](../../conventions/metrics.md) conventions, Qlik Associative Engine exposes
metrics that can be used to monitor the service.

Qlik Associative Engine exposes the metrics data on a separate port from its other APIs, this separation
was made to ensure that exposing the default API (port 9076) wouldn't also expose potentially
sensitive data from the metrics endpoint.

The metrics endpoint can be found on port 9090 by default (example: `http://localhost:9090/metrics`),
you may configure this by starting Qlik Associative Engine with `-S PrometheusPort <port number>`.
