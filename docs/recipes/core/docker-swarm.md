# Deploying to Docker Swarm

## Prerequisites

It is assumed that there is already a Docker Swarm cluster set up. If you would like to setup a local environment follow the [Install Docker](https://docs.docker.com/engine/swarm/) guide.

Shell commands given below are assumed to be run in a Bash shell. On Windows, using **Git Bash** is recommended.

Your Docker CLI must be set to issue commands to the swarm manager. This is typically done with:

```sh
$ eval $(docker-machine env <swarm manager node>)
```

## The Stack

### Stack file

The Frontira stack, is specified in the (docker-compose.yml)[./docker-compose.yml] file. The stack consists of one QIX Engine, one Mira, and one License Service service.

### Placement constraints

The only placement constraint is that the mira service is required to run on the swarm manager node, since it needs to communicate with the manager Docker Engine. This is also why `/var/run/docker.sock` is mounted into the service.

### Ports

Mira and the License Service expose their REST APIs on ports `9100` and `9200` respectively. QIX Engine exposes port `9076` which serves the QIX websocket API and port `9090` which serves that Prometheus `/metric` endpoint separately.

Although not strictly necessary, these ports are exposed to the outside of the swarm so that they can be easily accessed for demonstration purposes.

### Labeling

An important thing to note, is the label used on the QIX Engine service:

```yml
labels:
  qix-engine: ""
```

This label is required for Mira to identify the engine service as a QIX Engine instance. The label to use is configurable and more information on this topic can be found in the [documentation](https://github.com/qlik-ea/mira) of Mira.

## Deploying

The stack can be deployed with the following command:

```sh
$ docker stack deploy -c ./docker-compose.yml --with-registry-auth frontira
```

**NOTE**: `--with-registry-auth` is currently needed since the Docker images being used are not public, and credentials are needed to pull them from Docker Hub.

## Accessing

Once the stack is deployed, it should be possible to list the tasks in it:

```sh
$ docker stack ps frontira
```

Also, it should be possible to query Mira to return the list of QIX Engines it has discovered, by accessing its `/engines` endpoint:

```
$ curl http://<swarm manager node ip>:9100/v1/engines
```

This should return JSON content containing one or more QIX Engine instance and information about these instances.
