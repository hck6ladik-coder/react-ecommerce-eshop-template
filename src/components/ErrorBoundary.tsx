import React, { ReactNode } from 'react'

interface ErrorBoundaryState {
  hasError: boolean
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback: ReactNode
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_error: Error) {
    // Update state so the next render will show the fallback
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // You can also log the error to an external service here
    console.error('Error caught by ErrorBoundary:', error, info)
  }

  render() {
    const { hasError } = this.state
    const { children, fallback } = this.props

    if (hasError) {
      return fallback
    }

    return children
  }
}