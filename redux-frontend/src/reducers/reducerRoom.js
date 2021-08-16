import {REMOVE_ROOM_ERROR,REMOVE_ROOM_SUCCESS,REMOVE_ROOM_REQUEST,UPDATE_ROOM_REQUEST,UPDATE_ROOM_SUCCESS,UPDATE_ROOM_ERROR,CREATE_ROOM_ERROR,CREATE_ROOM_SUCCESS,CREATE_ROOM_REQUEST,GET_ROOM_REQUEST,GET_ROOM_SUCCESS,GET_ROOM_ERROR} from "../actions/actionRoom";

const initialState = {
  requesting: false,
  success: false,
  message: null,
  data: null
}

function reducerRoom(state = initialState, action) {
  switch (action.type) {
    case GET_ROOM_REQUEST:
      return {
        ...state,
        requesting: true
      };

    case GET_ROOM_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true,
        data: action.payload
      };
      return state;

    case GET_ROOM_ERROR:
      state = {
        ...state,
        requesting: false,
        message: action.message
      };
      return state;
    case CREATE_ROOM_REQUEST:
      return {
        ...state,
        requesting: true
      };

    case CREATE_ROOM_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true,
        data: action.payload
      };
      return state;
    case CREATE_ROOM_ERROR:
      state = {
        ...state,
        requesting: false,
        message: action.message
      };

    case UPDATE_ROOM_REQUEST:
      state = {
        ...state,
        requesting: false,
        message: action.message
      };
    case UPDATE_ROOM_SUCCESS:
      state = {
        ...state,
        requesting: false,
        success: true,
        data: action.payload
      };
      return state;

    case UPDATE_ROOM_ERROR:
      state = {
        ...state,
        requesting: false,
        message: action.message
      };
      return state;
      case REMOVE_ROOM_REQUEST:
        state = {
          ...state,
          requesting: false,
          message: action.message
        };
      case REMOVE_ROOM_SUCCESS:
        state = {
          ...state,
          requesting: false,
          success: true,
          data: action.payload
        };
        return state;
  
      case REMOVE_ROOM_ERROR:
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

export default reducerRoom;