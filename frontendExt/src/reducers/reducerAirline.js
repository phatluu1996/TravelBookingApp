import {RETRIEVE_AIRLINE,UPDATE_AIRLINE,} from "../actions/actionAirline";

const initialState = {
    // airlines:[],
    airline: {},
}

function reducerAirline(airline = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case RETRIEVE_AIRLINE:
            return {
                ...airline,
                airline:payload
            }
  
        case UPDATE_AIRLINE:
            return {...airline,airline:payload};
        
        default:
            return airline;
    }

  };
  
  export default reducerAirline;