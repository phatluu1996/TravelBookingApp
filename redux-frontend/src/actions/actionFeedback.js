import axios from "axios";
import { ROOT_URL } from "../config/api";

export const CREATE_FEEDBACK_REQUEST =	"CREATE_FEEDBACK_REQUEST";
export const CREATE_FEEDBACK_SUCCESS = "CREATE_FEEDBACK_SUCCESS";
export const CREATE_FEEDBACK_ERROR = "CREATE_FEEDBACK_ERROR";

export const EDIT_FEEDBACK_REQUEST = "EDIT_FEEDBACK_REQUEST";
export const EDIT_FEEDBACK_SUCCESS	= "EDIT_FEEDBACK_SUCCESS";
export const EDIT_FEEDBACK_ERROR = "EDIT_FEEDBACK_ERROR";

export const GET_FEEDBACK_REQUEST = "GET_FEEDBACK_REQUEST";
export const GET_FEEDBACK_SUCCESS = "GET_FEEDBACK_SUCCESS";
export const GET_FEEDBACK_ERROR = "GET_FEEDBACK_ERROR";

export const FETCH_FEEDBACK_REQUESS = "FETCH_FEEDBACK_REQUESS";
export const FETCH_FEEDBACK_SUCCESS = "FETCH_FEEDBACK_SUCCESS";
export const FETCH_FEEDBACK_ERROR = "FETCH_FEEDBACK_ERROR";

export const createFeedback = (feedback) => async dispatch => {
    try {
        dispatch({ type: CREATE_FEEDBACK_REQUEST });

        const url = `${ROOT_URL}/api/feedback`;
        const response = await axios.post(url, feedback);
        const responseBody = await response.data;
        dispatch({
            type: CREATE_FEEDBACK_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: CREATE_FEEDBACK_ERROR,
            message: error
        });
    }
}

export const fetchFeedback = () => async dispatch => {
    try {
        dispatch({ type: FETCH_FEEDBACK_REQUESS });

        const url = `${ROOT_URL}/api/feedback`;
        const response = await axios.get(url);
        const responseBody = await response.data;
        dispatch({
            type: FETCH_FEEDBACK_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: FETCH_FEEDBACK_ERROR,
            message: error
        });
    }
}

export const replyFeedback = (id, data) => async dispatch => {
    try {
        dispatch({ type: EDIT_FEEDBACK_REQUEST });

        const url = `${ROOT_URL}/api/feedback/${id}`;
        const response = await axios.put(url, data);
        const responseBody = await response.data;
        dispatch({
            type: EDIT_FEEDBACK_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: EDIT_FEEDBACK_ERROR,
            message: error
        });
    }
}
export const CLEAR_FEEDBACK_RESPONSE = 'CLEAR_FEEDBACK_RESPONSE'
export const clearFeedbackState = () => async dispatch => {
    dispatch({type : CLEAR_FEEDBACK_RESPONSE})
}



 

