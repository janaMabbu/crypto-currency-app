import Immutable from 'immutable'
import mockStore from '__tests__/mock-store'
import { getGlobalState, getNextActionByType } from '__tests__/global-state'
import mockFetch from '__tests__/mock-fetch'
import { getCurrencies, getCurrencyById, getCurrencyDataById, getCurrencyStatusById, loadCoin, loadCoinSuccessHandler, loadCoinFailureHandler, SET_CRYPTO_CURRENCY_DATA, SET_CRYPTO_CURRENCY_STATUS, SET_CRYPTO_CURRENCY_ID } from 'ducks/get-crypto-currencies'


describe('getRoutes-ducks: testing handlers', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  test('testing the loadCoinSuccessHandler', () => {
    const globalState = getGlobalState()
    const store = mockStore(globalState)
    store.dispatch(loadCoinSuccessHandler('id', {response:'test'}))
    const actions = store.getActions()
    let action = getNextActionByType(actions, SET_CRYPTO_CURRENCY_DATA)
    expect(action.data).toEqual({response:'test'})
    action = getNextActionByType(actions,SET_CRYPTO_CURRENCY_STATUS )
    expect(action.status).toEqual(true)
  })
  test('testing the getRoutesFailureHandler', () => {
    const globalState = getGlobalState()
    const store = mockStore(globalState)
    store.dispatch(loadCoinFailureHandler('id'))
    const actions = store.getActions()
    const action = getNextActionByType(actions,SET_CRYPTO_CURRENCY_STATUS )
    expect(action.status).toEqual(false)
  })
})

describe('loadCoin-ducks: triggering loadCoin call ', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  test('loadCoin call success', async done => {
    const globalState = getGlobalState()
    const store = mockStore(globalState)
    global.fetch = jest.fn()
    global.fetch.mockImplementation(mockFetch(200, {response:'test123'}))
    await store.dispatch(loadCoin('id1'))
      .then(() => {
        const actions = store.getActions()
        let action = getNextActionByType(actions, SET_CRYPTO_CURRENCY_ID)
        expect(action.id).toEqual('id1')
        action = getNextActionByType(actions, SET_CRYPTO_CURRENCY_DATA)
        expect(action.data).toEqual({response:'test123'})
        action = getNextActionByType(actions, SET_CRYPTO_CURRENCY_STATUS)
        expect(action.status).toEqual(true)
        done()
      })
  })
  test('loadCoin call failure', async done => {
    const globalState = getGlobalState()
    const store = mockStore(globalState)
    global.fetch = jest.fn()
    global.fetch.mockImplementation(mockFetch(500))
    await store.dispatch(loadCoin('id2'))
      .then(() => {
        const actions = store.getActions()
        let action = getNextActionByType(actions, SET_CRYPTO_CURRENCY_ID)
        expect(action.id).toEqual('id2')
        action = getNextActionByType(actions, SET_CRYPTO_CURRENCY_STATUS)
        expect(action.status).toEqual(false)
        done()
      })
  })
})

describe('getCurrencies-ducks: testing selectors ', () => {
  beforeEach(() => {
    jest.resetModules()
  })
test('getCurrencies selectors success scenarios', ()=> {
  const serverData = [{ id:1,
          data: {coin:'coin1'},
          status:true
        },
        { id: 2,
          data: {coin:'coin2'},
          status:false
        },
        { id:3,
          data: {coin:'coin3'},
          status:true
        }]
  const state = Immutable.fromJS({cryptoCurrencies:{
      serverData: serverData
    }})
    expect(getCurrencies(state)).toEqual(Immutable.fromJS(serverData))
    expect(getCurrencyDataById(state,2)).toEqual(Immutable.fromJS({coin:'coin2'}))
    expect(getCurrencyStatusById(state,2)).toEqual(false)
    expect(getCurrencyById(state,3)).toEqual(Immutable.fromJS({ id:3, data: {coin:'coin3'}, status:true }))
  })
})

