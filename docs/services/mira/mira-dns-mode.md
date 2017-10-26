# Mira DNS mode

In _DNS_ mode Mira resolves by hostname, and uses all returned IP addresses it finds to fetch additional QIX Engine instance data. _DNS_ mode is enabled by setting the environment variable `MIRA_MODE` to `dns`.

## Hostname Configuration

In the _DNS_ mode there is no need to set labels on QIX Engine instances. Instead, the hostname used to resolve QIX Engine instances must be set using the `MIRA_DISCOVERY_HOSTNAME` environment variable.

## Example

An example how this could be configured in a Docker Swarm environment can be found in the file [docker-compose-dns.yml](https://github.com/qlik-ea/mira/blob/master/examples/dns/docker-compose-dns.yml).

Note the environment variables used to set the _DNS_ mode and the hostname used to identify QIX Engine instances, which correspond to the service name `qix-engine` given and how Docker Swarm, by default, assigns DNS names to services.

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
