import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = 'http://localhost:8080/api/test/';
// const API_URL = "https://cc-vendors-api.herokuapp.com";
const API_URL = "http://localhost:3001/api/user/";


class UserService {
    getPublicContent(){
        return axios.get(API_URL+'all');
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get(API_URL + 'mod', {headers : authHeader() })
    }

    getAdminBoard() {
        return axios.got(API_URL + 'admin', { headers : authHeader() })
    }
}

export default new UserService();