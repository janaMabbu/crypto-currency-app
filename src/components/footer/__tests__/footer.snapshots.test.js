import { shallow } from 'enzyme'
import React from 'react'

import { Footer } from 'components/footer/footer'

describe('Component - Footer', () => {
  it('should render the Footer snapshot', () => {
    const wrapper = shallow(<Footer />)
    expect(wrapper).toMatchSnapshot()
  })

  it('it should contain content and copy-right', () => {
    const wrapper = shallow(<Footer />)
    expect(wrapper.find('.app-footer__content').length).toBe(1)
    expect(wrapper.find('.app-footer__sub-content').length).toBe(1)
    expect(wrapper.find('.app-footer__copy-right').length).toBe(1)
  })

})