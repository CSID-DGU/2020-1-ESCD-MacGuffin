import axios from 'axios';

export const checkEmailExists = (userId) => axios.get('/api/users/' + userId);

export const localRegister = ({userId, password, userName}) => axios.post('/api/users', { userId, password, userName });
export const localLogin = ({userId, password}) => axios.post('/api/session', { userId, password });

export const checkStatus = () => axios.get('/api/session');
export const logout = () => axios.delete('/api/session');

export const getAssetData = () => axios.post('/api/assets');