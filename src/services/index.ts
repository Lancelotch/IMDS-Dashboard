import axios from 'axios';

const httpClient = axios.create ({
    baseURL : process.env.REACT_APP_API_PATH,
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
  });

  httpClient.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `${token}` : '';
    return config;
});

export default httpClient;