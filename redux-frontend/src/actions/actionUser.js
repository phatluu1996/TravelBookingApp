import axios from 'axios';
import { ROOT_URL } from '../config/api';

export const GET_USERS_REQUEST = "GET_USERS_REQUEST";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_ERROR = "GET_USERS_ERROR";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_ERROR = "GET_USER_ERROR";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_ERROR = "UPDATE_USER_ERROR";

export const getUser = (id, token) => async dispatch =>{
    try {
        dispatch({ type: GET_USER_REQUEST });

        const httpAuth = axios.create({
            baseURL:`${ROOT_URL}/api`,
            headers: {
                "Content-type": "application/json",
                "Authorization":"Bearer "+sessionStorage.getItem("userToken")
            }
        });
        const response = await httpAuth.get(`/user/${id}`);
        const responseBody = await response.data;        

        dispatch({
            type: GET_USER_SUCCESS,
            payload: responseBody
        });        
    } catch (error) {
        dispatch({
            type: GET_USER_ERROR,
            message: error
        });
    }
}

export const updateUser = (data) => async dispatch =>{
    try {
        dispatch({ type: UPDATE_USER_REQUEST });
        const httpAuth = axios.create({
            baseURL:`${ROOT_URL}/api`,
            headers: {
                "Content-type": "application/json",
                "Authorization":"Bearer "+sessionStorage.getItem("userToken")
            }
        });
        const response = await httpAuth.put(`/user`,data);
        const responseBody = await response.data;        
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: responseBody
        });        
    } catch (error) {
        dispatch({
            type: UPDATE_USER_ERROR,
            message: error
        });
    }
}


export const getAllUsers = () => async dispatch =>{
    try {
        dispatch({ type: GET_USERS_REQUEST });
        const httpAuth = axios.create({
            baseURL:`${ROOT_URL}/api`,
            headers: {
                "Content-type": "application/json"
            }
        });
        const response = await httpAuth.get(`/getAllUser`);
        const responseBody = await response.data;        
        dispatch({
            type: GET_USERS_SUCCESS,
            payload: responseBody
        });        
    } catch (error) {
        dispatch({
            type: GET_USERS_ERROR,
            message: error
        });
    }
}

export const REMOVE_USER_REQUEST = "REMOVE_USER_REQUEST";
export const REMOVE_USER_SUCCESS = "REMOVE_USER_SUCCESS";
export const REMOVE_USER_ERROR = "REMOVE_USER_ERROR";

export const removeUser = (id) => async dispatch => {
    try {
        dispatch({ type: REMOVE_USER_REQUEST });
        const httpAuth = axios.create({
            baseURL:`${ROOT_URL}/api`,
            headers: {
                "Content-type": "application/json",
                "Authorization":"Bearer "+sessionStorage.getItem("userToken")
            }
        });
        const response = await httpAuth.put(`/user/${parseInt(id)}`);
        const responseBody = await response.data;
        dispatch({
            type: REMOVE_USER_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: REMOVE_USER_ERROR,
            message: error
        });
    }
}

export const CLEAR_USER_STATE = "CLEAR_USER_STATE";

export const clearUserState = () => async dispatch => {
    dispatch({type : CLEAR_USER_STATE});
}