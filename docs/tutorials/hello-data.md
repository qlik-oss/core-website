# Hello Data

This example shows how to load and retrieve user data in QIX Engine running in a Docker container. It extends the
[Hello Engine](./hello-engine.md) example.

[halyard.js](https://github.com/qlik-oss/halyard.js) is used to load data into QIX Engine. halyard.js provides
convenient functionality for building custom solutions on Frontira and QIX Engine.

As in the Hello Engine example, [enigma.js](https://github.com/qlik-oss/enigma.js) is used to communicate with QIX
Engine.

## GitHub Repository

The Hello Data example is located on [GitHub](https://github.com/qlik-ea/getting-started-with-web-platform).

When running this example, it is assumed that the repository is cloned to the local machine and that commands and
actions are performed in that repository.

## Making Data Available to QIX Engine

Before starting the QIX Engine container, first check that no old QIX Engine containers are running. Then start the QIX
Engine container for this example with:

```bash
docker-compose up -d
```

The
[docker-compose.yml](https://github.com/qlik-ea/getting-started-with-web-platform/blob/master/docker-compose.yml)
file contains a volumes section:

```yml
volumes:
  - ./data:/data
```

this makes the
[movies.csv](https://github.com/qlik-ea/getting-started-with-web-platform/blob/master/hello-data/data/movies.csv) file
available to QIX Engine running in the container. This file contains the user data that is loaded into QIX Engine and
then later retrieved.

## Loading and Retrieving Movies Data with QIX Engine

When starting the QIX Engine container in the previous step, the CSV file with data on popular movies becomes accessible
to QIX Engine, but no data is yet loaded into QIX Engine. QIX Engine must use _load scripts_ with actions specifying how
to do this. This can be rather complex, and here [halyard.js](https://github.com/qlik-oss/halyard.js) provides simple
and powerful features to help.

The `hello-data` Node.js application uses [halyard.js](https://github.com/qlik-oss/halyard.js) to create a
representation of the data and load it into QIX Engine as a part of opening a session. This is handled conveniently
using the enigma.js _mixin_ support.

As the next step, enigma.js is used to create a session object that holds the 10 first movie titles in the data model,
now present in QIX Engine memory. The titles retrieved are printed and then the session is closed.

The `hello-data` application consists of a single JavaScript file,
[hello-data.js](https://github.com/qlik-ea/getting-started-with-web-platform/blob/master/hello-data/hello-data.js)
, and the shared
[package.json](https://github.com/qlik-ea/getting-started-with-web-platform/blob/master/package.json) file.

To run and observe the listed movie titles:

```bash
$ npm install
$ npm run hello-data

Creating table data representation.
Creating and opening session using mixin.
Creating session object with movie titles.
Listing the 10 first movies:
2012
Armageddon
Avatar
Battleship
Cars 2
Cleopatra
Evan Almighty
Green Lantern
Harry Potter and the Half-Blood Prince
Indiana Jones and the Kingdom of the Crystal Skull
Session closed.
```

Study the
[hello-data.js](https://github.com/qlik-ea/getting-started-with-web-platform/blob/master/hello-data/hello-data.js)
file and observe how halyard.js and enigma.js are used together to load and retrieve data with QIX Engine.

## Hypercubes

As can be observed in the example source code, some intricate details of QIX Engine are exposed. For example,
the `properties` object used to create the session object contains a field called `qHyperCubeDef`. This relates to the
central concept of _hypercubes_ in QIX Engine.

Users not familiar with hypercubes are encouraged to learn more about them in the
[Hypercube](http://help.qlik.com/en-US/sense-developer/Subsystems/Platform/Content/Concepts/Hypercubes.htm)
help section of the Qlik Sense product.

## Next Steps

In this example, it was shown how to load and retrieve data with QIX Engine. In the
[Hello Visualization](./hello-visualization.md) tutorial the same concepts are built upon to provide a visualization of
the same data set.

It is also recommended to get a closer look at [enigma.js](https://github.com/qlik-oss/enigma.js) and
[halyard.js](https://github.com/qlik-oss/enigma.js), and the full range of features in these libraries.
