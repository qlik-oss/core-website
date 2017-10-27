# Mira

_Mira_ provides QIX Engine instance discovery in containerized environments.

The purpose of the service is for other services to be able to get a set of available QIX Engine instances with properties of each QIX Engine instance. This information can be used to take decisions on, for example which engine that is suitable to open a new session towards, or if there is a need to start a new QIX Engine instance.

## Distribution

Mira is distributed as a Docker image and is available on Docker Hub as [qlikea/mira](https://hub.docker.com/r/qlikea/mira).

Mira is available as open source on [GitHub](https://github.com/qlik-ea/mira).

## API

The [api-doc.yml](https://github.com/qlik-ea/mira/blob/master/doc/api-doc.yml) provides an OpenAPI specification of the Mira REST API.

Mira exposes its REST API on port 9100.

## Operation Modes

Mira supports different operation modes. The operation mode determines how Mira discovers QIX Engine instances. The following operation modes are supported:

- [_Swarm_](./mira-swarm-mode.md) - Discovers QIX Engine instances in a Docker Swarm environment
- [_Kubernetes_](./mira-kubernetes-mode.md) - Discovers QIX Engine instances in a Kubernstes environment
- [_DNS_](./mira-dns-mode.md) - Discovers QIX Engine instances using DNS service look-ups
- [_Local_](./mira-local-mode.md) - Discovers QIX Engine instances running on the local Docker Engine, typically created using `docker-compose` on a local machine

The operation mode is set by providing the environment variable `MIRA_MODE` to the Mira container.

## QIX Engine Labeling

In all modes, except _DNS_, Mira uses labels to identify QIX engine instances. By default, the label Mira searches for is `qix-engine` but can be configured using the `MIRA_DISCOVERY_LABEL` environment variable. Note that Mira only looks at the label key and ignores its value. The values can even be omitted. Each section on the different modes shows examples of discovery labeling.

## Port Labeling

In all modes, except _DNS_, Mira also identifies labels on QIX Engine instances to determine which ports that are used to serve the QIX API (websocket) on, and which port it serves the `/metrics` endpoint on. By default, Mira identifies and uses the values of the labels `qix-engine-api-port` and `qix-engine-metrics-port`. These label keys can be configured using the environment variables `MIRA_ENGINE_API_PORT_LABEL` and `MIRA_ENGINE_METRICS_PORT_LABEL` respectively.

If a QIX Engine instance does not have port labels set, Mira defaults to setting the QIX API port to 9076 and the `/metrics` port to 9090.

## Environment Variables

The following environment variables can optionally be set for Mira:

| Name                                  | Default value           | Description |
| ------------------------------------- | ----------------------- | ----------- |
| MIRA_MODE                             | swarm                   | The operation mode of Mira.<br>- Can be `swarm`, `kubernetes`, `dns`, or `local`. |
| MIRA_DISCOVERY_LABEL                  | qix-engine              | Label key that Mira uses to identify engine instances.<br/>- Applicable in modes `swarm`, `kubernetes`, and `local` |
| MIRA_DISCOVERY_HOSTNAME               | n/a                     | Hostname that Mira uses to query DNS for QIX Engine instances.<br>- Only applicable in mode `dns` |
| MIRA_ENGINE_API_PORT_LABEL            | qix-engine-api-port     | Label that Mira will use to determine the QIX API (websocket) port.<br/>- Applicable in modes `swarm`, `kubernetes`, and `local` |
| MIRA_ENGINE_METRICS_PORT_LABEL        | qix-engine-metrics-port | Label that Mira will use to determine the `/metrics` port.<br/>- Applicable in modes `swarm`, `kubernetes`, and `local` |
| MIRA_ENGINE_DISCOVERY_REFRESH_RATE    | 1000                    | Refresh rate in milliseconds for discovering QIX Engine instances. |
| MIRA_ENGINE_HEALTH_REFRESH_RATE       | 5000                    | Refresh rate in milliseconds for checking if QIX Engine instances are healthy. |
| MIRA_KUBERNETES_PROXY_PORT            | 8001                    | Port that Mira will use to communicate to the Kubernetes API server. |
| MIRA_LOG_LEVEL                        | info                    | Log level that Mira will use when logging to `stdout`. |

## Logging

Mira follows the logging format and levels specified in the [logging recipe](../../recipes/logging).

Default log level is `info`, but can be toggled using the `MIRA_LOG_LEVEL` environment variable.
