import { GraphQLContext } from '../../context'

 enum Subscriptions {
  NEW_TASK = 'newtask'
}

export const taskResolvers = {
  Query: {
    findTasks: (_: any, args: any, context: GraphQLContext) => {
      return context.db.select().from('task').where(args.fields)
    },
    findAllTasks: (_: any, __: any, context: GraphQLContext) => {
      return context.db.select().from('task')
    }
  },

  Mutation: {
    createTask: async (_: any, args: any, context: GraphQLContext) => {
      const result = await context.db('task').insert(args.input).returning('*')
      context.pubsub.publish(Subscriptions.NEW_TASK, {
        newTask: result[0]
      })
      return result[0]
    },
    updateTask: (_: any, args: any, context: GraphQLContext) => {
      return context.db('task').where('id', '=' , args.id).update(args.input).then( async () => {
        const result = await context.db.select().from('task').where('id', '=' , args.id);
        return result[0]
    })}
  },

  Subscription: {
    newTask: {
      subscribe: (_: any, __: any, context: GraphQLContext) => {
        return context.pubsub.asyncIterator(Subscriptions.NEW_TASK)
      }
    }
  }
}
