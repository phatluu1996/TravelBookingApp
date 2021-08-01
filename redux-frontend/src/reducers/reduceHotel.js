import {FETCH_HOTEL_REQUEST,FETCH_HOTEL_SUCCESS,FETCH_HOTEL_ERROR} from "../actions/actionHotel";

const initialState = {
    requesting: false,
    success: false,
    message: null,
    data: null
  }

function reducerHotel(state = initialState, action) {
    switch (action.type) {
        case FETCH_HOTEL_REQUEST:
          return {
            ...state,
            requesting: true
          };
    
        case FETCH_HOTEL_SUCCESS:
          state = {
            ...state,
            requesting: false,
            success: true,
            data: action.payload
          };
          return state;
    
        case FETCH_HOTEL_ERROR:
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
  
  export default reducerHotel;