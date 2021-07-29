import axios from 'axios';
import { ROOT_URL } from '../config/api';

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_ERROR = "LOGIN_USER_ERROR";

export const SIGNUP_USER_REQUEST = "SIGNUP_USER_REQUEST";
export const SIGNUP_USER_SUCCESS = "SIGNUP_USER_SUCCESS";
export const SIGNUP_USER_ERROR = "SIGNUP_USER_ERROR";

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
        dispatch({
            type: LOGIN_USER_ERROR,
            message: error
        });
    }
}

export const signup = (firstname, lastname, username, email, password) => async dispatch =>{
    try {
        dispatch({ type: SIGNUP_USER_REQUEST });

        const url = `${ROOT_URL}/api/auth/signup`;   // User login api
        const body = {
            userFirstName: firstname,
            userLastName: lastname,
            username : username,
            email: email,
            password : password,
            role: 'USER'
        }
        const response = await axios.post(url, body)
        const responseBody = await response.data;        
        dispatch({
            type: SIGNUP_USER_SUCCESS,
            payload: responseBody
        });        
    } catch (error) {
        dispatch({
            type: SIGNUP_USER_ERROR,
            message: error
        });
    }
}