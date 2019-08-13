import React from 'react';
import './App.css';

import { AutoFields, AutoForm, ErrorsField, SubmitField } from 'uniforms-semantic';
import { PostSchema } from './forms/GraphQLBridge';

const App: React.FC = () => {
  return (
    <div className="App">
      <AutoForm schema={PostSchema} onSubmit={console.log} >
        <h4>Create new element</h4>
        <AutoFields />
        <ErrorsField />
        <SubmitField />
      </AutoForm>
      <h4>List of elements</h4>
    </div>
  );
}

export default App;
