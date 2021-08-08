import {GET_ROOM_REQUEST,GET_ROOM_SUCCESS,GET_ROOM_ERROR} from "../actions/actionRoom";

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
    
        default:
          return state;
      }
  };
  
  export default reducerRoom;