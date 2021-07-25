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
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export default store
