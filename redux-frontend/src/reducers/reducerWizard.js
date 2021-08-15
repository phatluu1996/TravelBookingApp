import { GET_ONE_HOTEL_ERROR, GET_ONE_HOTEL_REQUEST, GET_ONE_HOTEL_SUCCESS } from "../actions/actionStepWizard";

const initialState = {
    requesting: false,
    success: false,
    message: null,
    data: null
}

function reducerWizard(state = initialState, action) {
    switch (action.type) {
        case GET_ONE_HOTEL_REQUEST:
            return {
                ...state,
                requesting: true
            };

        case GET_ONE_HOTEL_SUCCESS:
            state = {
                ...state,
                requesting: false,
                success: true,
                data: action.payload
            };
            return state;

        case GET_ONE_HOTEL_ERROR:
            state = {
                ...state,
                requesting: false,
                message: action.message
            };
            return state;

        default:
            return state;
    }
}

export default reducerWizard;