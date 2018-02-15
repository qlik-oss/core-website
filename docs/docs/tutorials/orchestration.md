# Orchestration

In this tutorial, you will learn how to set up and deploy the minimal Qlik Core stack
comprising the core services. The core services represent the foundation on which to build full Qlik Core solutions.

The core Qlik Core stack consists of the following services:

- [Qlik Associative Engine](../services/qix-engine/introduction.md)
- [License Service](../services/license-service.md)
- [Mira](../services/mira.md)

In a typical solution, all services are deployed on the server side.

!!! Note
    We describe how to configure the core components for things like authorization,
    data loading, and document distribution in separate tutorials.

## Before you begin

Clone the [Core](https://github.com/qlik-ea/core) Git repository,
which contains all tutorial assets, to your local machine.
All commands should be executed from this Git repository.

## Licensing

During beta, Qlik Core will not require licensing credentials. However, we highly
recommend that you configure Qlik Associative Engine to use the license service which will
enable you to transition out of the beta easily.

On top of this, during beta each Qlik Associative Engine version will have a 30 day expiration (from
when it was published), it will stop working after this time so make sure you can update
and deploy often.

When the Qlik Associative Engine is running, it periodically communicates with the License Service
to verify that it is running with a valid license.
A Qlik Associative Engine deployment must be configured with the URL
that is used to call the License Service REST API.
You can do this by providing the `LicenseServiceUrl` setting.
See the orchestration examples below how that works for your targeted environment.

## Configuring the Qlik Associative Engine

You supply configuration to Qlik Associative Engine by adding `-S <setting>=<value>` arguments
during startup. In a `docker-compose.yml` file it may look something like this.

```yml
version: "3.0"
services:
  qix-engine:
    image: qlikea/engine:<version>
    ...
    command: -S <setting1>=<value> -S <setting2>=<value> ...
...
```

To start Qlik Associative Engine in Qlik Core, you also need to accept the [EULA](../../beta.md) by
supplying `-S AcceptEULA=yes`.

## Container orchestration

We provide examples on how to deploy the Qlik Core services
using the following container orchestration platforms:

- [Docker Swarm](#deploying-to-docker-swarm)
- [Kubernetes](#deploying-to-kubernetes)
- [Nomad](#deploying-to-nomad) (Experimental)

In the examples that follow, all shell commands should be run in a Bash shell.
If you are using Windows, we recommend using Git Bash.

!!! Note
    You need to accept the EULA before these examples can be run, see
    the `README.md` file in each orchestration example for instructions
    how to do this.

## Deploying to Docker Swarm

### Prerequisites

You must have a Docker Swarm cluster set up.
To learn how to set up a Docker Swarm cluster in a local environment,
see [Install Docker](https://docs.docker.com/engine/swarm/).

Your Docker CLI must be set to issue commands to the swarm manager.
You can do this with the `eval` command. For example:

```sh
eval $(docker-machine env <swarm manager node>)
```

### The stack

The Qlik Core stack is specified in the
[docker-compose.yml](https://github.com/qlik-ea/core/blob/master/docker-swarm/docker-compose.yml) file.
The stack consists of one Qlik Associative Engine, one Mira discovery service, and one License Service.

#### Placement constraints

The Mira service is placed on the swarm manager node
so that it can communicate with the manager Docker Engine.
This is why `/var/run/docker.sock` is mounted into the service.

#### Ports

Relevant APIs are exposed on the following ports:

| Service         | Port          | API                        |
| --------------- |:-------------:| --------------------------:|
| Mira            | `9100`        | REST API                   |
| License Service | `9200`        | REST API                   |
| Qlik Associative Engine      | `9076`        | QIX websocket API          |
| Qlik Associative Engine      | `9090`        | Prometheus/metric endpoint |

These ports are exposed outside of the swarm
so that they are easily available for demonstrations.
This is not a requirement.

#### Labeling

The Qlik Associative Engine service requires the following note to be added
to the labels definition in the `docker-compose.yml` file:

```yml
labels:
  qix-engine: ""
```

This label is required for Mira to identify service as a Qlik Associative Engine instance.
To learn more about labeling, see [Mira documentation](https://github.com/qlik-ea/mira).

### Deploying the stack

Deploy the stack by running the following command:

```sh
docker stack deploy -c ./docker-compose.yml --with-registry-auth qlik-core
```

!!! Note
  `--with-registry-auth` is currently required because the Docker images are not public,
  and credentials are needed to pull them from Docker Hub.

### Accessing the stack

Once the stack is deployed,
you can retrieve a list of the tasks running on the stack by running the following command:

```sh
docker stack ps qlik-core
```

You can query Mira to return the list of Qlik Associative Engines it has discovered by calling its `/engines` endpoint:

```sh
curl http://<swarm manager node ip>:9100/v1/engines
```

This endpoint returns one or more Qlik Associative Engine instances and information about these instances in JSON format.

## Deploying to Kubernetes

### Prerequisites

You must have a Kubernetes cluster with one or more nodes set up.
If you need to set up a local, single-node environment,
see [Running Kubernetes locally via Minikube](https://kubernetes.io/docs/getting-started-guides/minikube/).

The *kubectl CLI* must be available on the local machine
and it must be configured to communicate with the correct Kubernetes API server.
To learn more about the *kubectl CLI* and how to configure it,
see [Overview of kubectl](https://kubernetes.io/docs/reference/kubectl/overview/).

### Docker Hub credentials

The Docker images that are being used are not public,
so you must add a secret to Kubernetes to be able to pull these images from Docker Hub.

To add this secret to Kubernetes, run the following command:

```sh
kubectl create secret docker-registry dockerhub --docker-username=<your-name> --docker-password=<your-password> --docker-email=<your-email>
```

!!! Note
    The leading space character before the kubectl command is intentional.
    This prevents the command from being stored in the Bash shell command history.

### The stack

The Qlik Core stack is specified in the `docker-compose.yml` file.
The stack consists of one Qlik Associative Engine, one Mira discovery service, and one License Service.

#### Mira Kubernetes mode

Open the
[mira-deployment.yaml](https://github.com/qlik-ea/core/blob/master/kubernetes/plain/qlik-core/mira-deployment.yaml)
file to see how Mira is configured.

The Mira deployment specifies two containers to run in the pod.
This is because Mira needs to communicate with the Kubernetes API server through *kubectl* as a proxy.

Mira must also be configured to run in Kubernetes mode.
This does not happen automatically.
To do this, you must set the environment variable `MIRA_MODE` to `kubernetes`.

#### Ports

Relevant APIs are exposed on the following ports:

| Service         | Port          | API                        |
| --------------- |:-------------:| --------------------------:|
| Mira            | `9100`        | REST API                   |
| License Service | `9200`        | REST API                   |
| Qlik Associative Engine      | `9076`        | QIX websocket API          |
| Qlik Associative Engine      | `9090`        | Prometheus/metric endpoint |

These ports are exposed outside of the swarm so that they are easily available for demonstrations.
This is not a requirement.

#### Labeling

The Qlik Associative Engine service requires the following note to be added to the labels definition in
the `engine-deployment.yml` file:

```yml
labels:
  qix-engine: ""
```

This label is required for Mira to identify the engine service as a Qlik Associative Engine instance.
To learn more about labeling, see [Qlik Associative Engine labeling](../services/mira.md#qix-engine-labeling).

### Deploying the stack

We show two types of deployments to Kubernetes below.
The first one is the *plain* Kubernetes method, which uses standard deployments and services.
The second one uses [Helm](https://helm.sh/),
which provides a powerful way to manage Kubernetes applications.

#### Deploying to plain Kubernetes

Deploy the stack by running the following command:

```sh
cd kubernetes/plain
kubectl create -f ./qlik-core/
```

#### Deploying to Kubernetes with Helm

To deploy kubernetes with Helm,
you must install Helm on the client side and Tiller on the server side.
For information on how to do this,
see [Initialize Helm and install Tiller](https://docs.helm.sh/using_helm/#initialize-helm-and-install-tiller).

Deploy the stack using Helm by running the following command:

```sh
cd kubernetes/helm
helm install ./qlik-core/
```

### Accessing the stack

Once the stack is deployed,
you can retrieve a list of the tasks running on the stack by running the following command:

```sh
kubectl get all
```

You can query Mira to return the list of Qlik Associative Engines it has discovered by calling its `/engines` endpoint:

```sh
curl http://<kubernetes node ip>:9100/v1/engines
```

This endpoint returns one or more Qlik Associative Engine instances and information about these instances in JSON format.

## Deploying to Nomad

!!! Note
  Deploying to Nomad is not officially supported by Qlik Core.

### Prerequisites

You must have a Nomad environment set up. If you need to setup a local environment, see
[Install Nomad](https://www.nomadproject.io/intro/getting-started/install.html).

### Docker Hub credentials

The Docker images that are being used are not public,
so you must add a secret to Nomad to be able to pull these images from Docker Hub.
In this example, we use the Docker auths that is stored when logging into Docker Hub with `docker login`.

!!! Note
    Nomad stores the Docker credentials as plain text.
    To learn more on how Nomad stores these credentials,
    see [here](https://www.nomadproject.io/docs/drivers/docker.html#docker-auth-config).
    To see an example of how the Nomad client can be configured to use local Docker credentials, see [nomad.hcl](https://github.com/qlik-ea/core/blob/master/nomad/nomad.hcl).

### Service discovery

In a Nomad orchestration, Mira uses the DNS mode for service discovery.
A Consul server must be running in the Nomad environment.
Nomad will automatically register services in Consul when deploying the nomad files.
You can find the hostname that Mira should use for discovering Qlik Associative Engine instances
in the task configuration of
[mira.noamd](https://github.com/qlik-ea/core/blob/master/nomad/mira.nomad) file.

### Deploying the stack

Deploy the Nomad stack by running the following commands:

```sh
nomad run ./nomad/mira.nomad
nomad run ./nomad/license-service.nomad
nomad run ./nomad/engine.nomad
```
