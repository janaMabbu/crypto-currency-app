import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import ImmutablePropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import { getCurrencies, loadCurrencies } from 'ducks/get-crypto-currencies'
import { formatCurrency } from 'ducks/helpers'

import './crypto-tracker.less'

export class CryptoTracker extends PureComponent {
  static propTypes = {
    currencies: ImmutablePropTypes.list,
    loadCurrencies: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { loadCurrencies } = this.props
    // load the currencies in this array
    loadCurrencies(['btc','bch','ltc', 'usdt', 'jana'])
    // scrolling to top on browser navigation
    window.scrollTo(0, 0)
  
  }


  setRoutePath = (path) => {
    // this navigated the user to next page
    this.props.router.push(`cryptotracker/${path}`)
  }


  render () {
    const { currencies } = this.props
    return (
        <div className="row crypto-app">
        <div class="container">
  <div class="row">
    <div class="col">
      <strong>Coin Name</strong>
    </div>
    <div class="col">
      <strong>Symbol</strong>
    </div>
    <div class="col">
      <strong>Latest Price</strong>
    </div>
    <div class="col">
    </div>
  </div>
    { currencies.map((coin)=> {
          if(coin.get('status', false)) {
            return this.renderSuccessRow(coin)
          } else if(!coin.get('status', true)) {
            return this.renderFailureRow(coin)
          } else {
            return (
              <div class="row">
                <div class="spinner-border"></div>
                <div>loading...</div>
              </div>)
          }
        }) }
  </div>
</div>
    )
  }

  renderSuccessRow = (coin) => {
    const id = coin.get('id')
     return(
    <div class="row" key={coin.get('id')}>
      <div class="col">{coin.getIn(['data', 'coin_name'], '')}</div>
      <div class="col">{coin.getIn(['data', 'coin_id'], '')}</div>
      <div class="col">{formatCurrency(coin.getIn(['data', 'last_price'], 0),2)}</div>
      <div class="col"><button id={ id } onClick={()=>this.setRoutePath(coin.get('id')) }>see Details</button></div>
    </div>
    )
  }

  renderFailureRow = (coin) => {
     return(
      <div class="row" className="row crypto-app__error" key={coin.get('id')}>
        something wrong with loading coin details with id {coin.get('id')}
      </div>
    )
  }

}
const mapStateToProps = state => {
  return {
    currencies: getCurrencies(state)
  }
}
const mapDispatchToProps = {
  loadCurrencies
}
export default connect(mapStateToProps, mapDispatchToProps)(CryptoTracker)
