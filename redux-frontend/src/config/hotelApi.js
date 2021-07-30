import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-type": "application/json"
    }
});

class hotelApi {
    getHotelById(id) {
        return http.get(`/hotel/${id}`);
    }

    updateHotel(id, data) {
        return http.put(`/hotel/${id}`, data);
    }

    getRoomById(id) {
        return http.get(`/room/${id}`);
    }

    createRoom(data) {
        return http.post(`/room`, data);
    }

    updateRoom(id, data) {
        return http.put(`/room/${id}`, data);
    }

    deleteRoom(id) {
        return http.post(`/room/${id}`);
    }

    listRoomByHotel(id) {
        return http.get(`/hotel/listRooms?id=${id}`);
    }
}

export default new hotelApi();