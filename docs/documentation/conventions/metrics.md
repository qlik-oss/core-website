# Metrics

Services must expose enough metrics to support public features, as well as
monitoring the health of the service.

The service should expose metrics in the [Prometheus](https://prometheus.io/docs/introduction/overview/)
formats, including:

* It shall be exposed on an `/metrics` endpoint
* It shall support protobuf and plain text representations, based on `Content-Type` passed in
* Following the [best practices](https://prometheus.io/docs/practices/naming/)
