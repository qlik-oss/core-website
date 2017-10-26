### Kubernetes Mode

In _kubernetes_ mode, Mira assumes that all engine instances are run as Kubernetes pods and that the engines are exposed as Kubernetes services with _named_ ports. _Kubernetes_ mode is set by setting the `MIRA_MODE` environmentvariable to `kubernetes` before starting the Mira pod.

Since Mira needs to communicate with the Kubernetes API server, a `kubectl` proxy should be set up in the Kubernetes deployment. A convenient way to do this is to bundle the `kubectl` proxy as a container in the same pod as the Mira container. In this way, Mira can reach the proxy on `localhost`.

In order to deploy Mira and QIX Engine instances to Kubernetes, it is assumed that a Kubernetes cluster exists and is configured properly. The quickest way to do this for development purposes is to use `minikube`. See the [Minikube Mini Tutorial](./doc/MINIKUBE_MINI_TUTORIAL.md) for a quick guide on how to set up a local cluster on your dev machine. After that it should be possible to successfully issue the deployment commands as follows.

To start Mira in _kubernetes_ mode, the `kubectl` command line tool can be used. Preferably, a Kubernetes deployment YAML file is used; for example

```sh
$ kubectl apply -f mira-deployment.yml
```

The file [mira-deployment.yml](./examples/kubernetes/mira-deployment.yml) shows an example. Note how the deployment also bundles the `kubectl` proxy into the same pod. Since Kubernetes must be able to pull Docker images, the deployment file assumes that Kubernetes is configured with Docker Hub registry credentials in a secret named `dockerhub`.

Normally the Mira REST API shall also be exposed as a service. Preferably, this can also be done by applying the service configuration as a YML file; for example

```sh
$ kubectl apply -f mira-service.yml
```

The file [mira-service.yml](./examples/kubernetes/mira-service.yml) show an example of this where Mira's default port 9100 is exposed outside the cluster as port 31000 (using the `NodePort` type). Assuming `minikube` is used to create the cluster, the Mira health check should now be possible to reach.

```sh
$ curl http://$(minikube ip):31000/v1/health
```

In order for Mira to discover QIX Engine instances in the cluster, a Kubernetes deployment file can also be used.

```sh
$ kubectl apply -f engine-deployment.yml
```

The file [engine-deployment.yml](./examples/kubernetes/engine-deployment.yml) shows an example of a deployment of two engine pod replicas. However, this is not enough for Mira to be able to discover the two engine instances. For this to happen, the engines need to be exposed as services with named ports. For example

```sh
$ kubectl apply -f engine-service.yml
```

The file [engine-service.yml](./examples/kubernetes/engine-service.yml) show as example of how the engine pods are exposed as a service with a named port, `qix`. Each engine replica will appear in the _endpoints_ object that will be related to the service and Mira uses this information to list the engine instances. This list should now be possible to retrieve with

```sh
$ curl http://$(minikube ip):31000/v1/engines
```

Note that the example files here only provide a minimal setup in order to get Mira up and running with Kubernetes. In a production deployment, many other aspects must be considered.

#### Labeling in kubernetes mode

In _kubernetes_ mode, Mira assumes that the discovery label is provided on pods hosting Engine containers. Below is an example extract from a Kubernetes deployment file for two Engine replicas where the label is set up so that Mira can discover them both.

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