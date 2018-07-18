# Analytical Connector API

The Analytical Connector API in Qlik Associative Engine is based on gRPC. If you are new
to gRPC we recommend that you [read their documentation](https://grpc.io/docs/).

With analytic connections you are able to integrate external analysis with your business discovery.
An analytic connection extends the expressions you can use in load scripts and charts
by calling an external calculation engine (when you do this, the calculation engine acts as a server-side extension (SSE)).
For example, you could create an analytic connection to R, and use statistical expressions when you load the data.

An overview of the protocol and more details can be found in the Github repository for [Server Side Extension](https://github.com/qlik-oss/server-side-extension/blob/master/docs/README.md).

## API Specification

The Analytical Connector API is documented [here](./analytical-connector-api.md).

## Analytical Connector Examples

There are a number of examples created for different programming languages available [here](https://github.com/qlik-oss/server-side-extension/tree/master/examples).

## How to configure an Analytical Connector in Qlik Core

An Analytical Connector is configured by providing command line parameters to the Qlik Associative Engine
using the `SSEPlugin` parameter.
How to provide a command line parameter to Qlik Associative Engine is described [here](../../introduction.md#command-line-parameters).

The `SSEPlugin` parameter takes a comma-separated list of configuration elements in the format `<PluginName>,<Address>[,<PathToCertFile>,<RequestTimeout>,<ReconnectTimeout>]`.
The elements within the brackets are optional.

- **PluginName** Mapping/alias to the plugin that will be used from within the expressions in the app using the plugin functions,
    for example, SSEPython for a Python plugin.
- **Address** colon-separated list with two elements `<Host>:<Port>`.
    - **Host** DNS name (or IP-adress) of the plugin.
    If the plugin is running in a container this will typically be the service name.
    Please note that _localhost_ will not be accessible for a Qlik Associative Engine running as a docker container.
    If you want to use an Analytical Connector running on the host e.g for development purpose,
    please see these [instructions](https://docs.docker.com/docker-for-mac/networking/#i-want-to-connect-from-a-container-to-a-service-on-the-host).
    - **Port** Port on which the plugin listens.
- **PathToCertFile** File system path to folder containing client certificates required for secure communication
    with the plugin. Optional. If omitted, insecure communication will be invoked.
    This path just points to the folder where the certificates are located.
    You have to make sure that they are actually copied to that folder.
    The names of the three certificate files must be the following: root_cert.pem, sse_client_cert.pem, sse_client_key.pem.
    Only mutual authentication (server and client authentication) is allowed.
- **RequestTimeout** Integer (seconds). Optional. Default value is 0 (infinite). Timeout for message duration.
- **ReconnectTimeout** Integer (seconds). Optional. Default value is 20 (seconds).
    Time before the client tries to reconnect to the plugin after the connection to the plugin was lost.

### Configuration Examples

- Example where one SSE plugin server is defined: `SSEPlugin=SSEPython,sse-python:50051`
- Example where two SSE plugin servers are defined: `SSEPlugin=SSEPython,sse-python:50051;R,sse-r:50053`
- Example where one SSE plugin server is defined without certificate path but with timeouts set: `SSEPlugin=SSEPython,sse-python:50051,,0,20`
