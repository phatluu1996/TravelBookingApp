import hotelApi from "../config/hotelApi";

import { ROOT_URL } from '../config/api'; 
import axios from 'axios';

export const RETRIEVE_HOTEL = "RETRIEVE_HOTEL";
export const UPDATE_HOTEL = "UPDATE_HOTEL";
export const FETCH_HOTEL_REQUEST = "FETCH_HOTEL_REQUEST";
export const FETCH_HOTEL_SUCCESS = "FETCH_HOTEL_SUCCESS";
export const FETCH_HOTEL_ERROR = "FETCH_HOTEL_ERROR";


  
export const retrieveHotel = (id) => async (dispatch) => {
    try {
        const res = await hotelApi.getHotelById(id);
  
        dispatch({
            type: RETRIEVE_HOTEL,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const updateHotel = (id, data) => async (dispatch) => {
    try {
        const res = await hotelApi.updateHotel(id, data);
  
        dispatch({
            type: UPDATE_HOTEL,
            payload: data,
        });
  
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};


export const fetchHotel = (province,district,ward,numberAdult,numberChildren,checkInDate,numRoom) => async dispatch => {
    try {
        dispatch({ type: FETCH_HOTEL_REQUEST });
        const url = `${ROOT_URL}/api/hotel?province=${province}&district=${district}&ward=${ward}&numberAdult=${numberAdult}&numberChildren=${numberChildren}&checkInDate=${checkInDate}&numRoom=${numRoom}`;
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



