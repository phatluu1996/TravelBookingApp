import {
    CREATE_FLIGHT,
    RETRIEVE_FLIGHT,
    UPDATE_FLIGHT,
    DELETE_FLIGHT,
    LIST_FLIGHTS} from "../actions/actionFlightByAirline";



function reducerFlightByAirline(flights = {}, action) {
    const { type, payload } = action;
  
    switch (type) {

        case CREATE_FLIGHT:
            return [...flights, payload];
  
        case RETRIEVE_FLIGHT:
            return payload;
  
        case UPDATE_FLIGHT:
            if (flights.id === payload.id) {
                return {
                    ...flights,
                    ...payload,
                };
            } else {
                return flights;
            }
  
        case DELETE_FLIGHT:
            return flights.filter(({ id }) => id !== payload.id);
            
        case LIST_FLIGHTS:
            return payload;

        default:
            return flights;
    }
  };
  
  export default reducerFlightByAirline;