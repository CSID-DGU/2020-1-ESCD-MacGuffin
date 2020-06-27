import axios from 'axios';

export const checkEmailExists = (userId) => axios.get('http://52.78.190.152/api/users/' + userId);

export const localRegister = ({userId, userName, password}) => axios.post('http://52.78.190.152/api/users', { userId, password, userName });
export const localLogin = ({userId, password}) => axios.post('http://52.78.190.152/api/session', { userId, password });

export const checkStatus = () => axios.get('http://52.78.190.152/api/session');
export const logout = () => axios.delete('http://52.78.190.152/api/session');

export const getAssetData = () => axios.post('http://52.78.190.152/api/assets');