# Document Synchronization

!!! warning "Experimental feature"
    This feature is in an experimental state. Use with caution
    since this feature may change in the future.

## Description

For sharing documents between multiple instances the Qlik Associative Engine uses file polling to detect document changes.
This feature support changes based on creation, editing, and deletion of generic objects, as well as reload of the data.
If there are for example changes to the data blob or objects in a document,
this would trigger a notification to other engine instances sharing the same document.
The file polling interval for checking for document changes is every 10 seconds.

When a document change has been detected the client in the other session will receive invalidations on the affected objects,
and can act on it as preferred.
There is an example in `enigma.js` for how to subscribe on these events [here](https://github.com/qlik-oss/enigma.js/blob/master/docs/api.md#event-changed).

With this feature the Qlik Associative Engine instances running in a cluster, regardless of orchestration,
will assume that the cluster uses a shared persistence layer.
What type of shared persistence volume that should be used is configurable by the end-user,
as long as the volume is based on a block file system.

## Example

To show how two Qlik Associative Engine instances are sharing the same document using the file polling feature,
we have implemented a basic example in `Kubernetes` using `Persisted Volumes`.
You can find the example in the repository [core-document-synchronization](https://github.com/qlik-oss/core-document-synchronization).
