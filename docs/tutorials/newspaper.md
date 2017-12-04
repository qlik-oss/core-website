# Newspaper scenario

## Description

In this scenario, documents are hosted as a backend with a custom-built
user interface and embedded in newspaper site for storytelling or interactive
charts. In this type of deployment, there are typically many bursty users running
against the same document, viewing the content presented rather than making
many selections. A successful deployment has reasonable uptake against a discrete
amount of Qlik Sense applications/data models.

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
are made in this guide.

There are a few distinct and known Qlik Sense application entities with known
sizes and characteristics.

There is a predefined set of hosts/nodes running QIX engine. These are, if
unused, idling awaiting workload.

It is expected that loading all of these on all QIX engine nodes is not an
issue and they could almost be pre-populated for speed.

Having all Qlik Sense applications already present on the QIX engine nodes
removes the need to continuously check whether there is enough resource
headroom to add another one.

In this pseudo implementation there is no logic to reject new sessions
even if the current cluster is fully loaded or over-loaded. This could be
added by checking for headroom and rejecting when there is not enough left.

## Metrics to look for

A continuous monitoring of system-wide, but predominantly QIX engine-related,
metrics will provide the current health of the system and information on how
much more load can be added.

In this case, several assumptions (such as known Qlik Sense application sizes)
that simplify the metrics have been made. With these given, the below metrics
are enough to determine, and later predict, the scaling needs:

RAM and CPU resources available for each QIX engine. For least-load placement.

## Qlik Sense session placement using MIRA

MIRA service (link) returns a list of available QIX engines.
New sessions should be placed where there is least-load and enough
headroom resource-wise to place a new app. As for headroom, it is assumed
that the Qlik Sense application is either already opened or small enough to not
cause RAM issues. Hence, a simple least-load principle should be applied
to properly place a new user (which corresponds to a QIX engine session).

Get QIX engines from MIRA and sort them by least load.
The sorting algorithm prioritizes free RAM until this reaches
the QIX minimum memory level at which point the CPU takes precendence.

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

function getLeastLoadedQix() {
  var QIX = "Retrieved from http://<docker swarm hostname>:9100/v1/engines"
  var sortedQIX = QIX.sort(compareResources);
  console.log("QIX selected: "+ sortedQIX[0].engine.ip);
  return sortedQIX[0].engine.ip;
}
```
