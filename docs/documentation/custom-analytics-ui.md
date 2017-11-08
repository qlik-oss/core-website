# Custom Analytics UI

This page outlines the different aspects of using Frontira in a real scenario. It is exemplified here
by using a fictive company we call _Qliktive_, going through their different requirements, their product
scope, with parts of their system design.

!!! note
    You can visit a live deployment running on AWS here: [https://ca.qliktive.com/](https://ca.qliktive.com/)

## Background

A company is opening a medical data portal. This portal proposes some advanced analysis capabilities on drugs/treatment/reactions.
It targets the world-wide population of doctors and works with an annual subscription.
Even if the audience is more or less predictable, some seasonal or sudden epidemic events can affect the traffic.
With the auto-medication trend, the company also plan to open this service to the public.

## Business Requirements

* The portal should be able to serve peak traffic of around 10.000 simultaneous connections with an average of 500
  on the given data model.
* The portal should run with minimal downtime,
  rolling updates of the web application should be possible without any downtime.

## Technical Requirements

* The company is already using Docker and Docker Swarm Mode in complementary backend system of this portal.
* AWS is the preferred cloud provider, although the implementation should allow to move to another cloud provider
  (e.g. DigitalOcean) or to an on-prem deployment with minimal efforts.
* The implementation should meet industry best practices in terms of being able to monitor the system.

## Functional Requirements

* As a dev-ops I want to provision and run docker nodes hosting the portal
  so that I can support peak traffic around 10.000 simultaneous connections and an average of 500 on the given data model.
* As a dev-ops I want to be able to update my system without interruption of the service.
* As an end-user I want to be able to use a UI tailored for my needs so I can quickly find the insights I need.
* As an end-user I want to be able to stay logged in so that I can access the portal conveniently.

## Detailed Functional Requirements

### Scaling

* While it is a basic assumption of this use-case, that scaling is done manually,
  I'd like to know as a developer where I could hook into the APIs to create my custom, fully automated scaling strategy.

### Monitoring

* As a dev-ops I want to be able to monitor the system and find potential issues.
* As a dev-ops I want to be able to monitor all log-files from all services/containers.
* As a dev-ops I want to be able to analyze the number of page-hits/sessions over time.
* As a dev-ops I want to be able to get typical web-page KPIs out of the system
  (page-hits, sessions, up-time, down-time, reliability, etc.)
* As a dev-ops I want to be able to get some information from the monitoring-system about the whether
  I should scale up/down the system (based on the assumption mentioned above that scaling is done manually.)
* As a dev-ops I want to be able to see how the QiX Engine containers are behaving,
  including getting detailed log-files and error-messages.

### Testing

* As a dev-ops I expect basic e2e tests.
* As a dev-ops I expect stress-tests to find out the limits of the given setup
  (machines & number of distributed services), examples of these limits may be:
    * Max requests/hits handled per sec.
    * Failure rate / Errors per second.
    * Avg/Min/Max response time.
    * Latency.
    * Number of users handled by the system.
* When using the stress-tests mentioned above,
  I - as a dev-ops - expect to be able to configure key-settings, which drive the behavior of the stress-test:
    * Number of concurrent users.
    * Activity pattern of users (just watching, heavily making selections, etc.).

## Assumptions

* Initially, all users need to be logged in to use the portal.
* The scaling will be done manually with the help of scripts and will depend on the anticipated traffic.
* The data set (no dynamic data reduction) is the same for every end-user.
* The data reload is usually every quarter when FDA releases them.
* A subscription model won't be implemented (rely on authentication permissions only.)

## Data

This use case is characterized by a [single qvf](./fda-drug-cases.qvf) with the following data model:

![Data model](../images/custom-analytics-ui/data-model.png)

## UI

The main benefit for doctors is to be able to narrow analysis based on advanced collection of demographic criteria
(gender, weight, origin etc.).

The web application presents information in four main tabs focusing on:

* filters
* prescription viz/table
* side effects/reactions viz/table
* report

(There will be multiple objects on each single page)

![Portal UI](../images/custom-analytics-ui/portal-ui.png)

## System Design

This use case is about scaling the QIX Engine in a configuration of

* One document
* Multiple users

Scaling up QIX Engine needs to be done only to reduce load as a consequence of multiple users access the system simultaneously.
All QIX Engine instances are equivalent and there is no need to have a certain QIX Engine instance service a certain user
since all users access the same single document.

![QIX Engine Session Management](../images/custom-analytics-ui/session-management.png "QIX Engine Session Management")

### Authentication

This section explains how authentication will take place in the Qliktive example environment.

This design was created with the following assumptions/requirements in mind:

* Third party identity provider integration.
* It should be possible to login.
* It should be possible to logout.
* All back-end services depends on JWTs as the means of authentication.
* WebSockets MUST work (i.e. we cannot depend on being able to set headers on the HTTP upgrade request).

Note: This design aims to solve interactive login scenarios.
Accessing services programmatically requires a different mean of authorization (e.g. by the use of API-keys).
The proposed solution is flexible enough to allow future support for API-keys if needed.

These assumptions/requirements are realized by:

* GitHub has been selected as the Identity Provider, but it could easily be replaced by any OAuth2 compatible identity provider.
* To handle login/logout, the concept of a session is needed.
  The session will be maintained in a session database. The session identifier will be set in a client-side session cookie.
* As back-end services utilizes JWTs (which are stateless and cannot be revoked),
  JWTs are associated with sessions (which by definition represents a state).
  I.e. JWTs are stored in the session database.
* JWTs MUST NOT be sent to the client. If a JWT is leaked into client space,
  there is no way of revoking the JWT (i.e. not possible to logout).
* Logout is realized by removing the session from database.
* The session cookie will be included in the WebSocket HTTP upgrade request.

The following components are involved in authentication:

| Component | Responsibility |
|-----------|----------------|
| Gateway | <ul><li>Routes traffic to designated services.</li><li>Transforms stateful sessions into stateless JWTs.</li><ul> |
| Identity Provider | <ul><li>Provide identifiers for users who wish to interact with the system.</li><li>Verifies user credentials.</li></ul> |
| Session DB | <ul><li>Keeps track of logged in users by storing sessions.</li></ul> |
| Authentication Service | <ul><li>Interacts with the Identity Provider.</li><li>Create sessions.</li><li>Issues JWTs.</li><li>Maintains the session database.</li></ul> |

#### Login sequence diagram

![Login Sequence Diagram](../images/custom-analytics-ui/login-sequence.png)

##### 0 and 1: Initiate login sequence

The login sequence is initiated (0) when:

1. the user clicks the login button, or
1. when the user requests a protected resource that requires authentication

Either way, the browser will request the login endpoint which is routed to the authentication service (1).
Note: If the login sequence is initiated by requesting a protected resource,
the Gateway will direct the user to /login  (not shown in the above sequence chart).

##### 2, 3 and 4: Identity provider interaction

The user will be redirected to the GitHub identity provider, application specific payload,
such as the client ID will be added to the URL (2).
The "request GitHub access page" will be requested and displayed (3).
GitHub will request tThe user will have The displayed page will request the user to login (if not logged in already).
The user will decide whether to grant access or not.
Note: this is a one-shot, once our application has been granted access no additional UI will be displayed (4).

##### 5 and 6: Redirect (callback) to Authentication Service

Once access has been granted, the user will be redirected (5) back to the Authentication Service
with a one time authorization code (6).

##### 7, 8, 9 and 10: Exchange authorization code for an access token

The Authentication Service will exchange the temporary authorization code for a permanent access token (7).
At this point the user is considered to be logged in.
Next, a session and a JWT is created (8) and stored into the session database (9).
Finally, the user is redirected back to original URL, the session ID is set as a cookie (10).

##### 11, 12 and 13: Request protected resources

Once logged in, the user may request a protected resource, e.g. the engine service (11).
The Gateway will pick up the session cookie and use its value to fetch the JWT from the session database (12).
When routing the request, the Gateway will remove the cookie
and add the JWT in the Authorization header using the Bearer schema (13).

#### Threats and Countermeasures

| Reference | Risk | Threat | Countermeasure | Implementation | Verification | Comment |
|-----------|------|--------|----------------|----------------|--------------|---------|
| Ref in seq. | L/M/H | THREAT | COUNTERMEASURE ||||
| 10 | H | An attacker exploits a weakness in the cookie configuration|The session cookie must:<ol><li>have the `Secure` attribute set</li><li>have the `HttpOnly` attribute set</li></ol> |
| 11 | H | An attacker sets the _Authorization_ header from the outside | The gateway must reject all requests containing the _Authorization_ header.||||
| 13 | M | An internal service accidentally leaks _Authorization_ header in response | The gateway must remove all _Authorization_ headers in responses||||

#### Further reading

* [https://jwt.io/](https://jwt.io/)
* [http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/](http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/)
* [http://cryto.net/~joepie91/blog/2016/06/19/stop-using-jwt-for-sessions-part-2-why-your-solution-doesnt-work/](http://cryto.net/~joepie91/blog/2016/06/19/stop-using-jwt-for-sessions-part-2-why-your-solution-doesnt-work/)
* [https://developer.github.com/v3/oauth/](https://developer.github.com/v3/oauth/)
