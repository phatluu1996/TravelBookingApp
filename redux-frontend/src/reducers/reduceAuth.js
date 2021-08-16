import {
  LOGIN_USER_ERROR, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS,
  SIGNUP_USER_REQUEST, SIGNUP_USER_SUCCESS, SIGNUP_USER_ERROR,
  SIGNOUT_USER_REQUEST, SIGNOUT_USER_SUCCESS, SIGNOUT_USER_ERROR,
  CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_ERROR,
  SEND_EMAIL_FORGET_REQUEST, SEND_EMAIL_FORGET_SUCCESS, SEND_EMAIL_FORGET_ERROR,
  GET_ACC_FORGET_REQUEST, GET_ACC_FORGET_SUCCESS, GET_ACC_FORGET_ERROR,
  CHANGE_PASS_FG_REQUEST, CHANGE_PASS_FG_SUCCESS, CHANGE_PASS_FG_ERROR,
  CONFIRM_ACCOUNT_REQUEST, CONFIRM_ACCOUNT_SUCCESS, CONFIRM_ACCOUNT_ERROR,
  CLEAR_AUTH_STATE
} from "../actions/actionAuth";

const initialState = {
  form: null,
  requesting: false,
  success: false,
  message: null,
  data: null,
  account: null
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
        account: null,
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
        form: ''
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

    case SEND_EMAIL_FORGET_REQUEST:
      return {
        ...state,
        requesting: true,
        form: ''
      };

    case SEND_EMAIL_FORGET_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true,
        forgetPass: action.payload,
        form: 'forgetPassword'
      };
      return state;

    case SEND_EMAIL_FORGET_ERROR:
      state = {
        ...state,
        success: false,
        requesting: false,
        message: action.message,
        form: 'forgetPassword'
      };
      return state;

    //-----------------------------------------------------
    //-----------------------------------------------------

    case GET_ACC_FORGET_REQUEST:
      return {
        ...state,
        requesting: true,
        form: ''
      };

    case GET_ACC_FORGET_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true,
        accountForget: action.payload,
        form: 'getAccountForget'
      };
      return state;

    case GET_ACC_FORGET_ERROR:
      state = {
        ...state,
        success: false,
        requesting: false,
        message: action.message,
        form: 'getAccountForget'
      };
      return state;

    //-----------------------------------------------------
    case CHANGE_PASS_FG_REQUEST:
      return {
        ...state,
        requesting: true,
        form: ''
      };

    case CHANGE_PASS_FG_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true,
        accountForget:"",
        result: action.payload,
        form: 'changePasswordForget'
      };
      return state;

    case CHANGE_PASS_FG_ERROR:
      state = {
        ...state,
        success: false,
        requesting: false,
        message: action.message,
        form: 'changePasswordForget'
      };
      return state;

//-----------------------------------------------------
    case CONFIRM_ACCOUNT_REQUEST:
      return {
        ...state,
        requesting: true,
        form: ''
      };

    case CONFIRM_ACCOUNT_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true,
        confirmAccount: action.payload,
        form: 'confirmAcount'
      };
      return state;

    case CONFIRM_ACCOUNT_ERROR:
      state = {
        ...state,
        success: false,
        requesting: false,
        message: action.message,
        form: 'confirmAcount'
      };
      return state;

      case CLEAR_AUTH_STATE:
      state = {
        ...state,
        requesting: false,
        success: false,
        forgetPass: null,
        form: null
      };
      return state;

    default:
      return state;
  }
};

export default reducerAuth;