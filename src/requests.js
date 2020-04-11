import axios from 'axios';

axios.defaults.baseURL = 'api';

export const login = (username, password) => axios.post('/user/login', {
  username,
  password,
});

export const register = (username, password) => axios.post('/user', {
  username,
  password,
});

export const getUsers = () => axios.get('/user');

export const deleteUser = (id) => axios.delete(`/user/${id}`);

export const updateUser = (id, userInfo) => axios.patch(`/user/${id}`, userInfo);

export const getChatRoomMessages = () => axios.get('/chatroom/messages');
