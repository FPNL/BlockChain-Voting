import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://192.168.255.15:8888/',
});

export default instance;
