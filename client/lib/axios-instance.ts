import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.BACKEND_URL,
    headers:{
        "Content-Type": "application/json"
    }
})

axiosInstance.interceptors.request.use( req=> {
    if(typeof window !== 'undefined') {
        const user = localStorage.getItem('user');
        if(user) {
            req.headers['Authorization'] = `Bearer ${user}`;
        }
    }
    return req;
}, error => {    return Promise.reject(error);
});

export default axiosInstance;