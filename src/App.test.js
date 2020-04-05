import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from './App/index'

test('renders learn react link', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/Home page/i)
  expect(linkElement).toBeInTheDocument()
})
