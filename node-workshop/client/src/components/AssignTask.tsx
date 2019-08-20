import { AssignTaskMutation } from "../graphql/mutations/AssignTaskMutation";
import { TaskQuery } from "../graphql/queries/Tasks";


export const taskAssignment = (offlineMutate: any) => {
    // return () => {
    //     console.log("To be implemented");
    // }
    const assignTask = (id: string, status: string, version: number) => {
        console.log('assign task', status)
        offlineMutate({
            mutation: AssignTaskMutation,
            updateQuery: TaskQuery,
            variables: { id, status, version },
            returnType: "Task",
        }).then(() => {
            // Cache is updated so no action here
        }).catch((error) => {
            if (error.networkError && error.networkError.offline) {
                error.networkError.watchOfflineChange().then(() => {
                    console.log("Change was replicated to server")
                });
                console.log("Change enqueued for offline")
            } else {
                console.log(error);
            }
        })
    }
    return assignTask;
}
