# Hello Visualization

Build a data visualization from data loaded into a QIX Engine running inside a Docker container.

## Prerequisites

Clone the [Getting Started with Web Platform](https://github.com/qlik-ea/getting-started-with-web-platform) Git repository
to your local machine. The *Hello* tutorials are located here, and all commands should be executed from this Git repository.

You must have [Node.js](https://nodejs.org/en/) and npm installed on your local machine.

**Note:** Make sure the QIX Engine is running and that you have loaded data into the QIX Engine.
If you are unfamiliar with starting the QIX Engine in a Docker container and loading data,
we recommend that you begin with the [Hello Engine](./hello-engine.md) tutorial followed by the
[Hello Data](./hello-data.md) tutorial.

## Building a visualization

To build a visualization, you will run a small Node.js application
that creates a visualization from the data loaded into your dockerized QIX Engine.

1. Install dependencies.

    **Note:** If you already installed the dependencies in the previous tutorial, go to step 2.

    Run the following command from a command shell:

    ```bash
    npm install
    ```

    This command installs all of the dependent packages in the `package.json` file.

1. Run the application.

    Run the following command from a command shell:

    ```bash
    npm run hello-visualization
    ```

    This command runs the application, which contains information on where to fetch the data and which data to load.
    This information is then used to create and populate a session app.

1. Open the visualization in a browser.

    Open a browse and navigate to [http://localhost:8080](http://localhost:8080) to view the data in a scatter plot.

    If the application runs successfully,
    you will see that the visualization is deployed to localhost:8080
    and you will receive a message that the webpack has compiled successfully.

## What is happening

When you run `Hello Visualization`, app.js creates and populates a session app
from the data that is available to the QIX Engine using enigma.js
to communicate with the engine and halyard.js to manage the data.
A session app only lives while the session is alive.

**Tip:** We recommend that you take a look at [picasso.js](https://github.com/qlik-oss/picasso.js),
a charting library that is streamlined for building visualizations with Qlik Core.
You can also open the `app.js` file to see how enigma.js and halard.js are used
to load and retrieve the movies data from the engine.

## Next Steps

Now that you have seen how to start the QIX Engine in a Docker container,
load data, and build a visualization from that data,
we recommend that you explore the [Orchestration](./orchestration.md) tutorial,
which shows how to run all core services of Qlik Core together.
This will cover important topics such as how to run several QIX Engine instances using
different container orchestration platforms.
