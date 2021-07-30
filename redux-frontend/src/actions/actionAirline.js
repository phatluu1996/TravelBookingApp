import flightApi from "../config/flightApi";

export const RETRIEVE_AIRLINE = "RETRIEVE_AIRLINE";
export const UPDATE_AIRLINE = "UPDATE_AIRLINE";

  
export const retrieveAirline = (id) => async (dispatch) => {
    try {
        const res = await flightApi.getAirline(id);
  
        dispatch({
            type: RETRIEVE_AIRLINE,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const updateAirline = (id, data) => async (dispatch) => {
    try {
        const res = await flightApi.updateAirline(id, data);
  
        dispatch({
            type: UPDATE_AIRLINE,
            payload: data,
        });
  
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

