import axios from 'axios';
import { ROOT_URL } from '../config/api';

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_ERROR = "LOGIN_USER_ERROR";

export const signin = (username, password) => async dispatch => {
    try {
        dispatch({ type: LOGIN_USER_REQUEST });

        const url = `${ROOT_URL}/api/auth/signin`;   // User login api
        const body = {
            username : username,
            password : password
        }
        const response = await axios.post(url, body)
        const responseBody = await response.data;        
        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: responseBody
        });        
    } catch (error) {
        console.error(error);
        dispatch({
            type: LOGIN_USER_ERROR,
            message: error
        });
    }
}