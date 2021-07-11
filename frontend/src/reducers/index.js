//reducers/index.js
import {combineReducers} from 'redux'
import reducerFlight from './reducerFlight'


const reducers = combineReducers({
	flight : reducerFlight,
});

export default (state, action) => reducers(state, action);