import _ from "lodash";
import {
  GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_ERROR,
  UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR,
  GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_ERROR
} from "../actions/actionUser";

const initialState = {
  form: null,
  requesting: false,
  success: false,
  message: null,
  data: null,
  account: null
}

const reducerUser = (state = initialState, action) => {
  switch (action.type) {

    case GET_USER_REQUEST:
      return {
        ...state,
        requesting: true,
        form: ''
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

//--------------------------------------------------
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        requesting: true,
        form: ''
      };

    case UPDATE_USER_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true,
        data: action.payload,
        form: 'successUpdateUser'
      };
      return state;

    case UPDATE_USER_ERROR:
      state = {
        ...state,
        success: false,
        requesting: false,
        message: action.message,
        form: 'errUpdateUser'
      };
      return state;

//---------------------------------------------
    case GET_USERS_REQUEST:
      return {
        ...state,
        requesting: true,
        form: ''
      };

    case GET_USERS_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true,
        data: action.payload,
        form: 'successAllUser'
      };
      return state;

    case GET_USERS_ERROR:
      state = {
        ...state,
        success: false,
        requesting: false,
        message: action.message,
        form: 'errorAllUser'
      };
      return state;

    default:
      return state;
  }
};

export default reducerUser