




import { ROOT_URL } from '../config/api'; 
import axios from 'axios';

export const GET_ROOM_REQUEST = "GET_ROOM_REQUEST";
export const GET_ROOM_SUCCESS = "GET_ROOM_SUCCESS";
export const GET_ROOM_ERROR = "GET_ROOM_ERROR";


export const getRoom = (id) => async dispatch => {
    try {
        dispatch({ type: GET_ROOM_REQUEST });
        const url = `${ROOT_URL}/api/room/${id}`;
        const response = await axios.get(url)
        const responseBody = await response.data;
        dispatch({
            type: GET_ROOM_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: GET_ROOM_ERROR,
            message: error
        });
    }
}
export const getRooms = (data) => async dispatch => {
    try {
        dispatch({ type: GET_ROOM_REQUEST });
        const url = `${ROOT_URL}/api/ListRoom`;
        const response = await axios.post(url,data)
        const responseBody = await response.data;
        dispatch({
            type: GET_ROOM_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: GET_ROOM_ERROR,
            message: error
        });
    }
}
export const getRoomByHotelId = (id) => async dispatch => {
    try {
        dispatch({ type: GET_ROOM_REQUEST });
        const url = `${ROOT_URL}/api/hotelRoom/${id}`;
        const response = await axios.get(url)
        const responseBody = await response.data;
        dispatch({
            type: GET_ROOM_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: GET_ROOM_ERROR,
            message: error
        });
    }
}

export const CREATE_ROOM_REQUEST = "CREATE_ROOM_REQUEST";
export const CREATE_ROOM_SUCCESS = "CREATE_ROOM_SUCCESS";
export const CREATE_ROOM_ERROR = "CREATE_ROOM_ERROR";

export const createRoom = (data) => async dispatch => {
    try {
        dispatch({ type: CREATE_ROOM_REQUEST });
        const config = {
            headers: {
                'content-Type': 'multipart/form-data'
                // 'accept': 'application/json'
            }
        };
        const url = `${ROOT_URL}/api/room`;
        const response = await axios.post(url,data,config)
        const responseBody = await response.data;
        dispatch({
            type: CREATE_ROOM_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: CREATE_ROOM_ERROR,
            message: error
        });
    }
}