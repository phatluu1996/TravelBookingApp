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
    getBooking(id){
        return http.get(`/flight-booking/${id}`);
    }
    updateBooking(id,data){
        return http.put(`/flight-booking/${id}`,data);
    }
    
}

export default new bookingFlight();