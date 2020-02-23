import { reducer as cryptoCurrencies } from 'ducks/get-crypto-currencies'


export default (state, action) => {

  const reducers = {
    cryptoCurrencies
  }
  return Object.entries(reducers).reduce((state, [ name, reducer ]) =>
      state.set(name, reducer(state.get(name), action, state)), state)
}
