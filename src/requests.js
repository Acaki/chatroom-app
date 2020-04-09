import axios from 'axios';

export const login = (username, password) => axios.post('/user/login', {
  username,
  password,
});

export const getUsers = () => axios.get('/user');

export const createUser = (username, password) => axios.post('/user', {
  username,
  password,
});

export const deleteUser = (id) => axios.delete(`/user/${id}`)
;
export const updateUser = (id, userInfo) => axios.patch(`/user/${id}`, userInfo);
