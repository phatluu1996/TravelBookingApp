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

export const SEND_EMAIL_FORGET_REQUEST = "SEND_EMAIL_FORGET_REQUEST";
export const SEND_EMAIL_FORGET_SUCCESS = "SEND_EMAIL_FORGET_SUCCESS";
export const SEND_EMAIL_FORGET_ERROR = "SEND_EMAIL_FORGET_ERROR";

export const sendEmailForget = (email) => async dispatch =>{
    try {
        dispatch({ type: SEND_EMAIL_FORGET_REQUEST });
        const httpAuth = axios.create({
            baseURL:`${ROOT_URL}/api`,
            headers: {
                "Content-type": "application/json"
            }
        });
        const response = await httpAuth.post(`/auth/forgetPassword`,email);
        const responseBody = await response.data;
        dispatch({
            type: SEND_EMAIL_FORGET_SUCCESS,
            payload: responseBody
        });        
    } catch (error) {
        dispatch({
            type: SEND_EMAIL_FORGET_ERROR,
            message: error
        });
    }
}

export const GET_ACC_FORGET_REQUEST = "GET_ACC_FORGET_REQUEST";
export const GET_ACC_FORGET_SUCCESS = "GET_ACC_FORGET_SUCCESS";
export const GET_ACC_FORGET_ERROR = "GET_ACC_FORGET_ERROR";

export const getAccountForget = (id, token) => async dispatch =>{
    try {
        dispatch({ type: GET_ACC_FORGET_REQUEST });
        const httpAuth = axios.create({
            baseURL:`${ROOT_URL}/api`,
            headers: {
                "Content-type": "application/json"
            }
        });
        const response = await httpAuth.get(`/auth/getAccountForget/${id}/${token}`);
        const responseBody = await response.data;
        dispatch({
            type: GET_ACC_FORGET_SUCCESS,
            payload: responseBody
        });        
    } catch (error) {
        dispatch({
            type: GET_ACC_FORGET_ERROR,
            message: error
        });
    }
}

export const CHANGE_PASS_FG_REQUEST = "CHANGE_PASS_FG_REQUEST";
export const CHANGE_PASS_FG_SUCCESS = "CHANGE_PASS_FG_SUCCESS";
export const CHANGE_PASS_FG_ERROR = "CHANGE_PASS_FG_ERROR";

export const changePassForget = (data) => async dispatch =>{
    try {
        dispatch({ type: CHANGE_PASS_FG_REQUEST });
        const httpAuth = axios.create({
            baseURL:`${ROOT_URL}/api`,
            headers: {
                "Content-type": "application/json"
            }
        });
        const response = await httpAuth.post(`/auth/changePasswordForget`,data);
        const responseBody = await response.data;
        dispatch({
            type: CHANGE_PASS_FG_SUCCESS,
            payload: responseBody
        });        
    } catch (error) {
        dispatch({
            type: CHANGE_PASS_FG_ERROR,
            message: error
        });
    }
}

export const CONFIRM_ACCOUNT_REQUEST = "CONFIRM_ACCOUNT_REQUEST";
export const CONFIRM_ACCOUNT_SUCCESS = "CONFIRM_ACCOUNT_SUCCESS";
export const CONFIRM_ACCOUNT_ERROR = "CONFIRM_ACCOUNT_ERROR";

export const confirmAccount = (id) => async dispatch =>{
    try {
        dispatch({ type: CONFIRM_ACCOUNT_REQUEST });
        const httpAuth = axios.create({
            baseURL:`${ROOT_URL}/api`,
            headers: {
                "Content-type": "application/json"
            }
        });
        const response = await httpAuth.get(`/auth/activateAccount/${id}`);
        const responseBody = await response.data;
        dispatch({
            type: CONFIRM_ACCOUNT_SUCCESS,
            payload: responseBody
        });        
    } catch (error) {
        dispatch({
            type: CONFIRM_ACCOUNT_ERROR,
            message: error
        });
    }
}