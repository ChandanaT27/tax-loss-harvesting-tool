import { formatCurrency } from '../utils/calculations.js';

const TaxSavingsBanner = ({ savings }) => {
  if (!savings || savings <= 0) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl p-px bg-gradient-to-r from-jade-600 via-azure-500 to-jade-600 shadow-glow-jade animate-fade-up">
      <div className="flex items-center justify-between gap-4 bg-obsidian-900 rounded-[15px] px-6 py-4">
        <div className="flex items-center gap-3">
          {/* Animated spark icon */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-jade-500/15 flex items-center justify-center text-xl animate-pulse-slow">
              ⚡
            </div>
          </div>
          <div>
            <p className="text-xs text-jade-400/70 font-body font-medium uppercase tracking-wider mb-0.5">
              Tax Optimisation Active
            </p>
            <p className="text-slate-200 font-display font-semibold text-base">
              You&apos;re going to save{' '}
              <span className="text-jade-400 font-bold">{formatCurrency(savings)}</span>{' '}
              with Tax Loss Harvesting
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 shrink-0">
          <div className="w-2 h-2 rounded-full bg-jade-400 animate-pulse" />
          <span className="text-xs text-jade-400 font-body font-medium">Live</span>
        </div>
      </div>
    </div>
  );
};

export default TaxSavingsBanner;
