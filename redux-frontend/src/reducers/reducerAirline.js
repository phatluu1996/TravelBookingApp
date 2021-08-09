import { CREATE_AIRLINE_ERROR, CREATE_AIRLINE_REQUEST, CREATE_AIRLINE_SUCCESS, GET_AIRLINE_ERROR, GET_AIRLINE_REQUEST, GET_AIRLINE_SUCCESS, RETRIEVE_AIRLINE, UPDATE_AIRLINE, } from "../actions/actionAirline";
import { FETCH_ALL_AIRLINE_ERROR, FETCH_ALL_AIRLINE_REQUEST, FETCH_ALL_AIRLINE_SUCCESS } from "../actions/actionAirline";

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
            return { ...airline, airline: payload, success : true, single: null };


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
                all: payload
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
                success: true
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
                single: action.payload
            };
            return airline;

        case GET_AIRLINE_ERROR:
            airline = {
                ...airline,
                requesting: false,
                message: action.message
            };
            return airline;

        default:
            return airline;


    }

};

export default reducerAirline;