# Core Recipe

This recipe demonstrates how to deploy a minimal Frontira stack using different orchestration tools. The purpose is to help you get started with Frontira.

It demonstrates a foundation to build full solutions on, where more aspects must also be considered, like authorization, document/data handling, vizualization, logging, monitoring etc. There are other recipes that cover such aspects separately.

## GitHub repo

The recipe assets are located at https://github.com/qlik-ea/core.

When running commands presented in this recipe, it is assumed that they are run in that repository.

## Container Orchestration

This recipe provides examples of deployment of the Frontira core services using the following container orchestration platforms:

- [Docker Swarm](#deploying-to-docker-swarm)
- [Kubernetes](#deploying-to-kubernetes)
- [Nomad](#deploying-to-nomad) (Experimental)

## Services

The core Frontira stack consists of the following services:

- [QIX Engine](../services/qix-engine.md)
- [License Service](../services/license-service.md)
- [Mira](../services/mira.md)

In a typical solution, these are all deployed on the server side.

## Licensing

Since QIX Engine runs under a license model, the examples require licensing configuration to be done. It should be clear in each example, and with the information provided below, how to do this.

**NOTE**: The examples do not yet contain these configuration options since QIX Engine does not yet support it. Examples will be updated as soon as this becomes available.

### Configuring the License Service

The License Service must be provided two environment variables that tells the service which license to use. These are:

- `LEF_SERIAL` - The LEF serial number which identifies the license to use.
- `LEF_CONTROL` - A control number used to validate the LEF serial number.

Both these will be provided by Qlik when receiving license details of the QIX Engine. In a docker-compose file, this could be done like this:

```yml
version: "3.0"
services:
  license-service:
    image: qlikea/license-service:<version>
    ports:
      - 9200:9200
    environment:
      - LEF_SERIAL=<LEF serial number here>
      - LEF_CONTROL=<LEF control number here>
...      
```

### Configuring the QIX Engine

When running, the QIX Engine periodically communicates with the License Service to ensure that it is running under a valid license. QIX Engine deployments must be configured with the URL to use for accessing the Licence Service REST API. This is done by providing the `LicenseServiceURL` command switch to the engine. In a docker-compose file this would typically look like:

```yml
version: "3.0"
services:
  qix-engine:
    image: qlikea/engine:<version>
    ...
    command: -S LicenseServiceURL=license-service:9200
...
```

## Deploying to Docker Swarm

### Prerequisites

It is assumed that there is already a Docker Swarm cluster set up. If you would like to setup a local environment follow the [Install Docker](https://docs.docker.com/engine/swarm/) guide.

Shell commands given below are assumed to be run in a Bash shell. On Windows, using **Git Bash** is recommended.

Your Docker CLI must be set to issue commands to the swarm manager. This is typically done with:

```sh
$ eval $(docker-machine env <swarm manager node>)
```

### The Stack

#### Stack file

The Frontira stack, is specified in the [docker-compose.yml](https://github.com/qlik-ea/core/blob/master/docker-swarm/docker-compose.yml) file. The stack consists of one QIX Engine, one Mira, and one License Service service.

#### Placement constraints

The Mira service is placed on the swarm manager node. It communicates with the manager Docker Engine. This is also why `/var/run/docker.sock` is mounted into the service.

#### Ports

Mira and the License Service expose their REST APIs on ports `9100` and `9200` respectively. QIX Engine exposes port `9076` which serves the QIX websocket API and port `9090` which serves that Prometheus `/metric` endpoint separately.

Although not strictly necessary, these ports are exposed to the outside of the swarm so that they can be easily accessed for demonstration purposes.

#### Labeling

An important thing to note, is the label used on the QIX Engine service:

```yml
labels:
  qix-engine: ""
```

This label is required for Mira to identify the engine service as a QIX Engine instance. The label to use is configurable and more information on this topic can be found in the [documentation](https://github.com/qlik-ea/mira) of Mira.

### Deploying

The stack can be deployed with the following command:

```sh
$ docker stack deploy -c ./docker-compose.yml --with-registry-auth frontira
```

**NOTE**: `--with-registry-auth` is currently needed since the Docker images being used are not public, and credentials are needed to pull them from Docker Hub.

### Accessing

Once the stack is deployed, it should be possible to list the tasks in it:

```sh
$ docker stack ps frontira
```

Also, it should be possible to query Mira to return the list of QIX Engines it has discovered, by accessing its `/engines` endpoint:

```
$ curl http://<swarm manager node ip>:9100/v1/engines
```

This should return JSON content containing one or more QIX Engine instance and information about these instances.


## Deploying to Kubernetes

### Prerequisites

It is assumed that there aleady is a Kubernetes cluster with one or more nodes. If you would like to setup a local single-node environment follow the [Install Minikube](https://kubernetes.io/docs/getting-started-guides/minikube/) guide.

Shell commands given below are assumed to be run in a Bash shell. On Windows, using **Git Bash** is recommended.

It is assumed that **kubectl** is available in the local machine and that it is configured to communicate with the correct Kubernetes API server. Refer to the Kubernetes and Minikube documentation how to do this. When using Minikube this is often done automatically.

### Docker Hub Credentials

Since the Docker images being used are not public you have to add a secret to Kubernetes to be able to pull these images from Docker Hub.

To add this secret to Kubernetes, the command below can be used.

**NOTE**: The leading space character before the kubectl command is intentional. This prevents the command from being entered in the Bash shell command history, which is not desired for commands containing user credentials.

```sh
$  kubectl create secret docker-registry dockerhub --docker-username=<your-name> --docker-password=<your-password> --docker-email=<your-email>
```

### The Stack

The Frontira stack consists of deployments and related services of QIX Engine, Mira, and the License Service.

#### Mira Kubernetes Mode

In the [mira-deployment.yaml](https://github.com/qlik-ea/core/blob/master/kubernetes/plain/frontira/mira-deployment.yaml) file, it is important to note a few things.

Observe that the Mira deployment specifies two containers to run in the pod. This is because Mira needs to communicate with the Kubernetes API server through kubectl as a proxy.

Also note that Mira must be configured to run in Kubernetes mode. This does not happen automatically. To do this, the environment variable `MIRA_MODE` is set to `kubernetes`.

#### Services

`mira` and `license-service`, `engine` are configured services that exposes API ports to the outside of the Kubernetes cluster. Mira and the License Service have their REST APIs on ports `9100` and `9200` respectively. QIX Engine exposes port `9076` which serves the QIX websocket API and port `9090` which serves the Prometheus `/metric` endpoint separately.

Although not strictly necessary, the services are exposed to the outside of the cluster so that they can be easily accessed for demonstration purposes.

#### Labeling

An important thing to note, is the label used on the engine in the [engine-deployment.yaml](https://github.com/qlik-ea/core/blob/master/kubernetes/plain/frontira/engine-deployment.yaml) file:

```yml
metadata:
  labels:
    ...
    qix-engine:
```

This label is required for Mira to identify engine pods as a QIX Engine instances. The label to use is configurable and more information on this topic can be found in the [documentation](https://github.com/qlik-ea/mira) of Mira.

### Deploying

Two types of deployments to Kubernetes are examplified. The first one is the "plain" Kubernetes method, using standard deployments and services. The second one shows how to use [Helm](https://helm.sh/), which provides a powerful way to manage Kubernetes applications.

#### Deploying to plain Kubernetes

```sh
$ cd kubernetes/plain
$ kubectl create -f ./frontira/
```

#### Deploying to Kubernetes with Helm

Helm must be installed on the client side and Tiller on the server side. To enable Tiller follow this [guide](https://docs.helm.sh/using_helm/#initialize-helm-and-install-tiller).

To deploy the stack using Helm, run:

```sh
$ cd kubernetes/helm
$ helm install ./frontira/
```

### Accessing

Once the stack is deployed, it should be possible to list all resources of the deployment with:

```sh
$ kubectl get all
```

Also, it should be possible to query Mira to return the list of QIX Engines it has discovered, by accessing its `/engines` endpoint:

```
$ curl http://<kubernetes node ip>:9100/v1/engines
```

This should return JSON content containing one QIX Engine instance and information about it.

## Deploying to Nomad

**NOTE**: Deploying to Nomad is not officially supported by Frontira.

It is assumed that there is already a Nomad environment set up. If you would like to setup a local enviroment follow the [Install Nomad](https://www.nomadproject.io/intro/getting-started/install.html) guide.

### Secrets

Since the Docker images being used are not public you have to pass Docker credentials when deploying the Nomad stack. In this example we use the Docker auths that is stored when logging into docker hub i.e. `docker login`.

Be aware that the Docker credentials are stored in plain text in Nomad, see [here](https://www.nomadproject.io/docs/drivers/docker.html#docker-auth-config). In [nomad.hcl](https://github.com/qlik-ea/core/blob/master/nomad/nomad.hcl) there is an example of how the Nomad client can be configured to use local docker credentials.

### Service Discovery

Mira uses the DNS mode for service discovery in a Nomad orchestration. This assumes that there is a running Consul server in the Nomad environment. Nomad will automatically register services in Consul when deploying the `nomad` files. The hostname that Mira should use for discovering QIX Engine instances is defined in the task configuration for [Mira](https://github.com/qlik-ea/core/blob/master/nomad/mira.nomad).

### Deploy

Deploy the core stack with the following commands:

```sh
$ nomad run ./nomad/mira.nomad
$ nomad run ./nomad/license-service.nomad
$ nomad run ./nomad/engine.nomad
```
