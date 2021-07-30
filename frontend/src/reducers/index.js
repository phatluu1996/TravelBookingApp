//reducers/index.js
import {combineReducers} from 'redux'
import reducerAirline from './reducerAirline';
import reducerFlight from './reducerFlight'
import reducerFlightByAirline from './reducerFlightByAirline';
import reducerUser from './reducerUser';


const reducers = combineReducers({
	flight : reducerFlight,
	user : reducerUser,
	airline: reducerAirline,
	flights : reducerFlightByAirline
});

export default (state, action) => reducers(state, action);