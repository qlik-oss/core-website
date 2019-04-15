# Hello Data

Load data into and retrieve data from the Qlik Associative Engine running in a Docker container.

## Prerequisites

Clone the
[Get Started](https://github.com/qlik-oss/core-get-started)
Git repository to your local machine. The *Hello* tutorials are located here,
and all commands should be executed from this Git repository.

You must have [Node.js](https://nodejs.org/en/) and npm
installed on your local machine.

!!! Note
    Make sure the Qlik Associative Engine is running. Run `docker-compose up -d`
    command in a command shell to start the engine in a Docker container.
    If you are unfamiliar with starting the Qlik Associative Engine in a Docker container, we
    recommend that you begin with the [Hello Engine](./hello-engine.md) tutorial.

## Loading and retrieving data

To load and retrieve data, you will run a small Node.js application
that loads data into, and then retrieves that data from the Qlik Associative Engine.

The application consists of the `hello-data.js` file and the `package.json`
file, which is also shared among the Hello Data and
Hello Visualization tutorials.

1. Install dependencies.

    !!! Note
        If you already installed the dependencies in the previous tutorial, go to step 2.

    Run the following command from a command shell:

    ```bash
    npm install
    ```

    This command installs all of the dependent packages
    in the `package.json` file.

1. Run the application.

    Run the following command in a command shell:

    ```bash
    npm run hello-data
    ```

    This command runs the application, which creates a representation
    of the data and loads it into Qlik Associative Engine as a part of opening a session.

### What is happening

When you start Qlik Associative Engine, the `docker-compose.yml` file makes the `movies.csv` file
available to Qlik Associative Engine, and the data location is specified in the volumes section.

```yml
volumes:
  - ./data:/data
```

!!! Tip
    To learn more about volumes, see
    [Use volumes](https://docs.docker.com/engine/admin/volumes/volumes/).

To load data, the `hello-data` application executes a _load script_ in Qlik Associative Engine that loads data
from a `movies.csv` file available to the engine on the local file system. enigma.js is used to open a session and
create a session object that holds the first 10 movie titles. The application then retrieves the movie titles from the
dataset, prints the results, and closes the session.

If the application runs successfully, you will see the list of 10 movies from the dataset.

```bash
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

!!! Tip
    Open the [`hello-data.js`](https://github.com/qlik-oss/core-get-started/blob/master/src/hello-data/hello-data.js)
    file to inspect how the load script and enigma.js are used to load and retrieve data from the
    Qlik Associative Engine.

!!! Note
    You might see some unfamiliar details of the Qlik Associative Engine in the source code.
    For example, the `properties` object that is used to create the session object contains a field called
    `qHyperCubeDef`. This relates to the central concept of _hypercubes_ in the Qlik Associative Engine.
    To learn more about hypercubes, see
    [Hypercubes](https://help.qlik.com/en-US/sense-developer/Subsystems/Platform/Content/Sense_PlatformOverview/Concepts/Hypercubes.htm).

## Using halyard.js

In the example above, the _hello-data_  application executes a load script that specifies how data from a CSV file is
loaded into Qlik Associative Engine.

Rather than directly using a load script, you can use the [halyard.js](https://github.com/qlik-oss/halyard.js) library,
which provides a convenient way to do similar data loading tasks without the need to write load scripts because
halyard.js generates them for you.

Here is an equivalent implementation of the _hello data_ example, but now using halyard.js instead.

Run the following command:

```bash
npm run hello-data-halyard
```

You should see output similar to the previous example, with the 10 first movie titles printed.

### What is happening

In this example, the load script is now replaced by a halyard.js table representation of the data, which is used to load
data into the Qlik Associative Engine as part of opening a session. Then, it uses enigma.js _mixin_ support to create a
session object that holds the first 10 movie titles from the `movies.csv` dataset. The application then retrieves the
movie titles from the dataset, prints the results, and closes the session, just as in the previous example.

!!! Tip
    Open the
    [`hello-data-halyard.js`](https://github.com/qlik-oss/core-get-started/blob/master/src/hello-data/hello-data-halyard.js)
    file to inspect how halyard.js and enigma.js are used to load and retrieve data from the Qlik Associative Engine.

## Next steps

Continue with the [Hello Visualization](./hello-visualization.md) tutorial
to learn how to display the data that you loaded in this tutorial as a scatter plot.

!!! Tip
    To learn more about the libraries that are used in this tutorial,
    we recommend that you take a look at [enigma.js](https://github.com/qlik-oss/enigma.js) and
    [halyard.js](https://github.com/qlik-oss/halyard.js) to learn about their many features.
