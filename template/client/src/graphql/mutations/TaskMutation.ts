import gql from "graphql-tag";
import { TaskFragment } from "../fragments/Task";

export const TaskMutation = gql`
${TaskFragment}

mutation createTask($title: String!, $description: String) {
    createTask(input: {title: $title, description: $description, status: "CREATED"}) {
       ...TaskFields
    }
  }
`
