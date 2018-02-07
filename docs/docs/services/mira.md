# Mira

Mira is a QIX Engine discovery service for containerized environments.
Mira finds the available QIX Engine instances and the properties of each instance.
You can then use this information to make decisions about scalability and performance, for example,
on which engine should you open a new session, or when will you need to start a new QIX Engine instance.

## Distribution

Mira is distributed as a Docker image, and it is available on Docker Hub as [qlikea/mira](https://hub.docker.com/r/qlikea/mira).
It is also available as open source on [GitHub](https://github.com/qlik-ea/mira).

## Mira REST API

Mira exposes its REST API on port 9100.

To see an OpenAPI specification
of the Mira REST API, open the [api-doc.yml](https://github.com/qlik-ea/mira/blob/master/doc/api-doc.yml) file.

## Configuration

You configure Mira by setting environment variables inside the container.

### Environment Variables

The following environment variables can optionally be set:

| Name                                  | Default value           | Description |
| ------------------------------------- | ----------------------- | ----------- |
| MIRA_MODE                             | swarm                   | Operation mode of Mira.<br>- Can be `swarm`, `kubernetes`, `dns`, or `local`. |
| MIRA_DISCOVERY_LABEL                  | qix-engine              | Label key that Mira uses to identify engine instances.<br/>- Applicable in modes `swarm`, `kubernetes`, and `local`. |
| MIRA_DISCOVERY_HOSTNAME               | n/a                     | Hostname that Mira uses to query DNS for QIX Engine instances.<br>- Applicable in mode `dns`. |
| MIRA_ENGINE_API_PORT_LABEL            | qix-engine-api-port     | Label that Mira uses to determine the QIX API (websocket) port.<br/>- Applicable in modes `swarm`, `kubernetes`, and `local`. |
| MIRA_ENGINE_METRICS_PORT_LABEL        | qix-engine-metrics-port | Label that Mira uses to determine the `/metrics` port.<br/>- Applicable in modes `swarm`, `kubernetes`, and `local`. |
| MIRA_ENGINE_DISCOVERY_INTERVAL        | 10000                    | Interval in milliseconds for discovering QIX Engine instances. |
| MIRA_ENGINE_UPDATE_INTERVAL           | 10000                    | Interval in milliseconds for updating health and metrics for QIX Engine instances. |
| MIRA_KUBERNETES_PROXY_PORT            | 8001                    | Port that Mira uses to communicate with the Kubernetes API server. |
| MIRA_LOG_LEVEL                        | info                    | Minimum log level that Mira outputs when logging to `stdout`. |
| MIRA_ALLOWED_RESPONSE_TIME            | 1000                    | Maximum allowed time in milliseconds from when a request is received until a response is being sent. |

### Operation Modes

Mira supports different operation modes. The operation mode determines how Mira discovers QIX Engine instances.

Mira supports the following operation modes:

| Mode                                  | Description |
| ------------------------------------- |  ----------- |
|[Swarm](#swarm-mode)                   | Discovers QIX Engine instances in a Docker Swarm environment.            |
|[Kubernetes](#kubernetes-mode)         | Discovers QIX Engine instances in a Kubernetes environment.              |
|[DNS](#dns-mode)                       | Discovers QIX Engine instances using DNS service look-ups.               |
|[Local](#local-mode)                   | Discovers QIX Engine instances running on the local Docker Engine.        |

To set the operation mode, define the environment variable `MIRA_MODE` on the Mira container.

### QIX Engine Labeling

In all modes, except _DNS_ mode, Mira uses labels to identify QIX Engine instances.
By default, the label that Mira searches for is `qix-engine`.
You can change the label that Mira looks for by defining the `MIRA_DISCOVERY_LABEL`
environment variable.

!!! Tip
    Mira only looks at the label key, not the value.
    The values can even be omitted. You can see examples of discovery labeling in the operation mode sections.

### Port Labeling

In all modes, except _DNS_ mode, Mira uses label values to determine
on which ports to serve the QIX API (websocket) and the `/metrics` endpoint.
By default, Mira looks at the values on the `qix-engine-api-port` and `qix-engine-metrics-port` lables.
You can change these label values by using the environment variables
`MIRA_ENGINE_API_PORT_LABEL` and `MIRA_ENGINE_METRICS_PORT_LABEL` respectively.

Mira uses the following default port values:

|Port label               | Default value |
| --------                | --------      |
|`qix-engine-api-port`    |9076           |
|`qix-engine-metrics-port`|9090           |

!!! Tip
    You can omit the API port and metrics port labels if you are using are the default port values.

### Logging

Mira uses the same the logging format and logging levels that are described
in the [Logging](../conventions/logging.md) conventions.
The default log level is set to `info`.
You can change the log level by setting the `MIRA_LOG_LEVEL` environment variable.

## Swarm Mode

When Mira is running in _Swarm_ mode, it looks for a single Docker Swarm cluster that contains
the QIX Engine instances running as Docker Swarm services.

You can enable _Swarm_ mode by setting the environment variable `MIRA_MODE` to `swarm`
before starting the Mira Docker service.

In _Swarm_ mode Mira communicates with Docker Remote API to discover QIX Engine instances in the orchestration.
How Mira should access the Docker Remote API can be configured in two ways.

Mount `docker.sock` as a volume into the Mira container as shown in this [example](https://github.com/qlik-ea/mira/blob/master/docker-compose.yml).
It is however only possible to mount `docker.sock` on a Swarm manager node.

If Mira should be running on a worker node Mira needs to be configured to access the Docker Remote API by a URL.
In this case there is no need to mount `docker.sock` into the Mira container,
but the Docker Remote API must be exposed remotely in the Swarm using the [Daemon socket option](https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-socket-option).
For Mira the remotely exposed API can be configured by setting the environment variable `DOCKER_HOST`,
as shown in the example below:

```yaml
services:
  mira:
    image: qlikea/mira
    environment:
     - MIRA_MODE=swarm
     - DOCKER_HOST=tcp://docker.sock:2375
    ...
```

### Example of Swarm Mode

The [docker-compose-swarm.yml](https://github.com/qlik-ea/mira/blob/master/examples/swarm/docker-compose-swarm.yml)
file is an example of how Mira can be started in _Swarm_ mode
with a QIX Engine instance that is labeled so that Mira will discover it.

A Docker Swarm cluster should already be created with at least one manager,
and the Docker CLI client should be configured to issue commands towards the manager node.

Run the following command to deploy Mira and QIX Engine in a stack named `mira-stack`:

```sh
docker stack deploy -c docker-compose-swarm.yml mira-stack
```

To remove the stack, run the following command:

```sh
docker stack rm mira-stack
```

### Labeling for Swarm Mode

When Mira is running in _Swarm_ mode, it looks for labels on Docker containers.
Below is an example extract from a Docker stack file.

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

In the example Docker stack file, the `qix-engine1` service contains the discovery label `qix-engine`.
The service also contains two replicas, so Mira discovers two instances of the QIX Engine.

!!! Note
    The discovery label (`qix-engine`) must be set at the container (`qix-engine1`) level, not at the task (`deploy`) level.

!!! Info
    The labeling scheme for _Swarm_ mode is similar to that of [_Local_ mode](#local-mode).

## Kubernetes Mode

When Mira is running in _Kubernetes_ mode, Mira looks for QIX Engine instances running as pods in the Kubernetes cluster.

You can enable _Kubernetes_ mode by setting the environment variable `MIRA_MODE` to `kubernetes`
before starting the Mira pod.

!!! Note
    Since Mira needs to communicate with the Kubernetes API server,
    a `kubectl` proxy should be set up in the Kubernetes deployment.
    One way you can do this is to bundle the `kubectl` proxy as a container in the same pod as the Mira container,
    then Mira can reach the proxy on `localhost`.

### Example of Kubernetes Mode

The [mira-deployment.yml](https://github.com/qlik-ea/mira/blob/master/examples/kubernetes/mira-deployment.yml) file
is an example of how to deploy Mira and QIX Engine instances to Kubernetes.

A Kubernetes cluster should be set up and configured correctly.
A quick way to do this, for experimental purposes, is to use
[MiniKube](https://kubernetes.io/docs/getting-started-guides/minikube/).

This example respresents the minimal _Kubernetes_ mode setup.

#### Start Mira in _Kubernetes_ Mode

You can start Mira in _Kubernetes_ mode from the example
[mira-deployment.yml](https://github.com/qlik-ea/mira/blob/master/examples/kubernetes/mira-deployment.yml)
file. With the `kubectl` command line tool, run the following command:

```sh
kubectl apply -f mira-deployment.yml
```

!!! Note
    Mira and the `kubectl` proxy are bundled into the same pod.

Since Kubernetes needs to pull Docker images, Kubernetes must be configured with Docker Hub credentials.
In the deployment file, these credentials are held in an object of type `secret` that is called `dockerhub`.

#### Expose Mira REST API

The Mira REST API should also be exposed as a service.
You can apply the service configuration with the example
[mira-service.yml](https://github.com/qlik-ea/mira/blob/master/examples/kubernetes/mira-service.yml) file.

```sh
kubectl apply -f mira-service.yml
```

Use the `NodePort` type to expose Mira's default port 9100 outside the cluster as port 31000.

!!! Note
    We assume that `minikube` is used to create the cluster.

You can reach the Mira health check locally by running the following command.

```sh
curl http://$(minikube ip):31000/v1/health
```

#### Deploy QIX Engine Instances

For Mira to discover QIX Engine instances in the cluster, you can use a Kubernetes deployment file.
Apply the example
[engine-deployment.yml](https://github.com/qlik-ea/mira/blob/master/examples/kubernetes/engine-deployment.yml) file.

```sh
kubectl apply -f engine-deployment.yml
```

This deployment file specifies two engine pod replicas.

#### Expose QIX Engine Instances as Services

For Mira to be able to discover the engine instances,
the engines must be exposed as services with named ports.

You can apply the services with the example.
[engine-service.yml](https://github.com/qlik-ea/mira/blob/master/examples/kubernetes/engine-service.yml) file.

```sh
kubectl apply -f engine-service.yml
```

This service file exposes the engine instances as a service with a named port `qix`.
Each engine replica appears in the _endpoints_ object that relates to the service,
and Mira uses this information to list the engine instances.

You can retrieve the list by running the following command:

```sh
curl http://$(minikube ip):31000/v1/engines
```

!!! Note
    The files in this section showed examples of a minimal setup to get Mira running with Kubernetes.
    In a production deployment, you will have to consider other aspects.

### Labeling for Kubernetes Mode

In _Kubernetes_ mode, Mira looks for the discovery labels on pods that are hosting engine containers.

Below is an example extract from a Kubernetes deployment file that specifies
two engine replicas, and the pod is assigned a discovery label so that Mira can discover them.

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

!!! Note
    Mira does not support hosting multiple engine containers inside the same pod,
    since they would get the same IP address and port.

## DNS Mode

When running Mira in _DNS_ mode, Mira resolves by hostname.
Mira uses all returned IP addresses to fetch additional data on QIX Engine instances.

You can enable _DNS_ mode by setting the environment variable `MIRA_MODE` to `dns`.

### Hostname Configuration

When Mira is running in _DNS_ mode, Mira does not look for discovery labels to find QIX Engine instances.
Instead, Mira uses the hostname that is used to resolve QIX Engine instances.
You can set the hostname in the `MIRA_DISCOVERY_HOSTNAME` environment variable.

### Example of DNS Mode

The [docker-compose-dns.yml](https://github.com/qlik-ea/mira/blob/master/examples/dns/docker-compose-dns.yml) file
is an example of how to configure DNS mode in a Docker Swarm environment.

!!! Note
    By default, Docker Swarm assigns DNS names to services. The environment variables that set _DNS_ mode and
    the QIX Engine instance hostname correspond to the service named `qix-engine`.

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

When Mira is running in _Local_ mode, Mira looks for QIX Engine instances
that are running on the `localhost` Docker Engine, without any orchestration platform such as Docker Swarm or Kubernetes.

You can enable _Local_ mode by setting the `MIRA_MODE` environment variable to `local`
before you start the Mira Docker container.

### Example of Local Mode

The [docker-compose.yml](https://github.com/qlik-ea/mira/blob/master/docker-compose.yml) file
is an example of how Mira and a set of Docker containers can be started locally with Docker compose.

With the `docker-compose.yml` file in the current working directory, run the following command.

```sh
docker-compose up -d
```

To verify that Mira discovers the two QIX Engine containers, run the following command.

```sh
curl http://localhost:9100/v1/engines
```

### Labeling for Local Mode

In _Local_ mode, Mira looks for labels on Docker containers.

Below is an example extract from a Docker compose file.

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

Mira discovers the engine instance by looking for the `qix-engine` label.

## Metrics

Following the [Metrics](../conventions/metrics.md) conventions, Mira exposes
some metrics that can be used to monitor the service.

Mira exposes the recommended standard metrics from
[Prometheus](https://prometheus.io/docs/instrumenting/writing_clientlibs/#standard-and-runtime-collectors).
