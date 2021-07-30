import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-type": "application/json"
    }
});
class LocationApi {
    getProvinceAndCity() {
        return http.get(`/province`);
    }
}

export default new LocationApi();