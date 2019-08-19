import gql from "graphql-tag";
import { TaskFragment } from "../fragments/Task";

export const TaskMutation = gql`
mutation createTask($title: String!, $description: String) {
    createTask(input: {title: $title, description: $description, version: 1, status: "open"}) {
       ...TaskFields
    }
  }

${TaskFragment}
`

