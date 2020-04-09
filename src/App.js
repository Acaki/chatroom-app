import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history';
import UserList from './UserList';
import Login from './Login';
import './App.css';

const history = createHistory();

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('loggedUser') !== null ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )}
  />
);

const App = () => {
  return (
    <div className="App">
      <Router history={history}>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/userList" component={UserList} />
      </Router>
    </div>
  );
}

export default App;
