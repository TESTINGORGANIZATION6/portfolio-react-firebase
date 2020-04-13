import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
// import App from './App/index'
import Home from './Component/Home/Home'

test('renders learn react link', () => {
  const { getByText } = render(<Home />)
  const linkElement = getByText(/Home page/i)
  expect(linkElement).toBeInTheDocument()
})
