import { createStore, combineReducers } from 'redux'
import userReducer from './reducers/userReducer'
import stockReducer from './reducers/stockReducer'
import controlReducer from './reducers/controlReducer'
//import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  user: userReducer,
  stock: stockReducer,
  control: controlReducer,
})
const fetchDevTools =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined
const store = createStore(rootReducer, fetchDevTools)
export default store
