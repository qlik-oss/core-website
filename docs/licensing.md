# Licensing

There are three options for using Qlik Core — two for evaluation (one of which includes a license)
and one for production. These are detailed below. ​
​
By downloading and using Qlik Core, you are subject to the [End-User License Agreement](./eula.md).
Make sure you have read and understood this agreement before continuing.

## 1. Developer Edition

The developer edition comes with Qlik Core and may be used to quickly evaluate,
develop or test solutions outside of commercial purposes.

The limitations applied to the developer edition are:

* 30 day expiration: Qlik Associative Engine will expire 30 days after the version has been released.
* 5 concurrent sessions: Qlik Associative Engine will limit the amount of concurrent sessions.

!!! Note "Accepting the EULA"
    You need to pass in a setting to Qlik Associative Engine to acknowledge that
    you accept the EULA. Example: `docker run qlikcore/engine:<version> -S AcceptEULA=yes`

## 2. Evaluation Trial License

To better evaluate Qlik Core without the barriers in the developer edition, register to obtain a
free 90-day license key.

With this evaluation trial license, you can:

* Avoid having the Qlik Associative Engine expire 30 days after the version has been released
* Better evaluate scalability and load testing abilities with no limit on concurrent Qlik Associative Engine sessions

!!! Note "Getting a license"
    You can request a Trial License by [filling out this form](./license-registration.md).
    You will also need to pass in a setting to Qlik Associative Engine to enable licensing.
    See [License configuration](./services/licenses.md#configuration) page.

## 3. Licensed

Running Qlik Core with a license requires a side-car License service
which unlocks the Qlik Associative Engine service. See the
[License service documentation](./services/licenses.md) for additional information on how you can
prepare your solution for Qlik Core licensing.

!!! Note "Getting a license"
    You can purchase your license by contacting sales [here](https://www.qlik.com/us/try-or-buy/buy-now)
    You will also need to pass in a setting to Qlik Associative Engine to enable licensing.
    See [License configuration](./services/licenses.md#configuration) page.

    With a license the community limitations will no longer apply.

## Third Party Licenses

Click [here](./third-party-licenses.md) for information about our third-party licenses used in our closed source components.
