# Deploying to Nomad

**NOTE**: Deploying to Nomad is not officially supported by Frontira.

It is assumed that there is already a Nomad environment set up. If you would like to setup a local enviroment follow the [Install Nomad](https://www.nomadproject.io/intro/getting-started/install.html) guide.

## Secrets

Since the Docker images being used are not public you have to pass Docker credentials when deploying the Nomad stack. In this example we use the Docker auths that is stored when logging into docker hub i.e. `docker login`.

Be aware that the Docker credentials are stored in plain text in Nomad, see [here](https://www.nomadproject.io/docs/drivers/docker.html#docker-auth-config). In [nomad.hcl](./nomad.hcl) there is an example of how the Nomad client can be configured to use local docker credentials.

## Privileged mode

Mira uses docker.sock to discover QIX Engine instances and in Nomad this requires a `privileged` mode set to true. This is configured in the nomad client config [nomad.hcl](./nomad.hcl) as well as in the task config for [Mira](./mira.nomad).

## Deploy

Deploy the core stack with the following commands:

```sh
$ nomad run ./nomad/mira.nomad
$ nomad run ./nomad/license-service.nomad
$ nomad run ./nomad/engine.nomad
```
