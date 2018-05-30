# Licenses

!!! warning "Experimental service"
    This service is subject to change in terms of
    configuration, metrics, and logging.

!!! Note "Tutorial"
    A tutorial on how to set up the licenses service can be found (here)[../tutorials/licensing.md]

To run Qlik Associative Engine with a paid license, you are required to run this service.

## Distribution

The Licenses service is available on Docker Hub as a Docker image: [qlikcore/licenses](https://hub.docker.com/r/qlikcore/licenses).

It is developed by Qlik as closed source.

## Configuration

You configure Licenses by setting environment variables inside the container.

### Environment variables

The following environment variables can be set when using the license service in Qlik Core mode:

| Name                                  |Required| Default value           | Description |
| ------------------------------------- |--------| ----------------------- | ----------- |
| LICENSES_SERIAL_NBR                   | yes | N/A                     | The License serial number. |
| LICENSES_CONTROL_NBR                  | yes |N/A                     | The License control number. |
| LICENSES_LOG_LEVEL                    | no |info                    | Minimum log level that Licenses outputs when logging to `stdout`. |

## Deployment

In most Qlik Core deployments, you will only need to deploy a single instance of this service. This is because
traffic between Qlik Associative Engine instances and the Licenses service is relatively low. It does however
support multiple instances if needed.

### Health check

For health checking, the service exposes `/health` on port 9200, and it always responds with http status code `200 OK`.

### Metrics

Following the [Metrics](../conventions/metrics.md) conventions, Licenses exposes
some metrics that can be used to monitor the service on port 9200.
It provides the following specific
metrics associated with your Qlik Core license:

| Name | Type | Description |
| ---- | ---- | ----------- |
| license_time_consumption | GAUGE | Number of license minutes consumed this month. This metrics is only showed if any minutes have been consumed. |
| license_time_total | GAUGE | The total amount of license minutes per month your license gives you. |

To see an example of how you can use these metrics to create dashboards of your license consumption,
see the [core-using-licenses](https://github.com/qlik-oss/core-using-licenses) repository.

### Logging

This service complies with the [Logging](../conventions/logging.md) conventions.
By default, the minimum log level is `info`.

You can override the minimum logging level by providing the `LICENSES_LOG_LEVEL` environment variable.
