import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-type": "application/json",
    }
});

class bookingFlight {
    bookFlt(data) {
        return http.post(`/book-flight`,data);
    }
    
}

export default new bookingFlight();