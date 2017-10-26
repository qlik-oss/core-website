# Mira Local Mode

In _Local_ mode, Mira assumes that all QIX Engine instances run as Docker containers on the `localhost` Docker Engine, without any orchestration platform such as Docker Swarm or Kubernetes. _Local_ mode is enabled by setting the `MIRA_MODE` environment variable to `local` when starting the Mira Docker container.

## Example

Typically, a set of Docker container are started locally using a Docker compose. The file [docker-compose.yml](https://github.com/qlik-ea/mira/blob/master/docker-compose.yml) shows an example of this. It starts one Mira container and two QIX Engine containers.

Assuming the current `docker-compose.yml` exists in the current working directory, run:

```sh
$ docker-compose up -d
```

To verify that Mira discovers the two QIX Engine containers, run:

```sh
$ curl http://localhost:9100/v1/engines
```

## Labeling

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
