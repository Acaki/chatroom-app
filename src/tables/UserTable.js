import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const UserTable = (props) => {
  const onDeleteUser = (userId) => {
    return (e) => {
      const confirm = window.confirm('Are you sure?');
      if (confirm) {
        props.removeUser(userId);
      }
    }
  };

  return (
    <Table striped bordered hover>
      <thead>
      <tr>
        <th>#</th>
        <th>name</th>
        <th>role</th>
        <th>actions</th>
      </tr>
      </thead>
      <tbody>
      {props.users.map((user) => (
        <tr>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.role}</td>
          <td>
            <Button type="button" onClick={() => props.editUser(user)}>Edit</Button>{' '}
            <Button type="button" variant="danger" onClick={onDeleteUser(user.id)}>Delete</Button>
          </td>
        </tr>
      ))}
      </tbody>
    </Table>
  )
};

export default UserTable;
