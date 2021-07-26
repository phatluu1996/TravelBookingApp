//reducers/index.js
import {combineReducers} from 'redux'
import reducerFlight from './reducerFlight'
import reducerUser from './reducerUser';


const reducers = combineReducers({
	flight : reducerFlight,
	user : reducerUser
});

export default (state, action) => reducers(state, action);