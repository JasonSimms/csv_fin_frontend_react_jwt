import axios from "axios";
//TODO SET API
// const API_URL = "http://localhost:8080/api/auth";
const API_URL = "https://cc-vendors-api.herokuapp.com";


class AuthService {
    login(email, password) {
        return axios.post(API_URL + 'signin', {
            email, password
        }).then(res => {
            if(res.data.accessToken){
                localStorage.setItem('user', JSON.stringify(res.data));
            }

            return res.data;
        })
    }

logout() {
    localStorage.removeItem("user");
  }

//TODO add encryption
register(email,password) {
    return axios.post(API_URL + 'signup', {
        email,password
    })
}

getCurrentUser(){
    return JSON.parse(localStorage.getItem('user'));
}
}

export default new AuthService();