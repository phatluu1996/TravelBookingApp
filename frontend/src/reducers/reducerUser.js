import _ from "lodash";
import { LOGIN_USER_ERROR, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS } from "../actions/actionUser";

const initialState = {
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
        data: action.payload
      };
      return state;

    case LOGIN_USER_ERROR:
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

export default reducerUser