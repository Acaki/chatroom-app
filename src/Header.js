import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { withRouter } from 'react-router-dom';
import { useAuthDataContext } from './AuthDataProvider';

const TopBar = () => {
  const { onLogout } = useAuthDataContext();

  const logout = () => {
    localStorage.removeItem('loggedUser');
    onLogout();
  };

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand href="#home">Chat Room</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/" onClick={logout}>Logout</Nav.Link>
      </Nav>
    </Navbar>
  );
};
export default withRouter(TopBar);
