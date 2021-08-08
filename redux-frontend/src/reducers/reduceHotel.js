import {CREATE_HOTEL_FEEDBACK_ERROR,CREATE_HOTEL_FEEDBACK_SUCCESS,CREATE_HOTEL_FEEDBACK_REQUEST, FETCH_HOTEL_REQUEST, FETCH_HOTEL_SUCCESS, FETCH_HOTEL_ERROR, FETCH_ALL_HOTEL_REQUEST, FETCH_ALL_HOTEL_SUCCESS, FETCH_ALL_HOTEL_ERROR, CREATE_HOTEL_REQUEST, CREATE_HOTEL_SUCCESS, CREATE_HOTEL_ERROR, GET_HOTEL_REQUEST, GET_HOTEL_SUCCESS, GET_HOTEL_ERROR, UPDATE_HOTEL_REQUEST, UPDATE_HOTEL_SUCCESS, UPDATE_HOTEL_ERROR } from "../actions/actionHotel";

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

    case FETCH_ALL_HOTEL_REQUEST:
      return {
        ...state,
        requesting: true

      };

    case FETCH_ALL_HOTEL_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true,
        all: action.payload
      };
      return state;

    case FETCH_ALL_HOTEL_ERROR:
      state = {
        ...state,
        requesting: false,
        message: action.message
      };
      return state;

    case CREATE_HOTEL_REQUEST:
      return {
        ...state,
        requesting: true
      };

    case CREATE_HOTEL_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true
      };
      return state;

    case CREATE_HOTEL_ERROR:
      state = {
        ...state,
        requesting: false,
        message: action.message
      };
      return state;

    case UPDATE_HOTEL_REQUEST:
      return {
        ...state,
        requesting: true
      };

    case UPDATE_HOTEL_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true
      };
      return state;

    case UPDATE_HOTEL_ERROR:
      state = {
        ...state,
        requesting: false,
        message: action.message
      };
      return state;

    case GET_HOTEL_REQUEST:
      return {
        ...state,
        requesting: true
      };


    case GET_HOTEL_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true,
        single: action.payload
      };
      return state;

    case GET_HOTEL_ERROR:
      state = {
        ...state,
        requesting: false,
        message: action.message
      };
      return state;

      case CREATE_HOTEL_FEEDBACK_REQUEST:
        return {
          ...state,
          requesting: true,
          createSuccess : false
        };

      case CREATE_HOTEL_FEEDBACK_SUCCESS:
        state = {
          ...state,
          requesting: false,
          success: true,
          createSuccess : true
        };
        return state;
  
      case CREATE_HOTEL_FEEDBACK_ERROR:
        state = {
          ...state,
          requesting: false,
          message: action.message,
          createSuccess : false
        };
        return state;

    default:
      return state;
  }

};

export default reducerHotel;
