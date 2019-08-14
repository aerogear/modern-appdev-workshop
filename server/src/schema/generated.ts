import gql from 'graphql-tag'

export const typeDefs = gql`
  type Note {
    id: ID!
    title: String!
    description: String!
    description: String!
    comments: [Comment!]
  }

  type Comment {
    id: ID!
    title: String!
    description: String!
    noteId: ID!
  }

  input NoteInput {
    title: String!
    description: String!
    description: String!
  }

  input CommentInput {
    title: String!
    description: String!
    noteId: ID!
  }

  input NoteFilter {
    id: ID
    title: String
    description: String
    description: String
  }

  input CommentFilter {
    id: ID
    title: String
    description: String
    noteId: ID
  }

  type Query {
    findNotes(fields: NoteFilter!): [Note!]!
    findComments(fields: CommentFilter!): [Comment!]!
    findAllNotes: [Note!]!
    findAllComments: [Comment!]!
  }

  type Mutation {
    createNote(input: NoteInput!): Note!
    createComment(input: CommentInput!): Comment!
    updateNote(id: ID!, input: NoteInput!): Note!
    updateComment(id: ID!, input: CommentInput!): Comment!
  }
`
