import gql from "graphql-tag";
import { TaskFragment } from "../fragments/Task";

export const TaskQuery = gql`
  query findAllTasks {
    findAllTasks{
      ...TaskFields
    }
  }

  ${TaskFragment}
`
