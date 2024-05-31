import axios from 'axios';

const auth = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
});

auth.interceptors.request.use(
  (config) => {
    config.headers['accessToken'] = localStorage.getItem('accessToken');
    config.headers['refreshToken'] = localStorage.getItem('refreshToken');
    return config;
  },
  (error) => {
    console.log(error);
  }
);

export default auth;
