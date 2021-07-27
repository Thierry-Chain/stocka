import { LOGIN_PASS, USER_ERROR, CLEAR_ERRORS } from 'Redux/actionsTypes'

const cached = localStorage.getItem('client')
const initObj = {
  auth: false,
  client: {},
  error: '',
}

const initState = cached ? JSON.parse(cached) : initObj
const userReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case LOGIN_PASS:
      const client = payload
      return {
        auth: true,
        client,
        error: '',
      }
    case USER_ERROR:
      return {
        ...state,
        error: payload,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: '',
      }
    default:
      return state
  }
}
export default userReducer
