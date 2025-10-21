// src/components/ErrorBoundary.jsx
import React from "react";
import "../style/ErrorBoundary.css";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("💥 Error caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2>😵 Oops! Something went wrong.</h2>
          <p>Silica tidak sengaja menjatuhkan komponen-nya, Master...</p>
          <button onClick={() => window.location.reload()}>
            Reload Halaman
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
