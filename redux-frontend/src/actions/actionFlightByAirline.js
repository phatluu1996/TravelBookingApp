import flightApi from "../config/flightApi";

export const CREATE_FLIGHT = "CREATE_FLIGHT";
export const RETRIEVE_FLIGHT = "RETRIEVE_FLIGHT";
export const UPDATE_FLIGHT = "UPDATE_FLIGHT";
export const DELETE_FLIGHT = "DELETE_FLIGHT";


export const createFlight = (data) => async (dispatch) => 
    {
        try {
            const res = await flightApi.createFlight(data);
  
            dispatch({
                type: CREATE_FLIGHT,
                payload: res.data,
            });
  
            return Promise.resolve(res.data);
        } catch (err) {
            return Promise.reject(err);
        }
};

export const retrieveFlight = (id) => async (dispatch) => {
    try {
        const res = await flightApi.getFlight(id);
  
        dispatch({
            type: RETRIEVE_FLIGHT,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const updateFlight = (id, data) => async (dispatch) => {
    try {
        const res = await flightApi.updateFlight(id, data);
  
        dispatch({
            type: UPDATE_FLIGHT,
            payload: data,
        });
  
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};
  
export const deleteFlight = (id) => async (dispatch) => {
    try {
        await flightApi.removeFlight(id);
  
        dispatch({
            type: DELETE_FLIGHT,
        });
    } catch (err) {
        console.log(err);
    }
};
  

export const CLEAR_FLIGHTS_RESPONSE = 'CLEAR_FLIGHTS_RESPONSE'
export const clearFlightsState = () => async dispatch => {
    dispatch({type : CLEAR_FLIGHTS_RESPONSE})
}

export const LIST_FLIGHTS_AIRLINE_REQUEST = "LIST_FLIGHTS_AIRLINE_REQUEST";
export const LIST_FLIGHTS_AIRLINE_SUCCESS = "LIST_FLIGHTS_AIRLINE_SUCCESS";
export const LIST_FLIGHTS_AIRLINE_ERROR = "LIST_FLIGHTS_AIRLINE_ERROR";
export const listFlights = (id) => async (dispatch) => {
    try {
        dispatch({ type: LIST_FLIGHTS_AIRLINE_REQUEST });
        const res = await flightApi.listFlightByAirline(id);

        dispatch({
            type: LIST_FLIGHTS_AIRLINE_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: LIST_FLIGHTS_AIRLINE_ERROR,
            message: error
        });
    }
};