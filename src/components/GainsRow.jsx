import { formatCurrency } from '../utils/calculations.js';

const GainsRow = ({ label, value, highlight = false }) => {
  const isNegative = value < 0;
  const isZero = value === 0;

  return (
    <div className={`flex justify-between items-center py-2.5 px-3 rounded-lg transition-colors ${
      highlight ? 'bg-white/5' : 'hover:bg-white/3'
    }`}>
      <span className="text-sm text-slate-400 font-body">{label}</span>
      <span className={`text-sm font-medium font-mono tabular-nums ${
        highlight
          ? isNegative
            ? 'text-coral-400'
            : 'text-jade-400'
          : isNegative
          ? 'number-negative'
          : isZero
          ? 'number-neutral'
          : 'number-positive'
      }`}>
        {formatCurrency(value)}
      </span>
    </div>
  );
};

export default GainsRow;
