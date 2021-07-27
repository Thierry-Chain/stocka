import { GraphQLClient } from 'graphql-request'
import { loginQuery, signUpQuery } from 'Redux/graphql/queries'
import store from 'Redux/store'
import {
  LOGIN_PASS,
  USER_ERROR,
  CLEAR_ERRORS,
  SIGNUP_PASS,
  OFF_SHOW_REGTOAST,
} from './actionsTypes'

const endPoint = 'http://localhost:4000'
const client = new GraphQLClient(endPoint, {
  headers: { 'Content-Type': 'application/json' },
})
const handleNetworkError = (err) => {
  store.dispatch(userError(err))
  setTimeout(() => {
    window.location.reload()
  }, 500)
}
const resolveErrors = (error1, error2) => {
  error1
    ? handleNetworkError('Network Error')
    : error2
    ? store.dispatch(userError(error2))
    : console.error('Unepected')
}
const setAuthHeaders = (token) => {
  client.setHeader('Authorization', token)
}

const login = (vars) => {
  client
    .request(loginQuery(), vars)
    .then((res) => {
      const reduxClient = res.LoginClient.client
      const token = res.LoginClient.token
      reduxClient.token = token
      store.dispatch(loginPass(reduxClient))
      setAuthHeaders(token)
    })
    .catch((error) => {
      const error1 = error?.message.startsWith('Network')
      const error2 = error?.response?.errors[0]?.message

      resolveErrors(error1, error2)
    })
}
const userError = (err) => {
  return {
    type: USER_ERROR,
    payload: err,
  }
}
const loginPass = (reduxClient) => {
  localStorage.setItem(
    'client',
    JSON.stringify({
      auth: true,
      client: reduxClient,
      error: '',
      showRegToast: '',
    })
  )
  return {
    type: LOGIN_PASS,
    payload: reduxClient,
  }
}

const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  }
}
const signUpPass = () => {
  return {
    type: SIGNUP_PASS,
  }
}
const signUp = (vars) => {
  client
    .request(signUpQuery, vars)
    .then(() => {
      store.dispatch(clearErrors())
      store.dispatch(signUpPass())
      setTimeout(() => {
        store.dispatch(offShowToast())
      }, 3000)
    })
    .catch((error) => {
      /*console.log('nooh boss', { error })
         console.warn(error)*/

      const error1 = error?.message.startsWith('Network')
      const error2 = error?.response?.errors[0]?.message

      resolveErrors(error1, error2)
    })
}
const offShowToast = () => {
  return {
    type: OFF_SHOW_REGTOAST,
  }
}
export { login, loginPass, clearErrors, signUpPass, signUp, offShowToast }
