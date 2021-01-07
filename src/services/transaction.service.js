import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = 'http://localhost:8080/api/test/';
// const API_URL = "https://cc-vendors-api.herokuapp.com";
const API_URL = "http://localhost:3001";


class TransactionService {
    getPublicContent(){
        return axios.get(API_URL, { headers: {"Access-Control-Allow-Origin" : "*" } });
    }

    getTransactions() {
        return axios.get(API_URL + '/api/transaction', { headers: authHeader() });
    }

    getTransactionsByUser(userId) {
        return axios.get(API_URL + '/api/transaction', { params: { userId }, headers: authHeader()});
    }

    createTransactionsByUser(obj) {
        return axios.post(API_URL + '/api/transaction', { data: obj, headers: authHeader() });
    }

    bulkWriteTransactions(arr){
        return axios.post(API_URL + '/api/transaction/bulk', { data: arr, headers: authHeader() });
    }
}

export default new TransactionService();