# Authorization Recipe

Question to answer: How can I make sure my users only see the data they are supposed to see?

There are several variants how to ensure data authorization:

* Segment apps / create apps per authorization target and route the user to the desired app
* On-demand generation of apps, based on the authentication being provided (e.g. typical ODAG scenarios)
* Using one app and use row-/column-based data authorization (section access) to serve the right data to the right audience

These topics does not necessarily require a lot of explanations, short examples/suggestions on how to approach it should be enough.

Internal docs: https://confluence/x/6ZaBB
