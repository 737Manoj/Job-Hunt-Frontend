import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render shows the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="h-[calc(100vh-96px)] flex items-center justify-center bg-gray-100">
                    <div className="bg-white p-10 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-bold text-center mb-6 text-red-600">Something went wrong.</h2>
                        <p className="text-gray-700 text-center">We are experiencing some technical issues. Please try again later.</p>
                    </div>
                </div>
            );
        }

        return this.props.children; 
    }
}

export default ErrorBoundary;
