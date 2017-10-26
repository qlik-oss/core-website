### DNS mode

In DNS mode Mira assumes that any DNS queries for the string defined as `MIRA_DISCOVERY_HOSTNAME` returns all the qix engine instances in the orchestration. In this mode there is no need to set labels on your container/pod as in previous modes, instead the hostname to query for will differ dependending on orchestration.

An example for how this is configured for Docker Swarm is found [here](./examples/dns/docker-compose-dns.yml).
