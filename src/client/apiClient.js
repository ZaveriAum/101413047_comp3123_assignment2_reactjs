import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5000', // backend server
    withCredentials: true, // allows cookies form localhost:5000 -> backend
});

export default apiClient;
