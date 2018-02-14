# Newspaper website

Qlik Core can be used in many different ways and each implementation will be unique,
but the concepts and solutions in this use case
can provide useful information for you as you build your solution.

In this scenario, documents are hosted as a back end with a custom-built user interface
that is embedded in the newspaper site for storytelling and interactive charts.

In this type of deployment, there are typically bursts in traffic volume for specific documents
as users click through content or as they make selections in an interactive chart.
This type of deployment must be able to handle a reasonable uptake of traffic
against a discrete amount of documents or data models.

## Assumptions

We make the following assumptions in this example.

- __Web usage pattern__

    User traffic to the website
    and the load incurred by the Qlik Core back end fluctuates across timezones.
    For example, as traffic from users in American timezones declines,
    traffic from users in European timezones increases.

- __Document entities__

    There are a few distinct document entities with known sizes and characteristics.

- __Hosts/nodes__

    There is a predefined set of hosts/nodes running Qlik Associative Engine.
    If unused, they are idling awaiting workload.

- __Loading Qlik Associative Engine nodes__

    It is expected that documents can be loaded on all of the Qlik Associative Engine nodes,
    or that the nodes are pre-populated with the documents.

    Having the documents already loaded on the Qlik Associative Engine nodes
    would improve speed and removes the need to continuously check whether there is enough resource
    headroom.

!!! Note
  In this scenario, there is no logic to reject new sessions
  even if the current cluster is fully loaded or overloaded. This type of feature could be
  implemented by checking for headroom and rejecting sessions when there is not enough left.

## Document session placement using Mira

Given the assumptions specified above,
RAM and CPU are important metrics for
determining how to scale the system and where to place new sessions.

New sessions should be placed on the Qlik Associative Engine node that has the most headroom and least amount of load.
A simple least-load principle could be applied to
properly place a new user on the appropriate Qlik Associative Engine node.

You can do this by using the [Mira service](../../services/mira.md) to return an array
of available Qlik Associative Engine instances and then sort them by load.

!!! Note
  In this scenario, it is assumed that the document is either already open or small
  enough to not cause RAM issues.

A document session placement algorithm does the following:

1. Get Qlik Associative Engine instances from Mira and sort them by least load.
1. Sort the Qlik Associative Engine instances by the most free RAM.
1. If multiple Qlik Associative Engines have the same amount of free RAM,
    then sort the Qlik Associative Engine instances by CPU consumption.
1. Choose the Qlik Associative Engine instance with the least amount of load (RAM and CPU).

```javascript
//RAM free takes priority, but if equal then CPU is the deciding factor
function compareResources(a, b) {
  if (a.engine.health.mem.free > b.engine.health.mem.free) {
    return -1;
  }
  if (a.engine.health.mem.free < b.engine.health.mem.free) {
    return 1;
  }
  if (a.engine.health.cpu.total < b.engine.health.cpu.total){
    return -1;
  } else {
    return 1;
  }
}

function getLeastLoadedQixEngine() {
  const qixEngines = []; // retrieved from your Mira service
  var sortedQIXEngines = qixEngines.sort(compareResources);
  console.log("Qlik Associative Engine selected: "+ sortedQIXEngines[0].engine.ip);
  return sortedQIXEngines[0].engine.ip;
}
```
