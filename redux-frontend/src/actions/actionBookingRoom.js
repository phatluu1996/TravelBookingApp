
import { ROOT_URL } from '../config/api'; 
import axios from 'axios';


export const BOOKING_ROOM_REQUEST = "BOOKING_ROOM_REQUEST";
export const BOOKING_ROOM_SUCCESS = "BOOKING_ROOM_SUCCESS";
export const BOOKING_ROOM_ERROR = "BOOKING_ROOM_ERROR";

export const CLEAR_BOOKING_REQUEST ="CLEAR_BOOKING_REQUEST";

export const bookRoom = (data) => async dispatch => {
    try {
        dispatch({ type: BOOKING_ROOM_REQUEST });
        const url = `${ROOT_URL}/api/bookRoom`;
        const response = await axios.post(url,data);
        const responseBody = await response.data;
        dispatch({
            type: BOOKING_ROOM_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: BOOKING_ROOM_ERROR,
            message: error
        });
    }
}

export const clearBookingCached = () => async dispatch => {
    dispatch({
        type:CLEAR_BOOKING_REQUEST,
    })
}