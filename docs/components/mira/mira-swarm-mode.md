### Swarm Mode

In _swarm_ mode, Mira assumes that all engines instances run as Docker Swarm services inside one single Docker Swarm cluster. _Swarm_ mode is set by setting the environment variable `MIRA_MODE` to `swarm` before starting the Mira Docker service.

Mira _must_ be configured to run on a Swarm manager node, since it needs to communicate to a manager Docker Engine.

To start Mira in _swarm_ mode, `docker stack` can be used; for example

```sh
$ docker stack deploy -c ./examples/swarm/docker-compose-swarm.yml --with-registry-auth mira-stack
```

The file [docker-compose-swarm.yml](./examples/swarm/docker-compose-swarm.yml) shows an example of this. It assumed that a Docker Swarm cluster is already created with at least one manager, and that the Docker CLI client is configured to issue commands towards the manager node. All Swarm services in the example file are configured to run on manager nodes.

To remove the stack, run

```sh
$ docker stack rm mira-stack
```

#### Labeling in swarm mode

In _swarm_ mode, Mira assumes that labels are provided on Docker containers. Below is an example extract from a Docker stack file that would cause Mira to discover both Engine replicas as two separate Engine instances of the `engine1` service.

```yaml
version: "3.1"

services:
  mira:
    image: qlikea/mira
    environment:
     - MIRA_MODE=swarm
    ...

  engine1:
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

Labeling outside the `deploy:` scope also has the benefit of that the labeling scheme for _local_ and _swarm_ mode becomes similar.
