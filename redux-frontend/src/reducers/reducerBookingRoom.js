import {BOOKING_ROOM_REQUEST,BOOKING_ROOM_SUCCESS,BOOKING_ROOM_ERROR,GET_BOOKING_REQUEST,GET_BOOKING_SUCCESS,GET_BOOKING_ERROR} from "../actions/actionBookingRoom";

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
          case GET_BOOKING_REQUEST:
            return {
              ...state,
              requesting: true
            };
      
          case GET_BOOKING_SUCCESS:
            state = {
              ...state,
              requesting: false,
              success: true,
              data: action.payload
            };
            return state;
      
          case GET_BOOKING_ERROR:
            state = {
              ...state,
              requesting: false,
              message: action.message
            };
            return state;
          
        default:
          return state;
      }
  };
  
  export default reducerBookingRoom;