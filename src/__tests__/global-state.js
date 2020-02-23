import Immutable from 'immutable'

export const getGlobalState = (overrideData = {}) => {
  return Immutable.fromJS({
    cryptoCurrencies: {serverData:[{id:'btc'},{id:'bch'}]}
  })
}

export const getNextActionByType = (actions, type) => {
  let action = actions.shift()
  while (action && action.type !== type) {
    action = actions.shift()
  }
  return action
}
