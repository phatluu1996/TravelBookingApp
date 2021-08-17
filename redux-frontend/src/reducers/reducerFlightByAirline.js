import {
    CREATE_FLIGHT,
    RETRIEVE_FLIGHT,
    UPDATE_FLIGHT,
    DELETE_FLIGHT,
    CLEAR_FLIGHTS_RESPONSE,
    LIST_FLIGHTS_AIRLINE_REQUEST,
    LIST_FLIGHTS_AIRLINE_SUCCESS,
    LIST_FLIGHTS_AIRLINE_ERROR, } from "../actions/actionFlightByAirline";

    const initialState = {
        requesting: false,
        success: false,
        message: null,
        data: null
      }
      

function reducerFlightByAirline(flights = {initialState}, action) {
    const { type, payload } = action;
  
    switch (type) {

        case CREATE_FLIGHT:
            flights = {
                ...flights,
                requesting: false,
                success: true,
                single:payload
            }
            return  flights;
  
        case RETRIEVE_FLIGHT:
            flights = {
                ...flights,
                requesting: false,
                success:true,
                single:payload
            }
            return flights;
  
        case UPDATE_FLIGHT:
            flights = { ...flights, 
                single: payload, 
                success: true
             }
            return flights;
            
  
        case DELETE_FLIGHT:
            flights = {
                ...flights,
                success: true,
            }
            return flights;
      
        // List Flight by airline
    case LIST_FLIGHTS_AIRLINE_REQUEST:
        flights = {
          ...flights,
          requesting: true,

        };
        return flights;
    case LIST_FLIGHTS_AIRLINE_SUCCESS:
          flights = {
            ...flights,
            requesting: false,
            success: true,
            all: payload,
            single: null
          };
          return flights;
    
        case LIST_FLIGHTS_AIRLINE_ERROR:
          flights = {
            ...flights,
            requesting: false,
            message: action.message,
          };
          return flights;

        case CLEAR_FLIGHTS_RESPONSE:
            return initialState;

        default:
            return flights;
    }
  };
  
  export default reducerFlightByAirline;