import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import App from './App'

describe('DevOps Engineering Program - Frontend Unit Tests', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the main program title and subtitle', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: /DevOps Engineering Program/i })).toBeInTheDocument()
    expect(screen.getByText(/Foundations of Continuous Integration, Delivery & Cloud Engineering/i)).toBeInTheDocument()
  })

  it('renders all 6 CI/CD pipeline stages in the visualizer', () => {
    render(<App />)
    expect(screen.getByText('Code Quality')).toBeInTheDocument()
    expect(screen.getByText('Unit Testing')).toBeInTheDocument()
    expect(screen.getByText('Build & Bundle')).toBeInTheDocument()
    expect(screen.getByText('Security Audit')).toBeInTheDocument()
    expect(screen.getByText('Containerization')).toBeInTheDocument()
    expect(screen.getByText('Deploy / Release')).toBeInTheDocument()
  })

  it('renders student starter terminal commands', () => {
    render(<App />)
    expect(screen.getByText(/Student Workstation Terminal Commands/i)).toBeInTheDocument()
    expect(screen.getByText(/Start local development server/i)).toBeInTheDocument()
    expect(screen.getByText(/Run automated unit tests/i)).toBeInTheDocument()
  })

  it('renders the 6 curriculum modules', () => {
    render(<App />)
    expect(screen.getByText('Version Control & Git Governance')).toBeInTheDocument()
    expect(screen.getByText('Automated CI/CD Pipelines')).toBeInTheDocument()
    expect(screen.getByText('Docker & Containerization')).toBeInTheDocument()
    expect(screen.getByText('Kubernetes Orchestration')).toBeInTheDocument()
  })

  it('triggers pipeline simulation and completes all stages', async () => {
    render(<App />)

    const simulateBtn = screen.getByRole('button', { name: /Simulate CI\/CD Run/i })
    expect(simulateBtn).toBeInTheDocument()

    // Click simulate
    act(() => {
      fireEvent.click(simulateBtn)
    })

    // Advance all timers through all stages
    await act(async () => {
      await vi.runAllTimersAsync()
    })

    // Button should be re-enabled
    expect(screen.getByRole('button', { name: /Simulate CI\/CD Run/i })).not.toBeDisabled()
    expect(screen.getAllByText(/Passed ✓/i)).toHaveLength(6)
  })

  it('resets the pipeline when reset button is clicked', async () => {
    render(<App />)

    const simulateBtn = screen.getByRole('button', { name: /Simulate CI\/CD Run/i })
    const resetBtn = screen.getByRole('button', { name: /Reset/i })

    act(() => {
      fireEvent.click(simulateBtn)
    })

    await act(async () => {
      await vi.runAllTimersAsync()
    })

    expect(screen.getAllByText(/Passed ✓/i)).toHaveLength(6)

    act(() => {
      fireEvent.click(resetBtn)
    })

    expect(screen.getAllByText(/Pending/i)).toHaveLength(6)
  })
})
