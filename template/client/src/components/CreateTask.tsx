import { CacheOperation, createOptimisticResponse, getUpdateFunction } from '@aerogear/voyager-client';
import { useMutation } from '@apollo/react-hooks';
import React from 'react';
import { AutoFields, AutoForm, ErrorsField, SubmitField } from 'uniforms-semantic';
import { TaskSchema } from '../graphql/GraphQLBridge';
import { TaskMutation } from '../graphql/mutations/TaskMutation';
import { TaskQuery } from '../graphql/queries/Tasks';

export const CreateTask: React.FC = () => {
    const [createTaskMutation, { data }] = useMutation(TaskMutation, {
        context: { returnType: "Task" }
    });

    const updateFunction = getUpdateFunction({
        mutationName: 'createTask',
        updateQuery: TaskQuery
    });

    return (
        <AutoForm schema={TaskSchema} onSubmit={(doc: any) =>
            createTaskMutation({
                variables: doc,
                // refetchQueries: TaskQuery,
                context: { returnType: "Task", updateFunction: updateFunction },
                optimisticResponse: createOptimisticResponse({
                    mutation: TaskMutation,
                    variables: { ...doc, version: 1, status: "OPEN" },
                    operationType: CacheOperation.ADD,
                    returnType: "Task"
                }),
                update: updateFunction
            }).catch((error) => {
                    if (error.networkError && error.networkError.offline) {
                        console.log("Change is offline")
                    }
                    console.log(error);
                })} >
            <AutoFields />
            <ErrorsField />
            <SubmitField />
        </AutoForm>
    );
}
