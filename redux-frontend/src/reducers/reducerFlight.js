import _ from "lodash";
import { FETCH_FLIGHT_SUCCESS, FETCH_FLIGHT_ERROR, FETCH_FLIGHT_REQUEST, GET_ROUND_FLIGHT_REQUEST, GET_ROUND_FLIGHT_SUCCESS, GET_ROUND_FLIGHT_ERROR } from "../actions/actionFlight";

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
        data: action.payload.departData,
        returnData: action.payload.returnData
      };
      return state;

    case FETCH_FLIGHT_ERROR:
      state = {
        ...state,
        requesting: false,
        message: action.message
      };
      return state;


    case GET_ROUND_FLIGHT_REQUEST:
      return {
        ...state,
        requesting: true
      };

    case GET_ROUND_FLIGHT_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true,
        data: action.payload.departData,
        returnData: action.payload.returnData
      };
      return state;

    case GET_ROUND_FLIGHT_ERROR:
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


