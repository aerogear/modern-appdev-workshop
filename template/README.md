## Ref. GraphBack Mobile Developer Services Template 

Starter template using graphback and AeroGear technologies, 
Uses sofa-api to allow users use RESTfull api with GraphQL.

### Usage
The project has been created using `graphback`. Run the project using the following steps. 
- Start the database
```
docker-compose up -d
```
- Generate resources(schema and resolvers) and create database
```
graphback generate
graphback db
```
- Start the server
```
npm start
```
- The REST api is exposed in `/rest` endpoint.
