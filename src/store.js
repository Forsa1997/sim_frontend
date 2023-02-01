import { applyMiddleware, combineReducers } from 'redux'
import { legacy_createStore as createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import robotReducer from './reducer/robotReducer'
import stationReducer from './reducer/stationReducer'
import productionLineReducer from './reducer/productionLineReducer'
import carReducer from './reducer/carReducer'
import messageReducer from './reducer/messageReducer'
import employeeReducer from "./reducer/employeeReducer"

const rootReducer = combineReducers({
    messageReducer,
    carReducer,
    employeeReducer,
    productionLineReducer,
    robotReducer,
    stationReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));


export default store;