import { shallow } from 'enzyme'
import React from 'react'
import Immutable from 'immutable'
import { CryptoTracker } from 'components/crypto-tracker/crypto-tracker'

describe('Component - CryptoTracker', () => {
  let props
  beforeEach(() => {
    window.scrollTo = jest.fn()
    props = {
      currencies: Immutable.fromJS([{
        vol_24hr_pcnt:'-27.21',
        last_price:'9705.18401230',
        success:true,
        utc_date:'2020-02-22 21:41:01',
        coin_id:'BTC',
        currency:'USD',
        volume_24hr:'4126767296',
        time_stamp:'1582407661',
        price_24hr_pcnt:'0.50',
        currency_name:'United States Dollar',
        coin_name:'Bitcoin',
        source:'BraveNewCoin'
      },
      {
        vol_24hr_pcnt:'-27.21',
        last_price:'9705.18401230',
        success:true,
        utc_date:'2020-02-22 21:41:01',
        coin_id:'BhC',
        currency:'USD',
        volume_24hr:'4126767296',
        time_stamp:'1582407661',
        price_24hr_pcnt:'0.50',
        currency_name:'United States Dollar',
        coin_name:'Bitcoin',
        source:'BraveNewCoin'
      }]),
      loadCurrencies: jest.fn()
    }
  })
  it('should render the CryptoTracker snapshot', () => {
    const wrapper = shallow(<CryptoTracker {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should only display only success rows', () => {
    const wrapper = shallow(<CryptoTracker {...props}/>)
    expect(wrapper.find('.crypto-app__error').length).toBe(0)
    expect(wrapper.find('.crypto-app__t-row').length).toBe(3)
  })

  it('should display one failure row, one header, one success row', () => {
    const wrapper = shallow(<CryptoTracker {...props}/>)
    wrapper.setProps({ currencies: props.currencies.setIn([0,'status'], false) })
    expect(wrapper.find('.crypto-app__error').length).toBe(1)
    expect(wrapper.find('.crypto-app__t-row').length).toBe(3)
  })

  it('should render the CryptoTracker fallback text message', () => {
    const wrapper = shallow(<CryptoTracker {...props} />)
    wrapper.setProps({ currencies: props.currencies.setIn([0,'status'], false) })
    expect(wrapper.contains('something went wrong loading the coin!')).toBe(true)
  })
})