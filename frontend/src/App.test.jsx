import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import App from './App'

describe('CloudPulse Application - Frontend Tests', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the brand title, tagline, and operational status', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: /CloudPulse/i })).toBeInTheDocument()
    expect(screen.getByText(/Real-Time Cloud Telemetry & Operations/i)).toBeInTheDocument()
    expect(screen.getByTestId('global-status')).toHaveTextContent(/Operational \(99\.98%\)/i)
  })

  it('renders all four microservice fleet items', () => {
    render(<App />)
    expect(screen.getByText('Identity & Auth Service')).toBeInTheDocument()
    expect(screen.getByText('Edge API Gateway')).toBeInTheDocument()
    expect(screen.getByText('Transactions Engine')).toBeInTheDocument()
    expect(screen.getByText('Vector AI Search Shard')).toBeInTheDocument()
  })

  it('switches cloud region and updates latency', () => {
    render(<App />)
    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()

    // Switch to EU-Central (Frankfurt)
    fireEvent.change(select, { target: { value: 'eu-central-1' } })
    expect(screen.getAllByText(/EU-Central \(Frankfurt\)/i)).toHaveLength(2)
    expect(screen.getByText('22 ms')).toBeInTheDocument()
  })

  it('simulates traffic surge and appends event to live log stream', () => {
    render(<App />)
    const surgeBtn = screen.getByRole('button', { name: /Simulate Traffic Surge/i })
    expect(surgeBtn).toBeInTheDocument()

    fireEvent.click(surgeBtn)

    // Button should enter simulating state
    expect(screen.getByRole('button', { name: /Simulating Surge/i })).toBeDisabled()

    // Log entry should appear
    expect(screen.getByText(/Traffic Surge Simulation/i)).toBeInTheDocument()

    // Fast-forward timers to settle back to nominal
    act(() => {
      vi.advanceTimersByTime(4000)
    })

    expect(screen.getByRole('button', { name: /Simulate Traffic Surge/i })).not.toBeDisabled()
  })

  it('triggers rolling deploy and logs release artifact', () => {
    render(<App />)
    const deployBtn = screen.getByRole('button', { name: /Trigger Rolling Deploy/i })

    fireEvent.click(deployBtn)

    expect(screen.getByText(/Live Patch Deployed/i)).toBeInTheDocument()
    expect(screen.getByText(/zero-downtime rolling update/i)).toBeInTheDocument()
  })

  it('filters live event logs by type', () => {
    render(<App />)
    const deployFilterBtn = screen.getByRole('button', { name: /^Deploys$/i })

    fireEvent.click(deployFilterBtn)

    // Deploys should remain visible
    expect(screen.getByText(/Continuous Deployment/i)).toBeInTheDocument()
  })

  it('restarts a microservice and restores healthy status', () => {
    render(<App />)
    const restartBtns = screen.getAllByRole('button', { name: /Restart/i })

    fireEvent.click(restartBtns[0])

    // Should indicate recycling
    expect(screen.getByText(/Recycling\.\.\./i)).toBeInTheDocument()

    // Advance timer by 2 seconds
    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(screen.queryByText(/Recycling\.\.\./i)).not.toBeInTheDocument()
    expect(screen.getByText(/Container Restarted/i)).toBeInTheDocument()
  })
})
