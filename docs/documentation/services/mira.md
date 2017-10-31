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

- [_Swarm_](#swarm-mode) - Discovers QIX Engine instances in a Docker Swarm environment
- [_Kubernetes_](#kubernetes-mode.md) - Discovers QIX Engine instances in a Kubernstes environment
- [_DNS_](#dns-mode.md) - Discovers QIX Engine instances using DNS service look-ups
- [_Local_](#local-mode.md) - Discovers QIX Engine instances running on the local Docker Engine, typically created using `docker-compose` on a local machine

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
| MIRA_LOG_LEVEL                        | info                    | Minimum log level that Mira outputs when logging to `stdout`. |

## Logging

Mira follows the logging format and levels specified in the [contract](../contract.md).

Default minimum log level is `info`, but can be set using the `MIRA_LOG_LEVEL` environment variable.

## Swarm Mode

In _Swarm_ mode, Mira assumes that all QIX Engine instances run as Docker Swarm services inside one single Docker Swarm cluster. _Swarm_ mode is enabled by setting the environment variable `MIRA_MODE` to `swarm` before starting the Mira Docker service.

Mira _must_ be configured to run on a Swarm manager node, since it needs to communicate to a manager Docker Engine.

### Example

The file [docker-compose-swarm.yml](https://github.com/qlik-ea/mira/blob/master/examples/swarm/docker-compose-swarm.yml) shows an example of how Mira can be started in Swarm mode, together with a QIX Engine instance that is labeled so that Mira will discover it. It assumed that a Docker Swarm cluster is already created with at least one manager, and that the Docker CLI client is configured to issue commands towards the manager node.

To deploy Mira and QIX Engine in a stack named `mira-stack`, run:

```sh
$ docker stack deploy -c docker-compose-swarm.yml mira-stack
```

To remove the stack, run:

```sh
$ docker stack rm mira-stack
```

### Labeling

In _Swarm_ mode, Mira assumes that labels are provided on Docker containers. Below is an example extract from a Docker stack file that would cause Mira to discover both QIX Engine replicas as two separate instances of the `qix-engine1` service.

```yaml
version: "3.1"

services:
  mira:
    image: qlikea/mira
    environment:
     - MIRA_MODE=swarm
    ...

  qix-engine1:
    image: qlikea/engine
    labels:
      qix-engine: ""
      qix-engine-api-port: "9076"
      qix-engine-metrics-port: "9090"

    deploy:
      replicas: 2
      placement:
        ...

```

Note that in Docker Swarm, the labels must be set on container level, _outside_ the `deploy:` scope. Setting the labels in the `deploy:` scope causes the labels to be set on the service only, and not on each individual container (task) of the service. Only labeling the service will not make Mira discover the engines.

Labeling outside the `deploy:` scope also has the benefit of that the labeling scheme for _Local_ and _Swarm_ mode becomes similar.

## Kubernetes Mode

In _Kubernetes_ mode, Mira assumes that all QIX Engine instances run as pods in the Kubernetes cluster. _Kubernetes_ mode is set by setting the `MIRA_MODE` environment variable to `kubernetes` before starting the Mira pod.

Since Mira needs to communicate with the Kubernetes API server, a `kubectl` proxy should be set up in the Kubernetes deployment. A convenient way to do this is to bundle the `kubectl` proxy as a container in the same pod as the Mira container. In this way, Mira can reach the proxy on `localhost`.

### Example

In order to deploy Mira and QIX Engine instances to Kubernetes, it is assumed that a Kubernetes cluster exists and is configured properly. A quick way to do this, for experimental purposes, is to use [MiniKube](https://kubernetes.io/docs/getting-started-guides/minikube/).

To start Mira in _Kubernetes_ mode, the `kubectl` command line tool can be used. Preferably, a Kubernetes deployment YAML file is used; for example

```sh
$ kubectl apply -f mira-deployment.yml
```

The file [mira-deployment.yml](https://github.com/qlik-ea/mira/blob/master/examples/kubernetes/mira-deployment.yml) shows an example. Note how the deployment also bundles the `kubectl` proxy into the same pod. Since Kubernetes must be able to pull Docker images, the deployment file assumes that Kubernetes is configured with Docker Hub registry credentials in a secret named `dockerhub`.

Normally the Mira REST API shall also be exposed as a service. Preferably, this can also be done by applying the service configuration as a YML file; for example

```sh
$ kubectl apply -f mira-service.yml
```

The file [mira-service.yml](https://github.com/qlik-ea/mira/blob/master/examples/kubernetes/mira-service.yml) show an example of this where Mira's default port 9100 is exposed outside the cluster as port 31000 (using the `NodePort` type). Assuming `minikube` is used to create the cluster, the Mira health check should now be possible to reach.

```sh
$ curl http://$(minikube ip):31000/v1/health
```

In order for Mira to discover QIX Engine instances in the cluster, a Kubernetes deployment file can also be used.

```sh
$ kubectl apply -f engine-deployment.yml
```

The file [engine-deployment.yml](https://github.com/qlik-ea/mira/blob/master/examples/kubernetes/engine-deployment.yml) shows an example of a deployment of two engine pod replicas. However, this is not enough for Mira to be able to discover the two engine instances. For this to happen, the engines need to be exposed as services with named ports. For example

```sh
$ kubectl apply -f engine-service.yml
```

The file [engine-service.yml](https://github.com/qlik-ea/mira/blob/master/examples/kubernetes/engine-service.yml) show as example of how the engine pods are exposed as a service with a named port, `qix`. Each engine replica will appear in the _endpoints_ object that will be related to the service and Mira uses this information to list the engine instances. This list should now be possible to retrieve with

```sh
$ curl http://$(minikube ip):31000/v1/engines
```

Note that the example files here only provide a minimal setup in order to get Mira up and running with Kubernetes. In a production deployment, many other aspects must be considered.

### Labeling

In _Kubernetes_ mode, Mira assumes that the discovery label is provided on pods hosting Engine containers. Below is an example extract from a Kubernetes deployment file for two Engine replicas where the label is set up so that Mira can discover them both.

```yaml
apiVersion: apps/v1beta1
kind: Deployment
metadata:
  name: engine-deployment
spec:
  replicas: 2
  template:
    metadata:
      labels:
        qix-engine: ""
        qix-engine-api-port: "9076"
        qix-engine-metrics-port: "9090"
    spec:
      containers:
        ...
        image: qlikea/engine
        ...      
```

**NOTE** - Mira does not support hosting multiple engine containers inside the same pod, since they would get the same IP address and port.

## DNS mode

In _DNS_ mode Mira resolves by hostname, and uses all returned IP addresses it finds to fetch additional QIX Engine instance data. _DNS_ mode is enabled by setting the environment variable `MIRA_MODE` to `dns`.

### Hostname Configuration

In the _DNS_ mode there is no need to set labels on QIX Engine instances. Instead, the hostname used to resolve QIX Engine instances must be set using the `MIRA_DISCOVERY_HOSTNAME` environment variable.

### Example

An example how this could be configured in a Docker Swarm environment can be found in the file [docker-compose-dns.yml](https://github.com/qlik-ea/mira/blob/master/examples/dns/docker-compose-dns.yml).

Note the environment variables used to set the _DNS_ mode and the hostname used to identify QIX Engine instances, which correspond to the service name `qix-engine` given and how Docker Swarm, by default, assigns DNS names to services.

```yml
services:
  mira:
    ...
    environment:
     - MIRA_MODE=dns
     - MIRA_DISCOVERY_HOSTNAME=tasks.qix-engine
    ...

  qix-engine:
    ...
```

## Local Mode

In _Local_ mode, Mira assumes that all QIX Engine instances run as Docker containers on the `localhost` Docker Engine, without any orchestration platform such as Docker Swarm or Kubernetes. _Local_ mode is enabled by setting the `MIRA_MODE` environment variable to `local` when starting the Mira Docker container.

### Example

Typically, a set of Docker container are started locally using a Docker compose. The file [docker-compose.yml](https://github.com/qlik-ea/mira/blob/master/docker-compose.yml) shows an example of this. It starts one Mira container and two QIX Engine containers.

Assuming the current `docker-compose.yml` exists in the current working directory, run:

```sh
$ docker-compose up -d
```

To verify that Mira discovers the two QIX Engine containers, run:

```sh
$ curl http://localhost:9100/v1/engines
```

### Labeling

In _Local_ mode, Mira assumes that labels are provided on Docker containers. Below is an example extract from a Docker compose file with labels present. Since `qix-engine-api-port` and `qix-engine-metrics-port` are optional and with the same default values, that could have been omitted.

```yaml
version: "3.1"

services:
  mira:
    image: qlikea/mira
    ...

  engine1:
    image: qlikea/engine
    ...
    labels:
      qix-engine: ""
      qix-engine-api-port: "9076"
      qix-engine-metrics-port: "9090"

```
