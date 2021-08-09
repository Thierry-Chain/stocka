import { SET_STOCK_ERROR, DEL_STOCK_ERROR } from 'Redux/actionsTypes'
const initState = {
  error: '',
}

const stockReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case SET_STOCK_ERROR:
      return {
        ...state,
        error: payload,
      }
    case DEL_STOCK_ERROR:
      return {
        ...state,
        error: '',
      }
    default:
      return state
  }
}
export default stockReducer
