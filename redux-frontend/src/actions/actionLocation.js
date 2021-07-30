
import { ROOT_URL } from '../config/api'; 
import axios from 'axios';

export const FETCH_PROVINCE_REQUEST = "FETCH_PROVINCE_REQUEST";
export const FETCH_PROVINCE_SUCCESS = "FETCH_PROVINCE_SUCCESS";
export const FETCH_PROVINCE_ERROR = "FETCH_PROVINCE_ERROR";

  
export const retrieveProvince = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_PROVINCE_REQUEST });

        const url = `${ROOT_URL}/api/province`;
        const response = await axios.get(url)
        const responseBody = await response.data;
        dispatch({
            type: FETCH_PROVINCE_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: FETCH_PROVINCE_ERROR,
            message: error
        });
    }
};