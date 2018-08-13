# Resource Management

## Memory/RAM

The main memory RAM is the primary
storage for all data to be analyzed by the Qlik Associative Engine. The engine mainly
allocates memory for:

* The unaggregated dataset that is defined by the document data model.
* The aggregated data (cached result sets) and the calculations
  defined by the user interface.
* The session state for each user of the document.
* Temporary allocations for helper tables used during calculations.

When a user requests a document, the Qlik Associative Engine loads it into memory (if it has not already been loaded).
The dataset for a document is only loaded once, regardless of the number of concurrent users.

When a user makes a selection in the document, the Qlik Associative Engine
performs real-time calculations for that selection.
Newly calculated results are added to the in-memory
cache, which is shared with all users. User session states are also stored
in memory and most of the session information is shared between sessions in
the same state.

### Controlling the allocation of memory

There are two fundamental settings for controlling how the Qlik Associative Engine
allocates and releases memory:

* Working set Low / Min memory usage:

    This setting defines the amount of memory that the Qlik Associative Engine will use.
    If memory allocation remains at or below this level, the Qlik Associative Engine will not
    attempt to minimize memory allocation.
    For example, if the physical RAM on your server is 256 GB and _Working set Low / Min memory
    usage_ is set to 70%, the Qlik Associative Engine will not try to minimize its memory
    allocation until it uses 179.2 GB of RAM.
    After passing this point, the engine uses compression algorithms to minimize memory consumption.
    However, it will not use any memory if it is not used for a beneficial purpose.

* Working set High / Max memory usage:

    This setting defines the point above which the Qlik Associative Engine cannot allocate any memory.
    For example, if the physical RAM on your server is 256
    GB and _Working set High / Max memory usage_ is set to 90%, the Qlik Associative Engine
    cannot allocate any RAM above 230.4 GB.

!!! Note
    _Working set Low / Min memory usage_ must be lower than
    _Working set High / Max memory usage_ and you should leave enough room for handling transient
    cached result sets without reaching _Working set High / Max memory usage_ in an environment.

We recommend that you leave these settings with their default values.
However, on servers with large RAM (256 GB and upwards), the settings can
be changed to allocate a couple of GBs of RAM for the operating system, and
to allow the remaining RAM to be used by the Qlik Associative Engine.

#### When Qlik Associative Engine starts

The operating system allocates RAM for the Qlik Associative Engine to use.
When the engine starts, it reserves RAM based on the
_Working set Low / Min memory usage_ setting. The engine allocates all of its RAM to
cache result sets. When it reaches the RAM limit, it begins purging cached result sets to make
room for new documents, calculated aggregates, and session state information.
This means that an environment can operate on the boundary of the
_Working set Low / Min memory usage_ setting without impacting the user-perceived
performance, as long as there are old result sets that can be purged.
The Qlik Associative Engine prioritizes which cached result sets to purge based on their age, size,
and time of calculation.

#### When RAM is scarce

If the RAM becomes scarce, the operating system might
perform paging. This which means that some of the Qlik Associative Engine memory is swapped
from physical RAM to virtual memory (secondary storage). If the
Qlik Associative Engine is allocated to virtual memory, it may become orders of magnitude slower
than when using physical RAM. This is undesirable and may lead to a poor user
experience. There is no guarantee that paging will not
occur between the _Working set Low / Min memory usage_ setting and the
_Working set High / Max memory usage_ setting, but above the
_Working set High / Max memory usage_ setting, paging will definitively occur.

!!! Note
    Paging is not unique to the Qlik Associative Engine, as the RAM is handled
    by the operating system.

### Example: Allocation of memory when loading a single document

The following figure shows an example of the memory allocation over time, with the Qlik Associative Engine
running on a clean server and users interacting with a document.

![Single doc allocation](./../../images/qix-service/qix_allocation_single_doc.png)

When the document is first loaded into memory, it immediately takes up a block of memory.
As users begin interacting with the document and making calculation requests,
the result sets are cached and stored in RAM. This takes up the largest chunk of memory, but
cached result set can be served without any additional calculation, so they are quite useful.
A small amount of memory is allocated to keeping track of the state of active user sessions.

