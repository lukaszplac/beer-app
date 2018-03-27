import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.punkapi.com/v2/'
});


export const fb_instance = axios.create({
    baseUrl: 'https://beer-b5c66.firebaseio.com/'
});

export default instance;
