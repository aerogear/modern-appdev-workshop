import cors from "cors"
import express from "express"
import { makeExecutableSchema } from 'graphql-tools';
import http from "http"
import { useSofa } from "sofa-api"

import { VoyagerServer } from '@aerogear/voyager-server';

import config from "./config/config"
import { connect } from "./db"
import { resolvers, typeDefs } from "./mapping"
import { pubsub } from './subscriptions'

async function start() {
  const app = express()

  app.use(cors())

  app.get("/health", (req, res) => res.sendStatus(200))

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  app.use("/rest", useSofa({
    schema,
  }))

  // connect to db
  const client = await connect(config.db);

  const apolloConfig = {
    typeDefs,
    resolvers,
    context: async ({
      req
    }: { req: express.Request }) => {
      // pass request + db ref into context for each resolver
      return {
        req: req,
        db: client,
        pubsub
      }
    }
  }
  let keycloakService;

  // if a keycloak config is present we create
  // a keycloak service which will be passed into
  // ApolloVoyagerServer
  if (config.keycloakConfig) {
    keycloakService = new KeycloakSecurityService(config.keycloakConfig)
  }

  const apolloServer = VoyagerServer({
    typeDefs,
    resolvers,
    context: async ({
      req
    }: { req: express.Request }) => {
      // pass request + db ref into context for each resolver
      return {
        req: req,
        db: client,
        pubsub
      }
    }
  }, {});

  apolloServer.applyMiddleware({ app })

  const httpServer = http.createServer(app)
  apolloServer.installSubscriptionHandlers(httpServer)

  httpServer.listen({ port: config.port }, () => {
    console.log(`🚀  Server ready at http://localhost:${config.port}/graphql`)
  })
}

start()
