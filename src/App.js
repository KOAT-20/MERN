import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
// Componens
import Navigation from './components/navigation.js';
import NoteList from './components/notes_list.js';
import CreateNote from './components/create_note.js';
import CreateUser from './components/create_user.js';

function App() {
  return (
    <Router>
      <Navigation />
      <Route exact path="/" component={NoteList}></Route>
      <Route path="/edit/:id" component={CreateNote}></Route>
      <Route path="/createNote" component={CreateNote}></Route>
      <Route path="/createUser" component={CreateUser}></Route>
    </Router>
  );
}

export default App;
