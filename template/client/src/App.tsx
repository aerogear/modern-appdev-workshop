import React from 'react';
import './App.css';
import { CreateTask } from './components/CreateTask';
import { Tasks } from './components/ListTask';

const App: React.FC = () => {
  return (
    <div className="App">
      <h4>Create Task</h4>
      <CreateTask/>
      <h4>Task List</h4>
      <Tasks />
    </div>
  );
}





export default App;
