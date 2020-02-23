import { shallow } from 'enzyme'
import React from 'react'
import Immutable from 'immutable'
import { CryptoDetails } from 'components/crypto-details/crypto-details'

describe('Component - CryptoDetails', () => {
  let props
  beforeEach(() => {
    window.scrollTo = jest.fn()
    props = {
      currencyData: Immutable.fromJS({
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
      }),
      currencyStatus: true,
      loadCoin: jest.fn(),
      router: {
        params: {
          currencyId:'btc',
        }
      }
    }
  })
  it('should render the CryptoDetails snapshot', () => {
    
    const wrapper = shallow(<CryptoDetails {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should only display title and content2', () => {
    const wrapper = shallow(<CryptoDetails {...props}/>)
    expect(wrapper.find('.heading').length).toBe(1)
    expect(wrapper.find('.price').length).toBe(1)
    // expect(wrapper.find('.24_hour_volume').length).toBe(1)
    // expect(wrapper.find('.100_coin').length).toBe(1)
    // expect(wrapper.find('.250_coin').length).toBe(1)
    // expect(wrapper.find('.5000_coin').length).toBe(1)
  })

  it('should render the CryptoDetails fallback', () => {
    const wrapper = shallow(<CryptoDetails {...props} />)
    wrapper.setProps({ currencyStatus: false })
    expect(wrapper.contains('something went wrong loading the coin!')).toBe(true)
  })
})