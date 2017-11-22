# The Newspaper case

## Description

Newspaper: In this scenario, documents are hosted as a backend with a custom-built
user interface and embedded in newspaper site for storytelling or interactive
charts. In this type of deployment, there are typically many bursty users running
against the same document doing few selections but rather viewing the content
presented. A successful deployment has reasonable uptake against a discrete '
amounts of Qlik Sense applications/data models.

## Usage pattern

With newspaper articles, for example english ones, the uptake is potentially
world-wide. This causes the time zones to affect the arrival of new readers
which will incur load on the Frontira backend. One such article could be read
in the EU time zones before a drop in activity until US enters business hours
to then have it's load dramatically reduced after US nightfall.

The amount of users reading and interacting with such an article is hard to
predict, but the idea is to have enough nodes/host to handle a reasonable peak
usage even though this could exceed thousands of new users per hour.

Based on this usage pattern and assumptionthe system could become reasonably
predictable and scale for need.

## Assumptions

Beyond what is stated in the usage pattern above there are several assumptions
made in this guide.

There are a few distinct and known Qlik Sense application entities with known
size and characteristics.

There is a predefined set of hosts/nodes running QIX engine. These are, if
unused, idling awaiting workload.

It is expected that loading all of these on all QIX engine nodes is not an
issue and they could almost be pre-populated for speed.

Having all Qlik Sense applications already present on the QIX engine nodes
removes the need to continuously check whether there is enough resource
headroom to add another one.

In this pseudo implementation there is no logic to reject new sessions
even if the current cluster is fully or over-loaded. This could be added
by checking for headroom and rejecting when there is too little left.

## Metrics to look for

A continuous look at system-wide but predominantly QIX engine metrics will
show current health of the system and give data on how much more load can
be added.

For this case several assumptions have been made that simplifies these metrics,
such as known Qlik Sense application sizes. With this given the below metrics
are enough to determine, and later predict scaling needs:

RAM and CPU resources available for each QIX engine. For least-load placement.

## Qlik Sense session placement using MIRA

MIRA service (link) returns a list of available QIX engines.
New sessions should be placed where there is least-load and there is enough
headroom resource-wise to place a new app. As for the headroom it is assumed
that the Qlik Sense application is either already opened or small enough to not
cause RAM issues. Hence, a simple least-load principle should be applied in order
to properly place a new user (which corresponds to a QIX engine session).

Getting QIX engines from MIRA and sorting them by least load.
The sorting algorithm will prioritize free RAM until this reaches
the QIX minimum memory level at which point CPU takes precendence.

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

## Predictive decisions

Extrapolation based on current and historic usage with a known set of app sizes.
Up
When the total amount of free resources are less than X% RAM/CPU (20%?) or
the number of session "slots" is less than XX, new nodes are needed.
Down
When the total amount of free resources are more than Y% RAM/CPU or the number
of session "slots" is more than YY, nodes can be removed (as long as removing
a complete node leaves enough capacity and some...).

Headroom can be determined like this:
make note of if an app is not opened yet then the cost is higher. Beyond that
cheap.

```javascript
function checkHeadroom() {

  var QIX = "Retrieved from http://<docker swarm hostname>:9100/v1/engines"

  switch (QIX.totalRAMCPUFree) {
      case < 20:
          console.log("Critical warning: scale up now");
          break;
      case < 40:
          console.log("Warning: time to consider scaling up");
          break;
      case > 80:
          console.log("Information: the cluster is at the moment oversize");
          break;
      default:
          console.log("System healthy and reasonably sized");
  }
}

function getCurrentUsers() {
    console.log("Currently there are 1337 users in the system");
    return 1337;
}

function getArrivalActivity() {
    console.log("Current arrival rate is 12 new users per minute");
    return 12;
}
```

Calculate current session in the system, arrivals in the last hour or
minute and from that calculate time until.. full or empty.
