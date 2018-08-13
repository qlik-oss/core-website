# Remote files

In this tutorial, learn how to load data from remote files into Qlik Associative Engine with the built-in
web file connectivity service.

In this tutorial, the data files are located on Dropbox, but the solution is similar for loading data from other remote
sources, such as Google Drive or Microsoft OneDrive.

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

## The file connectivity service

The File Connectivity Service is an example of a service that can be used to load data from remote files in a Qlik Core
stack. This service can be configured to provide built-in data connectivity to connect to
[OAuth 2.0](https://oauth.net/2/)-protected data sources like Dropbox, OneDrive, and GoogleDrive.

The data connection service that is used in this tutorial works by defining a unique HTTP endpoint for each registered
connection provider. The Qlik Associative Engine can then access different data sources by making calls to the
service-defined HTTP endpoints.

## Setup

To run the example code, clone the
[qlik-oss/core-file-connectivity-service](https://github.com/qlik-oss/core-file-connectivity-service) Git repository.
Check out the repo documentation to get familiar with the content and structure.

In your shell, make sure current directory is at the repo root. Then, install dependencies:

```sh
npm install
```

Next, copy the [data/airports.csv](https://github.com/qlik-oss/core-file-connectivity-service/blob/master/data/airports.csv)
file into your Dropbox root folder.

You will now need to create an OAuth2.0 application by following the Dropbox
[OAuth guide](https://www.dropbox.com/developers/reference/oauth-guide). Find the _App key_ and _App secret_.
These are needed in the next steps.

!!! Note
    When you create your application, the `Redirect URI` should be the address of the callback that is running the
    service: `http://[host]:[port]/oauth2/callback`. For example: `http://localhost:3000/v1/oauth2/callback`

Start the Docker container by setting `ACCEPT_EULA`, `DROPBOX_CLIENT_ID`, and `DROPBOX_CLIENT_SECRET` as applicable
and run:

```sh
cd examples

ACCEPT_EULA=<yes/no> \
DROPBOX_CLIENT_ID=<Dropbox App key> \
DROPBOX_CLIENT_SECRET=<Dropbox App secret> \
docker-compose up -d --build
```

## Loading data from Dropbox

Once the previous setup steps have been completed, everything is prepared to actually load data from the file located on
Dropbox.

```sh
node dropbox.js
```

The expected output is that 10 airport entries from the
[airports.csv](https://github.com/qlik-oss/core-file-connectivity-service/blob/master/data/airports.csv) file is printed
to the console window.
