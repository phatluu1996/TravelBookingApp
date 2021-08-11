//reducers/index.js
import {combineReducers} from 'redux'
import reducerFlight from './reducerFlight'
import reducerUser from './reducerUser';
import reducerAirline from './reducerAirline';
import reducerFlightByAirline from './reducerFlightByAirline';
import reducerProvince from './reduceLocation';
import reducerHotel from './reduceHotel';
import reducerBookingFlight from './reducerBookingFlight';
import reducerAuth from './reduceAuth';
import reducerFeedBack from './reducerFeedBack';
import reducerRoom from './reducerRoom';
import reducerBookingRoom from './reducerBookingRoom';

const reducers = combineReducers({
	flight : reducerFlight,
	user : reducerUser,
	airline: reducerAirline,
	flights : reducerFlightByAirline,
	province: reducerProvince,
	hotels : reducerHotel,
	bookFlight: reducerBookingFlight,
	auth: reducerAuth,
	feedback:reducerFeedBack,
	room:reducerRoom,
	bookRoom:reducerBookingRoom
});

export default (state, action) => reducers(state, action);