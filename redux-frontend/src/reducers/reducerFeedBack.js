import { CREATE_FEEDBACK_REQUEST, CREATE_FEEDBACK_SUCCESS, CREATE_FEEDBACK_ERROR, FETCH_FEEDBACK_REQUESS, FETCH_FEEDBACK_SUCCESS, FETCH_FEEDBACK_ERROR, EDIT_FEEDBACK_REQUEST, EDIT_FEEDBACK_SUCCESS, EDIT_FEEDBACK_ERROR, CLEAR_FEEDBACK_RESPONSE } from "../actions/actionFeedback";

const initialState = {
  requesting: false,
  success: false,
  message: null,
  data: null
}

const reducerFeedback = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FEEDBACK_REQUEST:
      return {
        ...state,
        requesting: true
      };

    case CREATE_FEEDBACK_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true,
        // data: action.payload
      };
      return state;

    case CREATE_FEEDBACK_ERROR:
      state = {
        ...state,
        requesting: false,
        message: action.message
      };
      return state;

    case EDIT_FEEDBACK_REQUEST:
      return {
        ...state,
        requesting: true
      };

    case EDIT_FEEDBACK_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true,
        // data: action.payload
      };
      return state;

    case EDIT_FEEDBACK_ERROR:
      state = {
        ...state,
        requesting: false,
        message: action.message
      };
      return state;

    case FETCH_FEEDBACK_REQUESS:
      return {
        ...state,
        requesting: true
      };

    case FETCH_FEEDBACK_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true,
        data: action.payload
      };
      return state;

    case FETCH_FEEDBACK_ERROR:
      state = {
        ...state,
        requesting: false,
        message: action.message
      };
      return state;

    case CLEAR_FEEDBACK_RESPONSE:
      state = {
        ...state,
        requesting: false,
        success: false
      };
      return state;

    default:
      return state;
  }
}

export default reducerFeedback