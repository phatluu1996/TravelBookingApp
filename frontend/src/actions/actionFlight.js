import axios from 'axios';
import { ROOT_URL } from '../../config/api';

import { FETCH_FLIGHT } from "../const/index";

export const fetchFlight = (from, to, ddate) => {
    const request = axios.get(`${ROOT_URL}/api/flight?from=${from}&to=${to}&departureDay=${ddate}`);

    return {
        type: FETCH_FLIGHT,
        payload: request
    }
}

