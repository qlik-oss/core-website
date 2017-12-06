# Newspaper scenario

## Description

In this scenario, documents are hosted as a backend with a custom-built
user interface and embedded in a newspaper site for storytelling or interactive
charts. In this type of deployment, there are typically bursts in
traffic towards specific documents, viewing the content presented rather than
making many selections. A successful deployment has reasonable uptake against
a discrete amount of documents/data models.

## Usage pattern

With newspaper articles, the potential uptake is worldwide. This means that
the time zones affect the arrival of new readers, who incur load on the
Frontira backend. For example, an article could be read in the EU time zones,
then drop in activity until the US enters business hours, and then drop in
activity again at US nightfall.

The amount of users reading and interacting with such an article is hard to
predict, but the idea is to have enough nodes/hosts to handle a reasonable peak
usage even though this could exceed thousands of new users per hour.

Based on this usage pattern and assumptions, the system could become reasonably
predictable and scale for need.

## Assumptions

Beyond what is stated regarding the usage pattern above, several assumptions
are made in this example scenario:

- There are a few distinct and known document entities with known
  sizes and characteristics.

- There is a predefined set of hosts/nodes running QIX Engine. These are, if
  unused, idling awaiting workload.

- It is expected that loading all of these on all QIX Engine nodes is not an
  issue and they could almost be pre-populated for speed.

- Having all documents already present on the QIX Engine nodes
  removes the need to continuously check whether there is enough resource
  headroom to add another one.

In this pseudo implementation there is no logic to reject new sessions
even if the current cluster is fully loaded or over-loaded. This could be
added by checking for headroom and rejecting when there is not enough left.

## Metrics to look for

A continuous monitoring of system-wide, but predominantly QIX Engine related,
metrics will provide the current health of the system and information on how
much more load can be added.

In this case, several assumptions (such as known document sizes)
that simplify the metrics have been made. With these given, the below metrics
are enough to determine, and later predict, the scaling needs.

RAM and CPU resources available for each QIX Engine (for least-load placement)

## Document session placement using Mira

The Mira service ([Mira](./../../documentation/services/mira.md)) returns an array
of available QIX Engines. New sessions should be placed where there is least-load
and enough headroom resource-wise to place a new document. As for headroom, it is
assumed that the document is either already opened or small
enough to not cause RAM issues. Hence, a simple least-load principle chould
be applied to properly place a new users (which corresponds to a QIX Engine
session).

The simplest form of the algorithm then becomes

- Get QIX Engines from Mira and sort them by least load.
- The sorting algorithm then returns the QIX Engine with the most free RAM
- If multiple QIX Engines have the same amount of free RAM then the QIX Engine
  with lower CPU consumption is preferred and then chosen/returned.

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
  console.log("QIX Engine selected: "+ sortedQIXEngines[0].engine.ip);
  return sortedQIXEngines[0].engine.ip;
}
```
