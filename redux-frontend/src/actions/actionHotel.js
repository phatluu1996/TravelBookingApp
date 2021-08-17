import hotelApi from "../config/hotelApi";

import { ROOT_URL } from '../config/api'; 
import axios from 'axios';

export const FETCH_HOTEL_REQUEST = "FETCH_HOTEL_REQUEST";
export const FETCH_HOTEL_SUCCESS = "FETCH_HOTEL_SUCCESS";
export const FETCH_HOTEL_ERROR = "FETCH_HOTEL_ERROR";


  
export const fetchHotel = (province,district,ward,numberAdult,numberChildren,checkInDate,checkOutDate,numRoom) => async dispatch => {
    try {
        dispatch({ type: FETCH_HOTEL_REQUEST });
        const url = `${ROOT_URL}/api/findHotels?province=${province}&district=${district}&ward=${ward}&numberAdult=${numberAdult}&numberChildren=${numberChildren}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&numRoom=${numRoom}`;
        console.log(url);
        const response = await axios.get(url)
        const responseBody = await response.data;
        dispatch({
            type: FETCH_HOTEL_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: FETCH_HOTEL_ERROR,
            message: error
        });
    }
}
export const fetchHotelByAccountId = (id) => async dispatch => {
     try {
        dispatch({ type: FETCH_HOTEL_REQUEST });
       const url = `${ROOT_URL}/api/findHotel?id=${id}`;
        console.log(url);
        const response = await axios.get(url)
        const responseBody = await response.data;
        dispatch({
            type: FETCH_HOTEL_SUCCESS,
            payload: responseBody[0]
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: FETCH_HOTEL_ERROR,
            message: error
        });
    }
}
export const fetchHotelById = (id) => async dispatch => {
    try {
       dispatch({ type: FETCH_HOTEL_REQUEST });
      const url = `${ROOT_URL}/api/hotel/${id}`;
       console.log(url);
       const response = await axios.get(url)
       const responseBody = await response.data;
       dispatch({
           type: FETCH_HOTEL_SUCCESS,
           payload: responseBody
       });
   } catch (error) {
       console.error(error);
       dispatch({
           type: FETCH_HOTEL_ERROR,
           message: error
       });
   }
}
export const getUpdate = (id,data) => async dispatch => {
    try {
       dispatch({ type: FETCH_HOTEL_REQUEST });
       const url = `${ROOT_URL}/api/hotel/${id}`;
       console.log(url);
       const response = await axios.put(url,data);
       const responseBody = await response.data;
       dispatch({
           type: FETCH_HOTEL_SUCCESS,
           payload: responseBody
       });
   } catch (error) {
       console.error(error);
       dispatch({
           type: FETCH_HOTEL_ERROR,
           message: error
       });
   }
}

export const FETCH_ALL_HOTEL_REQUEST = "FETCH_ALL_HOTEL_REQUEST";
export const FETCH_ALL_HOTEL_SUCCESS = "FETCH_ALL_HOTEL_SUCCESS";
export const FETCH_ALL_HOTEL_ERROR = "FETCH_ALL_HOTEL_ERROR";


export const fetchAllHotel = () => async dispatch => {
    try {
        dispatch({ type: FETCH_ALL_HOTEL_REQUEST });
        const url = `${ROOT_URL}/api/hotels`;
        const response = await axios.get(url)
        const responseBody = await response.data;
        dispatch({
            type: FETCH_ALL_HOTEL_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: FETCH_ALL_HOTEL_ERROR,
            message: error
        });
    }
}

export const CREATE_HOTEL_REQUEST = "CREATE_HOTEL_REQUEST";
export const CREATE_HOTEL_SUCCESS = "CREATE_HOTEL_SUCCESS";
export const CREATE_HOTEL_ERROR = "CREATE_HOTEL_ERROR";

export const createHotel = (data) => async dispatch => {
    try {
        dispatch({ type: CREATE_HOTEL_REQUEST });
        const url = `${ROOT_URL}/api/hotel`;
        const response = await axios.post(url, data)
        const responseBody = await response.data;
        dispatch({
            type: CREATE_HOTEL_SUCCESS
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: CREATE_HOTEL_ERROR,
            message: error
        });
    }
}

export const createPartner = (data) => async dispatch => {
    try {
        dispatch({ type: CREATE_HOTEL_REQUEST });
        const url = `${ROOT_URL}/api/addHotel`;
        const response = await axios.post(url, data)
        const responseBody = await response.data;
        dispatch({
            type: CREATE_HOTEL_SUCCESS
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: CREATE_HOTEL_ERROR,
            message: error
        });
    }
}

export const UPDATE_HOTEL_REQUEST = "UPDATE_HOTEL_REQUEST";
export const UPDATE_HOTEL_SUCCESS = "UPDATE_HOTEL_SUCCESS";
export const UPDATE_HOTEL_ERROR = "UPDATE_HOTEL_ERROR";

