import _ from "lodash";
import {
  LOGIN_USER_ERROR, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS,
  SIGNUP_USER_REQUEST, SIGNUP_USER_SUCCESS, SIGNUP_USER_ERROR,
  SIGNOUT_USER_REQUEST, SIGNOUT_USER_SUCCESS, SIGNOUT_USER_ERROR,
  CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_ERROR
} from "../actions/actionAuth";

const initialState = {
  form: null,
  requesting: false,
  success: false,
  message: null,
  data: null,
  account:null
}

const reducerAuth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        requesting: true
      };

    case LOGIN_USER_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true,
        data: action.payload,
        form: 'login'
      };
      return state;

    case LOGIN_USER_ERROR:
      state = {
        ...state,
        requesting: false,
        message: action.message,
        form: 'login'
      };
      return state;

//---------------------------------------------------
      case SIGNOUT_USER_REQUEST:
        return {
          ...state,
          requesting: true
        };
  
      case SIGNOUT_USER_SUCCESS:
        state = {
          ...state,
          requesting: false,
          success: true,
          data: null,
          account:null,
          form: null
        };
        return state;
  
      case SIGNOUT_USER_ERROR:
        state = {
          ...state,
          requesting: false,
          message: action.message,
        };
        return state;

//------------------------------------------
    case SIGNUP_USER_REQUEST:
      return {
        ...state,
        requesting: true
      };

    case SIGNUP_USER_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true,
        signupData: action.payload,
        form: 'signup'
      };
      return state;

    case SIGNUP_USER_ERROR:
      state = {
        ...state,
        success: false,
        requesting: false,
        message: action.message,
        form: 'signup'
      };
      return state;

//---------------------------------------------------
      case CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        requesting: true,
        form:''
      };

    case CHANGE_PASSWORD_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true,
        account: action.payload,
        form: 'successChange'
      };
      return state;

    case CHANGE_PASSWORD_ERROR:
      state = {
        ...state,
        success: false,
        requesting: false,
        message: action.message,
        form: 'errorChange'
      };
      return state;

//-----------------------------------------------------
    default:
      return state;
  }
};

export default reducerAuth;