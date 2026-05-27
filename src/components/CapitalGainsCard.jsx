import GainsRow from './GainsRow.jsx';
import { formatCurrency } from '../utils/calculations.js';

const CapitalGainsCard = ({ title, data, variant = 'pre', isLoading = false }) => {
  if (!data) return null;

  const isAfter = variant === 'after';
  const realisedGain = data.realisedGain;
  const isProfit = realisedGain >= 0;

  return (
    <div className={`relative glass-card rounded-2xl shadow-glass overflow-hidden transition-all duration-300 ${
      isAfter ? 'ring-1 ring-azure-500/20' : ''
    }`}>
      {/* Top accent bar */}
      <div className={`h-0.5 w-full ${
        isAfter
          ? 'bg-gradient-to-r from-azure-600 via-azure-400 to-transparent'
          : 'bg-gradient-to-r from-slate-600 via-slate-400 to-transparent'
      }`} />

      <div className="p-6">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className={`w-2 h-2 rounded-full ${isAfter ? 'bg-azure-400' : 'bg-slate-500'}`} />
            <h3 className="font-display font-semibold text-base text-slate-200 tracking-wide">
              {title}
            </h3>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full font-body font-medium ${
            isAfter
              ? 'bg-azure-500/15 text-azure-400 border border-azure-500/20'
              : 'bg-slate-700/60 text-slate-400 border border-slate-600/30'
          }`}>
            {isAfter ? 'Optimised' : 'Current'}
          </span>
        </div>

        {/* Short-Term Section */}
        <div className="mb-3">
          <p className="text-xs font-display font-medium text-slate-500 uppercase tracking-widest mb-1.5 px-1">
            Short-Term
          </p>
          <div className="space-y-0.5">
            <GainsRow label="Profits" value={data.shortTermProfits} />
            <GainsRow label="Losses" value={-data.shortTermLosses} />
            <GainsRow label="Net Short-Term Gains" value={data.netShortTerm} highlight />
          </div>
        </div>

        <div className="border-t border-white/5 my-3" />

        {/* Long-Term Section */}
        <div className="mb-4">
          <p className="text-xs font-display font-medium text-slate-500 uppercase tracking-widest mb-1.5 px-1">
            Long-Term
          </p>
          <div className="space-y-0.5">
            <GainsRow label="Profits" value={data.longTermProfits} />
            <GainsRow label="Losses" value={-data.longTermLosses} />
            <GainsRow label="Net Long-Term Gains" value={data.netLongTerm} highlight />
          </div>
        </div>

        {/* Realised Capital Gains - Hero Number */}
        <div className={`rounded-xl p-4 mt-2 ${
          isProfit
            ? 'bg-jade-500/8 border border-jade-500/15'
            : 'bg-coral-500/8 border border-coral-500/15'
        }`}>
          <p className="text-xs text-slate-500 font-body mb-1">Realised Capital Gains</p>
          <p className={`text-2xl font-display font-bold tabular-nums ${
            isProfit ? 'text-jade-400' : 'text-coral-400'
          }`}>
            {formatCurrency(realisedGain)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CapitalGainsCard;
