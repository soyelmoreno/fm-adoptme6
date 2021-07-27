// mostly took this from the React docs

import { Component } from "react";
import { Link, Redirect } from "react-router-dom";
class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // I would log this to an error monitoring service, such as Sentry, Azure
    // Monitor, New Relic, TrackJS
    console.error("ErrorBoundary caught an error", error, info);
    setTimeout(() => this.setState({ redirect: true }), 5000);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    } else if (this.state.hasError) {
      return (
        <h2>
          This listing has an error. <Link to="/">Click here</Link> to go back
          to the home page.
        </h2>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

// Now we can do something like this:
/*
<ErrorBoundary>
  // Whatever is inside ErrorBoundary is this.props.children
  <h1>hi there</h1>
</ErrorBoundary>
*/

// ErrorBoundary is a higher-order component: it adds functionality, but doesn't
// add display. You nest other components inside of it.
