import hotelApi from "../config/hotelApi";

import { ROOT_URL } from '../config/api'; 
import axios from 'axios';

export const FETCH_HOTEL_REQUEST = "FETCH_HOTEL_REQUEST";
export const FETCH_HOTEL_SUCCESS = "FETCH_HOTEL_SUCCESS";
export const FETCH_HOTEL_ERROR = "FETCH_HOTEL_ERROR";


  
export const fetchHotel = (province,district,ward,numberAdult,numberChildren,checkInDate,numRoom) => async dispatch => {
    try {
        dispatch({ type: FETCH_HOTEL_REQUEST });
        const url = `${ROOT_URL}/api/findHotels?province=${province}&district=${district}&ward=${ward}&numberAdult=${numberAdult}&numberChildren=${numberChildren}&checkInDate=${checkInDate}&numRoom=${numRoom}`;
        console.log(url);
        const response = await axios.get(url)
        const responseBody = await response.data;
        dispatch({
            type: FETCH_HOTEL_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: FETCH_HOTEL_ERROR,
            message: error
        });
    }
}
export const fetchHotelByAccountId = (id) => async dispatch => {
     try {
        dispatch({ type: FETCH_HOTEL_REQUEST });
       const url = `${ROOT_URL}/api/findHotel?id=${id}`;
        console.log(url);
        const response = await axios.get(url)
        const responseBody = await response.data;
        dispatch({
            type: FETCH_HOTEL_SUCCESS,
            payload: responseBody[0]
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: FETCH_HOTEL_ERROR,
            message: error
        });
    }
}
export const fetchHotelById = (id) => async dispatch => {
    try {
       dispatch({ type: FETCH_HOTEL_REQUEST });
      const url = `${ROOT_URL}/api/hotel/${id}`;
       console.log(url);
       const response = await axios.get(url)
       const responseBody = await response.data;
       dispatch({
           type: FETCH_HOTEL_SUCCESS,
           payload: responseBody
       });
   } catch (error) {
       console.error(error);
       dispatch({
           type: FETCH_HOTEL_ERROR,
           message: error
       });
   }
}
export const getUpdate = (id,data) => async dispatch => {
    try {
       dispatch({ type: FETCH_HOTEL_REQUEST });
       const url = `${ROOT_URL}/api/hotel/${id}`;
       console.log(url);
       const response = await axios.put(url,data);
       const responseBody = await response.data;
       dispatch({
           type: FETCH_HOTEL_SUCCESS,
           payload: responseBody
       });
   } catch (error) {
       console.error(error);
       dispatch({
           type: FETCH_HOTEL_ERROR,
           message: error
       });
   }
}

export const FETCH_ALL_HOTEL_REQUEST = "FETCH_ALL_HOTEL_REQUEST";
export const FETCH_ALL_HOTEL_SUCCESS = "FETCH_ALL_HOTEL_SUCCESS";
export const FETCH_ALL_HOTEL_ERROR = "FETCH_ALL_HOTEL_ERROR";


export const fetchAllHotel = () => async dispatch => {
    try {
        dispatch({ type: FETCH_ALL_HOTEL_REQUEST });
        const url = `${ROOT_URL}/api/hotels`;
        const response = await axios.get(url)
        const responseBody = await response.data;
        dispatch({
            type: FETCH_ALL_HOTEL_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: FETCH_ALL_HOTEL_ERROR,
            message: error
        });
    }
}

export const CREATE_HOTEL_REQUEST = "CREATE_HOTEL_REQUEST";
export const CREATE_HOTEL_SUCCESS = "CREATE_HOTEL_SUCCESS";
export const CREATE_HOTEL_ERROR = "CREATE_HOTEL_ERROR";

export const createHotel = (data) => async dispatch => {
    try {
        dispatch({ type: CREATE_HOTEL_REQUEST });
        const url = `${ROOT_URL}/api/hotel`;
        const response = await axios.post(url, data)
        const responseBody = await response.data;
        dispatch({
            type: CREATE_HOTEL_SUCCESS
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: CREATE_HOTEL_ERROR,
            message: error
        });
    }
}

export const UPDATE_HOTEL_REQUEST = "UPDATE_HOTEL_REQUEST";
export const UPDATE_HOTEL_SUCCESS = "UPDATE_HOTEL_SUCCESS";
export const UPDATE_HOTEL_ERROR = "UPDATE_HOTEL_ERROR";

export const updateHotel = (id, data) => async dispatch => {
    try {
        dispatch({ type: UPDATE_HOTEL_REQUEST });
        const url = `${ROOT_URL}/api/hotel/${id}`;
        const response = await axios.put(url, data)
        const responseBody = await response.data;
        dispatch({
            type: UPDATE_HOTEL_SUCCESS
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: UPDATE_HOTEL_ERROR,
            message: error
        });
    }
}

export const GET_HOTEL_REQUEST = "GET_HOTEL_REQUEST";
export const GET_HOTEL_SUCCESS = "GET_HOTEL_SUCCESS";
export const GET_HOTEL_ERROR = "GET_HOTEL_ERROR";

export const getHotel = (id) => async dispatch => {
    try {
        dispatch({ type: GET_HOTEL_REQUEST });
        const url = `${ROOT_URL}/api/hotel/${id}`;
        const response = await axios.get(url)
        const responseBody = await response.data;
        dispatch({
            type: GET_HOTEL_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        dispatch({
            type: GET_HOTEL_ERROR,
            message: error
        });
    }
}


