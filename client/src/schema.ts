export const schema = `
    type Post {
        id:     Int!
        title:  String
        name:  Int
    }
    # This is required by buildASTSchema
    type Query { anything: ID }
`;