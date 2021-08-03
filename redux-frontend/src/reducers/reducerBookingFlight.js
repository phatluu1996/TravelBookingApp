import {
    BOOKING_FLIGHT_REQUEST, BOOKING_FLIGHT_SUCCESS, BOOKING_FLIGHT_ERROR 
  } from "../actions/actionBookingFlight";
  
  const initialState = {
    form: null,
    requesting: false,
    success: false,
    message: null,
    data: null
  }
  
  const reducerBookingFlight = (state = initialState, action) => {
    switch (action.type) {
      case BOOKING_FLIGHT_REQUEST:
        return {
          ...state,
          requesting: true
        };
  
      case BOOKING_FLIGHT_SUCCESS:
        state = {
          ...state,
          requesting: false,
          success: true,
          data: action.payload,
          form: 'bookingFlight'
        };
        return state;
  
      case BOOKING_FLIGHT_ERROR:
        state = {
          ...state,
          requesting: false,
          message: action.message,
          form: 'bookingFlight'
        };
        return state;

      default:
        return state;
    }
  };
  
  export default reducerBookingFlight