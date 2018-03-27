import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.punkapi.com/v2/'
});


export const fb_instance = axios.create({
    baseURL: 'https://beer-app-db.firebaseio.com/'
});

export default instance;
