import createMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middleware = [thunk]

export default createMockStore(middleware)