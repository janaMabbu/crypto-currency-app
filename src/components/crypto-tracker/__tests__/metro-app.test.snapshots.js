import { shallow, mount } from 'enzyme'
import React from 'react'
import Immutable from 'immutable'

import { MetroApp } from 'components/metro-app/metro-app'

describe('Component - MetroApp', () => {
  let props
  const routes = [
    {
      'RouteId': 'RouteId1',
      'Description': 'Description'
    },
     {
      'RouteId': 'RouteId2',
      'Description': 'Description11'
    },
     {
      'RouteId': 'RouteId3',
      'Description': 'Description22'
    },
      {
      'RouteId': 'RouteId4',
      'Description': 'Description'
    }
  ]
  beforeEach(() => {
    window.scrollTo = jest.fn()
    props = {
      metroRoutes: Immutable.fromJS(routes),
      selectedRoute:'string',
      selectedDirection: 'string',
      isGetRoutesSuccessful: true,
      getRoutes: Jest.fn(),
      setSelectedRoute: Jest.fn(),
      loadDirections: Jest.fn(),
      router: {
        params: {
          routeId:'123',
          directionId:'567'
        }
      }
    }
  })
  it('should render the MetroApp snapshot', () => {
    
    const wrapper = shallow(<MetroApp {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should only display title and content2', () => {
    const wrapper = shallow(<MetroApp {...props}/>)
    expect(wrapper.find('.metro-app-container__title').length).toBe(1)
    expect(wrapper.find('.metro-app-container__content1').length).toBe(1)
    expect(wrapper.find('.metro-app-container__content2').length).toBe(1)
  })

  it('should render the MetroApp fallback', () => {
    const wrapper = shallow(<MetroApp {...props} />)
    wrapper.setProps({ isGetRoutesSuccessful: false })
    expect(wrapper.contains('something went wrong loading the Metro Routes!!!')).toBe(true)
  })

  it('it should  load the Metroutes', () => {
    const wrapper = shallow(<MetroApp {...props} />)
    expect(getRoutes).toBeCalled()
  })

  it('it should read the route params and set the  RoueId and laodDirections', () => {
    const wrapper = shallow(<MetroApp {...props} />)
    expect(setSelectedRoute).toBeCalledWith('123')
    expect(loadDirections).toBeCalledWith('123')
  })

})