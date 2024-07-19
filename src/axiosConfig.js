import axios from 'axios';

const instance = axios.create({
  baseURL: "http://54.153.54.237/",
});

export default instance;
