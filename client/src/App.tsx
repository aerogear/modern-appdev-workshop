import React from 'react';
import './App.css';

import { List } from 'semantic-ui-react'
import { AutoFields, AutoForm, ErrorsField, SubmitField } from 'uniforms-semantic';
import { PostSchema } from './forms/GraphQLBridge';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { graphqlClient } from "./graphql/client"


const allNotesQuery = gql`
{
    findAllNotes {
      id
      title
      description
    }    
}
`;


const App: React.FC = () => {
  return (
    <div className="App">
      <AutoForm schema={PostSchema} onSubmit={doc => createPost(doc, graphqlClient)} >
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

function createPost(variables: any, client: any) {
  const note = gql`mutation {
    createNote(input:{title:"test", description:"test"}){
      title
      description
     }
    }`
  client.offlineMutate({
    query: note,
    variables,
    updateQuery: {
      query: allNotesQuery,
      variables: {
        filterBy: 'some filter'
      }
    },
    returnType: "Note"
  });
}

function Posts() {
  const { loading, error, data } = useQuery(allNotesQuery);

  if (loading) { return <p>Loading...</p>; }
  if (error) { return <p>Error :(</p>; }
  if (!data || !data.findAllNotes) { return <p>No Dara :(</p>; }

  return data.findAllNotes.map(({ title, description }) => (
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
