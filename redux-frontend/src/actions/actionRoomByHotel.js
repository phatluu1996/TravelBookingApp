import hotelApi from "../config/hotelApi";


export const CREATE_ROOM = "CREATE_ROOM";
export const RETRIEVE_ROOM = "RETRIEVE_ROOM";
export const UPDATE_ROOM = "UPDATE_ROOM";
export const DELETE_ROOM = "DELETE_ROOM";
export const LIST_ROOMS = "LIST_ROOMS";


export const getListRoomByHotel = (id) => async (dispatch) => {
    try {
        const res = await hotelApi.getListRoomByHotel(id);

        dispatch({
            type: LIST_ROOMS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const createRoom = (availableTime,maxAdult,maxChildren,
    paymentAtHotel,price,romNum,rumType,hotel) => async (dispatch) => 
    {
        try {
            const res = await hotelApi.createRoom({availableTime,maxAdult,maxChildren,
                paymentAtHotel,price,romNum,rumType,hotel});
  
            dispatch({
                type: CREATE_ROOM,
                payload: res.data,
            });
  
            return Promise.resolve(res.data);
        } catch (err) {
            return Promise.reject(err);
        }
};


export const updateRoom = (id,data) => async (dispatch) => {
    try {
        const res = await hotelApi.updateRoom(id,data)
  
        dispatch({
            type: UPDATE_ROOM,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const deleteRoom = (id) => async (dispatch) => {
    try {
        const res = await hotelApi.deleteRoom(id);
  
        dispatch({
            type: DELETE_ROOM,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

