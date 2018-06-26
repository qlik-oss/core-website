# QIX API

The QIX API is the primary API used for consuming QIX documents. It is
based on the WebSocket protocol and requires some specific parameters
to work correctly.

## WebSockets

Any websocket client implementation that follows the [RFC specification](https://tools.ietf.org/html/rfc6455)
should be supported. The URL format is:

```raw
ws://hostname:port/app/<unique identifier>
```

`<unique identifier>` can be anything that would identify the document session for the user
making the request.

JavaScript example:

```js
const websocket = new WebSocket('ws://localhost:9076/app/my-document.qvf');
```

### Headers

In a non-browser environment, most websocket client implementations support to add headers.

Header | Description
------ | -----------
`X-Qlik-Session: <guid>` | Defines the session id, regardless of the user. If you use this header, the websocket URL could simply be `ws://hostname:9076/app/`.
`Authorization: Bearer <token>` | If the [JWT feature](../../../../tutorials/authorization.md) is enabled, this header will identify the user and its attributes.

## JSONRPC Protocol

Once a session has been established using websockets, you may start interacting
using the QIX API. All requests sent from the client should contain the following:

```json
{
  // Protocol descriptor:
  "jsonrpc": "2.0",
  // Session-unique numeric id, referred to in the response
  // to connect the request and response:
  "id": 6,
  // The handle for the object to interact with:
  "handle": 2,
  // The object type of the handle above decides
  // which API methods you may invoke:
  "method": "ApiMethodName",
  // Parameters for the invoked API method:
  "params": {
  }
}
```

### Request and response

Here is an example request/response pair. Note that there is only _one_ static handle in
the QIX API, and that is `-1`. This handle refers to the [Global](./global.md) API.

In this example request, we will open a document using [`OpenDoc`](./global.md#opendoc).
If successful, the response will contain a reference to the document handle, which can
be used to do further requests towards the [Document](./doc.md) API, and so forth.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "handle": -1,
  "method": "OpenDoc",
  "params": {
    "qDocName": "my-document.qvf"
  }
}
```

If that document exist, the response would look similar to this:

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
      "qReturn": {
        "qType": "Doc",
        "qHandle": 1,
        "qGenericId": "my-document.qvf"
      }
    },
    "change":[1]
}
```

Note that `qHandle` contains the handle we may use to make additional
requests to invoke API methods towards the document. We also get a
property on the response called `change`, this array can be added by QIX
Engine on any responses and contains all open handles in your session
that may have been invalidated and you should refetch data to ensure
your application in a valid state.

## API references

For the API references, see the different classes listed in the left-side menu.
