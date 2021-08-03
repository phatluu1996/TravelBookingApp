//reducers/index.js
import {combineReducers} from 'redux'
import reducerFlight from './reducerFlight'
import reducerUser from './reducerUser';
import reducerAirline from './reducerAirline';
import reducerFlightByAirline from './reducerFlightByAirline';
import reducerProvince from './reduceLocation';
import reducerHotel from './reduceHotel';
import reducerBookingFlight from './reducerBookingFlight';


const reducers = combineReducers({
	flight : reducerFlight,
	user : reducerUser,
	airline: reducerAirline,
	flights : reducerFlightByAirline,
	province: reducerProvince,
	hotels : reducerHotel,
	bookFlight: reducerBookingFlight
});

export default (state, action) => reducers(state, action);