import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

const originalConsoleError = console.error// eslint-disable-line no-console
console.error = message => { // eslint-disable-line no-console
  if (/(Failed prop type)/.test(message)) {
    throw new Error(message)
  }
  originalConsoleError(message)
}


