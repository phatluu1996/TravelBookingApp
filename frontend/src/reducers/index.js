//reducers/index.js
import {combineReducers} from 'redux'
import reducerFlight from './reducerFlight'

 
export default combineReducers({
    flight : reducerFlight
})