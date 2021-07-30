//reducers/index.js
import {combineReducers} from 'redux'
import reducerFlight from './reducerFlight'
import reducerUser from './reducerUser';
import reducerAirline from './reducerAirline';
import reducerFlightByAirline from './reducerFlightByAirline';


const reducers = combineReducers({
	flight : reducerFlight,
	user : reducerUser,
	airline: reducerAirline,
	flights : reducerFlightByAirline
});

export default (state, action) => reducers(state, action);