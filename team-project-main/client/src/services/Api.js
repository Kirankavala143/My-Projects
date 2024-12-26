import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000', 
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

instance.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token');
        if (token && !config.url.includes('/register') && !config.url.includes('/login')) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, 
    function (error) {
        console.error('Request error:', error); 
        return Promise.reject(error);
    }
);

export const get = (url, params) => instance.get(url, { params });
export const post = (url, data) => instance.post(url, data);
export const put = (url, data) => instance.put(url, data);
export const deleteRequest = (url) => instance.delete(url); 

instance.interceptors.response.use(
    function (response) {
        console.log('Intercept response:', response);
        return response;
    }, 
    function (error) {
        if (error.response) {
            console.error('Response error:', error.response.data);
            console.error('Status:', error.response.status);
            console.error('Headers:', error.response.headers);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Request setup error:', error.message);
        }
        return Promise.reject(error);
    }
);
