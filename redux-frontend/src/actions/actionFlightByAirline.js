import flightApi from "../config/flightApi";

export const CREATE_FLIGHT = "CREATE_FLIGHT";
export const RETRIEVE_FLIGHT = "RETRIEVE_FLIGHT";
export const UPDATE_FLIGHT = "UPDATE_FLIGHT";
export const DELETE_FLIGHT = "DELETE_FLIGHT";
export const LIST_FLIGHTS = "LIST_FLIGHTS";


// flightCode,departureCity,arrivalCity,
//     departureTime,arrivalTime,description,economyCapacity,economyPrice,
//     infant_price,child_price,businessCapacity,businessPrice,status,airline,
//     economyBaggage,businessBaggage,economyCabinBaggage,businessCabinBaggage,
//     hasEntertainment,aircraftType

// {flightCode,departureCity,arrivalCity,
//     departureTime,arrivalTime,description,economyCapacity,economyPrice,
//     infant_price,child_price,businessCapacity,businessPrice,status,airline,
//     economyBaggage,businessBaggage,economyCabinBaggage,businessCabinBaggage,
//     hasEntertainment,aircraftType }
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
        await flightApi.deleteFlight(id);
  
        dispatch({
            type: DELETE_FLIGHT,
            payload: { id },
        });
    } catch (err) {
        console.log(err);
    }
};
  
export const listFlightsByAirline = (id) => async (dispatch) => {
    try {
        const res = await flightApi.listFlightsByAirline(id);
  
        dispatch({
            type: LIST_FLIGHTS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};