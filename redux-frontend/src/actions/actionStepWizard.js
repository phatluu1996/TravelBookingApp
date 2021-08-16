import axios from "axios";
import { ROOT_URL } from "../config/api";

export const GET_ONE_HOTEL_REQUEST = "GET_ONE_HOTEL_REQUEST";
export const GET_ONE_HOTEL_SUCCESS = "GET_ONE_HOTEL_SUCCESS";
export const GET_ONE_HOTEL_ERROR = "FETCH_HOTEL_ERROR";

export const getHotelById = (id) => async dispatch => {
    try {
       dispatch({ type: GET_ONE_HOTEL_REQUEST });
      const url = `${ROOT_URL}/api/hotel/${id}`;
       console.log(url);
       const response = await axios.get(url)
       const responseBody = await response.data;
       dispatch({
           type: GET_ONE_HOTEL_SUCCESS,
           payload: responseBody
       });
   } catch (error) {
       console.error(error);
       dispatch({
           type: GET_ONE_HOTEL_ERROR,
           message: error
       });
   }
}