import {
  LOGIN_PASS,
  USER_ERROR,
  CLEAR_ERRORS,
  SIGNUP_PASS,
  OFF_SHOW_REGTOAST,
} from 'Redux/actionsTypes'

const cached = localStorage.getItem('client')
const initObj = {
  auth: false,
  client: {},
  error: '',
  showRegToast: false,
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
        showRegToast: false,
        error: payload,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: '',
      }
    case SIGNUP_PASS:
      return {
        ...state,
        showRegToast: true,
      }
    case OFF_SHOW_REGTOAST:
      return {
        ...state,
        showRegToast: false,
      }
    default:
      return state
  }
}
export default userReducer
