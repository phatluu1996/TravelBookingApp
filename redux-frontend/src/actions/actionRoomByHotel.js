import { ROOT_URL } from '../config/api'; 
import axios from 'axios';


export const CREATE_ROOM = "CREATE_ROOM";
export const RETRIEVE_ROOM = "RETRIEVE_ROOM";
export const UPDATE_ROOM = "UPDATE_ROOM";
export const DELETE_ROOM = "DELETE_ROOM";
export const LIST_ROOMS = "LIST_ROOMS";

export const FETCH_HOTEL_REQUEST = "FETCH_HOTEL_REQUEST";
export const FETCH_HOTEL_SUCCESS = "FETCH_HOTEL_SUCCESS";
export const FETCH_HOTEL_ERROR = "FETCH_HOTEL_ERROR";


export const getListRoomByHotel = (id) => async (dispatch) => {
    try {
        const res = await hotelApi.getListRoomByHotel(id);

        dispatch({
            type: LIST_ROOMS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const createRoom = (availableTime,maxAdult,maxChildren,
    paymentAtHotel,price,romNum,rumType,hotel) => async (dispatch) => 
    {
        try {
            dispatch({ type: FETCH_HOTEL_REQUEST });
            const url = ``;
                const response = await axios.post(url);
                const responseBody = await response.data;
            dispatch({
                type: FETCH_HOTEL_SUCCESS,
                payload: responseBody
            });
        } catch (err) {
            console.error(error);
            dispatch({
                type: FETCH_HOTEL_ERROR,
                message: error
            });
        }
};


export const updateRoom = (id,data) => async (dispatch) => {
    try {
        const res = await hotelApi.updateRoom(id,data)
  
        dispatch({
            type: UPDATE_ROOM,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const deleteRoom = (id) => async (dispatch) => {
    try {
        const res = await hotelApi.deleteRoom(id);
  
        dispatch({
            type: DELETE_ROOM,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};



  
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

