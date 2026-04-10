import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary] Caught error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#0a0a0a',
          color: '#fff',
          padding: '40px 20px',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <h1 style={{ color: '#ef4444', marginBottom: '20px' }}>Something went wrong</h1>
          <details style={{ 
            whiteSpace: 'pre-wrap', 
            background: '#1a1a1a',
            padding: '20px',
            borderRadius: '8px',
            overflow: 'auto'
          }}>
            <summary style={{ cursor: 'pointer', marginBottom: '10px' }}>
              Error details
            </summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
