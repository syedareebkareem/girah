import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('App crashed:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="not-found-block">
          <p style={{ fontSize: '40px' }}>🧶</p>
          <h1 style={{ fontFamily: "'Fraunces', serif", color: 'var(--ink)' }}>Something went wrong</h1>
          <p style={{ color: 'var(--text-light)' }}>Please refresh the page and try again.</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
