import gql from "graphql-tag";
import { TaskFragment } from "../fragments/Task";

export const TaskMutation = gql`
mutation createTask($title: String!, $description: String,  $version: Int) {
    createTask(input: {title: $title, description: $description, version: $version, status: "CREATED"}) {
       ...TaskFields
    }
  }

${TaskFragment}
`
