import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import ErrorBoundary from 'components/error-boundary'

import configureStore from 'store/configure-store'
import getRoutes from 'components/routes'

const store = configureStore()


const __DEVELOPMENT__ = process.env.NODE_ENV === 'development'

ReactDOM.render(
  <Provider store={ store }>
  <ErrorBoundary>
    <Router history={ hashHistory }>
      { getRoutes(store) }
    </Router>
  </ErrorBoundary>
  </Provider>
  , document.getElementById('crypto-app-container'))
