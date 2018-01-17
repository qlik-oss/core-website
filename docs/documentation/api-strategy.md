# API Strategy

## Why Have an API Strategy?

We take our relationship with our partners and customers seriously. The fact that we abide by a
transparent and reliable API Strategy supports our trusted relationship with partners and customers.

Partners and customers need to be able to plan and rely on their investments on top of our APIs,
therefore the main intention of our API strategy is to be fully transparent and predictable.

## The Elements of our API Strategy

To be able to secure Qlik’s commitment to our API consumers, we have established an API
Governance Policy that consists of five main areas:

* Versioning
* Visibility Index
* Stability Index
* Deprecation Policy
* Breaking Change Definition

### Versioning

Our versioning policy describes a simple set of rules and requirements that dictate how API's version
numbers should be assigned and incremented.

We are following the industry standard of Semantic Versioning. A version number must take the form
X.Y.Z where X is the major version, Y is the minor version, and Z is the patch version.

The major advantage of using this versioning concept is that, by just comparing two different versions,
one can automatically recognize whether the changes between two different versions contain:

* backwards-compatible bug fixes (Z is incremented)
* new backwards-compatible features (Y is incremented)
* backwards-incompatible changes (X is incremented)

Major version zero is for initial development and so our API Governance policy does not apply. All our
public APIs will always be at major version one or higher.

### Visibility Index

Visibility Index defines who is the intended user of the API, and today we have two main types of
APIs - Private and Public.

Only Public APIs are supported, and they are documented officially in our Help section. Partners and
customers should only use Public APIs for custom solutions built on top of our Qlik Analytics Platform.
This to avoid the risk that the custom solution might break with any new version of our products.

### Stability Index

The Stability Index indicates how stable or mature an API is, and we have three levels:

* Experimental
    We want to expose new APIs to our partners and customers as soon as possible, to allow to
    work on early prototypes and especially to collect feedback in the early stage of a new API.
    Experimental APIs are under development and might change with every new release, as
    there is no need to deprecate before removing.
* Stable
    Stable APIs are reliable and breaking changes are unlikely. The deprecation period for stable
    APIs is set to 6 months.
* Locked
    Locked APIs are extremely reliable and will not be broken unless necessary. The
    deprecation period for locked APIs is set to 12 months.
    The Stability Index can be assigned to the whole API or have different values set within the API. APIs
    can only be promoted and go to a more reliable Stability Index.

### Deprecation Policy

The Deprecation Policy defines when and how an API is considered to be deprecated.

Even if we intend to minimize changes in our APIs, it is though necessary that APIs can also change
and evolve due to architectural changes, new functionalities, etc.

The deprecation period starts when the deprecation has been communicated, which means that it has
been published to our API consumer, i.e. documented officially in our Help section, together with an
available API replacement. The replacement is published at the same time as the deprecation so that
API consumers can start adapting their custom solution and prepare it for the removal of the API.

The deprecation period lasts until the removal has been communicated, and that means that the
removal affects the API consumer.

The deprecation period varies depending on the maturity of the API, which is set as the stability index.

Although the API Governance Policy is applicable also for our Private APIs, they are treated
differently for deprecations.

### Breaking Change Definition

The breaking change definition is a set of rules that defines if a change is considered a backward or
non-backward compatible change.

## Bringing our API Strategy to Life

### API Governance

We have established an internal API Governance Council, taking of the overall execution of our API
Strategy.

To make sure that we meet the high standards of our API Strategy, we established the API
Governance Policy within Qlik’s R&D organization in December 2016.

Monitoring the compliance to the API Governance Policy is tightly embedded into our R&D’s internal
day-to-day life, supported by a collection of processes we have established and internal tools we have
developed.

### Qlik Help

We have started to introduce the Stability Index in our Help section. This is an ongoing effort and to
be continued in upcoming milestones.

### API Insights

As part of the API Strategy, Qlik’s intention is to be fully transparent to our partners and customers.
Therefore, we have launched Qlik Sense API Insights – a tool that provides visibility into changes to
the APIs in Qlik Sense releases. The Qlik Sense apps used in the mashup compare each API’s
specifications to identify API changes and show if something has been added, updated, deprecated or
removed.
