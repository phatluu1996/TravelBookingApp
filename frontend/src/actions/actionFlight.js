import axios from 'axios';
import { ROOT_URL } from '../../config/api';

export const GET_AIRPORT = 'get_airport';
export const FETCH_FLIGHT = 'fetch_flight';
export const SORT_FLIGHT = 'sort_flight';

export const fetchFlight = (from, to, ddate) => {
    const token = localStorage.tiketToken;
    const request = axios.get(`${ROOT_URL}/api/flight?from=${from}&to=${to}&ddate=${ddate}`);

    return {
        type: FETCH_FLIGHT,
        payload: request
    }
}

