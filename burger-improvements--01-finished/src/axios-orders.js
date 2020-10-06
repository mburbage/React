import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-ce3d7.firebaseio.com/'
});

export default instance;