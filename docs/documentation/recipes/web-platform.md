# Web Platform Recipe

The purpose of the examples is to show how quick and effortless it is to get started with our web platform
on top of the [QIX Engine](../services/qix-engine.md).

Besides the QIX engine you will also use [enigma.js](https://github.com/qlik-oss/enigma.js) our library to communicate with the QIX Engine,
[halyard.js](https://github.com/qlik-oss/enigma.js) to simplify the loading of data into the QIX Engine
and [picasso.js](https://github.com/qlik-ea/picasso.js) for building the charts.

## GitHub repo

The recipe assets are located [here](https://github.com/qlik-ea/getting-started-with-web-platform).

When running commands presented in this recipe, it is assumed that they are run in that repository.

## Hello World
This example shows how to get the QIX Engine up and running in a docker container, and
how to setup a simple communication.

### Step 1 - Get the QIX Engine up and running
In the first step we focus on getting the QIX Engine up and running. Run the `docker-compose up` command.

```bash
$ cd hello-world
$ docker-compose up
```
The QIX Engine is now running on Linux!

When running `docker-compose up`, it is good practice to run `docker-compose up -d`, where
the `-d` argument means detached mode, that is the container runs in the background.

```bash
$ docker-compose up -d
```

#### What is actually happening
The [compose](docker-compose.yml) file is used to configure the service. In this first step the config is
very simple, we only need to specify the QIX Engine image with vanilla config. When `docker-compose up` is executed,
the image is downloaded and built, and the docker image is run as a docker container using port `9076`. The port
is configurable in the [compose](docker-compose.yml) file with the ports tag, which maps the host port with
the container port, HOST:CONTAINER. To view the image downloaded by docker, run the `docker images` command, which is the command for listing images.

```bash
$ docker images
```

When listing the docker containers, the newly created running container with the QIX Engine image should be listed.
The `-a` option means that all containers are shown, default is to show just the running containers.

```bash
$ docker ps -a
```

### Step 2 - Communicate with the QIX Engine
When the QIX Engine is up and running, it is time for some interaction. Connect to the QIX Engine
and do some basic communication in a Node.js application.

The Node.js application consists of config files and app.js.

[package.json](package.json) contains the relevant metadata and the dependencies.
To connect and communicate with the QIX Engine, a JavaScript library for consuming
Qlik backend services, [enigma.js](https://github.com/qlik-oss/enigma.js), is used.
enigma.js needs to be configured, see [enigma-config.js](enigma-config.js). The port
number for the QIX Engine must be set in the enigma.js config.

[app.js](app.js) is the application entrypoint. It connects to the QIX Engine and asks for the
QIX Engine version, which is printed to the console.

Run `npm install` to download and install the node packages needed for the application (see [package.json](package.json)).

```bash
$ npm install
```

Execute `npm run start` to start the application.

```bash
$ npm run start
```

Look at the console output, the QIX Engine should have replied to your version question.

### Step 3 - Stop the docker container
Run `docker-compose down` to stop and remove the container.

```bash
$ docker-compose down
```

### Troubleshooting

- Error: connect ECONNREFUSED 127.0.0.1:9076.
A connection to the QIX Engine could not be established. Most probably the QIX Engine container is not
up and running. Bring the QIX Engine back up with `docker-compose up -d`.
Make sure that the port in the [compose](docker-compose.yml) file is the same as in the
[enigma-config.js](enigma-config.js).

## Hello Chart
This next example loads data into the QIX Engine, and visualizes it in a simple UI.

### Step 1 - Get the QIX Engine up and running
In this example, two different data sources are used:
+ a local CSV file
+ web data loaded inline

When using local data files, for example CSV files, the data files must be mounted into the docker container running the QIX Engine.

This is done by defining the data volumes in the [docker-compose file](docker-compose.yml). If you are running Docker for Windows, you
need to share the drive where your project is located. This is done in the Docker for Windows settings, see
the [troubleshooting](#troubleshooting) section for more information. To bring the QIX Engine up and running in
a container with mounted data, run docker-compose up.

```bash
$ cd hello-chart
$ docker-compose up -d
```

### Step 2 - Load data and add a simple visualization
This example uses Node.js and AngularJS to create a simple web application.

For data loading, the [halyard.js](https://github.com/qlik-oss/halyard.js) library is used,
a JavaScript library that makes loading data into the QIX Engine more convenient.
[enigma.js](https://github.com/qlik-oss/enigma.js) is used for the QIX Engine communication, and
[picasso](https://github.com/qlik-trial/picasso.js) is used to create visualizations of the data.

In [app.js](src/app.js), the magic happens client side when the page is initialized. Information
about __what__ data to load and __where__ to fetch the data is put into [halyard.js](https://github.com/qlik-oss/halyard.js).
This information is used to create a session app in the QIX Engine. A session app only live as long as the session is alive.

The visualization is created in [scatterplot.js](src/scatterplot.js)

Install the dependencies (see [package.json](package.json)) and run the app with:

```bash
$ npm install
$ npm run start
```

Open your browser and navigate to [http://localhost:8080](http://localhost:8080).

### Troubleshooting

- Error: connect ECONNREFUSED 127.0.0.1:9076.
A connection to the QIX Engine could not be established. Most probably the QIX Engine container is not
up and running. Bring the QIX Engine back up with `docker-compose up -d`.
Make sure that the port in the [compose](docker-compose.yml) file is the same as in the enigma config that
is created in the config object in [app.js](src/app.js).

-  Error: for engine. Cannot create container for service engine: X: drive is not shared. Please share it in Docker for Windows Settings
Shared drives are required for volume mounting Linux containers, and you need to share the drive where your project is
located (i.e., where the Dockerfile and volume are located). Go to Settings -> Shared Drives and share the drive.
