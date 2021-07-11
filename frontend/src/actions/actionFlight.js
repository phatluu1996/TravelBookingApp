import axios from 'axios';
import { ROOT_URL } from '../config/api';

import { FETCH_FLIGHT } from "../const/index";

export const FETCH_FLIGHT_REQUEST = "FETCH_FLIGHT_REQUEST";
export const FETCH_FLIGHT_SUCCESS = "FETCH_FLIGHT_SUCCESS";
export const FETCH_FLIGHT_ERROR = "FETCH_FLIGHT_ERROR";

export const fetchFlight = (from, to, ddate) => async dispatch => {
    try {
        dispatch({ type: FETCH_FLIGHT_REQUEST });

        const url = `${ROOT_URL}/api/findFlights?from=${from}&to=${to}&departureDay=${ddate}`;
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

    // const request = axios.get(`${ROOT_URL}/api/findFlights?from=${from}&to=${to}&departureDay=${ddate}`);

    // return {
    //     type: FETCH_FLIGHT,
    //     payload: request
    // }
}

