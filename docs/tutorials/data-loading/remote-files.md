# Remote files

In this tutorial, learn how to load data from remote files into Qlik Associative Engine with the built-in
File Connectivity Service.

This tutorial shows an example where data is loaded from data files that are located on Dropbox,
but the solution is similar for loading data from other remote sources, such as Google Drive or Microsoft OneDrive.

## Prerequisites

To follow along in this tutorial, you should have basic understanding of Docker.

You need the following software installed:

* Git
* Docker
* docker-compose
* Node.js

!!! Note
    Shell commands should be run in a Bash shell.
    If you are using Windows, we recommend using Git Bash.

## The File Connectivity Service

The File Connectivity Service is an example of a service that you can use to load data from remote files
in a Qlik Core stack. You can configure this service to provide built-in data connectivity to connect to
[OAuth 2.0](https://oauth.net/2/)-protected data sources like Dropbox, OneDrive, and Google Drive.

The data connection service in this tutorial works by defining a unique HTTP endpoint for each registered
connection provider. The Qlik Associative Engine can then access different data sources by making calls to the
service-defined HTTP endpoints.

## Setup

To run the example code, clone the
[qlik-oss/core-file-connectivity-service](https://github.com/qlik-oss/core-file-connectivity-service) Git repository.
Before you continue, look at the documentation to get familiar with the content and structure of
the repository.

!!!Note
    In your shell, make sure current directory is at the repository root.

First, install the dependencies:

```sh
npm install
```

Next, copy the [data/airports.csv](https://github.com/qlik-oss/core-file-connectivity-service/blob/master/data/airports.csv)
file into your Dropbox root folder.

Now you need to create an OAuth2.0 application by following the Dropbox
[OAuth guide](https://www.dropbox.com/developers/reference/oauth-guide). Copy the _App key_ and _App secret_ as
these are needed in the next steps.

!!! Note
    When you create your application, the `Redirect URI` should be the address of the callback that is running the
    service: `http://[host]:[port]/oauth2/callback`. For example: `http://localhost:3000/v1/oauth2/callback`

Before you start the Docker container, you need to accept the EULA, and you need to set the _App Key_ and _App Secret_
as environment variables so the engine container can communicate with the OAuth2.0 app.

Run the following commands:

```sh
cd examples

ACCEPT_EULA=<yes/no> \
DROPBOX_CLIENT_ID=<Dropbox App key> \
DROPBOX_CLIENT_SECRET=<Dropbox App secret> \
docker-compose up -d --build
```

## Loading data from Dropbox

After you complete the steps above, you can now load data from the file on Dropbox.

Run the following:

```sh
node dropbox.js
```

The expected output printed to the console is a list of 10 airport entries from the
[airports.csv](https://github.com/qlik-oss/core-file-connectivity-service/blob/master/data/airports.csv) file.

## Next steps

More runnable load script examples, including more advanced ones, are available in the
[qlik-oss/core-data-loading](https://github.com/qlik-oss/core-data-loading) Git repository.
