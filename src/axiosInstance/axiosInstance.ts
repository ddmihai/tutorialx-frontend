import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8888'
    : '';


export const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
})