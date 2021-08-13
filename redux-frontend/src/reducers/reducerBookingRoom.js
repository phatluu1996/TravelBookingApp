import {BOOKING_ROOM_REQUEST,BOOKING_ROOM_SUCCESS,BOOKING_ROOM_ERROR, CLEAR_BOOKING_ROOM_REQUEST} from "../actions/actionBookingRoom";

const initialState = {
    requesting: false,
    success: false,
    message: null,
    data: null
  }
function reducerBookingRoom(state = initialState, action) {
    switch (action.type) {
        case BOOKING_ROOM_REQUEST:
          return {
            ...state,
            requesting: true
          };
    
        case BOOKING_ROOM_SUCCESS:
          state = {
            ...state,
            requesting: false,
            success: true,
            data: action.payload
          };
          return state;
    
        case BOOKING_ROOM_ERROR:
          state = {
            ...state,
            requesting: false,
            message: action.message
          };
          return state;

        case CLEAR_BOOKING_ROOM_REQUEST:          
          return initialState;
          
        default:
          return state;
      }
  };
  
  export default reducerBookingRoom;