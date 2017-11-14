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

The
[docker-compose.yml](https://github.com/qlik-ea/getting-started-with-web-platform/blob/master/docker-compose.yml)
file contains a volumes section:

```yml
volumes:
  - ./data:/data
```

this makes the
[movies.csv](https://github.com/qlik-ea/getting-started-with-web-platform/blob/master/data/movies.csv) file
available to QIX Engine running in the container.
This file contains part of the user data that is loaded into QIX Engine and
then later visualized using [picasso.js](https://github.com/qlik-ea/picasso.js).
The other data is web data which is loaded inline.

## Load the data and add a simple visualization

This example uses AngularJS and [picasso.js](https://github.com/qlik-ea/picasso.js)
to create a simple web application with visualization of movie data.

In [app.js](https://github.com/qlik-ea/getting-started-with-web-platform/blob/master/src/hello-visualization/app.js) information
about __what__ data to load and __where__ to fetch the data is put into [halyard.js](https://github.com/qlik-oss/halyard.js).
This information is then used to create and populate a session app in the QIX Engine using
[enigma.js](https://github.com/qlik-oss/enigma.js) and `halyard`.
A session app only live as long as the session is alive.

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
Next steps is the full minimal frontira setup which can be found in the [Core example](./core.md)

It is also recommended to get a closer look at [enigma.js](https://github.com/qlik-oss/enigma.js),
[halyard.js](https://github.com/qlik-oss/enigma.js), [picasso.js](https://github.com/qlik-ea/picasso.js)
and the full range of features in these libraries.
