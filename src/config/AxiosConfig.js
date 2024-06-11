import axios from 'axios';

axios.defaults.baseURL = `${process.env.REACT_APP_BESERVERURI}`;
console.log(axios.defaults.baseURL);
export default axios;
