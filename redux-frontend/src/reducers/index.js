//reducers/index.js
import {combineReducers} from 'redux'
import reducerFlight from './reducerFlight'
import reducerUser from './reducerUser';
import reducerAirline from './reducerAirline';
import reducerFlightByAirline from './reducerFlightByAirline';
import reducerProvince from './reduceLocation';
import reducerHotel from './reduceHotel';


const reducers = combineReducers({
	flight : reducerFlight,
	user : reducerUser,
	airline: reducerAirline,
	flights : reducerFlightByAirline,
	province: reducerProvince,
	hotels:reducerHotel
});

export default (state, action) => reducers(state, action);