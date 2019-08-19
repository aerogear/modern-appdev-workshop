import { CacheOperation, createOptimisticResponse } from '@aerogear/voyager-client';
import React from 'react';
import { AutoFields, AutoForm, ErrorsField, SubmitField } from 'uniforms-semantic';
import { TaskSchema } from '../graphql/GraphQLBridge';
import { TaskMutation } from '../graphql/mutations/TaskMutation';
import { TaskQuery } from '../graphql/queries/Tasks';
import { useSyncClient } from '../helpers/useDataSyncClient';

export const CreateTask: React.FC = () => {
    const { offlineMutate } = useSyncClient();

    return (
        <AutoForm schema={TaskSchema} onSubmit={(doc: any) =>
            offlineMutate({
                mutation: TaskMutation,
                updateQuery: TaskQuery,
                optimisticResponse: createOptimisticResponse({
                    mutation: TaskMutation,
                    variables: { ...doc, version: 1, status: "OPEN" },
                    operationType: CacheOperation.ADD,
                    returnType: "Task"
                }),
                variables: doc,
                returnType: "Task",
            }).then(() => {
                // Cache is updated so no action here
            }).catch((error) => {
                if (error.networkError && error.networkError.offline) {
                    error.networkError.watchOfflineChange().then(() => {
                        console.log("Change was replicated to server")
                    });
                    console.log("Change enqueued for offline")
                }
                console.log(error);
            })} >
            <AutoFields />
            <ErrorsField />
            <SubmitField />
        </AutoForm>
    );
}
