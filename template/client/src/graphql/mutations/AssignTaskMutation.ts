import gql from "graphql-tag";

export const AssignTaskMutation = gql`
mutation assign($id: ID!, $status: String!, $version: Int!) {
  assign(id: $id, status: $status, version: $version) {
    id,
    status,
    version
  }
}
`
