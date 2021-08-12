import { GraphQLClient } from 'graphql-request'
import {
  loginQuery,
  signUpQuery,
  getShortTermProdQuery,
  getLongTermProdQuery,
  payStateQuery,
  getNotifiedQuery,
  delNotifyQuery,
  updateUserCredentialsQuery,
  deleteAccQuery,
  updatePasscodeQuery,
} from 'Redux/graphql/queries'
import store from 'Redux/store'
import {
  LOGIN_PASS,
  USER_ERROR,
  CLEAR_ERRORS,
  SIGNUP_PASS,
  OFF_SHOW_REGTOAST,
  LOGOUT,
} from './actionsTypes'
import { getEndPoint } from 'constants/index'
const endPoint = getEndPoint()

const client = new GraphQLClient(endPoint, {
  headers: { Auth: '' },
})
const cached = localStorage.getItem('client')
if (cached) {
  const token = JSON.parse(cached).client.token
  client.setHeader('Authorization', `Bearer ${token}`)
}
const setAuthHeaders = (token) => {
  client.setHeader('Authorization', `Bearer ${token}`)
}
const handleNetworkError = (err) => {
  store.dispatch(userError(err))
  setTimeout(() => {
    window.location.reload()
  }, 500)
}
const logoutSolution = (error2) => {
  store.dispatch(userError(error2))
  logout()
  window.location.reload()
}
const resolveErrors = (error1, error2) => {
  error1
    ? handleNetworkError('Network Error')
    : error2
    ? logoutSolution(error2)
    : console.error('Unexpected')
}

const login = (vars) => {
  return client
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

      error1 ? resolveErrors(null, error2) : store.dispatch(userError(error2))
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
      notify: [],
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
  return client
    .request(signUpQuery, vars)
    .then(() => {
      store.dispatch(clearErrors())
      store.dispatch(signUpPass())
      setTimeout(() => {
        store.dispatch(offShowToast())
      }, 3000)
    })
    .catch((error) => {
      const error1 = error?.message.startsWith('Network')
      const error2 = error?.response?.errors[0]?.message
      error1 ? resolveErrors(null, error2) : store.dispatch(userError(error2))
    })
}
const offShowToast = () => {
  return {
    type: OFF_SHOW_REGTOAST,
  }
}
const logout = () => {
  localStorage.clear()
  return {
    type: LOGOUT,
  }
}
const getShortTermProd = (vars) => {
  return client
    .request(getShortTermProdQuery, vars.queryKey[1])
    .then((resp) => {
      return resp
    })
    .catch((error) => {
      const error1 = error?.message.startsWith('Network')
      const error2 = error?.response?.errors[0]?.message

      resolveErrors(error1, error2)
    })
}
const getLongTermProd = (vars) => {
  return client
    .request(getLongTermProdQuery, vars.queryKey[1])
    .then((resp) => {
      return resp
    })
    .catch((error) => {
      const error1 = error?.message.startsWith('Network')
      const error2 = error?.response?.errors[0]?.message

      resolveErrors(error1, error2)
    })
}
const getPayStatus = (vars) => {
  return client
    .request(payStateQuery, vars.queryKey[1])
    .then((resp) => {
      return resp.PaymentStatus
    })
    .catch((error) => {
      const error1 = error?.message.startsWith('Network')
      const error2 = error?.response?.errors[0]?.message

      resolveErrors(error1, error2)
    })
}

const getNotified = (vars) => {
  return client
    .request(getNotifiedQuery, vars.queryKey[1])
    .then((resp) => {
      return resp.Notifications
    })
    .catch((error) => {
      const error1 = error?.message.startsWith('Network')
      const error2 = error?.response?.errors[0]?.message

      resolveErrors(error1, error2)
    })
}
const delNotify = (vars) => {
  return client.request(delNotifyQuery, vars).catch((err) => {
    console.log(err)
  })
}
const updateCredentials = (vars) => {
  store.dispatch(clearErrors())
  return client
    .request(updateUserCredentialsQuery, vars)
    .then((resp) => {
      const newClient = resp.UpdateCredentials
      newClient.token = store.getState().user.client.token
      store.dispatch(loginPass(newClient))
    })
    .catch((error) => {
      const error1 = error?.message.startsWith('Network')
      const error2 = error?.response?.errors[0]?.message

      error1
        ? handleNetworkError()
        : error2
        ? store.dispatch(userError(error2))
        : logoutSolution(error2)
    })
}
const updatePassword = (vars) => {
  store.dispatch(clearErrors())
  return client
    .request(updatePasscodeQuery, vars)
    .then((resp) => {
      store.dispatch(userError('Done'))
    })
    .catch((error) => {
      const error1 = error?.message.startsWith('Network')
      const error2 = error?.response?.errors[0]?.message

      error1
        ? handleNetworkError()
        : error2
        ? store.dispatch(userError(error2))
        : logoutSolution(error2)
    })
}
const delAccount = (vars) => {
  store.dispatch(clearErrors())
  return client
    .request(deleteAccQuery, vars)
    .then((resp) => {
      store.dispatch(logout())
      window.location.reload()
    })
    .catch((error) => {
      const error1 = error?.message.startsWith('Network')
      const error2 = error?.response?.errors[0]?.message

      error1
        ? handleNetworkError()
        : error2
        ? store.dispatch(userError(error2))
        : logoutSolution(error2)
    })
}
export {
  login,
  loginPass,
  clearErrors,
  signUpPass,
  signUp,
  offShowToast,
  updatePassword,
  getShortTermProd,
  logout,
  getLongTermProd,
  getPayStatus,
  getNotified,
  delNotify,
  client,
  logoutSolution,
  delAccount,
  updateCredentials,
}
