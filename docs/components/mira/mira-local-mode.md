### Local Mode

In _local_ mode, Mira assumes that all engine instances run as Docker containers on the `localhost` Docker Engine, without any orchestration platform such as Docker Swarm or Kubernetes. _local_ mode is set by setting the `MIRA_MODE` environment variable to `local` when starting the Mira Docker container or starting the Node.js process.

The recommended way to start Mira in _local_ mode is through a `docker-compose` file; for example

```sh
$ docker-compose up -d
```

The file [docker-compose.yml](./docker-compose.yml) shows an example of this. It starts one Mira container and two engine containers. To verify that Mira discovers the engines, do

```sh
$ curl http://localhost:9100/v1/engines
```

which shall list two engine containers in JSON format.

#### Labeling in local mode

In _local_ mode, Mira assumes that labels are provided on Docker containers. Below is an example extract from a Docker compose file with all labels applicable to Mira present.

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

- The `qix-engine` label tells Mira that `engine1` is a QIX Engine container.
- The `qix-engine-api-port` tells Mira that the QIX API is exposed on port `9076` (the default). Omitting this label is possible, in which case Mira defaults to `9076`.
- The `qix-engine-metrics-port` tells Mira that the `/metrics` port is exposed on port `9090` (the default). Omitting this labels is possible, in which case Mira defaults to `9090`.