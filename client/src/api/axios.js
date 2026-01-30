import axios from 'axios';

const isLocalhost = window.location.hostname === 'localhost';
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || (isLocalhost ? 'http://localhost:3001/api' : 'https://blushify-l5kv.onrender.com/api'),
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
