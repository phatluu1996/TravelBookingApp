import {
  CREATE_HOTEL_FEEDBACK_ERROR, CREATE_HOTEL_FEEDBACK_SUCCESS, CREATE_HOTEL_FEEDBACK_REQUEST, FETCH_HOTEL_REQUEST, FETCH_HOTEL_SUCCESS, FETCH_HOTEL_ERROR, FETCH_ALL_HOTEL_REQUEST, FETCH_ALL_HOTEL_SUCCESS, FETCH_ALL_HOTEL_ERROR, CREATE_HOTEL_REQUEST, CREATE_HOTEL_SUCCESS, CREATE_HOTEL_ERROR, GET_HOTEL_REQUEST, GET_HOTEL_SUCCESS, GET_HOTEL_ERROR, UPDATE_HOTEL_REQUEST, UPDATE_HOTEL_SUCCESS, UPDATE_HOTEL_ERROR,
  UPDATE_PROFILE_HOTEL_REQUEST, UPDATE_PROFILE_HOTEL_SUCCESS, UPDATE_PROFILE_HOTEL_ERROR,
  GET_DAILY_INCOME_HOTEL_REQUEST, GET_DAILY_INCOME_HOTEL_SUCCESS, GET_DAILY_INCOME_HOTEL_ERROR,
  GET_BOOKING_TODAY_HOTEL_REQUEST, GET_BOOKING_TODAY_HOTEL_SUCCESS, GET_BOOKING_TODAY_HOTEL_ERROR,
  GET_REVENUE_HOTEL_REQUEST, GET_REVENUE_HOTEL_SUCCESS, GET_REVENUE_HOTEL_ERROR,
  GET_ALL_BOOKING_REQUEST, GET_ALL_BOOKING_SUCCESS, GET_ALL_BOOKING_ERROR,
  GET_HOTEL_BY_ROOM_REQUEST, GET_HOTEL_BY_ROOM_SUCCESS, GET_HOTEL_BY_ROOM_ERROR,
  GET_REPORT_MONTH_HOTEL_REQUEST, GET_REPORT_MONTH_HOTEL_SUCCESS, GET_REPORT_MONTH_HOTEL_ERROR, CLEAR_HOTEL_STATE, REMOVE_HOTEL_REQUEST, REMOVE_HOTEL_SUCCESS, REMOVE_HOTEL_ERROR
} from "../actions/actionHotel";

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
        all: action.payload,
        one: null
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
        success: true,
        data: null
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

    case CLEAR_HOTEL_STATE:
      state = {
        ...state,
        requesting: false,
        success: false,
        data: null
      };
      return state;


    case GET_HOTEL_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true,
        one: action.payload,
        all: null
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
        createSuccess: false
      };

    case CREATE_HOTEL_FEEDBACK_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true,
        createSuccess: true
      };
      return state;

    case CREATE_HOTEL_FEEDBACK_ERROR:
      state = {
        ...state,
        requesting: false,
        message: action.message,
        createSuccess: false
      };
      return state;
    //------------------------------------------------
    case UPDATE_PROFILE_HOTEL_REQUEST:
      return {
        ...state,
        requesting: true
      };

    case UPDATE_PROFILE_HOTEL_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true,
        single: action.payload
      };
      return state;

    case UPDATE_PROFILE_HOTEL_ERROR:
      state = {
        ...state,
        requesting: false,
        message: action.message
      };
      return state;
    //------------------------------------------------------------
    case REMOVE_HOTEL_REQUEST:
      return {
        ...state,
        requesting: true
      };

    case REMOVE_HOTEL_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true,
        all: action.payload
      };
      return state;

    case REMOVE_HOTEL_ERROR:
      state = {
        ...state,
        requesting: false,
        message: action.message
      };
      return state;
    //------------------------------------------------------------
    case GET_DAILY_INCOME_HOTEL_REQUEST:
      return {
        ...state,
        requesting: true
      };

    case GET_DAILY_INCOME_HOTEL_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true,
        dailyIncome: action.payload
      };
      return state;

    case GET_DAILY_INCOME_HOTEL_ERROR:
      state = {
        ...state,
        requesting: false,
        message: action.message
      };
      return state;
    //------------------------------------------------------------
    case GET_BOOKING_TODAY_HOTEL_REQUEST:
      return {
        ...state,
        requesting: true
      };

    case GET_BOOKING_TODAY_HOTEL_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true,
        bookingToday: action.payload
      };
      return state;

    case GET_BOOKING_TODAY_HOTEL_ERROR:
      state = {
        ...state,
        requesting: false,
        message: action.message
      };
      return state;
    //------------------------------------------------------------
    case GET_REVENUE_HOTEL_REQUEST:
      return {
        ...state,
        requesting: true
      };

    case GET_REVENUE_HOTEL_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true,
        revenueCurrent: action.payload
      };
      return state;

    case GET_REVENUE_HOTEL_ERROR:
      state = {
        ...state,
        requesting: false,
        message: action.message
      };
      return state;
    //------------------------------------------------------------
    case GET_ALL_BOOKING_REQUEST:
      return {
        ...state,
        requesting: true
      };

    case GET_ALL_BOOKING_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true,
        allBooking: action.payload
      };
      return state;

    case GET_ALL_BOOKING_ERROR:
      state = {
        ...state,
        requesting: false,
        message: action.message
      };
      return state;
    //----------------------------------------------------
    case GET_HOTEL_BY_ROOM_REQUEST:
      return {
        ...state,
        requesting: true
      };

    case GET_HOTEL_BY_ROOM_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true,
        allBooking: action.payload
      };
      return state;

    case GET_HOTEL_BY_ROOM_ERROR:
      state = {
        ...state,
        requesting: false,
        message: action.message
      };
      return state;
    //------------------------------------------------------------
    case GET_REPORT_MONTH_HOTEL_REQUEST:
      return {
        ...state,
        requesting: true
      };

    case GET_REPORT_MONTH_HOTEL_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true,
        report: action.payload
      };
      return state;

    case GET_REPORT_MONTH_HOTEL_ERROR:
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