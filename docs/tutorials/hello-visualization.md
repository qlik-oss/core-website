# Hello Visualization

This example shows how to visualize data in a QIX Engine running inside a Docker container. It extends the
[Hello Data](./hello-data.md) example.

[picasso.js](https://github.com/qlik-ea/picasso.js) is used to build the visualizations.

As in the Hello Data example, [enigma.js](https://github.com/qlik-oss/enigma.js) is used to communicate with QIX
Engine and [halyard.js](https://github.com/qlik-oss/halyard.js) is used to load data into QIX Engine.

## GitHub Repository

The Hello Visualization example is located on [GitHub](https://github.com/qlik-ea/getting-started-with-web-platform).

When running this example, it is assumed that the repository is cloned to the local machine and that commands and
actions are performed in that repository.

## Start and make data available to QIX Engine

Unless QIX Engine is already running from the [Hello Data](./hello-data.md) example, start it with with:

```bash
docker-compose up -d
```

This makes the same movie data available to QIX Engine as in the
[Hello Data](./hello-data.md) example.

## Load and Visualize Data

This example uses [AngularJS](https://angularjs.org/) and [picasso.js](https://github.com/qlik-ea/picasso.js)
to create a simple web application with visualization of movie data.

In [app.js](https://github.com/qlik-ea/getting-started-with-web-platform/blob/master/src/hello-visualization/app.js) information
about __what__ data to load and __where__ to fetch the data is put into [halyard.js](https://github.com/qlik-oss/halyard.js).
This information is then used to create and populate a session app in QIX Engine using
[enigma.js](https://github.com/qlik-oss/enigma.js) and
[halyard.js](https://github.com/qlik-oss/halyard.js).
A session app only livev as long as the session is alive.

The visualization is created in [scatterplot.js](src/scatterplot.js)

Install the dependencies (see [package.json](https://github.com/qlik-ea/getting-started-with-web-platform/blob/master/package.json))
and run the app with:

```bash
npm install
npm run hello-visualization
```

Open your browser and navigate to [http://localhost:8080](http://localhost:8080).

## Next Steps

In this example, it was shown how to load and visualize data with QIX Engine and Picasso.
Next steps is the [Core](./core.md) frontira setup, consisting of [QIX Engine](../documentation/services/qix-engine.md)
, [Mira](../documentation/services/mira.md), our QIX Engine discovery service
and a [License Service](../documentation/services/license-service.md).
This next tutorual can be found in the [Core example](./core.md)

It is also recommended to get a closer look at [enigma.js](https://github.com/qlik-oss/enigma.js),
[halyard.js](https://github.com/qlik-oss/enigma.js), [picasso.js](https://github.com/qlik-ea/picasso.js)
and the full range of features in these libraries.
