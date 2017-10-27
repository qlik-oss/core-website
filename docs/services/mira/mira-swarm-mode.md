# Mira Swarm Mode

In _Swarm_ mode, Mira assumes that all QIX Engine instances run as Docker Swarm services inside one single Docker Swarm cluster. _Swarm_ mode is enabled by setting the environment variable `MIRA_MODE` to `swarm` before starting the Mira Docker service.

Mira _must_ be configured to run on a Swarm manager node, since it needs to communicate to a manager Docker Engine.

## Example

The file [docker-compose-swarm.yml](https://github.com/qlik-ea/mira/blob/master/examples/swarm/docker-compose-swarm.yml) shows an example of how Mira can be started in Swarm mode, together with a QIX Engine instance that is labeled so that Mira will discover it. It assumed that a Docker Swarm cluster is already created with at least one manager, and that the Docker CLI client is configured to issue commands towards the manager node.

To deploy Mira and QIX Engine in a stack named `mira-stack`, run:

```sh
$ docker stack deploy -c docker-compose-swarm.yml mira-stack
```

To remove the stack, run:

```sh
$ docker stack rm mira-stack
```

## Labeling

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
