# An analytics development platform by Qlik

Qlik Core is built around the Qlik Associative Engine and Qlik-authored open source libraries.
Who’s Qlik you might ask? We’ve been around for 25 years and our specialty is analytics.
Our platform has powerful features like responsive and intelligent visualizations,
collaboration and storytelling functionality, robust data control and role-based data security.
Underneath those features is our "secret sauce" that we call the Qlik Associative Engine.
This in-memory inference and calculation engine is what’s responsible for the magic —
dynamically indexing and associating data without needing to rely on query-based analyses
which are restricted to linear exploration within a partial view of the data.

With Qlik Core, you can take advantage of this powerful associative engine to build,
extend and quickly deploy custom interactive data-driven solutions that are highly scalable
and cloud-ready. Supported by a backbone of Linux and Docker, Qlik Core applications can
easily be embedded into any stack, IoT device, application, web page, etc. And with the
associative engine, all data points are associated within a virtual data layer over your
front-end and back-end systems. These associations exist even across tables, allowing you
to change, model and visualize complex relationships between various data sources and tables.

## With Qlik Core, you also get

- **Easy data aggregation during run time** – save development time by combining disparate data sources,
    no matter how large, and letting our engine take care of the data computation

- **Flexibility when changes happen** – gain flexibility with the virtual data layer that updates
    the front and back-end system at the same time when data changes

- **Rapid searching & filtering** – search on any set of terms or apply filters and the engine
    automatically manages the relationships in the data to rapidly return related items from across
    the model, no more of those pesky left-joins

- **No querying** – added flexibility with automatic calculations across the data set by our engine,
    even working across tables to produce results without requiring any joins

- **Simplified state management** – objects/elements tied to a single data model will be automatically
    synched and maintained in the same state, without you having to introduce specific code since the
    engine manages and stores the state of functions and objects

## So, how do you get it? Licensing info [here](./services/licenses.md) but let’s talk components

- **Linux-based Associative Engine**  – provided as a Docker image with built-in support for
     Amazon Web Services, Microsoft Azure and Google Cloud Platform

- **Supporting APIs**  – these ingest your data into the Qlik Associative Engine through connectors

- **Supporting Open Source Libraries**  – these various libraries by Qlik expose the engine to help
    you build faster

It’s all language agnostic but JavaScript lovers will find it easier to work with given the number of
our open source tools available in JavaScript. Other top languages and tools used include R, Go, Shell,
C#, Python, Java and D3. Qlik Core can also be managed with the orchestration tool of your choice for
implementing, scaling and managing containerized applications.
