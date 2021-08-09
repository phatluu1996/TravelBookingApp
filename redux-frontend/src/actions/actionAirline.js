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
            baseURL:`${ROOT_URL}/api`,
            headers: {
                "Content-type": "application/json",
                "Authorization":"Bearer "+sessionStorage.getItem("userToken")
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
            baseURL:`${ROOT_URL}/api`,
            headers: {
                "Content-type": "application/json",
                "Authorization":"Bearer "+sessionStorage.getItem("userToken")
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



