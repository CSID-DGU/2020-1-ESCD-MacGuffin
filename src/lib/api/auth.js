import axios from 'axios';

export const checkEmailExists = (email) => axios.get('/api/users' + email);
export const checkUsernameExists = (username) => axios.get('/api/users' + username);

export const localRegister = ({email, username, password}) => axios.post('/api/users', { email, username, password });
export const localLogin = ({email, password}) => axios.post('/api/users', { email, password });

export const checkStatus = () => axios.get('/api/session');
export const logout = () => axios.delete('/api/session');