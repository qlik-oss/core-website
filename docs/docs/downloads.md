# Downloads

## Docker Images

Qlik Core consists of a core set of services, including the Qlik Associative Engine, that you can download as Docker images:

<div id="downloads-table-identifier"></div>

| Service    | Feature | Links | Latest Version |
| ---------- | ------- | ------| -------------- |
| [Qlik Associative Engine](./services/qix-engine/introduction.md) | The powerful associative indexing engine from Qlik and the foundation of Qlik Core. | [qlikcore/engine](https://hub.docker.com/r/qlikcore/engine) | N/A |
| [Licenses](./services/licenses.md) | Service required to run Qlik Associative Engine with a paid license. | [qlikcore/licenses](https://hub.docker.com/r/qlikcore/licenses) | N/A |
| [Mira](./services/mira.md) | Qlik Associative Engine discovery service. | [qlikcore/mira](https://hub.docker.com/r/qlikcore/mira) <br>(source code: [GitHub](https://github.com/qlik-oss/mira)) | N/A |

## JavaScript Libraries

In addition, there are several open source JavaScript libraries that you will find useful when working with Qlik Core.
You can install these libraries as npm packages:

| Library | Feature | Source Code |
| ------- | ------- | ----------- |
| [enigma.js](https://www.npmjs.com/package/enigma.js) | Communication with the Qlik Associative Engine. | [GitHub](https://github.com/qlik-oss/enigma.js/) |
| [halyard.js](https://www.npmjs.com/package/halyard.js) | Simple data loading into the Qlik Associative Engine. | [GitHub](https://github.com/qlik-oss/halyard.js) |
| [after-work.js](https://www.npmjs.com/package/after-work.js) | Unified testing framework for different test levels. | [GitHub](https://github.com/qlik-oss/after-work.js) |
| [picasso.js](https://www.npmjs.com/package/picasso.js) | Visualization library on top of the Qlik Associative Engine. | [GitHub](https://github.com/qlik-oss/picasso.js/) |

## Golang Library

There is also a Golang library that can be used when communicating with the Qlik Associative Engine in Qlik Core.

| Library | Feature | Installation |
| ------- | ------- | ------------ |
| [enigma-go](https://github.com/qlik-oss/enigma-go) | Communication with the Qlik Associative Engine. | `go get -u github.com/qlik-oss/enigma-go` |
