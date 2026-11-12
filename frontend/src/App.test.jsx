import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('Brew & Bean Co. - Landing Page Tests', () => {
  it('renders the brand logo and hero headline', () => {
    render(<App />)
    const brandElements = screen.getAllByText('Brew & Bean Co.')
    expect(brandElements.length).toBeGreaterThan(0)
    expect(screen.getByRole('heading', { level: 1, name: /Freshly Roasted Coffee, Crafted with Passion/i })).toBeInTheDocument()
  })

  it('renders the seasonal menu items with names and prices', () => {
    render(<App />)
    expect(screen.getByText('Ethiopian Yirgacheffe Pour-Over')).toBeInTheDocument()
    expect(screen.getByText('$4.75')).toBeInTheDocument()

    expect(screen.getByText('Signature Cold Brew Reserve')).toBeInTheDocument()
    expect(screen.getByText('$5.25')).toBeInTheDocument()

    expect(screen.getByText('Caramelized Butter Croissant')).toBeInTheDocument()
    expect(screen.getByText('$3.80')).toBeInTheDocument()
  })

  it('increments order count when clicking "+ Add to Order"', () => {
    render(<App />)
    const cartBadge = screen.getByTestId('cart-count')
    expect(cartBadge).toHaveTextContent('0')

    const addButtons = screen.getAllByRole('button', { name: /to order/i })
    fireEvent.click(addButtons[0])
    expect(cartBadge).toHaveTextContent('1')

    fireEvent.click(addButtons[1])
    expect(cartBadge).toHaveTextContent('2')
  })

  it('renders our story and cafe location details', () => {
    render(<App />)
    expect(screen.getByText(/Rooted in Community, Obsessed with Quality/i)).toBeInTheDocument()
    expect(screen.getByText(/142 Artisan Boulevard, Suite 100/i)).toBeInTheDocument()
    expect(screen.getByText(/Mon – Fri: 6:30 AM – 6:00 PM/i)).toBeInTheDocument()
  })

  it('submits newsletter subscription and displays success message', () => {
    render(<App />)
    const emailInput = screen.getByPlaceholderText(/Enter your email address/i)
    const subscribeBtn = screen.getByRole('button', { name: /Subscribe/i })

    fireEvent.change(emailInput, { target: { value: 'guest@example.com' } })
    fireEvent.click(subscribeBtn)

    expect(screen.getByText(/Thank you for subscribing!/i)).toBeInTheDocument()
  })
})
