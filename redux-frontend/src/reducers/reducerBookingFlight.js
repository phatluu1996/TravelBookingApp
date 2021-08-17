import {
    BOOKING_FLIGHT_REQUEST, BOOKING_FLIGHT_SUCCESS, BOOKING_FLIGHT_ERROR, CLEAR_BOOKING_REQUEST,
    UPDATE_BOOKING_FLIGHT_REQUEST, UPDATE_BOOKING_FLIGHT_SUCCESS, UPDATE_BOOKING_FLIGHT_ERROR,
    GET_BOOKING_FLIGHT_REQUEST, GET_BOOKING_FLIGHT_SUCCESS, GET_BOOKING_FLIGHT_ERROR
  } from "../actions/actionBookingFlight";
  
  const initialState = {
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
          
        };
        return state;
  
      case BOOKING_FLIGHT_ERROR:
        state = {
          ...state,
          requesting: false,
          message: action.message,
        };
        return state;
      // -----------------------------
      case GET_BOOKING_FLIGHT_REQUEST:
        return {
          ...state,
          requesting: true
        };
  
      case GET_BOOKING_FLIGHT_SUCCESS:
        state = {
          ...state,
          requesting: false,
          success: true,
          data: action.payload,
          
        };
        return state;
  
      case GET_BOOKING_FLIGHT_ERROR:
        state = {
          ...state,
          requesting: false,
          message: action.message,
        };
        return state;
      // -----------------------------

      case UPDATE_BOOKING_FLIGHT_REQUEST:
        return {
          ...state,
          requesting: true
        };
  
      case UPDATE_BOOKING_FLIGHT_SUCCESS:
        state = {
          ...state,
          requesting: false,
          success: true,
          data: action.payload,
          
        };
        return state;
  
      case UPDATE_BOOKING_FLIGHT_ERROR:
        state = {
          ...state,
          requesting: false,
          message: action.message,
        };
        return state;


      case CLEAR_BOOKING_REQUEST:
         return initialState;
        
      default:
        return state;
    }
  };
  
  export default reducerBookingFlight