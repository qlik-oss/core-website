# License Service

The _License Service_ is required to run QIX Engine with a valid license.

The License Service shall be configured and deployed together with the QIX Engine.
In a deployment, each QIX Engine unlocks itself by checking for a valid license,
both at start up and periodically, using the License Service.

As such, the License Service API is not primarily intended to be consumed by applications built on top of Frontira.
The License Service only works as a required side-car service to QIX Engine.

## Distribution

The License Service is distributed as a Docker image and is available on Docker Hub as
[qlikea/license-service](https://hub.docker.com/r/qlikea/license-service).

The License Service is developed by Qlik as closed source.

## Configuration

### License Service

The License Service shall be configured with information on the license to use with the deployment of QIX Engine.
This is done by providing two environment variables to the License Service:

| Name        | Description |
|-------------|-------------|
| LEF_SERIAL  | The LEF serial number which identifies the license to use. |
| LEF_CONTROL | A control number used to validate the LEF serial number. |

If these environment variables are not provided, or contain incorrect values,
the License Service will still start, but it will deny all activation request with error status codes.

The information can also be provided in files by instead using the envionment variables

| Name | Description |
| ---- | ----------- |
| LEF_SERIAL_FILE  | Path to file containing the LEF serial number. |
| LEF_CONTROL_FILE | Path to file containing the control number used to validate the LEF serial number. |

This can be useful, for example when providing the values using Docker secrets in Docker Swarm.

### QIX Engine

The QIX Engine must also be configured with the URL of the License Service
in order to make license activation requests to it.
This is done by providing the following command line argument to QIX Engine:

```sh
-S LicenseServiceURL=<License Service URL>
```

## Examples

For running examples of basic license configuration, see the [Core Recipe](../../recipes/core/).

## Deployment

### Single Instance

Normally, only one License Service instance should be required in a Frontira deployment.
Traffic between QIX Engine instances and the License Service is low.
For load balancing or availability concerns, running multiple replicas of the License Service is supported.

### LEF back-end connectivity

When deployed, the License Service must have access to the Qlik licensing back-end,
which means it needs to be able to access the following external URLs:

- `http://lef1.qliktech.com`
- `http://lef2.qliktech.com`
- `http://lef3.qliktech.com`

The hosting environment may need to open access to these locations, otherwise activation requests will fail.

### Monitoring

#### Health Check

The License Service exposes `/v1/health` on port 9200, for health checking. Always responds with `200 OK`.

#### Metrics

The License Service exposes `/v1/metrics` on port 9200, for Prometheus metrics scraping.
The following metrics are provided.

| Name | Type | Description |
| ---- | ---- | ----------- |
| http_requests_total | COUNTER | Total number of HTTP requests since service start.<br>- Includes both successful and unsuccessful requests<br>- HTTP method and endpoint path are provided as labels |
| http_request_failures_total | COUNTER | Total number of HTTP request failures since service start.<br>- HTTP method and endpoint path are provided as labels |
| http_request_duration_seconds | HISTOGRAM | Durations of HTTP request since service start.<br>- HTTP method and endpoint path are provided as labels. |
| active_instances | GAUGE | Number of active instances (Engines with an active license). |
| license_expiry_seconds | GAUGE | Number of seconds until the license expires. |

#### Logging

The License Service complies with logging as described in the Frontira [Contract](../contract.md).
By default, the minimum log level is `info`.
However, for the Microsoft libraries the default minimum logging level is set to `warning` to avoid too verbose logging.

The default minimum logging level can be overridden by providing the `LOG_LEVEL` environment variable.

If provided, this will affect the logging level for all components in the License Service, including Microsoft libraries.
It is recommended to use the default minimum level in a production environment,
and only override the level for debugging purposes.
