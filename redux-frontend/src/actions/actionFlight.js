import axios from 'axios';
import { ROOT_URL } from '../config/api';


export const FETCH_FLIGHT_REQUEST = "FETCH_FLIGHT_REQUEST";
export const FETCH_FLIGHT_SUCCESS = "FETCH_FLIGHT_SUCCESS";
export const FETCH_FLIGHT_ERROR = "FETCH_FLIGHT_ERROR";

export const fetchFlight = (from, to, adult, child, infant, ddate, rdate, seatClass, priceFrom, priceTo, page, sortBy, sortDir) => async dispatch => {
    try {
        dispatch({ type: FETCH_FLIGHT_REQUEST });

        const url = `${ROOT_URL}/api/findFlights?from=${from}&to=${to}&adult=${adult}&child=${child}&infant=${infant}&departureDate=${ddate}&returnDate=${rdate}&seatClass=${seatClass}&priceFrom=${priceFrom}&priceTo=${priceTo}&page=${page}&sortBy=${sortBy}&sortDir=${sortDir}`;
        const response = await axios.get(url)
        const responseBody = await response.data;
        dispatch({
            type: FETCH_FLIGHT_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: FETCH_FLIGHT_ERROR,
            message: error
        });
    }
}

export const GET_ROUND_FLIGHT_REQUEST = "GET_ROUND_FLIGHT_REQUEST";
export const GET_ROUND_FLIGHT_SUCCESS = "GET_ROUND_FLIGHT_SUCCESS";
export const GET_ROUND_FLIGHT_ERROR = "GET_ROUND_FLIGHT_ERROR";

export const getRoundFlight = (dId, rId) => async dispatch => {
    try {
        dispatch({ type: GET_ROUND_FLIGHT_REQUEST });

        const url = `${ROOT_URL}/api/roundFlight?dId=${dId}&rId=${rId}`;
        const response = await axios.get(url)
        const responseBody = await response.data;
        dispatch({
            type: GET_ROUND_FLIGHT_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: GET_ROUND_FLIGHT_ERROR,
            message: error
        });
    }
}



