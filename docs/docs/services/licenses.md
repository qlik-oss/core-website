# Licenses

!!! warning "Experimental service"
    This service is subject to change in terms of
    configuration, metrics, and logging.

To run Qlik Associative Engine with a paid license, you are required to run this service.

## Distribution

The Licenses service is available on Docker Hub as a Docker image: [qlikcore/licenses](https://hub.docker.com/r/qlikcore/licenses).

It is developed by Qlik as closed source.

## Configuration

You do not need to configure this service right now but this will be required in the future.
In addition, you do need to configure [Qlik Associative Engine](./qix-engine/introduction.md)
where to find it. You can do this by passing the following command line argument to the Qlik
Associative Engine.

```sh
-S LicenseServiceUrl=<Licenses service URL>
```

## Examples

To see an example of a basic license configuration, see the [Orchestration](../tutorials/orchestration.md) tutorial.

## Deployment

In most Qlik Core deployments, you will only need to deploy a single instance of this service. This is because
traffic between Qlik Associative Engine instances and the Licenses service is relatively low. It does however
support multiple instances if needed.

### Health check

For health checking, the service exposes `/v1/health` on port 9200, and it always responds with `200 OK`.

### Metrics

For Prometheus metrics scraping, the service exposes `/v1/metrics` on port 9200. It provides the following
metrics:

| Name | Type | Description |
| ---- | ---- | ----------- |
| http_requests_total | COUNTER | Total number of HTTP requests since service start.<br>It includes both successful and unsuccessful requests.<br>The HTTP method and endpoint path are provided as labels. |
| http_request_failures_total | COUNTER | Total number of HTTP request failures since service start.<br>The HTTP method and endpoint path are provided as labels |
| http_request_duration_seconds | HISTOGRAM | Durations of HTTP request since service start.<br>The HTTP method and endpoint path are provided as labels. |
| active_instances | GAUGE | Number of active instances (engines with an active license). |
| license_expiry_seconds | GAUGE | Number of seconds until the license expires. |

### Logging

This service complies with the [Logging](../conventions/logging.md) conventions.
By default, the minimum log level is `info`.
However, for Microsoft libraries, the default minimum logging level is set to `warning` to avoid too verbose logging.

You can override the minimum logging level by providing the `LOG_LEVEL` environment variable.
Note that if you provide this variable it will affect the logging level for all components in the License Service,
including Microsoft libraries. We recommend that you use the default minimum level in a production environment,
and only override the level for debugging purposes.
