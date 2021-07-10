import { FETCH_FLIGHT } from "../const/index";

const reducerFlight = (state = [], action) => {
    switch (action.type) {
    //   case ADD_NEW_NOTE:
    //     const generateID = new Date().getTime();
    //     state = [...state, { id: generateID, content: action.content }];
    //     return state;
      case FETCH_FLIGHT:
        state = [...state, { flights : action.payload }];
        return state;
      default:
        return state;
    }
  };
   
  export default reducerFlight


