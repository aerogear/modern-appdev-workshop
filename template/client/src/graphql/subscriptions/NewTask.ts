


import gql from "graphql-tag";
import { TaskFragment } from "../fragments/Task";

export const TaskCreateSubscription = gql`
subscription newTask {
    newTask {
        ...TaskFields
    }
}

${TaskFragment}
`

