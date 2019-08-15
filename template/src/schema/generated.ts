import gql from 'graphql-tag'

export const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    version: Int
    description: String
    status: String
  }

  input TaskInput {
    title: String!
    version: Int
    description: String
    status: String
  }

  input TaskFilter {
    id: ID
    title: String
    version: Int
    description: String
    status: String
  }

  type Query {
    findTasks(fields: TaskFilter!): [Task!]!
    findAllTasks: [Task!]!
  }

  type Mutation {
    createTask(input: TaskInput!): Task!
    updateTask(id: ID!, input: TaskInput!): Task!
  }
`
