import React, { PureComponent } from 'react'
import { IndexRedirect, Route, Redirect } from 'react-router'
import CryptoDetails from 'components/crypto-details'
import CryptoTracker from 'components/crypto-tracker'
import { Header } from 'components/header/header'
import { Footer } from 'components/footer/footer'


export default () => {
  return (
    <Route path="/" component={ App }>
      <IndexRedirect to="cryptotracker" />
      <Route path="cryptotracker" component={ CryptoTracker } />
      <Route path="cryptotracker/:currencyId" component={ CryptoDetails } />
      <Redirect from="*" to={ '/' } />
    </Route>
  )
}

// container component that sets the Header and Footer and Layout.
export class App extends PureComponent {
    render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Header/>
        </div>
          {this.props.children}
        <div className="row">
          <Footer/>
        </div>
      </div>
      )
  }

}
