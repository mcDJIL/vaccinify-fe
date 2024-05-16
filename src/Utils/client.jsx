import axios from 'axios';
import { sessionToken } from '../Constants/localStorage';

const client = axios.create({
    baseURL: 'https://vaccinify-api-production.up.railway.app/api/'
});

client.interceptors.request.use((config) => {
    config.params = {
        'token': localStorage.getItem(sessionToken)
    }

    return config;
})

export default client;
