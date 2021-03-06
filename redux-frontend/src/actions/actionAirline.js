import flightApi from "../config/flightApi";
import { ROOT_URL } from "../config/api";
import axios from "axios";
import { getToken } from "../utils";
import { config } from "@fortawesome/fontawesome-svg-core";

export const RETRIEVE_AIRLINE = "RETRIEVE_AIRLINE";
export const UPDATE_AIRLINE = "UPDATE_AIRLINE";


export const retrieveAirline = (id) => async (dispatch) => {
    try {
        const res = await flightApi.getAirline(id);

        dispatch({
            type: RETRIEVE_AIRLINE,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const updateAirline = (id, data) => async (dispatch) => {
    try {
        const res = await flightApi.updateAirline(id, data);

        dispatch({
            type: UPDATE_AIRLINE,
            payload: data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const FETCH_ALL_AIRLINE_REQUEST = "FETCH_ALL_AIRLINE_REQUEST";
export const FETCH_ALL_AIRLINE_SUCCESS = "FETCH_ALL_AIRLINE_SUCCESS";
export const FETCH_ALL_AIRLINE_ERROR = "FETCH_ALL_AIRLINE_ERROR";

export const fetchAllAirline = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_ALL_AIRLINE_REQUEST });
        const httpAuth = axios.create({
            baseURL: `${ROOT_URL}/api`,
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("userToken")
            }
        });
        const response = await httpAuth.get(`/airlines`);
        const responseBody = await response.data;
        dispatch({
            type: FETCH_ALL_AIRLINE_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: FETCH_ALL_AIRLINE_ERROR,
            message: error
        });
    }
}

export const CREATE_AIRLINE_REQUEST = "CREATE_AIRLINE_REQUEST";
export const CREATE_AIRLINE_SUCCESS = "CREATE_AIRLINE_SUCCESS";
export const CREATE_AIRLINE_ERROR = "CREATE_AIRLINE_ERROR";

export const createAirline = (data) => async dispatch => {
    try {
        dispatch({ type: CREATE_AIRLINE_REQUEST });
        const url = `${ROOT_URL}/api/airline`;
        const response = await axios.post(url, data)
        const responseBody = await response.data;
        dispatch({
            type: CREATE_AIRLINE_SUCCESS
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: CREATE_AIRLINE_ERROR,
            message: error
        });
    }
}


export const GET_AIRLINE_REQUEST = "GET_AIRLINE_REQUEST";
export const GET_AIRLINE_SUCCESS = "GET_AIRLINE_SUCCESS";
export const GET_AIRLINE_ERROR = "GET_AIRLINE_ERROR";


export const getAirline = (id) => async dispatch => {
    try {
        dispatch({ type: GET_AIRLINE_REQUEST });
        const httpAuth = axios.create({
            baseURL: `${ROOT_URL}/api`,
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("userToken")
            }
        });
        const response = await httpAuth.get(`/airline/${id}`);
        const responseBody = await response.data;
        dispatch({
            type: GET_AIRLINE_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        dispatch({
            type: GET_AIRLINE_ERROR,
            message: error
        });
    }
}

export const GET_ALL_BOOKING_AIRLINE_REQUEST = "GET_ALL_BOOKING_AIRLINE_REQUEST";
export const GET_ALL_BOOKING_AIRLINE_SUCCESS = "GET_ALL_BOOKING_AIRLINE_SUCCESS";
export const GET_ALL_BOOKING_AIRLINE_ERROR = "GET_ALL_BOOKING_AIRLINE_ERROR";


export const getAllBookingAirline = (id) => async dispatch => {
    try {
        dispatch({ type: GET_ALL_BOOKING_AIRLINE_REQUEST });
        const httpAuth = axios.create({
            baseURL: `${ROOT_URL}/api`,
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("userToken")
            }
        });
        const response = await httpAuth.get(`/airline/allAirlineBooking/${id}`);
        const responseBody = await response.data;
        dispatch({
            type: GET_ALL_BOOKING_AIRLINE_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        dispatch({
            type: GET_ALL_BOOKING_AIRLINE_ERROR,
            message: error
        });
    }
}

export const GET_DAILY_INCOME_AIRLINE_REQUEST = "GET_DAILY_INCOME_AIRLINE_REQUEST";
export const GET_DAILY_INCOME_AIRLINE_SUCCESS = "GET_DAILY_INCOME_AIRLINE_SUCCESS";
export const GET_DAILY_INCOME_AIRLINE_ERROR = "GET_DAILY_INCOME_AIRLINE_ERROR";


export const getDailyIncomeAirline = (id) => async dispatch => {
    try {
        dispatch({ type: GET_DAILY_INCOME_AIRLINE_REQUEST });
        const httpAuth = axios.create({
            baseURL: `${ROOT_URL}/api`,
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("userToken")
            }
        });
        const response = await httpAuth.get(`/airline/dailyIncomeAirline/${id}`);
        const responseBody = await response.data;
        dispatch({
            type: GET_DAILY_INCOME_AIRLINE_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        dispatch({
            type: GET_DAILY_INCOME_AIRLINE_ERROR,
            message: error
        });
    }
}

export const GET_REVENUE_AIRLINE_REQUEST = "GET_REVENUE_AIRLINE_REQUEST";
export const GET_REVENUE_AIRLINE_SUCCESS = "GET_REVENUE_AIRLINE_SUCCESS";
export const GET_REVENUE_AIRLINE_ERROR = "GET_REVENUE_AIRLINE_ERROR";


export const getRevenueAirline = (id) => async dispatch => {
    try {
        dispatch({ type: GET_REVENUE_AIRLINE_REQUEST });
        const httpAuth = axios.create({
            baseURL: `${ROOT_URL}/api`,
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("userToken")
            }
        });
        const response = await httpAuth.get(`/airline/revenueByAirline/${id}`);
        const responseBody = await response.data;
        dispatch({
            type: GET_REVENUE_AIRLINE_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        dispatch({
            type: GET_REVENUE_AIRLINE_ERROR,
            message: error
        });
    }
}

export const COUNT_BOOKING_TODAY_AIRLINE_REQUEST = "COUNT_BOOKING_TODAY_AIRLINE_REQUEST";
export const COUNT_BOOKING_TODAY_AIRLINE_SUCCESS = "COUNT_BOOKING_TODAY_AIRLINE_SUCCESS";
export const COUNT_BOOKING_TODAY_AIRLINE_ERROR = "COUNT_BOOKING_TODAY_AIRLINE_ERROR";


export const countBookingTodayAirline = (id) => async dispatch => {
    try {
        dispatch({ type: COUNT_BOOKING_TODAY_AIRLINE_REQUEST });
        const httpAuth = axios.create({
            baseURL: `${ROOT_URL}/api`,
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("userToken")
            }
        });
        const response = await httpAuth.get(`/airline/bookingToday/${id}`);
        const responseBody = await response.data;
        dispatch({
            type: COUNT_BOOKING_TODAY_AIRLINE_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        dispatch({
            type: COUNT_BOOKING_TODAY_AIRLINE_ERROR,
            message: error
        });
    }
}

export const GET_REPORT_MONTH_AIRLINE_REQUEST = "GET_REPORT_MONTH_AIRLINE_REQUEST";
export const GET_REPORT_MONTH_AIRLINE_SUCCESS = "GET_REPORT_MONTH_AIRLINE_SUCCESS";
export const GET_REPORT_MONTH_AIRLINE_ERROR = "GET_REPORT_MONTH_AIRLINE_ERROR";


export const getReportMonthAirline = (id) => async dispatch => {
    try {
        dispatch({ type: GET_REPORT_MONTH_AIRLINE_REQUEST });
        const httpAuth = axios.create({
            baseURL: `${ROOT_URL}/api`,
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("userToken")
            }
        });
        const response = await httpAuth.get(`/airline/reportPerMonth/${id}`);
        const responseBody = await response.data;
        dispatch({
            type: GET_REPORT_MONTH_AIRLINE_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        dispatch({
            type: GET_REPORT_MONTH_AIRLINE_ERROR,
            message: error
        });
    }
}

export const CLEAR_AIRLINE_STATE = "CLEAR_AIRLINE_STATE"
export const clearAirlineState = () => async dispatch => {
    dispatch({ type: CLEAR_AIRLINE_STATE });
}

export const REMOVE_AIRLINE_REQUEST = "REMOVE_AIRLINE_REQUEST";
export const REMOVE_AIRLINE_SUCCESS = "REMOVE_AIRLINE_SUCCESS";
export const REMOVE_AIRLINE_ERROR = "REMOVE_AIRLINE_ERROR";

export const removeAirline = (id) => async dispatch => {
    try {
        dispatch({ type: REMOVE_AIRLINE_REQUEST });
        const url = `${ROOT_URL}/api/airline/${parseInt(id)}`;
        const response = await axios.post(url);
        const responseBody = await response.data;
        dispatch({
            type: REMOVE_AIRLINE_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: REMOVE_AIRLINE_ERROR,
            message: error
        });
    }
}

export const REMOVE_FLIGHT_REQUEST = "REMOVE_FLIGHT_REQUEST";
export const REMOVE_FLIGHT_SUCCESS = "REMOVE_FLIGHT_SUCCESS";
export const REMOVE_FLIGHT_ERROR = "REMOVE_FLIGHT_ERROR";

export const removeFlight = (id) => async (dispatch) => {
    try {
        dispatch({ type: REMOVE_FLIGHT_REQUEST });
        const url = `${ROOT_URL}/api/flight/${parseInt(id)}`;
        const response = await axios.post(url);
        const responseBody = await response.data;
        dispatch({
            type: REMOVE_FLIGHT_SUCCESS,
            payload: responseBody
        });
    } catch (err) {
        dispatch({
            type: REMOVE_FLIGHT_ERROR,
            message: err
        });
    }
};


export const UPDATE_FLIGHT_REQUEST = "UPDATE_FLIGHT_REQUEST";
export const UPDATE_FLIGHT_SUCCESS = "UPDATE_FLIGHT_SUCCESS";
export const UPDATE_FLIGHT_ERROR = "UPDATE_FLIGHT_ERROR";

export const updateFlight = (id, data) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_FLIGHT_REQUEST });
        const url = `${ROOT_URL}/api/flight/${parseInt(id)}`;
        const response = await axios.put(url, data);
        const responseBody = await response.data;        
        // const res = await flightApi.updateFlight(id, data);
  
        dispatch({
            type: UPDATE_FLIGHT_SUCCESS,
            payload: responseBody,
        });
    } catch (err) {
        dispatch({
            type: UPDATE_FLIGHT_ERROR,
            message: err
        });
    }
};
