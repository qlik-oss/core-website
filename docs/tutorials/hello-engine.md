# Hello Engine

This example shows how to get QIX Engine running in a Docker container on the local machine and how to set up simple
communication with it.

[enigma.js](https://github.com/qlik-oss/enigma.js) is used to communicate with QIX Engine through its JSON-RPC over
websocket API. It is recommended to use enigma.js when building custom solutions on Frontira and QIX Engine.

## GitHub Repository

The Hello Engine example is located on [GitHub](https://github.com/qlik-ea/getting-started-with-web-platform).

When running this example, it is assumed that the repository is cloned to the local machine and that commands and
actions are performed in that repository.

## Starting QIX Engine in a Docker Container

```bash
docker-compose up -d
```

QIX Engine is now running as a Docker container!

Using `docker-compose` is a convenient way to get containers up and running. The root folder contains the
[docker-compose.yml](https://github.com/qlik-ea/getting-started-with-web-platform/blob/master/docker-compose.yml)
file that describes how QIX Engine shall run as a container, using the `qlik/engine` Docker image, and exposing port
9076 on the local machine.

Study the
[docker-compose.yml](https://github.com/qlik-ea/getting-started-with-web-platform/blob/master/docker-compose.yml)
file and refer to the Docker documentation for more information on how `docker-compose` works.

Verify that one Docker container with QIX Engine is running with:

```bash
docker ps
```

This should list a container running with the `qlik/engine` image (possibly with other Docker containers started on the
local machine).

## Communicating with QIX Engine

QIX Engine running as a Docker container is not useful unless there is a way to communicate with it. The `hello-engine/`
folder contains a small Node.js application, `hello-engine`, that uses enigma.js to retrieve the version of QIX Engine.
enigma.js is of course capable of much more, but this gives a good introduction.

The `hello-engine` application consists of a single JavaScript file,
[hello-engine.js](https://github.com/qlik-ea/getting-started-with-web-platform/blob/master/hello-engine/hello-engine.js)
, and the
[package.json](https://github.com/qlik-ea/getting-started-with-web-platform/blob/master/package.json) file,
which is shared with `hello-data` and `hello-visualization` applications.

To run and observe the output that includes the QIX Engine version:

```bash
$ npm install
$ npm run hello-engine

Creating and opening session.
Engine version retrieved: 12.91.0
Session closed.
```

Study the
[hello-engine.js](https://github.com/qlik-ea/getting-started-with-web-platform/blob/master/hello-engine/hello-engine.js)
file and observe how enigma.js is configured to communicate to the QIX Engine on port 9076.

## Next Steps

The [Hello Data](./hello-data.md) example builds on this example, by showing how user data can be loaded into QIX
Engine.

It is also recommended to get a closer look at [enigma.js](https://github.com/qlik-oss/enigma.js) and its full range of
features.
