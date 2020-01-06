import { combineReducers } from 'redux'
import personReducer from './person'


const rootReducer = combineReducers({
    personState: personReducer
    //TODO all reducers
})

export default rootReducer
