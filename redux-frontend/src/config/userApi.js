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
    getUser(id) {
        return httpAuth.get(`/user/${id}`);
    }
}

export default new userApi();