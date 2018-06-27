# Metrics

A service must expose enough run-time metadata to provide metrics about the health of the service,
and to support public features.
We recommend that you follow the [Prometheus metrics](https://prometheus.io/docs/introduction/overview/)
_format_ to collect metrics details about your services.

The service should follow these conventions:

* Expose metrics on a `/metrics` endpoint.
* Support protobuf and plain text representations, based on the `Content-Type` that is passed in.
* Follow the [Prometheus best practices](https://prometheus.io/docs/introduction/overview/).
