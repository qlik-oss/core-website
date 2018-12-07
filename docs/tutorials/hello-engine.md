# Hello Engine

Get started by running the Qlik Associative Engine in a Docker container on your local machine and
communicating with it using [enigma.js](https://github.com/qlik-oss/enigma.js).

## Prerequisites

Clone the
[Get Started](https://github.com/qlik-oss/core-get-started)
Git repository to your local machine. The *Hello* tutorials are located here,
and all commands should be executed from this Git repository.

You must have [Node.js](https://nodejs.org/en/) and npm installed on your local machine.

## Starting the Qlik Associative Engine service

1. Start the Qlik Associative Engine in a Docker container.
    Run the following command in a command shell:

    !!! Note
        Before you deploy, you need to set the `ACCEPT_EULA` environment variable,
        otherwise the Qlik Associative Engine won't start.

    ```bash
    ACCEPT_EULA=yes docker-compose up -d
    ```

    When you run this command, Docker builds the container and leaves it running in the background.
    If successful, you will see a message that creating the container is done.

1. Verify that the dockerized Qlik Associative Engine is running.

    Run the following command in a command shell:

    ```bash
    docker ps -a
    ```

    The `docker ps` command lists the containers that are running.
    The `-a` option lists all containers, even those that are not running.

!!! Note
    You can access the logs for a functional container by running the following command:

```bash
   docker logs <container-id>
```

### What is happening

When you execute the `docker-compose up` command,
Docker builds and starts a Docker container with the services configured in the `docker-compose.yml` file.
The `-d` option keeps the container running in the background.
In this example, Docker builds the container from the `docker-compose.yml` file.
This file is located in the root folder of the Getting Started with Web Platform Git repository.
Open the [docker-compose.yml](https://github.com/qlik-oss/core-get-started/blob/master/docker-compose.yml)
file to see what the compose file looks like.
It specifies how the Qlik Associative Engine runs as a Docker container, using the `qlikcore/engine` Docker image.

!!! Tip
    To learn more about Docker compose files, see [Compose file](https://docs.docker.com/compose/compose-file/).

## Communicating with the Qlik Associative Engine

To communicate with the Qlik Associative Engine in a Docker container, we use a small node.js application that uses
[enigma.js](https://github.com/qlik-oss/enigma.js) to retrieve the Qlik Associative Engine version number.

The application consists of the hello-engine.js file and the package-json file,
which is also shared among the Hello Data and Hello Visualization tutorials.

1. Install dependencies.

    Run the following command in a command shell:

    ```bash
    npm install
    ```

    This command installs all of the dependent packages listed in the package.json file.

1. Run the application.

    Run the following command in a command shell:

    ```bash
    npm run hello-engine
    ```

    This command runs the application, which communicates with Qlik Associative Engine and retrieves the
    Qlik Associative Engine semantic version.
    If successful, you will see a response like the following:

    ```bash
    npm run hello-engine
    Creating and opening session.
    Engine version retrieved: 12.91.0
    Session closed.
    ```

    !!! Tip
        Open the [hello-engine.js](https://github.com/qlik-oss/core-get-started/blob/master/src/hello-engine/hello-engine.js)
        file to see how enigma.js is configured to communicate with the Qlik Associative Engine.

1. Stop and remove the Docker container.

    !!! Note
        To continue with the next tutorial, leave the Docker container running.

    Run the following command from a command shell:

    ```bash
    docker-compose down
    ```

    This command stops the container and removes it.

## Next steps

Continue with the [Hello Data](./hello-data.md) tutorial to learn how to load data into the Qlik Associative Engine.
Hello Data is a continuation of this tutorial.

!!! Tip
    We recommended that you take a look at [enigma.js](https://github.com/qlik-oss/enigma.js) to learn about its many features.
