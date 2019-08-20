import { PubSub } from 'apollo-server'
import express from 'express'
import knex from 'knex'

export interface GraphQLContext {
  pubsub: PubSub,
  req: express.Request
  db: knex<any, unknown[]>
}
