export const schema = `
    type Post {
        id:     Int!
        name:  String
        title:  String
    }
    # This is required by buildASTSchema
    type Query { anything: ID }
`;