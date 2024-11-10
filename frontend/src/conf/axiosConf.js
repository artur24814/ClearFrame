/* Usage:

import api from './conf/axiosConfig';

api.get('/api/data')
  .then(response => {
    console.log(response.data);
  });
*/
import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080'

const instance = axios.create({
  baseURL: `${apiUrl}`,
  withCredentials: true
})

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('token')
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default instance
