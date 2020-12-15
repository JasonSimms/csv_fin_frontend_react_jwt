import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = 'http://localhost:8080/api/test/';
const API_URL = "https://cc-vendors-api.herokuapp.com";


class TransactionService {
    getPublicContent(){
        return axios.get(API_URL, { headers: {"Access-Control-Allow-Origin" : "*" } });
    }

    getTransactions() {
        return axios.get(API_URL + '/api/transaction', { headers: authHeader() });
    }

}

export default new TransactionService();