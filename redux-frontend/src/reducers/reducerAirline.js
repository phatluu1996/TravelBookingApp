import { CLEAR_AIRLINE_STATE, CREATE_AIRLINE_ERROR, CREATE_AIRLINE_REQUEST, CREATE_AIRLINE_SUCCESS, GET_AIRLINE_ERROR, GET_AIRLINE_REQUEST, GET_AIRLINE_SUCCESS, REMOVE_AIRLINE_ERROR, REMOVE_AIRLINE_REQUEST, REMOVE_AIRLINE_SUCCESS, RETRIEVE_AIRLINE, UPDATE_AIRLINE, } from "../actions/actionAirline";
import {
    FETCH_ALL_AIRLINE_ERROR, FETCH_ALL_AIRLINE_REQUEST, FETCH_ALL_AIRLINE_SUCCESS,
    GET_ALL_BOOKING_AIRLINE_REQUEST, GET_ALL_BOOKING_AIRLINE_SUCCESS, GET_ALL_BOOKING_AIRLINE_ERROR,
    GET_DAILY_INCOME_AIRLINE_REQUEST, GET_DAILY_INCOME_AIRLINE_SUCCESS, GET_DAILY_INCOME_AIRLINE_ERROR,
    GET_REVENUE_AIRLINE_REQUEST, GET_REVENUE_AIRLINE_SUCCESS, GET_REVENUE_AIRLINE_ERROR,
    COUNT_BOOKING_TODAY_AIRLINE_REQUEST, COUNT_BOOKING_TODAY_AIRLINE_SUCCESS, COUNT_BOOKING_TODAY_AIRLINE_ERROR,
    GET_REPORT_MONTH_AIRLINE_REQUEST, GET_REPORT_MONTH_AIRLINE_SUCCESS, GET_REPORT_MONTH_AIRLINE_ERROR

} from "../actions/actionAirline";

const initialState = {
    requesting: false,
    success: false,
    message: null,
    data: null
}

function reducerAirline(airline = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case RETRIEVE_AIRLINE:
            return {
                ...airline,
                airline: payload
            }

        case UPDATE_AIRLINE:
            return { ...airline, airline: payload, success: true, all: null, single: null };


        case FETCH_ALL_AIRLINE_REQUEST:
            return {
                ...airline,
                requesting: true
            };

        case FETCH_ALL_AIRLINE_SUCCESS:
            airline = {
                ...airline,
                requesting: false,
                success: true,
                all: payload,
                single: null
            };
            return airline;

        case FETCH_ALL_AIRLINE_ERROR:
            airline = {
                ...airline,
                requesting: false,
                message: action.message
            };
            return airline;

        case CREATE_AIRLINE_REQUEST:
            return {
                ...airline,
                requesting: true
            };

        case CREATE_AIRLINE_SUCCESS:
            airline = {
                ...airline,
                requesting: false,
                success: true,
                all: null
            };
            return airline;

        case CREATE_AIRLINE_ERROR:
            airline = {
                ...airline,
                requesting: false,
                message: action.message
            };
            return airline;

        case GET_AIRLINE_REQUEST:
            return {
                ...airline,
                requesting: true
            };


        case GET_AIRLINE_SUCCESS:
            airline = {
                ...airline,
                requesting: false,
                success: true,
                single: action.payload,
                all: null
            };
            return airline;

        case GET_AIRLINE_ERROR:
            airline = {
                ...airline,
                requesting: false,
                message: action.message
            };
            return airline;
        //------------------------------------------------------------
        case REMOVE_AIRLINE_REQUEST:
            return {
                ...airline,
                requesting: true
            };


        case REMOVE_AIRLINE_SUCCESS:
            airline = {
                ...airline,
                requesting: false,
                success: true,
                all: action.payload
            };
            return airline;

        case REMOVE_AIRLINE_ERROR:
            airline = {
                ...airline,
                requesting: false,
                message: action.message
            };
            return airline;

        //------------------------------------------------------------
        case GET_ALL_BOOKING_AIRLINE_REQUEST:
            return {
                ...airline,
                requesting: true
            };

        case GET_ALL_BOOKING_AIRLINE_SUCCESS:
            airline = {
                ...airline,
                requesting: false,
                success: true,
                allBooking: action.payload
            };
            return airline;

        case GET_ALL_BOOKING_AIRLINE_ERROR:
            airline = {
                ...airline,
                requesting: false,
                message: action.message
            };
            return airline;
        //------------------------------------------------------------
        case GET_DAILY_INCOME_AIRLINE_REQUEST:
            return {
                ...airline,
                requesting: true
            };

        case GET_DAILY_INCOME_AIRLINE_SUCCESS:
            airline = {
                ...airline,
                requesting: false,
                success: true,
                dailyIncome: action.payload
            };
            return airline;

        case GET_DAILY_INCOME_AIRLINE_ERROR:
            airline = {
                ...airline,
                requesting: false,
                message: action.message
            };
            return airline;
        //------------------------------------------------------------
        case GET_REVENUE_AIRLINE_REQUEST:
            return {
                ...airline,
                requesting: true
            };

        case GET_REVENUE_AIRLINE_SUCCESS:
            airline = {
                ...airline,
                requesting: false,
                success: true,
                revenue: action.payload
            };
            return airline;

        case GET_REVENUE_AIRLINE_ERROR:
            airline = {
                ...airline,
                requesting: false,
                message: action.message
            };
            return airline;
        //------------------------------------------------------------
        case COUNT_BOOKING_TODAY_AIRLINE_REQUEST:
            return {
                ...airline,
                requesting: true
            };

        case COUNT_BOOKING_TODAY_AIRLINE_SUCCESS:
            airline = {
                ...airline,
                requesting: false,
                success: true,
                count: action.payload
            };
            return airline;

        case COUNT_BOOKING_TODAY_AIRLINE_ERROR:
            airline = {
                ...airline,
                requesting: false,
                message: action.message
            };
            return airline;

        //------------------------------------------------------------
        case GET_REPORT_MONTH_AIRLINE_REQUEST:
            return {
                ...airline,
                requesting: true
            };

        case GET_REPORT_MONTH_AIRLINE_SUCCESS:
            airline = {
                ...airline,
                requesting: false,
                success: true,
                report: action.payload
            };
            return airline;

        case GET_REPORT_MONTH_AIRLINE_ERROR:
            airline = {
                ...airline,
                requesting: false,
                message: action.message
            };
            return airline;

        case CLEAR_AIRLINE_STATE:
            airline = {
                ...airline,
                requesting: false,
                success: false,
                single: null,
                all: null
            };
            return airline;

        default:
            return airline;

    }

};

export default reducerAirline;