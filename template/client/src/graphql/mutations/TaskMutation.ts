import gql from "graphql-tag";
import { TaskFragment } from "../fragments/Task";

export const TaskMutation = gql`
${TaskFragment}

mutation createTask($title: String!, $description: String,  $version: String) {
    createTask(input: {title: $title, description: $description, version: $version, status: "CREATED"}) {
       ...TaskFields
    }
  }
`
