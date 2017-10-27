# License Service

The _License Service_ validates QIX Engine licensing and is required to run QIX Engine with a valid license.

The License Service shall be configured with QIX Engine license information and be deployed together with the QIX Engine. In a deployment, each QIX Engine instance periodically checks for a valid license by communicating with the License Service.

As such, the License Service API is not primarily not intended to be consumed by applications built on top of Frontira. The License Service only works as a required side-car service to QIX Engine.

## Distribution

The License Service is distributed as a Docker image and is available on Docker Hub as [qlikea/license-service](https://hub.docker.com/r/qlikea/license-service).

The License Service is developed by Qlik as closed source.

## Configuration

### Configuring the License Service

The License Service shall be configured with information on the license to use with the deployment of QIX Engine. This is done by providing two environment variables to the License Service:

| Name        | Description |
|-------------|-------------|
| LEF_SERIAL  | The LEF serial number which identifies the license to use. |
| LEF_CONTROL | A control number used to validate the LEF serial number. |

If these environment variables are not provided, or contain incorrect values, the License Service will still start, but it will deny all activation request with error status codes.

The information can also be provided in files by instead using the envionment variables

| Name | Description |
| ---- | ----------- |
| LEF_SERIAL_FILE  | Path to file containing the LEF serial number. |
| LEF_CONTROL_FILE | Path to file containing the control number used to validate the LEF serial number. |

This can be useful, for example when providing the values using Docker secrets in Docker Swarm.

### Configuring QIX Engine

The QIX Engine must also be configured with the URL of the License Service in order to make license activation requests to it. this is done by providing the following command line argument to QIX Engine:

```sh
-S LicenseServiceURL=<License Service URL>
```

### Examples

For running examples of basic license configuration, see the [Core Recipe](../../recipes/core/).

## Deployment

### Single Instance

Normally, only one License Service instance should be required in a Frontira deployment. Traffic between QIX Engine instances and the License Service is low. For load balancing or availability concerns, running multiple replicas of the License Service is supported.

### LEF back-end connectivity

When deployed, the License Service must have access to the Qlik licensing back-end. In a deployment, it must be ensured that the License Service can access and communicate with the following URLs:

- `http://lef1.qliktech.com`
- `http://lef2.qliktech.com`
- `http://lef3.qliktech.com`

The hosting environment may need to open access to these locations, otherwise activation requests will fail.

### Monitoring

#### Metrics

The License Service exposes a `/metrics` endpoint on port 9200, for Prometheus metrics scraping. The following metrics are provided.

| Name | Type | Description |
| ---- | ---- | ----------- |
| http_requests_total | COUNTER | Total number of HTTP requests since service start.<br>- Includes both successful and unsuccessful requests<br>- HTTP method and endpoint path are provided as labels |
| http_request_failures_total | COUNTER | Total number of HTTP request failures since service start.<br>- HTTP method and endpoint path are provided as labels |
| http_request_duration_seconds | HISTOGRAM | Durations of HTTP request since service start.<br>- HTTP method and endpoint path are provided as labels. |
| active_instances | GAUGE | Number of active instances (Engines with an active license). |
| license_expiry_seconds | GAUGE | Number of seconds until the license expires. |

#### Logging

_TODO_
