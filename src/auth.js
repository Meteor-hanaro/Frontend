import axios from 'axios';

const auth = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
});

// jwt token 포함해서 request 생성
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

// jwt token 관련 response 처리
auth.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const code = error.response.status;
    console.log(code);
    if (code === 401) {
      window.location.href = '/';
    }
  }
);

export default auth;
