<p align="center">
  <a href="//architect.io" target="blank"><img src="https://docs.architect.io/img/logo.svg" width="320" alt="Architect Logo" /></a>
</p>

<p align="center">
  A dynamic microservices framework for building, connecting, and deploying cloud-native applications.
</p>

---

# NodeJS example

It is extremely common to run a REST API with a backend database as a standalone service so that it can be consumed by multiple, disparate applications. In this example, you'll learn how to capture an API written in NodeJS with a Postgres database backend in an Architect component to enable automated deployments, networking and netowork security for your application wherever it gets deployed. 

In the `architect.yml` file for this project, we describe these two services as deployable runtimes. However, we also leverage Architect's [service discovery](//docs.architect.io/components/service-discovery) features to populate environment secrets by reference. This not only allows us to automatically connect the services to each other, but it also allows Architect to build strict network policies to whitelist the traffic between these services. Now we won't have any work ahead of us to promote this stack from local dev all the way through to production readiness!

[Learn more about the architect.yml file](//docs.architect.io/configuration)

## Install the Architect CLI

In order to run this Starter Project, you will need to first [install the Architect CLI](https://docs.architect.io/getting-started/#install-the-cli).
## Running locally

Architect component specs are declarative, so they can be run locally or remotely with a single deploy command:

```sh
# Clone the repository and navigate to this directory
$ git clone https://github.com/architect-templates/node-rest-api
$ cd architect-templates/node-rest-api

# Register the component to the local registry
$ architect link .

# Deploy using the dev command
$ architect dev node-rest-api
```

Once the deploy action has completed, you can reach your new service by going to http://app.arc.localhost/. This simple example will display a message, but the steps to running a Node.js REST API locally using the Architect CLI is just as simple, regardless of the complexity of the API.

## Deploying to the cloud

Want to try deploying this to a cloud environment? Architect's got you covered there too! Just click the button below to deploy it to a sample Kubernetes cluster powered by Architect Cloud:

[![Deploy Button](https://docs.architect.io/deploy-button.svg)](https://cloud.architect.io/examples/components/node-rest-api/deploy?tag=latest&interface=app%3Aapp)

Alternatively, if you're already familiar with Architect and have your own environment registered, you can use the command below instead:

```sh
$ architect deploy node-rest-api -a <account-name> -e <environment-name>
```