export const updateHotel = (id, data) => async dispatch => {
    try {
        dispatch({ type: UPDATE_HOTEL_REQUEST });
        const url = `${ROOT_URL}/api/hotel/${id}`;
        const response = await axios.put(url, data)
        const responseBody = await response.data;
        dispatch({
            type: UPDATE_HOTEL_SUCCESS
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: UPDATE_HOTEL_ERROR,
            message: error
        });
    }
}

export const GET_HOTEL_REQUEST = "GET_HOTEL_REQUEST";
export const GET_HOTEL_SUCCESS = "GET_HOTEL_SUCCESS";
export const GET_HOTEL_ERROR = "GET_HOTEL_ERROR";

export const getHotel = (id) => async dispatch => {
    try {
        dispatch({ type: GET_HOTEL_REQUEST });
        const url = `${ROOT_URL}/api/hotel/account/${id}`;
        const response = await axios.get(url)
        const responseBody = await response.data;
        dispatch({
            type: GET_HOTEL_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        dispatch({
            type: GET_HOTEL_ERROR,
            message: error
        });
    }
}



export const CREATE_HOTEL_FEEDBACK_REQUEST = "CREATE_HOTEL_FEEDBACK_REQUEST";
export const CREATE_HOTEL_FEEDBACK_SUCCESS = "CREATE_HOTEL_FEEDBACK_SUCCESS";
export const CREATE_HOTEL_FEEDBACK_ERROR = "CREATE_HOTEL_FEEDBACK_ERROR";


export const createHotelFeedBack = (data) => async dispatch => {
    try {
        dispatch({ type: CREATE_HOTEL_FEEDBACK_REQUEST });
        const url = `${ROOT_URL}/api/hotelFeedBack`;
        const response = await axios.post(url, data)
            dispatch({
                type: CREATE_HOTEL_FEEDBACK_SUCCESS,
                payload:response.data
            }); 
    } catch (error) {
        console.error(error);
        dispatch({
            type: CREATE_HOTEL_FEEDBACK_ERROR,
            message: error
        });
    }
}

export const GET_HOTEL_FEEDBACK_SUCCESS = "GET_HOTEL_FEEDBACK_SUCCESS";
export const GET_HOTEL_FEEDBACK_REQUEST = "GET_HOTEL_FEEDBACK_REQUEST";
export const GET_HOTEL_FEEDBACK_ERROR = "GET_HOTEL_FEEDBACK_ERROR";


export const getFeedbacks = (id) => async dispatch => {
    try {
        dispatch({ type: GET_HOTEL_FEEDBACK_REQUEST });
        const url = `${ROOT_URL}/api/hotelFeedBack/${id}`;
        const response = await axios.get(url)
        // const responseBody = await response.data;
        dispatch({
            type: GET_HOTEL_FEEDBACK_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: GET_HOTEL_FEEDBACK_ERROR,
            message: error
        });
    }
}

export const UPDATE_PROFILE_HOTEL_REQUEST = "UPDATE_PROFILE_HOTEL_REQUEST";
export const UPDATE_PROFILE_HOTEL_SUCCESS = "UPDATE_PROFILE_HOTEL_SUCCESS";
export const UPDATE_PROFILE_HOTEL_ERROR = "UPDATE_PROFILE_HOTEL_ERROR";

export const updateProfileHotel = (id, data) => async dispatch => {
    try {
        dispatch({ type: UPDATE_PROFILE_HOTEL_REQUEST });
        const url = `${ROOT_URL}/api/hotel/${id}`;
        const response = await axios.put(url, data)
        const responseBody = await response.data;
        dispatch({
            type: UPDATE_PROFILE_HOTEL_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: UPDATE_PROFILE_HOTEL_ERROR,
            message: error
        });
    }
}

export const GET_DAILY_INCOME_HOTEL_REQUEST = "GET_DAILY_INCOME_HOTEL_REQUEST";
export const GET_DAILY_INCOME_HOTEL_SUCCESS = "GET_DAILY_INCOME_HOTEL_SUCCESS";
export const GET_DAILY_INCOME_HOTEL_ERROR = "GET_DAILY_INCOME_HOTEL_ERROR";

export const getDailyIncomeHotel = (id) => async dispatch => {
    try {
        dispatch({ type: GET_DAILY_INCOME_HOTEL_REQUEST });
        const url = `${ROOT_URL}/api/hotel/dailyIncome/${id}`;
        const response = await axios.get(url);
        const responseBody = await response.data;
        dispatch({
            type: GET_DAILY_INCOME_HOTEL_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: GET_DAILY_INCOME_HOTEL_ERROR,
            message: error
        });
    }
}

export const GET_BOOKING_TODAY_HOTEL_REQUEST = "GET_BOOKING_TODAY_HOTEL_REQUEST";
export const GET_BOOKING_TODAY_HOTEL_SUCCESS = "GET_BOOKING_TODAY_HOTEL_SUCCESS";
export const GET_BOOKING_TODAY_HOTEL_ERROR = "GET_BOOKING_TODAY_HOTEL_ERROR";

export const getBookingTodayHotel = (id) => async dispatch => {
    try {
        dispatch({ type: GET_BOOKING_TODAY_HOTEL_REQUEST });
        const url = `${ROOT_URL}/api/hotel/countBookingToday/${id}`;
        const response = await axios.get(url);
        const responseBody = await response.data;
        dispatch({
            type: GET_BOOKING_TODAY_HOTEL_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: GET_BOOKING_TODAY_HOTEL_ERROR,
            message: error
        });
    }
}

export const GET_REVENUE_HOTEL_REQUEST = "GET_REVENUE_HOTEL_REQUEST";
export const GET_REVENUE_HOTEL_SUCCESS = "GET_REVENUE_HOTEL_SUCCESS";
export const GET_REVENUE_HOTEL_ERROR = "GET_REVENUE_HOTEL_ERROR";

export const getRevenueHotel = (id) => async dispatch => {
    try {
        dispatch({ type: GET_REVENUE_HOTEL_REQUEST });
        const url = `${ROOT_URL}/api/hotel/revenueHotel/${id}`;
        const response = await axios.get(url);
        const responseBody = await response.data;
        dispatch({
            type: GET_REVENUE_HOTEL_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: GET_REVENUE_HOTEL_ERROR,
            message: error
        });
    }
}

export const GET_REPORT_MONTH_HOTEL_REQUEST = "GET_REPORT_MONTH_HOTEL_REQUEST";
export const GET_REPORT_MONTH_HOTEL_SUCCESS = "GET_REPORT_MONTH_HOTEL_SUCCESS";
export const GET_REPORT_MONTH_HOTEL_ERROR = "GET_REPORT_MONTH_HOTEL_ERROR";

export const getReportHotel = (id) => async dispatch => {
    try {
        dispatch({ type: GET_REPORT_MONTH_HOTEL_REQUEST });
        const url = `${ROOT_URL}/api/hotel/reportMonth/${id}`;
        const response = await axios.get(url);
        const responseBody = await response.data;
        dispatch({
            type: GET_REPORT_MONTH_HOTEL_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: GET_REPORT_MONTH_HOTEL_ERROR,
            message: error
        });
    }
}

export const GET_ALL_BOOKING_REQUEST = "GET_ALL_BOOKING_REQUEST";
export const GET_ALL_BOOKING_SUCCESS = "GET_ALL_BOOKING_SUCCESS";
export const GET_ALL_BOOKING_ERROR = "GET_ALL_BOOKING_ERROR";

export const getAllBookingHotel = (id) => async dispatch => {
    try {
        dispatch({ type: GET_ALL_BOOKING_REQUEST });
        const url = `${ROOT_URL}/api/hotel/allBooking/${id}`;
        const response = await axios.get(url);
        const responseBody = await response.data;
        dispatch({
            type: GET_ALL_BOOKING_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: GET_ALL_BOOKING_ERROR,
            message: error
        });
    }
}

export const GET_HOTEL_BY_ROOM_REQUEST = "GET_HOTEL_BY_ROOM_REQUEST";
export const GET_HOTEL_BY_ROOM_SUCCESS = "GET_HOTEL_BY_ROOM_SUCCESS";
export const GET_HOTEL_BY_ROOM_ERROR = "GET_HOTEL_BY_ROOM_ERROR";

export const getHotelByRoom = (data) => async dispatch => {
    try {
        dispatch({ type: GET_HOTEL_BY_ROOM_REQUEST });
        const url = `${ROOT_URL}/api/hotelRoom`;
    const response = await axios.post(url,data);
        const responseBody = await response.data;
        dispatch({
            type: GET_HOTEL_BY_ROOM_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: GET_HOTEL_BY_ROOM_ERROR,
            message: error
        });
    }
}

export const CLEAR_HOTEL_STATE = "CLEAR_HOTEL_STATE"
export const clearHotelState = () => async dispatch => {
    dispatch({ type: CLEAR_HOTEL_STATE });
}

export const REMOVE_HOTEL_REQUEST = "REMOVE_HOTEL_REQUEST";
export const REMOVE_HOTEL_SUCCESS = "REMOVE_HOTEL_SUCCESS";
export const REMOVE_HOTEL_ERROR = "REMOVE_HOTEL_ERROR";

export const removeHotel = (id) => async dispatch => {
    try {
        dispatch({ type: REMOVE_HOTEL_REQUEST });
        const url = `${ROOT_URL}/api/hotel/${parseInt(id)}`;
    const response = await axios.post(url);
        const responseBody = await response.data;
        dispatch({
            type: REMOVE_HOTEL_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: REMOVE_HOTEL_ERROR,
            message: error
        });
    }
}
