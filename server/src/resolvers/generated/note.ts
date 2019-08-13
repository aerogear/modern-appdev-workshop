import { GraphQLContext } from '../../context'

export const noteResolvers = {
  Note: {
    comments: (parent: any, _: any, context: GraphQLContext) => {
      return context.db.select().from('comment').where('noteId', '=', parent.id)
    }
  },

  Query: {
    findNotes: (_: any, args: any, context: GraphQLContext) => {
      return context.db.select().from('note').where(args.fields)
    },
    findAllNotes: (_: any, __: any, context: GraphQLContext) => {
      return context.db.select().from('note')
    }
  },

  Mutation: {
    createNote: async (_: any, args: any, context: GraphQLContext) => {
      const result = await context.db('note').insert(args.input).returning('*')
      return result[0]
    },
    updateNote: (_: any, args: any, context: GraphQLContext) => {
      return context.db('note').where('id', '=' , args.id).update(args.input).then( async () => {
        const result = await context.db.select().from('note').where('id', '=' , args.id);
        return result[0]
    })}
  }
}
