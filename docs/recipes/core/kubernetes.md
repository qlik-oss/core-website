## Deploying to Kubernetes

## Prerequisites

It is assumed that there aleady is a Kubernetes cluster with one or more nodes. If you would like to setup a local single-node environment follow the [Install Minikube](https://kubernetes.io/docs/getting-started-guides/minikube/) guide.

Shell commands given below are assumed to be run in a Bash shell. On Windows, using **Git Bash** is recommended.

It is assumed that **kubectl** is available in the local machine and that it is configured to communicate with the correct Kubernetes API server. Refer to the Kubernetes and Minikube documentation how to do this. When using Minikube this is often done automatically.

## Docker Hub Credentials

Since the Docker images being used are not public you have to add a secret to Kubernetes to be able to pull these images from Docker Hub.

To add this secret to Kubernetes, the command below can be used.

**NOTE**: The leading space character before the kubectl command is intentional. This prevents the command from being entered in the Bash shell command history, which is not desired for commands containing user credentials.

```sh
$  kubectl create secret docker-registry dockerhub --docker-username=<your-name> --docker-password=<your-password> --docker-email=<your-email>
```

## The Stack

The Frontira stack consists of deployments and related services of QIX Engine, Mira, and the License Service.

### Mira Kubernetes Mode

In the [deployment](./plain/frontira/mira-deployment.yml) of Mira it is important to note a few things.

Observe that the Mira deployment specifies two containers to run in the pod. This is because Mira needs to communicate with the Kubernetes API server through kubectl as a proxy.

Also note that Mira must be configured to run in Kubernetes mode. This does not happen automatically. To do this, the environment variable `MIRA_MODE` is set to `kubernetes`.

### Services

`mira` and `license-service`, `engine` are configured services that exposes API ports to the outside of the Kubernetes cluster. Mira and the License Service have their REST APIs on ports `9100` and `9200` respectively. QIX Engine exposes port `9076` which serves the QIX websocket API and port `9090` which serves that Prometheus `/metric` endpoint separately.

Although not strictly necessary, the services are exposed to the outside of the cluster so that they can be easily accessed for demonstration purposes.

### Labeling

An important thing to note, is the label used on the [QIX Engine deployment](./plain/frontira/engine-deployment.yml):

```yml
metadata:
  labels:
    ...
    qix-engine:
```

This label is required for Mira to identify engine pods as a QIX Engine instances. The label to use is configurable and more information on this topic can be found in the [documentation](https://github.com/qlik-ea/mira) of Mira.

## Deploying

Two types of deployments to Kubernetes are examplified. The first one is the "plain" Kubernetes method, using standard deployments and services. The second one shows how to use [Helm](https://helm.sh/), which provides a powerful way to manage Kubernetes applications.

### Deploying to plain Kubernetes

```sh
$ cd kubernetes/plain
$ kubectl create -f ./frontira/
```

### Deploying to Kubernetes with Helm

Helm must be installed on the client side and Tiller on the server side. To enable Tiller follow this [guide](https://docs.helm.sh/using_helm/#initialize-helm-and-install-tiller).

To deploy the stack using Helm, run:

```sh
$ cd kubernetes/helm
$ helm install ./frontira/
```

## Accessing

Once the stack is deployed, it should be possible to list all resources of the deployment with:

```sh
$ kubectl get all
```

Also, it should be possible to query Mira to return the list of QIX Engines it has discovered, by accessing its `/engines` endpoint:

```
$ curl http://<kubernetes node ip>:9100/v1/engines
```

This should return JSON content containing one QIX Engine instance and information about it.
