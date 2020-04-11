import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import UserList from './UserList';
import ChatRoom from './ChatRoom';
import { useAuthDataContext } from './AuthDataProvider';

const PrivateRoute = ({ roles, component, ...options }) => {
  const { role } = useAuthDataContext();
  if (!role) {
    return (
      <Route {...options} component={Login} />
    );
  }
  const restricted = roles && roles.indexOf(role) === -1;
  if (restricted) {
    return (
      <Route {...options} />
    );
  }

  return <Route {...options} component={component} />;
};

const Router = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <PrivateRoute exact path="/userList" roles={['admin']} component={UserList} />
    <PrivateRoute exact path="/" component={ChatRoom} />
  </Switch>
);

export default Router;