The Qlik Associative Engine does not allow persistent allocation of more memory than what is specified
by the _Working set Low / Min memory usage_ setting. When the total amount of
allocated RAM goes beyond that setting, previously cached result sets are
purged to make room for new ones. When the document is unloaded from memory,
the total amount of allocated memory drops by the same amount as was originally
allocated by the document.
The cached result sets stay in memory if there are no other requests to use allocated memory,
since these can be useful later on.

A Qlik Associative Engine session is considered to be _dropped_ once the session has no more connected
WebSockets, and the session time to live (TTL) has lapsed (TTL is by default 0).

### Example: Allocation of memory when loading multiple documents

The following figure shows how multiple documents can fit into RAM, even
when the total amount of allocated memory touches the _Working set Low /Min memory usage_ limit.

![Multiple doc allocation](./../../images/qix-service/qix_allocation_multiple_docs.png)

To release memory to load new documents, the Qlik Associative Engine purges cached result sets.
The amount of RAM that is used to cache result sets is the floating amount between
the _Working set Low / Min memory usage_ setting and the amount that is consumed by
the documents and session state information.

### Investigating memory usage

It is good practice to minitor how the Qlik Associative Engine uses memory with your data
models and documents.

![Monitoring RAM](./../../images/qix-service/monitoring_ram.png)

A memory curve that fluctuates a lot might indicate that the engine needs to allocate extra memory during a calculation.
Memory is released when the result set is cached.
A memory curve that shows jitter might indicate poor document design,
which is worth investigating as it often results in a slow response time.

### Summary of memory management

* The Qlik Associative Engine caches all result sets as long as there is available RAM.
* The Qlik Associative Engine releases memory only when unloading documents. When a document
    is unloaded from memory, the total amount of allocated memory drops by the
    same amount as originally allocated by the document.
* Cached result sets stay in memory unless there are new requests that need allocated memory.
* When the _Working set Low / Min memory usage_ limit is reached, old sessions
    and cached results are purged to make room for new values.
* The age, size, and time of calculation are factors in the prioritization
    of the values to purge.
* The Qlik Associative Engine purges old sessions when the "maximum inactive session time"
    value is reached.
* High memory usage is usually the result of many cached results.
* As long as paging does not occur, high memory usage is a good thing.

## CPU

The Qlik Associative Engine leverages the processor to dynamically create aggregations as
needed in real time, which results in a fast, flexible, and intuitive user
experience.

The data that is stored in RAM is the unaggregated granular data. Typically, no
pre-aggregation is done when the data is reloaded or a script is executed
for a document. When the user interface requires aggregates, for example,
to display a chart object or to recalculate after a selection has been made,
the aggregation is done in real time, and this requires CPU processing power.

The Qlik Associative Engine is multi-threaded and optimized to take advantage of multiple
processor cores. All available cores are used almost linearly when calculating
charts. During calculations, the engine makes a short burst of intense CPU
usage in real time.

![CPU Peaks](./../../images/qix-service/cpu_peak.png)

It is good if the CPU utilization, over time, shows peaks reaching 100%.
This indicates that the document is well designed for
scaling over cores. A selection or calculation in a document
requires a certain amount of processing capacity
(clock cycles from a certain chip),
and a peak of high utilization results in faster response
times as all available cores can cooperate to complete the calculation.

The Qlik Associative Engine has a central cache function, which means that chart calculations only
need to be done once, which results in better user experience, faster
response times, and lower CPU utilization.

If a server has high CPU utilization on average (>70%), incoming selections
are queued prior to being calculated as there is no processing capacity
immediately available. This is an indication of poor
performance.

![CPU Average High](./../../images/qix-service/cpu_high_average.png)

The are cases where the Qlik Associative Engine does not scale well over cores:

* A single user triggers single-threaded operations.
* The underlying hardware does not allow for good scaling, for example, when
    the memory bus is saturated.

### Summary of CPU utilization and scaling over cores

