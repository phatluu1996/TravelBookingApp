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
import reducerRoom from './reducerRoom';
import reducerBookingRoom from './reducerBookingRoom';
import reducerHotelFeedBack from './reducerHotelFeedBack';
import reducerFeedback from './reducerFeedback';
import reducerWizard from './reducerWizard';


const reducers = combineReducers({
	flight : reducerFlight,
	user : reducerUser,
	airline: reducerAirline,
	flights : reducerFlightByAirline,
	province: reducerProvince,
	hotels : reducerHotel,
	bookFlight: reducerBookingFlight,
	auth: reducerAuth,
	hotelFeedback: reducerHotelFeedBack,
	feedback:reducerFeedback,
	room:reducerRoom,
	bookRoom:reducerBookingRoom,
	hotel : reducerWizard
});

export default (state, action) => reducers(state, action);