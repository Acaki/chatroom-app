import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { withRouter } from 'react-router-dom';
import { useAuthDataContext } from './AuthDataProvider';

const TopBar = () => {
  const { name, role, onLogout } = useAuthDataContext();

  const logout = () => {
    onLogout();
  };

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand href="/">Chat Room</Navbar.Brand>
      <Nav className="ml-auto">
        { role === 'admin' && <Nav.Link href="/userList">User management</Nav.Link> }
        { name ? (
          <React.Fragment>
            <Nav.Link>{name}</Nav.Link>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
r         </React.Fragment>
        )}
      </Nav>
    </Navbar>
  );
};
export default withRouter(TopBar);
