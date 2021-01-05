import axios from "axios";
//TODO SET API
// const API_URL = "http://localhost:8080/api/auth";
// const API_URL = "https://cc-vendors-api.herokuapp.com";
const API_URL = process.env.NODE_ENV ? "http://localhost:3001/api/user/" : "https://cc-vendors-api.herokuapp.com";


class AuthService {
    login(email, password) {
        console.log('init login', email , password)
        return axios.post(API_URL + 'login', {
            email, password
        }).then(res => {
            console.log("hmm..", res.data, Object.keys(res.data))
            console.log('token?')
            console.log(res.data.data.token)
            if (res.data.data.token) {
                console.log("i have a token...")
                localStorage.setItem('user', JSON.stringify(res.data.data));
            }

            return res.data;
        })
    }

    logout() {
        localStorage.removeItem("user");
    }

    //TODO add encryption
    register(email, password) {
        return axios.post(API_URL + 'register', {
            email, password
        })
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();