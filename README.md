# Enterprise Mobile AppDev Workshop
 
Workshop for enterprise enabled modern application development using 
AeroGear and Mobile Developer service technologies

## General information

This tutorial is backed by https://github.com/aerogear/modern-appdev-workshop github repository.

This repository is designed to be working as template for `graphback` command line client.

`./template` folder will contain graphback server template used to initialize project.
`./template/client` contains react application that can be used to contact server

When using `graphback` template will be instantiated as your own project with:

- `/` will contain server side code
- `./client` will contain client side code we created using `create-react-app` 

Please reffer to `completed` branch for finished version of this tutorial

## Introduction

This workshop focused on deploying fully functional web application server using 

- Node.js Server exposing GraphQL and REST API
- React.js Client PWA application

Workshop was divided into following sections:

- A) Creating Server side using Graphback client
- B) Reviewing React Based client implementation
- C) Implementing offline support and conflict handling for client and server
- D) Building your first container and provisioning application to OpenShift
- E) Configuring Authentication using MDC

## Prerequisites

- Node.js LTS 10 
- Docker and docker-compose
- Visual Studio Code (or other IDE)

## Workshop Steps

### A) Bulding your first GraphQL server using AeroGear GraphBack

Graphback command line tool (https://graphback.dev) allows developers 
to generate fully functional Node.js based server that will be offering 
GraphQL and RESTfull API out of the box based on developer provided business model.
Graphback generates general data access methods like find, create, delete etc. along with 
live updates called subscriptions.

In this chapter we are going to build a sample Task application that will
be based on custom server template we have provided.

Example server contains following technologies:

- AeroGear Voyager Server (including audit log, etrics and keycloak integration)
- Postgres database
- Apollo GraphQL server (Express.js based)

#### Steps

1. Install graphback client
```
 npm install -g graphback-cli
```
2. Create new project based on template
```
graphback init node-workshop ---templateUrl=https://github.com/aerogear/modern-appdev-workshop
```
In cmd please answer questions as follows:
```
? Do you want to include a example model? No
? Choose your database PostgreSQL
```
3. Change directory into project folder
```
cd node-workshop
```
4. Review the `Task.graphql` file inside `model` with your GraphQL types.
This file was added as part of the template. GraphBack allows you to 
provide your own business logic, but for this example we going use one that
was provided as part of the template. 
We can extend it later as part of the hackaton.

5. Subscriptions are used in GraphQL to enable live updates of information. Graphback can help with subscriptions.
Open `config.json` in the root of the directory and enable the `subCreate` flag.
```
 "subCreate": true,
```
This flag is used to tell graphback that we would like to generate the Subscriptions, particularly when a schema type is created.

6. Run `graphback generate` to generate schema and resolvers

7. Run `docker-compose up -d` to run your database and `graphback db` to create database resources in postgres database.

8. Run `npm run start` to start the server

9. Server will be ready at http://localhost:4000/graphql

10. Server offers the playground as way to interact with its API.
It is loaded with example queries that can be used to access data
through the playground and execute GraphQL queries - createTask, updateTask etc.
Please try to execute some operations directly in the server. 

Playground will also offer documentation for all available operations that we can replicate back to server

### B) Bulding Your first GraphQL Client with React, GraphQL and AeroGear DataSync

Server side template comes with client folder that will contain React.js 
project boilerplate. We have initialized project using create-react-app
and applied following projects

- React.js TypeScript template
- *AeroGear Voyager Client* that will offer *Data Synchronization* and 
*Conflict resolution*.
- *Uniforms* - Library for building GraphQL forms based on GraphQL schema.

#### Steps

1. Navigate to `./client`
2. Install required dependencies for the project
```
npm install 
```
3. Run project
```
npm run start 
```
3. At this point we should see web application connecting with server and 
using autogenerated api. Create Task operation is still not implemented.
We going to focus on that in the next chapter of the tutorial

### C) [Optional] Implementing Offline support and Conflict resolution in your applications

In this step we can use power of Graphback custom method generator together with the Conflict detection and resolution 
capaibilities of the Voyager framework. We going to create custom GraphQL implementation for server that will ensure data consistency
and then connect it with the client application.

Voyager-server allows out of the box conflict resolution based on implementations - like `version` field marker in model, but for this use case 
we decided to show you how this works under the hood.

1. Navigate to `./model/Task.graphql` and copy the following code: 

```graphql
type Mutation {
  assign(id: ID!, status: String!, version: Int!):Task
}
```

2. Regenerate backend using `graphback generate` 
This will create empty function we can implement in the next step.

3. Go to `src/resolvers/custom/assign.ts`. This file will contain custom 
implementation that we can use to implement task assignment.

4. Copy code from `./tutorial/assign.ts-template` to `assign.ts` file

5. Restart server

6. At this point, we can make requests to the server that will be checked for integrity. 
When we pass an outdated version server will return an error.

7. We can now connect our app with the server.
Go to `client/src/components/AssignTask.tsx`, delete line 6, 7, 8 and uncomment
the code responsible for sending mutation back to the server

8. Now open the application and you should see version changing when 
toggle is pressed.

### D. Deployment to OpenShift

#### Prerequisites

* Create an account on [Dockerhub](https://hub.docker.com/)

An OpenShift template is provided to deploy the backend server on OpenShift.

#### Steps

1. Log in to the Dockerhub Registry

```bash
docker login
```

2. Build the application into a docker image.

```bash
docker build -t <dockerhubusername>/<imagename>:latest . # ex: docker build -t aerogear/graphback-demo:latest .
```

3. Push the image to Dockerhub

```bash
docker push <dockerhubusername>/<imagename>:latest
```

4. Create the OpenShift template in a namespace of your choice

```bash
oc process -f openshift-template.yml --param APPLICATION_IMAGE=<dockerhubusername>/<imagename>:latest | oc create -f -
```

#### Cleanup

```bash
oc process -f openshift-template.yml --param APPLICATION_IMAGE=<dockerhubusername>/<imagename>:latest | oc delete -f -
```

### E) Enabling Auth Service (Keycloak) for application

TODO - MDC focused tutorial
