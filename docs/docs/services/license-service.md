# License Service

The _License Service_ is required to run QIX Engine with a valid license.

The License Service shall be deployed together with the QIX Engine.
In a deployment, each QIX Engine unlocks itself by checking for a valid license,
both at start up and periodically, using the License Service.

As such, the License Service API is not primarily intended to be consumed by applications built on top of Qlik Core.
The License Service only works as a required side-car service to QIX Engine.

## Distribution

The License Service is distributed as a Docker image and is available on Docker Hub as
[qlikea/license-service](https://hub.docker.com/r/qlikea/license-service).

The License Service is developed by Qlik as closed source.

## Configuration

The License Service has no configuration, but you need to instruct
[QIX Engine](./qix-engine/introduction.md) where to find it.
This is done by providing the following command line argument to QIX Engine:

```sh
-S LicenseServiceUrl=<License Service URL>
```

## Examples

For running examples of basic license configuration, see the [Orchestration](../tutorials/orchestration.md) tutorial.

## Deployment

### Single Instance

Normally, only one License Service instance should be required in a Qlik Core deployment.
Traffic between QIX Engine instances and the License Service is low.
For load balancing or availability concerns, running multiple replicas of the License Service is supported.

### Health Check

The License Service exposes `/v1/health` on port 9200, for health checking. Always responds with `200 OK`.

### Metrics

The License Service exposes `/v1/metrics` on port 9200, for Prometheus metrics scraping.
The following metrics are provided.

| Name | Type | Description |
| ---- | ---- | ----------- |
| http_requests_total | COUNTER | Total number of HTTP requests since service start.<br>- Includes both successful and unsuccessful requests<br>- HTTP method and endpoint path are provided as labels |
| http_request_failures_total | COUNTER | Total number of HTTP request failures since service start.<br>- HTTP method and endpoint path are provided as labels |
| http_request_duration_seconds | HISTOGRAM | Durations of HTTP request since service start.<br>- HTTP method and endpoint path are provided as labels. |
| active_instances | GAUGE | Number of active instances (Engines with an active license). |
| license_expiry_seconds | GAUGE | Number of seconds until the license expires. |

### Logging

The License Service complies with the [Logging](../conventions/logging.md) conventions.
By default, the minimum log level is `info`.
However, for the Microsoft libraries the default minimum logging level is set to `warning` to avoid too verbose logging.

The default minimum logging level can be overridden by providing the `LOG_LEVEL` environment variable.

If provided, this will affect the logging level for all components in the License Service, including Microsoft libraries.
It is recommended to use the default minimum level in a production environment,
and only override the level for debugging purposes.
