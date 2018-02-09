# License Service

To run Qlik Associative Engine with a valid license, you are required to run the License Service.
You should deploy the License Service together with the Qlik Associative Engine.

At start up, and periodically while it is running,
each Qlik Associative Engine instance checks the License Service for a valid license.

!!! Note
    Since it is just a sidecar service, the License Service API is generally
    not consumed by applications that are built on top of Qlik Core.

## Distribution

The License Service is available on Docker Hub as a Docker image: [qlikea/license-service](https://hub.docker.com/r/qlikea/license-service).

It is developed by Qlik as closed source.

## Configuration

You do not need to configure the License Service,
but you do need to tell the [Qlik Associative Engine](./qix-engine/introduction.md) where to find it.
You can do this by passing the following command line argument to the Qlik Associative Engine.

```sh
-S LicenseServiceUrl=<License Service URL>
```

## Examples

To see an example of a basic license configuration, see the [Orchestration](../tutorials/orchestration.md) tutorial.

## Deployment

In most Qlik Core deployments, you will only need to deploy a single License Service instance.
This is because traffic between Qlik Associative Engine instances and the License Service is low.
In cases where you need to consider load balancing or License Service availability,
you can run multiple replicas of the License Service.

### Health Check

For health checking, the License Service exposes `/v1/health` on port 9200, and it always responds with `200 OK`.

### Metrics

For Prometheus metrics scraping, the License Service exposes `/v1/metrics` on port 9200.
The License Service provides the following metrics:

| Name | Type | Description |
| ---- | ---- | ----------- |
| http_requests_total | COUNTER | Total number of HTTP requests since service start.<br>It includes both successful and unsuccessful requests.<br>The HTTP method and endpoint path are provided as labels. |
| http_request_failures_total | COUNTER | Total number of HTTP request failures since service start.<br>The HTTP method and endpoint path are provided as labels |
| http_request_duration_seconds | HISTOGRAM | Durations of HTTP request since service start.<br>The HTTP method and endpoint path are provided as labels. |
| active_instances | GAUGE | Number of active instances (engines with an active license). |
| license_expiry_seconds | GAUGE | Number of seconds until the license expires. |

### Logging

The License Service complies with the [Logging](../conventions/logging.md) conventions.
By default, the minimum log level is `info`.
However, for Microsoft libraries, the default minimum logging level is set to `warning` to avoid too verbose logging.

You can override the minimum logging level by providing the `LOG_LEVEL` environment variable.
Note that if you provide this variable it will affect the logging level for all components in the License Service,
including Microsoft libraries.
We recommend that you use the default minimum level in a production environment,
and only override the level for debugging purposes.
