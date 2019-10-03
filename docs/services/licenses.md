# License

To run Qlik Associative Engine with a paid license, you are required to run this service.
Make sure that you have read and understood how [licensing](../licensing.md) in Qlik Core works.

## Distribution

The License service is available on Docker Hub as a Docker image: [qlikcore/licenses](https://hub.docker.com/r/qlikcore/licenses).

It is developed by Qlik as closed source.

## Configuration

You need to configure the License service with an environment variable `LICENSE_KEY`
containing your signed license key.

You also need to configure [Qlik Associative Engine](./qix-engine/introduction.md)
where to find it. You can do this by passing the following command line argument to the Qlik
Associative Engine.

```sh
-S LicenseServiceUrl=<License service URL>
```

## Examples

To see an example of a license configuration, see the
[core-using-licenses](https://github.com/qlik-oss/core-using-licenses) repository.

## Deployment

In most Qlik Core deployments, you will only need to deploy a single instance of this service. This is because
traffic between Qlik Associative Engine instances and the License service is relatively low. It does however
support multiple instances if needed.

### Health check

For health checking, the service exposes `/health` on port 9200, and it always responds with http status code `200 OK`.

### Metrics

For Prometheus metrics scraping, the service exposes `/metrics` on port 9200. It provides the following
metrics associated with your license:

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

### License Events

If no valid license exists or all license minutes are already consumed and the Qlik Associative Engine
is configured to run in licensed mode without overreach it will send a `SESSION_ERROR_NO_LICENSE`
push event on the websocket and then close it.

If during a license renewal there are no more license minutes and your license is without overreach a `SESSION_ERROR_LICENSE_RENEW`
push event will be sent from the Qlik Associative Engine and afterwards the websocket will be closed.
