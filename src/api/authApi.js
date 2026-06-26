import axios from 'axios';

export const loginApi = (credentials) =>
  axios.post('https://dummyjson.com/auth/login', {
    username: credentials.username,
    password: credentials.password,
    expiresInMins: 60,
  });
