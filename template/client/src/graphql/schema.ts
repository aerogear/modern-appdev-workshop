export const schema = `
  type Task {
    title: String!
    description: String
  }
    # This is required by buildASTSchema
    type Query { anything: ID }
`;