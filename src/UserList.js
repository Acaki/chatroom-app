import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getUsers, deleteUser, updateUser as sendUpdateUser } from './requests';
import UserTable from './tables/UserTable';
import AddUser from './forms/AddUser';
import EditUser from './forms/EditUser';

const UserList = () => {
  const [initialized, setInitialized] = useState(false);
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editingUser, setEditingUser] = useState({ id: null, name: '', role: '' });

  const requestUsers = async () => {
    const response = await getUsers();
    setUsers(response.data);
    setInitialized(true);
  };

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const removeUser = async (id) => {
    await deleteUser(id);
    setUsers(users.filter((user) => user.id !== id));
  };

  const editUser = (user) => {
    setEditing(true);
    setEditingUser({ id: user.id, name: user.name, role: user.role });
  };

  const updateUser = async (id, updatedUser) => {
    setEditing(false);
    await sendUpdateUser(id, updatedUser);
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
  };

  useEffect(() => {
    if (!initialized) {
      requestUsers();
    }
  });

  return (
    <Container>
      <h1>User list</h1>
      <Row>
        {editing ? (
          <Col>
            <h2>Edit user</h2>
            <EditUser setEditing={setEditing} editingUser={editingUser} updateUser={updateUser} />
          </Col>
        ) : (
          <Col>
            <h2>Add user</h2>
            <AddUser addUser={addUser} />
          </Col>
        )}
        <Col>
          <h2>View users</h2>
          <UserTable users={users} removeUser={removeUser} editUser={editUser} />
        </Col>
      </Row>
    </Container>
  );
};

export default UserList;
