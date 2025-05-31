import React from 'react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary?: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="glass-card max-w-md w-full p-6">
        <h2 className="text-xl font-bold text-white mb-4">Something went wrong</h2>
        <div className="bg-red-900/30 border border-red-500/50 rounded-md p-4 mb-4">
          <p className="text-red-300 text-sm font-mono overflow-auto">
            {error.message}
          </p>
        </div>
        <p className="text-gray-300 mb-6">
          The application encountered an error. Please try refreshing the page or contact support if the issue persists.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => window.location.reload()}
            className="glass-button flex-1 py-2"
          >
            Refresh Page
          </button>
          {resetErrorBoundary && (
            <button
              onClick={resetErrorBoundary}
              className="glass-button-secondary flex-1 py-2"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;