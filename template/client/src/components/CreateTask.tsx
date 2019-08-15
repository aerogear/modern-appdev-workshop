import React from 'react';
import { AutoFields, AutoForm, ErrorsField, SubmitField } from 'uniforms-semantic';
import { TaskSchema } from '../graphql/GraphQLBridge';

export const CreateTask: React.FC = () => {
    const mutateTask = (variables: any) => {
        console.log("To be done");
        // client.offlineMutate({
        //   query: TaskMutation,
        //   variables,
        //   updateQuery: {
        //     query: TaskQuery,
        //     variables: {
        //       filterBy: 'some filter'
        //     }
        //   },
        //   returnType: "Note"
        // });
    }

    return (
        <AutoForm schema={TaskSchema} onSubmit={(doc: any) => mutateTask(doc)} >
            <AutoFields />
            <ErrorsField />
            <SubmitField />
        </AutoForm>
    );
}