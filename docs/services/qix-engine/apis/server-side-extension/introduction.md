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

## Examples

There are a number of examples created for different programming languages available [here](https://github.com/qlik-oss/server-side-extension/tree/master/examples).

## Configuring an Analytical Connector in Qlik Core

An Analytical Connector is configured by providing command line parameters to the Qlik Associative Engine using the `SSEPlugin` parameter.
How to provide a command line parameter to Qlik Associative Engine is described [here](../../introduction.md).


