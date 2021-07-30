import {RETRIEVE_AIRLINE,UPDATE_AIRLINE,} from "../actions/actionAirline";



function reducerAirline(airline = {}, action) {
    const { type, payload } = action;
  
    switch (type) {
        case RETRIEVE_AIRLINE:
            return payload;
  
        case UPDATE_AIRLINE:
            return {...airline,...payload};
        
        default:
            return airline;
    }

  };
  
  export default reducerAirline;