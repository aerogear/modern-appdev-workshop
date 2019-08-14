import gql from "graphql-tag";

export const TaskMutation = gql`
mutation createTask($title: String, $description: String) {
    createTask(input: {title: $title, $description: "test", status: "CREATED"}) {
       ...TaskFields
    }
  }
`
