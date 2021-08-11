import { SET_STOCK_ERROR, DEL_STOCK_ERROR } from 'Redux/actionsTypes'
import { client, logoutSolution } from './actions'
import {
  addLongTermProdQuery,
  addShortTermProdQuery,
  delLongProdQuery,
  delShortProdQuery,
  editLongProdQuery,
  editShortProdQuery,
  shortTermProdRecordsQuery,
  longTermProdRecordsQuery,
  deleteSelectedRecQuery,
} from './graphql/queries'
import store from 'Redux/store'

const setError = (err) => {
  return {
    type: SET_STOCK_ERROR,
    payload: err,
  }
}
const delError = () => {
  return {
    type: DEL_STOCK_ERROR,
  }
}
const handleNetworkError = (err) => {
  store.dispatch(setError(err))
  setTimeout(() => {
    window.location.reload()
  }, 500)
}
const resolveErrors = (error1, error2, error3) => {
  error1
    ? handleNetworkError('Network Error')
    : error2
    ? logoutSolution(error2)
    : error3
    ? store.dispatch(setError(error3))
    : console.log('unExpected')
}

const solveError = (error) => {
  const error1 = error?.message.startsWith('Network')
  const error2 = error?.response?.errors[0]?.message.startsWith(
    'Access Denied,'
  )
  const error3 = error?.response?.errors[0]?.message
  resolveErrors(error1, error2, error3)
}
const addLongProd = (vars) => {
  store.dispatch(delError())
  return client
    .request(addLongTermProdQuery, vars)
    .then((resp) => {
      store.dispatch(setError(`${resp.AddLongTermProduct.name} added`))
      setTimeout(() => {
        store.dispatch(delError())
      }, 2000)

      return resp.AddLongTermProduct
    })
    .catch((error) => {
      solveError(error)
    })
}
const addShortProd = (vars) => {
  store.dispatch(delError())
  return client
    .request(addShortTermProdQuery, vars)
    .then((resp) => {
      store.dispatch(setError(`${resp.AddShortTermProduct.name} added`))
      setTimeout(() => {
        store.dispatch(delError())
      }, 2000)

      return resp.AddShortTermProduct
    })
    .catch((error) => {
      solveError(error)
    })
}
const editShortTermProd = (vars) => {
  return client
    .request(editShortProdQuery, vars)
    .then((resp) => {
      return resp
    })
    .catch((error) => {
      solveError(error)
    })
}
const editLongTermProd = (vars) => {
  return client
    .request(editLongProdQuery, vars)
    .then((resp) => {
      return resp
    })
    .catch((error) => {
      solveError(error)
    })
}
const delLongTermProd = (vars) => {
  return client
    .request(delLongProdQuery, vars)
    .then((resp) => {
      return resp
    })
    .catch((error) => {
      solveError(error)
    })
}
const delShortTermProd = (vars) => {
  return client
    .request(delShortProdQuery, vars)
    .then((resp) => {
      return resp
    })
    .catch((error) => {
      solveError(error)
    })
}
const getLongTermRec = (vars) => {
  return client
    .request(longTermProdRecordsQuery, vars.queryKey[1])
    .then((resp) => {
      return resp.LongTermProductRecords
    })
    .catch((error) => {
      solveError(error)
    })
}
const getShortTermRec = (vars) => {
  return client
    .request(shortTermProdRecordsQuery, vars.queryKey[1])
    .then((resp) => {
      return resp.ShortTermProductRecords
    })
    .catch((error) => {
      solveError(error)
    })
}
const delSelectedRec = (vars) => {
  return client
    .request(deleteSelectedRecQuery, vars)
    .then((resp) => {
      return resp
    })
    .catch((error) => {
      solveError(error)
    })
}
export {
  setError,
  delError,
  addLongProd,
  addShortProd,
  editShortTermProd,
  editLongTermProd,
  delLongTermProd,
  delShortTermProd,
  getLongTermRec,
  getShortTermRec,
  delSelectedRec,
}
