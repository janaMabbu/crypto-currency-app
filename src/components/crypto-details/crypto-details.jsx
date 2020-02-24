import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import ImmutablePropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import { getCurrencyDataById, getCurrencyStatusById, loadCoin } from 'ducks/get-crypto-currencies'
import { formatCurrency, formatNumber, convertPriceToNumber } from 'ducks/helpers'

import './crypto-details.less'

export class CryptoDetails extends PureComponent {
  static propTypes = {
    currencyData: ImmutablePropTypes.map,
    currencyStatus: PropTypes.bool,
    loadCoin: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { loadCoin, router } = this.props
    if(router.params && router.params.currencyId) {
      loadCoin(router.params.currencyId)
    }
    // scrolling to top on browser navigation
    window.scrollTo(0, 0)
  
  }




  render () {
    return (
        <div className="row crypto-details">
        { this.renderContent() }
        </div>
    )
  }

  renderError = () => {
     return(
      <div className="crypto-details__error">
        something went wrong loading the coin!
      </div>
    )
  }

  renderContent = () => {
    const { currencyStatus } = this.props
    if(currencyStatus === null) {
      return(
      <div className="crypto-details__loading">
       <div className="spinner-border"></div>
       <div>loading...</div>
      </div>
    )
    } else {
      return (<Fragment>
      {currencyStatus ? this.renderSuccessContent(): this.renderError()}
      </Fragment>)
    }
  }

  renderSuccessContent = () => {
    const { currencyData } = this.props
     return(
      <div className="crypto-details">
       <h4 className="heading">{currencyData.get('coin_name','')} | {currencyData.get('coin_id','')}</h4>
        <p className="crypto-details__line-item price" ><strong> Price: </strong>{ formatCurrency(currencyData.get('last_price', 0),2) }</p>
        <p className="crypto-details__line-item volume"><strong> 24-hour-volume: </strong>{ formatNumber(currencyData.get('volume_24hr',0)) }</p>
        <p className="crypto-details__line-item coin-100">$100 = { 100/convertPriceToNumber(currencyData.get('last_price', 0))} Coins</p>
        <p className="crypto-details__line-item coin-250">$250 = { 250/convertPriceToNumber(currencyData.get('last_price', 0)) } Coins</p>
        <p className="crypto-details__line-item coin-5000">$5,000 = { 5000/convertPriceToNumber(currencyData.get('last_price', 0)) } Coins</p>
      </div>
    )
  }

}
const mapStateToProps = (state, props) => {
  const currencyId = props.router.params && props.router.params.currencyId
  return {
    currencyData: getCurrencyDataById(state, currencyId),
    currencyStatus: getCurrencyStatusById(state, currencyId)
  }
}
const mapDispatchToProps = {
  loadCoin
}
export default connect(mapStateToProps, mapDispatchToProps)(CryptoDetails)
