import { ROOT_URL } from '../config/api'; 
import axios from 'axios';

export const REMOVE_IMAGE_REQUEST = "REMOVE_IMAGE_REQUEST";
export const REMOVE_IMAGE_SUCCESS = "REMOVE_IMAGE_SUCCESS";
export const REMOVE_IMAGE_ERROR = "REMOVE_IMAGE_ERROR";


export const removeImage = (id) => async dispatch => {
    try {
       dispatch({ type: REMOVE_IMAGE_REQUEST });
       const url = `${ROOT_URL}/api/removeImage/${id}`;
        await axios.put(url);
       dispatch({
           type: REMOVE_IMAGE_SUCCESS
       });
   } catch (error) {
       console.error(error);
       dispatch({
           type: REMOVE_IMAGE_ERROR,
           message: error
       });
   }
}