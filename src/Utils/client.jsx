import axios from 'axios';
import { sessionToken } from '../Constants/localStorage';

const client = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
});

client.interceptors.request.use((config) => {
    config.params = {
        'token': localStorage.getItem(sessionToken)
    }

    return config;
})

export default client;
