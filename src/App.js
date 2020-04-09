import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history';
import UserList from './UserList';
import Login from './Login';
import ChatRoom from './ChatRoom';
import './App.css';

const history = createHistory();

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      let loggedUser = localStorage.getItem('loggedUser');
      if (loggedUser === null) {
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        );
      }
      loggedUser = JSON.parse(loggedUser);
      const restricted = roles && roles.indexOf(loggedUser.role) === -1;
      if (restricted) {
        return (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        );
      }

      return (
        <Component {...props} />
      );
    }}
  />
);

const App = () => {
  return (
    <div className="App">
      <Router history={history}>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/userList" roles={['admin']} component={UserList} />
        <PrivateRoute exact path="/chatroom" component={ChatRoom} />
      </Router>
    </div>
  );
}

export default App;
