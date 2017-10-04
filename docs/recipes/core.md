# Core

## What is Core

The core project demonstrates how to deploy Frontira using different orchestration tools. 
The purpose is to simplify and help you get started with, and build upon Frontira. 

### Orchestration tools

We demonstrate how to get up and running with Docker Swarm and Kubernetes.

## What services does Core consists of?

### Engine

The Qix engine service. 

### Mira

Mira is our QIX Engine Discovery Service. It provides an API designed to be consumed internally by other services, to list (or query) all available QIX Engine containers in the cluster. 
Read more here: https://github.com/qlik-ea/mira

### License-service
License service is used to validate a license and to unlock the QIX Engine service.