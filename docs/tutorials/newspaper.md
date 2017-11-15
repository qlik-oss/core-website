# Use case : Newspaper

## Description
Newspaper: In this scenario, documents are hosted as a backend with a custom-built user interface and embedded in newspaper site for storytelling or interactive charts. In this type of deployment, there are typically many bursty users running against the same document.

* Single, contained document
* Single data model
* JavaScript, few objects and charts
* Document is view only with very few selections

Note: As long as a the document can be opened on a node (RAM constrained), each session created generates roughly the same cost, which is predictable since the cache is guaranteed to be reused.

## Usage pattern:
This aims to draw out the picture of the use case usage pattern.
A typical EU/US usage pattern with dual peaks?

Based on data from :
https://www.statista.com/statistics/229984/readers-of-the-new-york-times-daily-edition-usa/

* ~9 Million daily readers users
* Expected usage pattern
  * How many would click on and read an article with Sense type charts??
  * US-EAST predominant usage pattern with most users within an 8 hour window
  * Assuming 1% daily viewers: 188 users per minute (9M/100(1%)/8hrs/60min). Open Doc mostly.
  * Assuming 5% daily viewers: 938 users per minute (9M/20(5%)/8hrs/60min). Open Doc mostly.
  * PEAK usage: All within one hour and 5%: 7500 users per minute (9M/20(5%)/1hr/60min). Open Doc mostly.

## Assumptions
Beyond what is stated in the usage pattern above there are several assumptions made in this guide.
There are a few distinct and known Qlik Sense application entities with known size and characteristics.
All users will primarily view content, but can occasionally interact with the Qlik Sense applications.
There is a predefined set of hosts/nodes running QIX engine. These are, if unused, idling awaiting workload.

## Metrics to look for
A continous look at system-wide but predominantly QIX engine metrics will show current health of the system and give data on how much more load can be added.

For this case several assumptions have been made that simplifies these metrics, such as knwon Qlik Sense application sizes.
With this given the below metrics are enough to determine, and later predict scaling needs:
* Known Qlik Sense application characteristics such as size in RAM when opened for the first time
  * To know how much headroom is needed to open a specific Qlik Sense application
* Open Qlik Sense applications
  * To determine whether the app is already in memory or not
* RAM/CPU for each QIX engine
  * For headroom and least load placement

Not needed:
* Dividing the number of sessions by the RAM/CPU minus the RAM for the raw document yields a good per session cost value to be used when scaling.

## Qlik Sense session placement using MIRA
MIRA service (link) returns a list of available QIX engines.
New sessions should be placed where there is least load and there is enough headroom resource-wise to place a new app.
Headroom can be determined like this:

!!headroom!!  make note of if an app is not opened yet then the cost is higher. Beyond that cheap.

!!insert code for getting QIX engines from MIRA and sorting them by least load and check if headroom is enough!!

Should a request be rejected otherwise?
Maybe not, but alert somehow

## Predictive decisions
Extrapolation based on current and historic usage with a known set of app sizes.
Up
When the total amount of free resources are less than X% RAM/CPU (20%?) or the number of session "slots" is less than XX, new nodes are needed.
Down
When the total amount of free resources are more than Y% RAM/CPU or the number of session "slots" is more than YY, nodes can be removed (as long as removing a complete node leaves enough capacity and some...).


