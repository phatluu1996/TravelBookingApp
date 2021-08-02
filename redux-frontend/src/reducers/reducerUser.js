import _ from "lodash";
import {
  LOGIN_USER_ERROR, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS,
  SIGNUP_USER_REQUEST, SIGNUP_USER_SUCCESS, SIGNUP_USER_ERROR,
  GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_ERROR,
  UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR
} from "../actions/actionUser";

const initialState = {
  form: null,
  requesting: false,
  success: false,
  message: null,
  data: null
}

const reducerUser = (state = initialState, action) => {
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
        data: action.payload,
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

    case GET_USER_REQUEST:
      return {
        ...state,
        requesting: true
      };

    case GET_USER_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true,
        data: action.payload,
        form: 'getUser'
      };
      return state;

    case GET_USER_ERROR:
      state = {
        ...state,
        success: false,
        requesting: false,
        message: action.message,
        form: 'getUser'
      };
      return state;

      case UPDATE_USER_REQUEST:
      return {
        ...state,
        requesting: true
      };

    case UPDATE_USER_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true,
        data: action.payload,
        form: 'updateUser'
      };
      return state;

    case UPDATE_USER_ERROR:
      state = {
        ...state,
        success: false,
        requesting: false,
        message: action.message,
        form: 'updateUser'
      };
      return state;

    default:
      return state;
  }
};

export default reducerUser