# Use case: Custom Analytics UI

**WORK IN PROGRESS**

## Background

A company is opening a medical data portal. This portal proposes some advanced analysis capabilities on drugs/treatment/reactions. It targets the world-wide population of doctors and works with an annual subscription. Even if the audience is more or less predictable, some seasonal or sudden epidemic events can affect the traffic. With the auto-medication trend, the company also plan to open this service to the public.

## Story

* As a dev-ops I want to provision and run docker nodes hosting the portal so that I can support peak traffic around 10.000 simultaneous connections and an average of 500 on the given data model.
* As a dev-ops I want to be able to update my system without interruption of the service.
* As a dev-ops I want to be able to monitor the system and find potential issues.
* As an end-user I want to be able to use a UI tailored for my needs so I can quickly find the insights I need.
* As an end-user I want to be able to stay logged in so that I can access the portal conveniently.

## Assumptions/scope

* Initially, all users need to be logged in to use the portal.
* Deployed on-prem and/or cloud (aws, digitalocean, etc.) with very little differences.
* The scaling will be done manually with the help of scripts and will depend on the anticipated traffic.
* The data set (no dynamic data reduction) is the same for every end-user.
* The data reload is usually every quarter when FDA releases them.
* A subscription model won't be implemented (rely on authentication permissions only).

## Data

This use case is characterized by a [single qvf](./fda-drug-cases.qvf) with the following data model:

![Data model](./data-model.png)

## UI

The main benefit for doctors is to be able to narrow analysis based on advanced collection of demographic criteria (gender, weight, origin etc.).

The web application presents information in four main tabs focusing on:

* filters
* prescription viz/table
* side effects/reactions viz/table
* report

![Portal UI](./portal-ui.png)

## System Design

_NOTE: The design documentation is work in progress. More information will be added on a regular basis._

This use case is about scaling the QIX Engine in a configuration of
- One document
- Multiple users

Scaling up engines needs to be done only to reduce load as a consequence of multiple users access the system simultaneously. All engine instances are equivalent and there is no need to have a certain engine service a certain user since all users access the same single document.

More information here

[QIX Engine Session Management](./system-design/session-management.md)
