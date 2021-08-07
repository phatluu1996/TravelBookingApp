import axios from 'axios';
import { ROOT_URL } from '../config/api';

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_ERROR = "LOGIN_USER_ERROR";

export const SIGNUP_USER_REQUEST = "SIGNUP_USER_REQUEST";
export const SIGNUP_USER_SUCCESS = "SIGNUP_USER_SUCCESS";
export const SIGNUP_USER_ERROR = "SIGNUP_USER_ERROR";

export const SIGNOUT_USER_REQUEST = "SIGNOUT_USER_REQUEST";
export const SIGNOUT_USER_SUCCESS = "SIGNOUT_USER_SUCCESS";
export const SIGNOUT_USER_ERROR = "SIGNOUT_USER_ERROR";

export const CHANGE_PASSWORD_REQUEST = "CHANGE_PASSWORD_REQUEST";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_ERROR = "CHANGE_PASSWORD_ERROR";

export const signin = (username, password) => async dispatch => {
    try {
        dispatch({ type: LOGIN_USER_REQUEST });

        const url = `${ROOT_URL}/api/auth/signin`;
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

export const googleSignin = (firstname, lastname, username, email, password) => async dispatch =>{
    try {
        dispatch({ type: LOGIN_USER_REQUEST });

        const url = `${ROOT_URL}/api/auth/ggsignin`;
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

export const signout = () => async dispatch =>{
    try {
        dispatch({ type: SIGNOUT_USER_REQUEST });       
        dispatch({
            type: SIGNOUT_USER_SUCCESS            
        });        
    } catch (error) {
        dispatch({
            type: SIGNOUT_USER_ERROR,
            message: error
        });
    } 
}

export const signup = (firstname, lastname, username, email, password) => async dispatch =>{
    try {
        dispatch({ type: SIGNUP_USER_REQUEST });

        const url = `${ROOT_URL}/api/auth/signup`;
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



export const changePassword = (data) => async dispatch =>{
    try {
        dispatch({ type: CHANGE_PASSWORD_REQUEST });
        const httpAuth = axios.create({
            baseURL:`${ROOT_URL}/api`,
            headers: {
                "Content-type": "application/json",
                "Authorization":"Bearer "+sessionStorage.getItem("userToken")
            }
        });
        const response = await httpAuth.put(`/changePassword`,data);
        const responseBody = await response.data;
        dispatch({
            type: CHANGE_PASSWORD_SUCCESS,
            payload: responseBody
        });        
    } catch (error) {
        dispatch({
            type: CHANGE_PASSWORD_ERROR,
            message: error
        });
    }
}
