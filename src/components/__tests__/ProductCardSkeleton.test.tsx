import { render, screen } from '@testing-library/react'
import { ProductCardSkeleton } from '../skeleton/ProductCardSkeleton'

describe('ProductCardSkeleton', () => {
  it('renders skeleton elements correctly', () => {
    render(<ProductCardSkeleton />)

    // Check if main skeleton container exists
    const skeletonContainer =
      screen.getByTestId('product-card-skeleton') || document.querySelector('.bg-gradient-to-r')
    expect(skeletonContainer).toBeInTheDocument()
  })

  it('has correct structure for product card skeleton', () => {
    const { container } = render(<ProductCardSkeleton />)

    // Check for image area skeleton
    expect(container.querySelector('.aspect-3\\/4')).toBeInTheDocument()

    // Check for details area skeleton
    expect(container.querySelector('.p-5')).toBeInTheDocument()
  })

  it('applies correct classes for shimmer animation', () => {
    const { container } = render(<ProductCardSkeleton />)

    const skeletonElements = container.querySelectorAll('.animate-pulse')
    expect(skeletonElements.length).toBeGreaterThan(0)
  })
})
