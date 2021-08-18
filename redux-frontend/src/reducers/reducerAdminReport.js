import {
    GET_TOTAL_AMOUNT_ADMIN_REQUEST, GET_TOTAL_AMOUNT_ADMIN_SUCCESS, GET_TOTAL_AMOUNT_ADMIN_ERROR,
    GET_DAILY_INCOME_ADMIN_REQUEST, GET_DAILY_INCOME_ADMIN_SUCCESS, GET_DAILY_INCOME_ADMIN_ERROR,
    GET_REPORT_MONTH_ADMIN_REQUEST, GET_REPORT_MONTH_ADMIN_SUCCESS, GET_REPORT_MONTH_ADMIN_ERROR
  } from "../actions/actionAdminReport";
  
  const initialState = {
    requesting: false,
    success: false,
    message: null,
    data: null,
  };
  
  const reducerAdminReport = (state = initialState, action) => {
    switch (action.type) {
        case GET_TOTAL_AMOUNT_ADMIN_REQUEST:
            return {
              ...state,
              requesting: true,
            };
      
        case GET_TOTAL_AMOUNT_ADMIN_SUCCESS:
            state = {
              ...state,
              requesting: false,
              success: true,
              totalAmount: action.payload
            };
            return state;
      
        case GET_TOTAL_AMOUNT_ADMIN_ERROR:
            state = {
              ...state,
              requesting: false,
              message: action.message,
            };
            return state;
//----------------------------------------------
        case GET_DAILY_INCOME_ADMIN_REQUEST:
            return {
              ...state,
              requesting: true,
            };
      
        case GET_DAILY_INCOME_ADMIN_SUCCESS:
            state = {
              ...state,
              requesting: false,
              success: true,
              dailyIncome: action.payload
            };
            return state;
      
        case GET_DAILY_INCOME_ADMIN_ERROR:
            state = {
              ...state,
              requesting: false,
              message: action.message,
            };
            return state;
 //----------------------------------------------
        case GET_REPORT_MONTH_ADMIN_REQUEST:
            return {
              ...state,
              requesting: true,
            };
      
        case GET_REPORT_MONTH_ADMIN_SUCCESS:
            state = {
              ...state,
              requesting: false,
              success: true,
              reportMonth: action.payload
            };
            return state;
      
        case GET_REPORT_MONTH_ADMIN_ERROR:
            state = {
              ...state,
              requesting: false,
              message: action.message,
            };
            return state;     

      
        default:
            return state;
    }
  };
  
  export default reducerAdminReport;
  