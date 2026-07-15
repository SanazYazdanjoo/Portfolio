import { render, screen } from '@testing-library/react'

function Hello() {
  return <h1>Portfolio works</h1>
}

test('renders without exploding', () => {
  render(<Hello />)
  expect(screen.getByText('Portfolio works')).toBeInTheDocument()
})