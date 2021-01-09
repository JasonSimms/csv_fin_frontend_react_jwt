import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:3001";


class VendorService {
    // getPublicContent(){
    //     return axios.get(API_URL, { headers: {"Access-Control-Allow-Origin" : "*" } });
    // }

    // createTransactionsByUser(obj) {
    //     return axios.post(API_URL + '/api/transaction', { data: obj, headers: authHeader() });
    // }

    submitNewVendors(arr){
        return axios.post(API_URL + '/api/vendor', { data: arr, headers: authHeader() });
    }
}

export default new VendorService();