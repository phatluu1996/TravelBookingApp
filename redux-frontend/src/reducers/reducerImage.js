import { REMOVE_IMAGE_REQUEST, REMOVE_IMAGE_SUCCESS, REMOVE_IMAGE_ERROR } from "../actions/actionImage";

const initialState = {
    requesting: false,
    success: false,
    message: null,
    data: null
}



function reducerImage(state = initialState, action) {
    switch (action.type) {
        case REMOVE_IMAGE_REQUEST:
            return {
                ...state,
                requesting: true
            };

        case REMOVE_IMAGE_SUCCESS:
            state = {
                ...state,
                requesting: false,
                success: true,
                data: action.payload
            };
            return state;

        case REMOVE_IMAGE_ERROR:
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

export default reducerImage;