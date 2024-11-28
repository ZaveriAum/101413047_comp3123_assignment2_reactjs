import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'process.env.REACT_APP_API_URL' , // backend server
    withCredentials: true, // allows cookies form localhost:5000 -> backend
});

export default apiClient;
