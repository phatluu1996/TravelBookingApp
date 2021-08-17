import bookingFlight from '../config/bookingFlight';

export const BOOKING_FLIGHT_REQUEST = "BOOKING_FLIGHT_REQUEST";
export const BOOKING_FLIGHT_SUCCESS = "BOOKING_FLIGHT_SUCCESS";
export const BOOKING_FLIGHT_ERROR = "BOOKING_FLIGHT_ERROR";

export const CLEAR_BOOKING_REQUEST ="CLEAR_BOOKING_REQUEST";

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

export const GET_BOOKING_FLIGHT_REQUEST = "GET_BOOKING_FLIGHT_REQUEST";
export const GET_BOOKING_FLIGHT_SUCCESS = "GET_BOOKING_FLIGHT_SUCCESS";
export const GET_BOOKING_FLIGHT_ERROR = "GET_BOOKING_FLIGHT_ERROR";
export const getBookingFlight = (id) => async dispatch => {
    try {
        dispatch({ type: GET_BOOKING_FLIGHT_REQUEST });

        const response = await bookingFlight.getBooking(id);
        const responseBody = await response.data;
        dispatch({
            type: GET_BOOKING_FLIGHT_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: GET_BOOKING_FLIGHT_ERROR,
            message: error
        });
    }
}

export const UPDATE_BOOKING_FLIGHT_REQUEST = "UPDATE_BOOKING_FLIGHT_REQUEST";
export const UPDATE_BOOKING_FLIGHT_SUCCESS = "UPDATE_BOOKING_FLIGHT_SUCCESS";
export const UPDATE_BOOKING_FLIGHT_ERROR = "UPDATE_BOOKING_FLIGHT_ERROR";
export const editBookingFlight = (id, data) => async dispatch => {
    try {
        dispatch({ type: UPDATE_BOOKING_FLIGHT_REQUEST });

        const response = await bookingFlight.updateBooking(id, data);
        const responseBody = await response.data;
        dispatch({
            type: UPDATE_BOOKING_FLIGHT_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: UPDATE_BOOKING_FLIGHT_ERROR,
            message: error
        });
    }
}

export const clearFlightBookingCached = () => async dispatch => {
    dispatch({
        type:CLEAR_BOOKING_REQUEST,
    })
}