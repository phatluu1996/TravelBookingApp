import {FETCH_PROVINCE_REQUEST,FETCH_PROVINCE_SUCCESS,FETCH_PROVINCE_ERROR} from "../actions/actionLocation";

const initialState = {
    requesting: false,
    success: false,
    message: null,
    data: null
  }
function reducerProvince(state = initialState, action) {
    switch (action.type) {
        case FETCH_PROVINCE_REQUEST:
          return {
            ...state,
            requesting: true
          };
    
        case FETCH_PROVINCE_SUCCESS:
          state = {
            ...state,
            requesting: false,
            success: true,
            data: action.payload
          };
          return state;
    
        case FETCH_PROVINCE_ERROR:
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
  
  export default reducerProvince;