import gql from "graphql-tag";
import { TaskFragment } from "../fragments/Task";

export const TaskQuery = gql`
  ${TaskFragment}
  
  query findAllTasks {
    findAllTasks{
      ...TaskFields
    }
  }
`
