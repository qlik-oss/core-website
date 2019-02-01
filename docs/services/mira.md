# Mira

Mira is a Qlik Associative Engine discovery service for containerized environments.
Mira finds the available Qlik Associative Engine instances and the properties of each instance.
You can then use this information to make decisions about scalability and performance, for example,
on which engine should you open a new session, or when will you need to start a new Qlik Associative Engine instance.

## Distribution

Mira is distributed as a Docker image, and it is available on Docker Hub as [qlikcore/mira](https://hub.docker.com/r/qlikcore/mira).
It is also available as open source on [GitHub](https://github.com/qlik-oss/mira).

## Mira REST API

Mira exposes its REST API on port 9100.

To see an OpenAPI specification
of the Mira REST API, open the [api-doc.yml](https://github.com/qlik-oss/mira/blob/master/doc/api-doc.yml) file.

## Configuration

You configure Mira by setting environment variables inside the container.

### Environment variables

The following environment variables can optionally be set:

| Name                                  | Default value           | Description |
| ------------------------------------- | ----------------------- | ----------- |
| MIRA_MODE                             | swarm                   | Operation mode of Mira.<br>- Can be `swarm`, `kubernetes`, `dns`, or `local`. |
| MIRA_DISCOVERY_LABEL                  | qix-engine              | Label key that Mira uses to identify engine instances.<br/>- Applicable in modes `swarm`, `kubernetes`, and `local`. |
| MIRA_DISCOVERY_HOSTNAME               | n/a                     | Hostname that Mira uses to query DNS for Qlik Associative Engine instances.<br>- Applicable in mode `dns`. |
| MIRA_ENGINE_API_PORT_LABEL            | qix-engine-api-port     | Label that Mira uses to determine the QIX API (websocket) port.<br/>- Applicable in modes `swarm`, `kubernetes`, and `local`. |
| MIRA_ENGINE_METRICS_PORT_LABEL        | qix-engine-metrics-port | Label that Mira uses to determine the `/metrics` port.<br/>- Applicable in modes `swarm`, `kubernetes`, and `local`. |
| MIRA_KUBERNETES_TARGET_NAMESPACE      | n/a                     | Namespace that Mira looks for Qlik Associative Engines in. If not set Mira will look into all namespaces. <br/>- Applicable in mode `kubernetes`. |
| MIRA_ENGINE_DISCOVERY_INTERVAL        | 10000                   | Interval in milliseconds for discovering Qlik Associative Engine instances. |
| MIRA_ENGINE_UPDATE_INTERVAL           | 10000                   | Interval in milliseconds for updating health and metrics for Qlik Associative Engine instances. |
| MIRA_KUBERNETES_PROXY_PORT            | 8001                    | Port that Mira uses to communicate with the Kubernetes API server. |
| MIRA_LOG_LEVEL                        | info                    | Minimum log level that Mira outputs when logging to `stdout`. |
| MIRA_ALLOWED_RESPONSE_TIME            | 1                       | Maximum allowed time in seconds from when a request is received until a response is being sent. |
| MIRA_SWARM_ENGINES_NETWORKS | n/a                               | Docker networks Mira should use for status checking. Only applicable in `swarm` mode. |

### Operation modes

Mira supports different operation modes. The operation mode determines how Mira discovers Qlik Associative Engine instances.

Mira supports the following operation modes:

| Mode                                  | Description |
| ------------------------------------- |  ----------- |
|[Swarm](#swarm-mode)                   | Discovers Qlik Associative Engine instances in a Docker Swarm environment.            |
|[Kubernetes](#kubernetes-mode)         | Discovers Qlik Associative Engine instances in a Kubernetes environment.              |
|[DNS](#dns-mode)                       | Discovers Qlik Associative Engine instances using DNS service look-ups.               |
|[Local](#local-mode)                   | Discovers Qlik Associative Engine instances running on the local Docker Engine.       |

To set the operation mode, define the environment variable `MIRA_MODE` on the Mira container.
In `local` or `swarm` mode you will also have to set the running user to `root` in your `docker-compose.yml` file.
This is needed to be able to mount the `docker.sock` which is used to talk to the Docker API in `local` and `swarm` mode.

### Qlik Associative Engine labeling

In all modes, except _DNS_ mode, Mira uses labels to identify Qlik Associative Engine instances.
By default, the label that Mira searches for is `qix-engine`.
You can change the label that Mira looks for by defining the `MIRA_DISCOVERY_LABEL`
environment variable.

!!! Tip
    Mira only looks at the label key, not the value.
    The values can be left as an empty string. You can see examples of discovery labeling in the operation mode sections.

### Port labeling

In all modes, except _DNS_ mode, Mira uses label values to determine
which ports to use when connecting to the QIX API (websocket)
and the `/metrics` endpoint on the Qlik Associative Engine instances.
By default, Mira looks at the values on the `qix-engine-api-port` and `qix-engine-metrics-port` labels.
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

## Swarm mode

When Mira is running in _Swarm_ mode, it looks for a single Docker Swarm cluster that contains
the Qlik Associative Engine instances running as Docker Swarm services.

You can enable _Swarm_ mode by setting the environment variable `MIRA_MODE` to `swarm`
before starting the Mira Docker service.

In _Swarm_ mode Mira communicates with Docker Remote API to discover Qlik Associative Engine instances in the orchestration.
How Mira should access the Docker Remote API can be configured in two ways.

Mount `docker.sock` as a volume into the Mira container as shown in this [example](https://github.com/qlik-oss/mira/blob/master/docker-compose.yml).
It is however only possible to mount `docker.sock` on a Swarm manager node. To be able to mount the local `docker.sock`
Mira must be run with the `root` user configured in the `docker-compose.yml` file.

If Mira should be running on a worker node Mira needs to be configured to access the Docker Remote API by a URL.
In this case there is no need to mount `docker.sock` into the Mira container,
but the Docker Remote API must be exposed remotely in the Swarm using the [Daemon socket option](https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-socket-option).
For Mira the remotely exposed API can be configured by setting the environment variable `DOCKER_HOST`,
as shown in the example below:

```yaml
services:
  mira:
    image: qlikcore/mira
    environment:
     - MIRA_MODE=swarm
     - DOCKER_HOST=tcp://docker.sock:2375
    ...
```

### Example of Swarm mode

The [docker-compose-swarm.yml](https://github.com/qlik-oss/mira/blob/master/examples/swarm/docker-compose-swarm.yml)
file is an example of how Mira can be started in _Swarm_ mode
with a Qlik Associative Engine instance that is labeled so that Mira will discover it.

A Docker Swarm cluster should already be created with at least one manager,
and the Docker CLI client should be configured to issue commands towards the manager node.

Run the following command to deploy Mira and Qlik Associative Engine in a stack named `mira-stack`:

```sh
docker stack deploy -c docker-compose-swarm.yml mira-stack
```

To remove the stack, run the following command:

```sh
docker stack rm mira-stack
```

### Labeling for Swarm mode

When Mira is running in _Swarm_ mode, it looks for labels on Docker containers.
Below is an example extract from a Docker stack file.

```yaml
version: "3.1"

services:
  mira:
    image: qlikcore/mira
    user: root
    environment:
     - MIRA_MODE=swarm
    ...

  qix-engine1:
    image: qlikcore/engine
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
The service also contains two replicas, so Mira discovers two instances of the Qlik Associative Engine.

!!! Note
    The discovery label (`qix-engine`) must be set at the container (`qix-engine1`) level, not at the task (`deploy`) level.

!!! Info
    The labeling scheme for _Swarm_ mode is similar to that of [_Local_ mode](#local-mode).

### Using multiple Docker networks in Swarm mode

In Docker swarm a service can be attached to multiple Docker networks simultaneously.
Mira will list all Docker networks a Qlik Associative Engine belongs to,
but if using multiple networks Mira must also be configured with one or several Docker networks
to use for performing health checks and gathering metrics.
Since Mira will be dependant on being able to communicate with all Qlik Associative Engines,
they must at least have one network in common.

Which Docker network(s) where the Qlik Associative Engine is reachable by Mira
can be defined using the environment variable `MIRA_SWARM_ENGINE_NETWORKS`.
It is possible to specify a specific network to use `MIRA_SWARM_ENGINE_NETWORKS=engine_network`,
or several using a comma separated list `MIRA_SWARM_ENGINE_NETWORKS=engine_network,engine_network2`.

## Kubernetes mode

When Mira is running in _Kubernetes_ mode, Mira looks for Qlik Associative Engine instances running
as pods in the Kubernetes cluster.

You can enable _Kubernetes_ mode by setting the environment variable `MIRA_MODE` to `kubernetes`
before starting the Mira pod.

!!! Note
    Mira uses the Kubernetes API to discover Qlik Associative Engines in a Kubernetes deployment.
    If RBAC is enabled in Kubernetes then Mira will need `view` access to the Kubernetes API.
    If `MIRA_KUBERNETES_TARGET_NAMESPACE`
    is set however it is enough to give Mira `view` access to the API for that specific namespace.

### Example of Kubernetes mode

The [mira-deployment.yml](https://github.com/qlik-oss/mira/blob/master/examples/kubernetes/plain/mira-deployment.yml) file
is an example of how to deploy Mira and Qlik Associative Engine instances to Kubernetes.

A Kubernetes cluster should be set up and configured correctly.
A quick way to do this, for experimental purposes, is to use
[MiniKube](https://kubernetes.io/docs/getting-started-guides/minikube/).

This example respresents the minimal _Kubernetes_ mode setup.

#### Start Mira in _Kubernetes_ mode

You can start Mira in _Kubernetes_ mode from the example
[mira-deployment.yml](https://github.com/qlik-oss/mira/blob/master/examples/kubernetes/plain/mira-deployment.yml)
file. With the `kubectl` command line tool, run the following command:

```sh
kubectl apply -f mira-deployment.yml
```

#### Expose Mira REST API

The Mira REST API should also be exposed as a service.
You can apply the service configuration with the example
[mira-service.yml](https://github.com/qlik-oss/mira/blob/master/examples/kubernetes/plain/mira-service.yml) file.

```sh
kubectl apply -f mira-service.yml
```

Use the `NodePort` type to expose Mira's default port 9100 outside the cluster as port 31000.

!!! Note
    We assume that `minikube` is used to create the cluster.

You can reach the Mira health check locally by running the following command.

```sh
curl http://$(minikube ip):31000/health
```

#### Deploy Qlik Associative Engine instances

For Mira to discover Qlik Associative Engine instances in the cluster, you can use a Kubernetes deployment file.
Apply the example
[engine-deployment.yml](https://github.com/qlik-oss/mira/blob/master/examples/kubernetes/plain/engine-deployment.yml) file.

```sh
kubectl apply -f engine-deployment.yml
```

This deployment file specifies two engine pod replicas.

#### Expose Qlik Associative Engine Instances as services

For Mira to be able to discover the engine instances,
the engines must be exposed as services with named ports.

You can apply the services with the example.
[engine-service.yml](https://github.com/qlik-oss/mira/blob/master/examples/kubernetes/plain/engine-service.yml) file.

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

### Labeling for Kubernetes mode

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
        image: qlikcore/engine
        ...
```

!!! Note
    Mira does not support hosting multiple engine containers inside the same pod,
    since they would get the same IP address and port.

## DNS mode

When running Mira in _DNS_ mode, Mira resolves by hostname.
Mira uses all returned IP addresses to fetch additional data on Qlik Associative Engine instances.

You can enable _DNS_ mode by setting the environment variable `MIRA_MODE` to `dns`.

### Hostname configuration

When Mira is running in _DNS_ mode, Mira does not look for discovery labels to find Qlik Associative Engine instances.
Instead, Mira uses the hostname that is used to resolve Qlik Associative Engine instances.
You can set the hostname in the `MIRA_DISCOVERY_HOSTNAME` environment variable.

### Example of DNS mode

The [docker-compose-dns.yml](https://github.com/qlik-oss/mira/blob/master/examples/dns/docker-compose-dns.yml) file
is an example of how to configure DNS mode in a Docker Swarm environment.

!!! Note
    By default, Docker Swarm assigns DNS names to services. The environment variables that set _DNS_ mode and
    the Qlik Associative Engine instance hostname correspond to the service named `qix-engine`.

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

## Local mode

When Mira is running in _Local_ mode, Mira looks for Qlik Associative Engine instances
that are running on the `localhost` Docker Engine, without any orchestration platform such as Docker Swarm or Kubernetes.

You can enable _Local_ mode by setting the `MIRA_MODE` environment variable to `local`
before you start the Mira Docker container.
You also need to set Mira to run as the `root` user in your `docker-compose.yml` file.

### Example of Local mode

The [docker-compose.yml](https://github.com/qlik-oss/mira/blob/master/docker-compose.yml) file
is an example of how Mira and a set of Docker containers can be started locally with Docker compose.

With the `docker-compose.yml` file in the current working directory, run the following command.

```sh
docker-compose up -d
```

To verify that Mira discovers the two Qlik Associative Engine containers, run the following command.

```sh
curl http://localhost:9100/v1/engines
```

### Labeling for Local mode

In _Local_ mode, Mira looks for labels on Docker containers.

Below is an example extract from a Docker compose file.

```yaml
version: "3.1"

services:
  mira:
    user: root
    image: qlikcore/mira
    ...

  engine1:
    image: qlikcore/engine
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

In addition to the standard metrics Mira will also supply metrics regarding build info and response times of http requests.
