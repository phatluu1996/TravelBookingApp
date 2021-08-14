import {CREATE_HOTEL_FEEDBACK_REQUEST,CREATE_HOTEL_FEEDBACK_SUCCESS,CREATE_HOTEL_FEEDBACK_ERROR} from "../actions/actionHotel";

const initialState = {
    requesting: false,
    success: false,
    message: null,
    data: null
  }
function reducerHotelFeedBack(state = initialState, action) {
    switch (action.type) {
        case CREATE_HOTEL_FEEDBACK_REQUEST:
          return {
            ...state,
            requesting: true
          };
    
        case CREATE_HOTEL_FEEDBACK_SUCCESS:
          state = {
            ...state,
            requesting: false,
            success: true,
            data: action.payload
          };
          return state;
    
        case CREATE_HOTEL_FEEDBACK_ERROR:
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
  
  export default reducerHotelFeedBack;