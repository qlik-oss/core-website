# Licensing

In this small tutorial, you will learn how to set up the Licenses service together with the Qlik Associative Engine.

## Configuration

You need to configure the Licenses service with two environment variables `LICENSES_SERIAL_NBR`
with your LEF serial number and `LICENSES_CONTROL_NBR` with your LEF control number.

You also need to configure [Qlik Associative Engine](./qix-engine/introduction.md)
where to find it. You can do this by passing the following command line argument to the Qlik
Associative Engine.

```sh
-S LicenseServiceUrl=<Licenses service URL>
```

## Examples

To see an example of a license configuration, see the
[core-using-licenses](https://github.com/qlik-oss/core-using-licenses) repository.
It contains examples of a setup with the license service and a Qlik Associative Engine, as well as runnable tests.

## License Events

If no valid license exists or all license minutes are already consumed and the Qlik Associative Engine
is configured to run in licensed mode it will send a `SESSION_ERROR_NO_LICENSE`
push event on the websocket and then close it.

If during a license renewal there are no more license minutes a `SESSION_ERROR_LICENSE_RENEW`
push event will be sent from the Qlik Associative Engine and afterwards the websocket will be closed.
