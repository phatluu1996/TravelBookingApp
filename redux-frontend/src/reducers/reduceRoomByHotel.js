import {
    CREATE_ROOM,
    RETRIEVE_ROOM,
    UPDATE_ROOM,
    DELETE_ROOM,
    LIST_ROOMS} from "../actions/actionRoomByHotel";



function reducerRoomByHotel(hotels = {}, action) {
    const { type, payload } = action;
  
    switch (type) {

        case CREATE_ROOM:
            return [...hotels, payload];
  
        case RETRIEVE_ROOM:
            return payload;
  
        case UPDATE_ROOM:
            return hotels.map((hotel) => {
                if (hotel.id === payload.id) {
                    return {
                        ...hotel,
                        ...payload,
                    };
                } else {
                    return hotel;
                }
            });
  
        case DELETE_ROOM:
            return hotels.filter(({ id }) => id !== payload.id);
            
        case LIST_ROOMS:
            return hotels;

        default:
            return hotels;
    }
  };
  
  export default reducerRoomByHotel;