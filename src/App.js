import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history';
import UserList from './UserList';
import Login from './Login';
import './App.css';

const history = createHistory();

const App = () => {
  return (
    <div className="App">
      <Router history={history}>
        <Route path="/login" component={Login} />
        <Route path="/userList" component={UserList} />
      </Router>
    </div>
  );
}

export default App;
