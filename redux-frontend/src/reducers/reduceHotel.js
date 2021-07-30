import {RETRIEVE_HOTEL,UPDATE_HOTEL,} from "../actions/actionHotel";

const initialState = {
    hotel: {},
}

function reducerHotel(hotel = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case RETRIEVE_HOTEL:
            return {
                ...hotel,
                hotel:payload
            }
  
        case UPDATE_HOTEL:
            return {...hotel,hotel:payload};
        
        default:
            return hotel;
    }

  };
  
  export default reducerHotel;