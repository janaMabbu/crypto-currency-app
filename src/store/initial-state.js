import Immutable from 'immutable'

const cryptoCurrencies = { serverData: [] }

// setting up intial state on app load
export default Immutable.fromJS({
  cryptoCurrencies
})