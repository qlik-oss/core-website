# API Strategy

We take our relationship with our partners and customers seriously. This is why we have a transparent
and reliable API Strategy to support you and your investments that rely on our APIs.

## Elements of our API Strategy

The API Governance Policy consists of five areas:

* Versioning
* Visibility Index
* Stability Index
* Deprecation Policy
* Breaking Change Definition

### Versioning

Our versioning policy describes a simple set of rules and requirements for an API, that dictate how the version
numbers should be assigned and incremented.

We follow industry standard [Semantic Versioning](https://semver.org/). A version number must take the form
X.Y.Z, where X is the major version, Y is the minor version, and Z is the patch version.

The advantage of using this method of versioning is that by comparing two versions, you can
determine the compatibility differences.

* Backwards-compatible bug fixes (Z is incremented)
* New backwards-compatible features (Y is incremented)
* Backwards-incompatible changes (X is incremented)

Major version zero (0.Y.Z) is for initial development, so our API Governance Policy does not apply. Our
public APIs will always be at major version one (1.Y.Z) or higher.

### Visibility Index

The Visibility Index defines who is the intended user of the API. We currently have two types of
APIs: private and public.

Public APIs are officially supported, and they are documented in the
[Qlik Core documentation](/docs/home.md).
To avoid the risk that your solution might break with any new version of our products,
you should always use public APIs for custom solutions built on top of our APIs.

### Stability Index

The Stability Index indicates how stable or mature an API is.
We currently have three levels:

* **Experimental**

    Experimental APIs are under development and might change with every new release, as
    there is no need to deprecate before removing.
    We want to expose new APIs to our partners and customers as soon as possible.
    This lets customers and partners develop early prototypes with experimental APIs and
    provides us with important feedback in the early stage of the API. Experimental APIs 
    are not subject to the Versioning policy.

* **Stable**

    Stable APIs are reliable and breaking changes are unlikely. The deprecation period for stable
    APIs is set to 6 months.

* **Locked**

    Locked APIs are extremely reliable and will not be broken unless necessary. The
    deprecation period for locked APIs is set to 12 months.

The stability index can be assigned to the whole API or part of the API.
Different areas of an API can have different Stability Index levels.

!!! Note
    APIs can only be promoted and move to a more reliable Stability Index.

### Deprecation Policy

The Deprecation Policy defines when and how an API is considered to be deprecated.

We aim to minimize the changes to our APIs, but it is sometimes necessary due to
architectural changes and with the introduction of new functionality.

The deprecation period starts when the deprecation has been communicated, which means that it has
been officially documented in the
[Qlik Core documentation](/docs/home.md).
A replacement must be announced at the same time as the deprecation period starts. This gives
you a period in which you can start adapting your custom solution to the API replacement
and prepare for the API change.

The deprecation period varies depending on the maturity of the API, which is set as the stability index.
The deprecation period lasts until the removal has been officially communicated to the API consumer.

The API governance policy applies to both our public and private APIs,
but private APIs are treated differently for deprecations.

### Breaking Change Definition

The Breaking Change Definition is a set of rules that defines if a change is considered to be a backward or
non-backward compatible change.

## Bringing our API Strategy to life

In December 2016, we established the API Governance Policy within Qlik's R&D organization.
This policy ensures that we meet the high standards of our API strategy.

### Qlik Help

We have started to introduce the Stability Index in our Qlik Core
documentation.
This is an ongoing effort and we will continue with future
[Qlik Core documentation](/docs/home.md)
updates.

### Qlik API Insights

Our intention is to be fully transparent to our partners and customers.
Therefore, we have launched
[Qlik API Insights](https://api-insights.qlik.com/?_ga=2.240450371.1316921484.1517254575-1425872494.1511967817#/start-page).
This is a tool that lets you see API changes over time.
With this tool, you can see when something has been added, updated, deprecated, or removed, from an API.
