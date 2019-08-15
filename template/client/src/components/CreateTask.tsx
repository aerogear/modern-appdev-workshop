import { useMutation } from '@apollo/react-hooks';
import { createOptimisticResponse, CacheOperation } from 'offix-client';
import React from 'react';
import { AutoFields, AutoForm, ErrorsField, SubmitField } from 'uniforms-semantic';
import { TaskSchema } from '../graphql/GraphQLBridge';
import { TaskMutation } from '../graphql/mutations/TaskMutation';

export const CreateTask: React.FC = () => {
    const [createTaskMutation, { data }] = useMutation(TaskMutation, {
        // ????
        // optimisticResponse: createOptimisticResponse({
        //     mutation: TaskMutation,
        //     variables: { some_key: "some_value" },
        //     operationType: CacheOperation.ADD,
        //     returnType: "Task"
        // })
        // update: () => {
        // },
        context: { returnType: "Task" }
    });


    return (
        <AutoForm schema={TaskSchema} onSubmit={(doc: any) =>
            createTaskMutation({ variables: doc })} >
            <AutoFields />
            <ErrorsField />
            <SubmitField />
        </AutoForm>
    );
}
