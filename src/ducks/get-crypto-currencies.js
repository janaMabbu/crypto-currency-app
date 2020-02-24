import Immutable from 'immutable'
import { callEndpoint } from 'ducks/http'

// REDUCER
// (currentState is this duck's section of the global state)
export const reducer = (currentState = initialState, action) => {
  let index
  switch (action.type) {
     case SET_CRYPTO_CURRENCY_ID:
      return currentState.set('serverData', currentState.get('serverData').push(Immutable.fromJS({id:action.id})))
     case SET_CRYPTO_CURRENCY_DATA:
       index = currentState.get('serverData').findIndex(coin => coin.get('id') === action.data.coin_id.toLowerCase())
      return currentState.set('serverData', currentState.get('serverData').update(index, i => i.set('data', Immutable.fromJS(action.data))))
    case SET_CRYPTO_CURRENCY_STATUS:
       index = currentState.get('serverData').findIndex(coin => coin.get('id') === action.id)
      return currentState.set('serverData', currentState.get('serverData').update(index, i => i.set('status', action.status)))
    default:
      return currentState
  }
}

// ACTION CREATORS
export const setCryptoCurrencyId = id => ({ type: SET_CRYPTO_CURRENCY_ID, id })
export const setCryptoCurrencyData = data => ({ type: SET_CRYPTO_CURRENCY_DATA, data })
export const setCryptoCurrencyStatus = (id, status) => ({ type: SET_CRYPTO_CURRENCY_STATUS, id, status })

// ACTION TYPES
export const SET_CRYPTO_CURRENCY_ID = 'get-crypto-currencies/set-crypto-currency-id'
export const SET_CRYPTO_CURRENCY_DATA = 'get-crypto-currencies/set-crypto-currency-data'
export const SET_CRYPTO_CURRENCY_STATUS = 'get-crypto-currencies/set-crypto-currency-status'

// SELECTORS

export const getCurrencies = state => state.getIn(['cryptoCurrencies', 'serverData'], Immutable.list)
export const getCurrencyById = (state,id) => state.getIn(['cryptoCurrencies', 'serverData'], Immutable.list).find(item => item && item.get('id') === id, null, Immutable.Map())
export const getCurrencyDataById = (state,id) => getCurrencyById(state,id).get('data', Immutable.Map())
export const getCurrencyStatusById = (state,id) => getCurrencyById(state,id).get('status', null)


// ASYNC FUNCTIONS
export const loadCurrencies = (currencyList) => async (dispatch) => {
  
  currencyList.forEach((id) => {
      dispatch(loadCoin(id))
  })

  // if we want to laod it synchronously
  // currencyList.forEach(async (id) => {
  //   await dispatch(loadCoin(id))
  // })

}

export const loadCoin = (id) => async (dispatch, getState) => {
  const state = getState()

  if (!getCurrencyById(state,id).isEmpty()) {
    // check if metro coin exists in redux store already and not trigger a service call
    // in case of browser back and navigating
      return
    }

  try {
    dispatch(setCryptoCurrencyId(id))
    const response = await callEndpoint(`show=usd&coin=${id}`)
    if(response) {
      dispatch(loadCoinSuccessHandler(id,response))
    } else {
      dispatch(loadCoinFailureHandler())
    }
  } catch (error) {
    dispatch(loadCoinFailureHandler())
  }

}

// HANDLERS
export const loadCoinSuccessHandler = (id, response) => (dispatch) => {
  dispatch(setCryptoCurrencyData(response))
  dispatch(setCryptoCurrencyStatus(id, true))
}

export const loadCoinFailureHandler = (id) => (dispatch) => {
  dispatch(setCryptoCurrencyStatus(id, false))
}



// INITIAL STATE
const initialState = Immutable.fromJS({})