




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