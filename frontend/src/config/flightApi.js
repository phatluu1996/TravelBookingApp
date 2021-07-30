import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-type": "application/json"
    }
});

class flightApi {
    getAirline(id) {
        return http.get(`/airline/${id}`);
    }

    updateAirline(id, data) {
        return http.put(`/airline/${id}`, data);
    }

    getFlight(id) {
        return http.get(`/flight/${id}`);
    }

    createFlight(data) {
        return http.post("/flight", data);
    }

    updateFlight(id, data) {
        return http.put(`/flight/${id}`, data);
    }

    deleteFlight(id) {
        return http.post(`/flight/${id}`);
    }

    listFlightsByAirline(id) {
        return http.get(`/airline/listFlights?id=${id}`);
    }
}

export default new flightApi();