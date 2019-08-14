import React from 'react';
import './App.css';

import { List } from 'semantic-ui-react'
import { AutoFields, AutoForm, ErrorsField, SubmitField } from 'uniforms-semantic';
import { PostSchema } from './graphql/GraphQLBridge';

import { useQuery } from '@apollo/react-hooks';
import { TaskQuery } from './graphql/queries/Tasks';

const App: React.FC = () => {
  return (
    <div className="App">
      <AutoForm schema={PostSchema} onSubmit={(doc: any) => createTask(doc)} >
        <h4>Create new element</h4>
        <AutoFields />
        <ErrorsField />
        <SubmitField />
      </AutoForm>
      <h4>List of elements</h4>
      <Posts />
    </div>
  );
}

function createTask(variables: any) {
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

function Posts() {
  const { loading, error, data } = useQuery(TaskQuery);

  if (loading) { return <p>Loading...</p>; }
  if (error) { return <p>Error :(</p>; }
  if (!data || !data.findAllTasks) { return <p>No Data :(</p>; }

  console.log("Data from server", data.findAllTasks);

  return data.findAllTasks.map(({ title, description }) => (
    <List>
      <List.Item>
        <List.Content>
          <List.Header >{title}</List.Header>
          <List.Description> {description}</List.Description>
        </List.Content>
      </List.Item>
    </List>
  ));
}

export default App;
