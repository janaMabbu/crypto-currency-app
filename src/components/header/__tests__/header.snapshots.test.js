import { shallow } from 'enzyme'
import React from 'react'

import { Header } from 'components/header/header'

describe('Component - Header', () => {
  it('should render the Header snapshot', () => {
    const wrapper = shallow(<Header />)
    expect(wrapper).toMatchSnapshot()
  })

  it('it should contain logo , banner, and text', () => {
    const wrapper = shallow(<Header />)
    expect(wrapper.find('.app-header__logo').length).toBe(1)
  })

})