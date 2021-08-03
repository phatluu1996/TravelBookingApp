import axios from 'axios';
import bookingFlight from '../config/bookingFlight';


export const BOOKING_FLIGHT_REQUEST = "BOOKING_FLIGHT_REQUEST";
export const BOOKING_FLIGHT_SUCCESS = "BOOKING_FLIGHT_SUCCESS";
export const BOOKING_FLIGHT_ERROR = "BOOKING_FLIGHT_ERROR";

export const bookFlight = (data) => async dispatch => {
    try {
        dispatch({ type: BOOKING_FLIGHT_REQUEST });

        const response = await bookingFlight.bookFlt(data);
        const responseBody = await response.data;
        dispatch({
            type: BOOKING_FLIGHT_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: BOOKING_FLIGHT_ERROR,
            message: error
        });
    }
}