import { shallow } from 'enzyme'
import React from 'react'

import Component from '../Span'

const children = 'Text for testing'
const renderComponent = (props = {}) => shallow(
  <Component {...props}>
    {children}
  </Component>
)

describe('<Span />', () => {
  it('should render a <span> tag', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.type()).toEqual('span')
  })
  it('should have children', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.contains(children)).toEqual(true)
  })

  it('should have a className attribute', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.prop('className')).toBeDefined()
  })
  it('should render a valid attribute', () => {
    const id = 'test'
    const renderedComponent = renderComponent({ id })
    expect(renderedComponent.prop('id')).toEqual(id)
  })

  it('should not render an invalid attribute', () => {
    const attribute = 'test'
    const renderedComponent = renderComponent({ attribute })
    expect(renderedComponent.prop('attribute')).toBeUndefined()
  })
})
