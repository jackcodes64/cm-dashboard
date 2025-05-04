import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:  'https://cmdashboardm.onrendher.com/api',
});

export default axiosInstance;
