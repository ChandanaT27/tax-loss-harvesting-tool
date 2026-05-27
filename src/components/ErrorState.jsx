const ErrorState = ({ message, onRetry }) => (
  <div className="glass-card rounded-2xl p-12 text-center shadow-glass">
    <div className="text-4xl mb-4">⚠️</div>
    <h3 className="font-display font-semibold text-coral-400 text-lg mb-2">
      Something went wrong
    </h3>
    <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto">
      {message || 'Unable to load data. Please check your connection and try again.'}
    </p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-5 py-2.5 rounded-xl bg-azure-500/15 text-azure-400 border border-azure-500/25 text-sm font-body font-medium hover:bg-azure-500/25 transition-colors duration-150"
      >
        Try Again
      </button>
    )}
  </div>
);

export default ErrorState;
