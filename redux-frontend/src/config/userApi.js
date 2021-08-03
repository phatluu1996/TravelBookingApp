import axios from "axios";

const httpAuth = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-type": "application/json",
        "Authorization":"Bearer "+sessionStorage.getItem("userToken")
    }
});

const http = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-type": "application/json"
    }
});

class userApi {
    getUser(id, token) {
        return httpAuth.get(`/user/${id}`,{
            "Content-type": "application/json",
            "Authorization":"Bearer " + token
        });
    }
    
    updateUser(data){
        return httpAuth.put(`/user`, data);
    }
}

export default new userApi();