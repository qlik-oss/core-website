# Licensing

By downloading and using Qlik Core, you are subject to the [End-User License Agreement](../beta.md).
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

The exact model for buying Qlik Core will be announced later this year, and will require
a side-car license service to unlock the Qlik Associative Engine service. See the
[Licenses service documentation](./services/licenses.md) for additional information and how you can
prepare your solution for Qlik Core licensing.

!!! Note "Getting a beta license"
    During the beta you can get a license by [filling out this form](./license-registration.md).

    You will also need to pass in a setting to Qlik Associative Engine to enable licensing.
    See [Licenses configuration](./services/licenses.md#configuration) page.

    With a beta license the community limitations will no longer apply.

## Third Party Licenses

Click [here](./third-party-licenses) for information about our third-party licenses.
