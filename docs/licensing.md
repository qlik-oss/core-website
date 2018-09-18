# Licensing

By downloading and using Qlik Core, you are subject to the [End-User License Agreement](./eula.md).
Make sure you have read and understood this agreement before continuing.

## Community

Qlik Core comes with a community version that may be used to evaluate,
develop, or test solutions. Note that it cannot be used for commercial purposes.

The current limitations are applied to the community version:

* 30 day expiration: Qlik Associative Engine will expire 30 days after the version has been released.
* 5 concurrent sessions: Qlik Associative Engine will limit the amount of concurrent sessions.

!!! Note "Accepting the EULA"
    You need to pass in a setting to Qlik Associative Engine to acknowledge that
    you accept the EULA. Example: `docker run qlikcore/engine:<version> -S AcceptEULA=yes`

## Licensed

Running Qlik Core with a license requires a side-car license service
which unlocks the Qlik Associative Engine service. See the
[Licenses service documentation](./services/licenses.md) for additional information on how you can
prepare your solution for Qlik Core licensing.

!!! Note "Getting a license"
    You can purchase your license by contacting sales [here](https://www.qlik.com/us/try-or-buy/buy-now)
    You will also need to pass in a setting to Qlik Associative Engine to enable licensing.
    See [Licenses configuration](./services/licenses.md#configuration) page.

    With a license the community limitations will no longer apply.

## Third Party Licenses

Click [here](./third-party-licenses.md) for information about our third-party licenses.
