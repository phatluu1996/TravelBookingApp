import _ from "lodash";
import { FETCH_FLIGHT_SUCCESS, FETCH_FLIGHT_ERROR, FETCH_FLIGHT_REQUEST } from "../actions/actionFlight";

const initialState = {
  requesting: false,
  success: false,
  message: null,
  data: null
}

const reducerFlight = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FLIGHT_REQUEST:
      return {
        ...state,
        requesting: true
      };

    case FETCH_FLIGHT_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true,
        data: action.payload
      };
      return state;

    case FETCH_FLIGHT_ERROR:
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



export default reducerFlight


