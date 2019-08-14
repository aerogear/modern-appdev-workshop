export const schema = `
  type Task {
    id: ID!
    title: String!
    version: Int
    description: String
    status: String
  }
    # This is required by buildASTSchema
    type Query { anything: ID }
`;