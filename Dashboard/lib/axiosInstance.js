import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:  'https://cmdashboardd.onrender.com/api',
});

export default axiosInstance;
