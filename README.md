<p align="center">
  <a href="//architect.io" target="blank"><img src="https://docs.architect.io/img/logo.svg" width="320" alt="Architect Logo" /></a>
</p>

<p align="center">
  A dynamic microservices framework for building, connecting, and deploying cloud-native applications.
</p>

---

<p align="center">
  <a href="//nodejs.org" target="blank"><img src="https://nodejs.org/static/images/logo.svg" width="320" alt="Node.js Logo" /></a>
</p>

<p align="center">
  Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
</p>

---

# Node.js Starter Project
It is extremely common to run a REST API with a backend database as a standalone service so that it can be consumed by multiple, disparate applications. 

In this example, you'll learn how to capture an API written in Node.js with a Postgres database backend in an Architect component to enable automated deployments, networking and network security for your application - wherever it gets deployed. 

In the `architect.yml` file for this project, we describe these two services as deployable runtimes. However, we also leverage Architect's [service discovery](//docs.architect.io/components/service-discovery) features to populate environment secrets by reference. This not only allows us to automatically connect the services to each other, but it also allows Architect to build strict network policies to whitelist the traffic between these services. Now we won't have any work ahead of us to promote this stack from local dev all the way through to production!

[Learn more about the architect.yml file](//docs.architect.io/configuration)

## Using the API
This API has a single endpoint, `/sign-ups`, which can be accessed with an http POST request to create new sign ups in the backend database or an http GET request to view all signups. This API can be consumed by one or more front-end applications to faciliate a sign up workflow. 

The POST method accepts this simple JSON payload:

```
  {
    "name": "string",
  }
```

The GET request returns the sign up records in the following JSON payload:
```
 [
   {
    "name": "string",
    "created_at": "string",
    "updated_at": "string"
  }
 ] 
```

## Running Locally

Architect component specs are declarative, so they can be run locally or remotely.

```sh
# Clone the repository and navigate to this directory
$ git clone https://github.com/architect-templates/node-rest-api.git
$ cd ./architect-templates/node-rest-api

# Deploy locally using the dev command
$ architect dev node-rest-api .
```

Once the deploy action has completed, you can reach your new service by going to http://api.arc.localhost/sign-ups.

## Deploying to the Cloud

Want to try deploying this to a cloud environment? Architect's got you covered there, too! It only takes a minute to [sign up for a free account](https://auth.architect.io/u/signup?state=hKFo2SAtSnhOdXljdy1nelBHb2NlajNhZkkybTlLOEJHcWRFeaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIFNCNEZUUFBHaWpBdlA3UVlVV0xFNk1rQVJvUHBzdF9Bo2NpZNkgbElwVzlmcTlJRlFCQmpUZ2xsaE42RUkwMVRYTWhSVm0).

You can then [register the component](https://docs.architect.io/getting-started/?_ga=2.19805311.635236263.1652126693-1328677302.1650395826#register-a-component) to your free environment and [deploy the component](https://docs.architect.io/getting-started/introduction/#deploy-to-the-cloud) using the commands below from the `node-rest-api` directory. 

The `<account-name>` is the name you used when you created your account in Architect Cloud. Use "example-environment" for the `<environment-name>` to deploy to the free environment that is created when you register with Architect. 

```sh
# Register and tag the component with Architect Cloud's component registry
$ architect register . --tag latest --account <account-name>

# Deploy to Architect Cloud
$ architect deploy node-rest-api -a <account-name> -e <environment-name>
```
