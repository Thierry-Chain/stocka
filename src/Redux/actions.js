import { GraphQLClient } from 'graphql-request'
import { loginQuery } from 'Redux/graphql/queries'
import store from 'Redux/store'
import { LOGIN_PASS, USER_ERROR, CLEAR_ERRORS } from './actionsTypes'
const endPoint = 'http://localhost:4000'
const client = new GraphQLClient(endPoint, {
  headers: { 'Content-Type': 'application/json' },
})
const handleNetworkError = (err) => {
  store.dispatch(loginError(err))
  setTimeout(() => {
    window.location.reload()
  }, 500)
}

const login = (vars) => {
  client
    .request(loginQuery(), vars)
    .then((res) => {
      const client = res.LoginClient.client
      client.token = res.LoginClient.token
      store.dispatch(loginPass(client))
      return res
    })
    .catch((error) => {
      const error1 = error?.message.startsWith('Network')
      const error2 = error?.response?.errors[0]?.message

      error1
        ? handleNetworkError('Network Error')
        : error2
        ? store.dispatch(loginError(error2))
        : console.error('Unepected')
    })
}
const loginError = (err) => {
  return {
    type: USER_ERROR,
    payload: err,
  }
}
const loginPass = (client) => {
  localStorage.setItem(
    'client',
    JSON.stringify({ auth: true, client, error: '' })
  )
  return {
    type: LOGIN_PASS,
    payload: client,
  }
}

const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  }
}
export { login, loginPass, clearErrors }
