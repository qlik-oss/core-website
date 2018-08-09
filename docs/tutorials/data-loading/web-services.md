# Loading data from web services

TODO: Short descr (like: Start loading data into your document by working through a data load workflow using OAuth2.0 or the gRPC protocol.)

## Prerequisites

To follow along in this tutorial, you should have basic understanding of Docker.

!!! Note
    In the examples that follow, all shell commands should be run in a Bash shell.
    If you are using Windows, we recommend using Git Bash.

## Accessing data through a connection service

Learn how you can connect to an [OAuth 2.0](https://oauth.net/2/)-protected data source
using the _example_ data-connection service to retrieve and load data.

### File connectivity service

The File Connectivity Service is an example of a service that can be used to load data from
remote files in a Qlik Core stack.
This service can be configured to provide built-in data connectivity to connect to
[OAuth 2.0](https://oauth.net/2/)-protected data sources
like Dropbox, OneDrive, and GoogleDrive.

The data connection service that is used in this tutorial
works by defining a unique HTTP endpoint for each registered connection provider.
The Qlik Associative Engine can then access different data sources by making calls
to the service-defined HTTP endpoints.

Before you start this example, you must clone the
[File Connectivity Service](https://github.com/qlik-oss/core-file-connectivity-service)
Git repository to your local machine.

``` bash
git clone https://github.com/qlik-oss/core-file-connectivity-service.git
```

### Dropbox example

Do the following:

1. Install the dependencies.
    ``` bash
    cd core-file-connectivity-service
    npm install
    ```
1. Copy the [`airports.csv`](https://github.com/qlik-oss/core-file-connectivity-service/blob/master/data/airports.csv)
    file, which is located in the `/data` folder of the `core-file-connectivity-service` repository, and paste
    it into your Dropbox.
1. Create an OAuth2.0 application by following the
    [OAuth guide instructions](https://www.dropbox.com/developers/reference/oauth-guide).

    **Note:** When you create your application, the `Redirect URI`
    should be the address of the callback that is running the service: `http://[host]:[port]/oauth2/callback`.
    For example: `http://localhost:3000/v1/oauth2/callback`

1. Start the Docker container, ensure that you set the proper
    credentials in the environment variables prefixing the
    multi-lined `docker-compose` command below.
    ```bash
    cd examples
    ACCEPT_EULA=yes \
    DROPBOX_CLIENT_ID="your App key" \
    DROPBOX_CLIENT_SECRET="your App secret" \
    docker-compose up -d --build
    ```
1. Run the `dropbox.js` application.
    ```bash
    node dropbox.js
    ```
    It should output the 10 lines of the [`airports.csv`](https://github.com/qlik-oss/core-file-connectivity-service/blob/master/data/airports.csv)
        to the console window.

The workflow for loading data from GoogleDrive and OneDrive is similar to the example above,
and loading data from these data sources is supported by the
[File Connectivity Service](https://github.com/qlik-oss/core-file-connectivity-service).
