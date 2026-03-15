import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ErrorBoundary } from '../ErrorBoundary'

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    )

    expect(screen.getByText('No error')).toBeInTheDocument()
  })

  it('displays error UI when child component throws', () => {
    // Suppress the expected error log
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText('Refresh Page')).toBeInTheDocument()
    expect(screen.getByText('Try Again')).toBeInTheDocument()

    consoleSpy.mockRestore()
  })

  it('shows error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV

    const mockEnv = 'development' as const
    // Mock process.env.NODE_ENV
    const originalDescriptor = Object.getOwnPropertyDescriptor(process, 'env')
    Object.defineProperty(process, 'env', {
      value: { ...process.env, NODE_ENV: mockEnv },
      configurable: true,
    })

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText(/Error Details/)).toBeInTheDocument()

    // Restore original env
    if (originalDescriptor) {
      Object.defineProperty(process, 'env', originalDescriptor)
    }

    consoleSpy.mockRestore()
  })
})
