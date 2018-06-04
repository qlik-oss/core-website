# Document Synchronization

!!! warning "Experimental feature"
    This feature is in an experimental state. Use with caution
    since this feature may change in the future.

## Description

For sharing documents between multiple instances the Qlik Associative Engine uses file polling to detect document changes.
If there are e.g. changes to the data blob or generic objects being created/removed in a document,
this would trigger a notification to other engine instances sharing the same document.
The file polling interval for checking for document changes is every 10 seconds.

When a document change has been detected the client will receive a push message in the outdated session,
and can act on it as preferred.
There is an example in `enigma.js` for how to subscribe on these events [here](https://github.com/qlik-oss/enigma.js/blob/master/docs/api.md#event-changed).

With this feature the Qlik Associative Engine instances running in a cluster, regardless of orchestration,
will assume that the cluster uses a shared persistence layer.
What type of shared persistence volume that should be used is configurable by the end-user,
as long as the volume is based on a block file system.

## Example

To show how two Qlik Associative Engine instances are sharing the same document using the file polling feature,
we have implemented a basic example in `Kubernetes` using `Persisted Volumes`.
You can find the example [here](https://github.com/qlik-oss/core-document-synchronization).