* Peaks with 100% CPU utilization are good because they indicate that the Qlik Associative Engine
    is using all available capacity to deliver the responses as fast as possible.
* High average CPU utilization (>70%) is bad as it means that the system
    saturates and incoming selections in documents have to be queued prior to
    being served.
* The Qlik Associative Engine processing capacity can be increased by adding more cores or by
    increasing the clock frequency. More processing capacity makes the Engine
    handle load peaks in a robust manner.

## Linear scaling of resources

The Qlik Associative Engine consumes approximately the same amount of resources
whether documents are loaded and accessed in parallel or in sequence
on a specific server. Also, as long as the CPU does not become saturated, the throughput is similar
regardless of whether the documents are loaded in parallel or in sequence.
Therefore, by adding up the resource usage of individual documents,
you can approximate the CPU and memory that the engine needs
when loading all of the documents in parallel.

The average response times are likely to be longer when the documents are
loaded in parallel. This is because the processing requests from the documents
compete and are queued.

This linear scaling provides predictability when managing documents in a
shared environment: by examining the resource usage of individual documents,
you can get an estimate of the total amount of resources needed to load and
access the documents at the same time.

## Frequency analysis of warnings

It is often difficult to determine how much or which portion of the memory is
being used and for what purpose. End-users experience slow response times for
calculations when the RAM is saturated, so the best way to avoid a poor end-user experience is to
monitor RAM saturation with the QIX log.

You should monitor the following two log warnings:

* **WorkingSet: Virtual Memory is growing beyond parameters…**

    The Qlik Associative Engine experiences problems staying below the
    _Working set Low / Min memory usage_ setting.

* **WorkingSet: Virtual Memory is growing CRITICALLY beyond parameters…**

    The Qlik Associative Engine has not managed to get back below the _Working set Low / Min memory usage_ setting
    and paging is or is about to happen.

The first warning is not a problem if this happens every now and then, but depending on the
frequency, this warning may indicate a shortage of RAM.
The second warning is more severe. If this is a recurring warning in the logs, there is a shortage of RAM.

By performing frequency analysis of these warnings, you can understand
when it is time to scale up/out the deployment or to add more RAM.
You might also want to optimize the RAM consumption
by identifying costly documents to optimize, configuring timeouts, or reviewing the rules and
distribution of documents.

### Example: Frequency analysis

The charts below show the number of memory-related warnings that occurred
in an environment during a single day.

![Frequency no worries](./../../images/qix-service/frequency_noworries.png)

Notice that there are a couple of "**...growing beyond parameters...**" warnings but no
"**...CRITICALLY beyond parameters...**" warnings.

This indicates that there are no severe memory allocation problems,
but there is a problem staying below the _Working set Low / Min memory usage_ setting.
You might want to look at the time intervals when these warnings were issued,
then check which documents were running at that time.
However, a longer timespan is needed to draw any conclusions.

The following charts show the number of warnings that occurred in an environment over one month.

![Frequency worries](./../../images/qix-service/frequency_worries.png)

The warnings are recurring, which is an indication that there is a shortage
of RAM in the environment. In this case, we recommend that you take a proactive approach and continuously
monitoring the number of warnings in the environment.

The charts below show a long term trend across many weeks.
The warnings in the environment became more frequent over time. With
a trend like this, you should investigate why this is happening to avoid future peaks.

![Frequency over time](./../../images/qix-service/frequency_over_time.png)

## Scaling up versus scaling out

There are two ways in which you can scale a Qlik Associative Engine deployment to match a static or dynamic workload:

* **Horizontally**

    Add more nodes/hosts to a cluster.

* **Vertically**

    Add more resources to current nodes/hosts.

Both of these options work well with the Qlik Associative Engine as it is predictable
and it scales linearly to the load.

If users and their respective documents work well on the current
nodes/hosts, then we recommend horizontal scaling.
However, if there are documents that require more resources than what is available
on the current hosts/nodes, then we recommend vertical scaling. This could then
feed into any load balancing algorithm so that documents that are more costly get
placed on larger nodes/hosts.
