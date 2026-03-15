"use client";

import React, { Component, ReactNode } from 'react'
import { ProductGridSkeleton } from './skeleton'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  isLoading: boolean
}

export class AsyncErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, isLoading: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true, isLoading: false }
  }

  componentDidCatch(error: Error) {
    console.error('Async operation failed:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Failed to load content</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Try again
            </button>
          </div>
        )
      )
    }

    return this.props.children
  }
}
