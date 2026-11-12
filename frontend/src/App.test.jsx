import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('GitHappens Application - Frontend Tests', () => {
  it('renders the main comedy club title and subtitle', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: /GitHappens ☕/i })).toBeInTheDocument()
    expect(screen.getByText(/Turning coffee into code, bugs, and laughs since 2026/i)).toBeInTheDocument()
  })

  it('reveals joke punchline on button click', () => {
    render(<App />)
    expect(screen.getByText(/Why do programmers always prefer dark mode\?/i)).toBeInTheDocument()

    // Punchline should not be in document initially
    expect(screen.queryByTestId('punchline-box')).not.toBeInTheDocument()

    // Click reveal
    const revealBtn = screen.getByRole('button', { name: /Reveal Punchline/i })
    fireEvent.click(revealBtn)

    // Punchline should now be visible
    expect(screen.getByTestId('punchline-box')).toHaveTextContent(/Because light attracts bugs!/i)
  })

  it('cycles to the next joke when Skip or Next Joke is clicked', () => {
    render(<App />)
    const skipBtn = screen.getByRole('button', { name: /Skip/i })

    // Initially Joke 1
    expect(screen.getByText(/Why do programmers always prefer dark mode\?/i)).toBeInTheDocument()

    // Skip to Joke 2
    fireEvent.click(skipBtn)
    expect(screen.getByText(/There are only 10 types of people in the world/i)).toBeInTheDocument()
  })

  it('increments coffee counter and updates status message', () => {
    render(<App />)
    const drinkBtn = screen.getByRole('button', { name: /Drink Another Cup/i })

    expect(screen.getByText(/1 Cup of Coffee Drank/i)).toBeInTheDocument()

    // Drink a cup
    fireEvent.click(drinkBtn)
    expect(screen.getByText(/2 Cups of Coffee Drank/i)).toBeInTheDocument()
    expect(screen.getByTestId('coffee-status')).toHaveTextContent(/In the zone!/i)

    // Reset coffee
    const resetBtn = screen.getByRole('button', { name: /Reset/i })
    fireEvent.click(resetBtn)
    expect(screen.getByText(/0 Cups of Coffee Drank/i)).toBeInTheDocument()
    expect(screen.getByTestId('coffee-status')).toHaveTextContent(/Zombie Mode/i)
  })

  it('allows voting in the Bug or Feature poll', () => {
    render(<App />)
    const bugVoteBtn = screen.getByRole('button', { name: /Obviously a Bug/i })

    expect(bugVoteBtn).toHaveTextContent('42 Votes')

    fireEvent.click(bugVoteBtn)

    expect(bugVoteBtn).toHaveTextContent('43 Votes')
    expect(screen.getByText(/Thanks for voting!/i)).toBeInTheDocument()
  })

  it('triggers and dismisses the Friday panic button', () => {
    render(<App />)
    const panicBtn = screen.getByRole('button', { name: /Press The Panic Button/i })

    expect(screen.queryByTestId('panic-banner')).not.toBeInTheDocument()

    fireEvent.click(panicBtn)

    expect(screen.getByTestId('panic-banner')).toBeInTheDocument()
    expect(screen.getByText(/DON'T PANIC!/i)).toBeInTheDocument()

    // Relieve panic
    const relieveBtn = screen.getByRole('button', { name: /Relieve Panic/i })
    fireEvent.click(relieveBtn)

    expect(screen.queryByTestId('panic-banner')).not.toBeInTheDocument()
  })
})
