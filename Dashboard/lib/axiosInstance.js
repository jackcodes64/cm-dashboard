import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:  'https://cmdashboardm.onrender.com/api',
});

export default axiosInstance;
