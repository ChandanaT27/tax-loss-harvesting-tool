import { formatCurrency } from '../utils/calculations.js';

// Color badge for asset symbol
const AssetBadge = ({ symbol, icon }) => {
  const colors = {
    BTC: 'from-amber-500/20 to-amber-600/10 text-amber-400 border-amber-500/20',
    ETH: 'from-azure-500/20 to-azure-600/10 text-azure-400 border-azure-500/20',
    SOL: 'from-purple-500/20 to-purple-600/10 text-purple-400 border-purple-500/20',
    AVAX: 'from-coral-500/20 to-coral-600/10 text-coral-400 border-coral-500/20',
    MATIC: 'from-violet-500/20 to-violet-600/10 text-violet-400 border-violet-500/20',
    LINK: 'from-azure-500/20 to-azure-600/10 text-azure-400 border-azure-500/20',
    DOT: 'from-pink-500/20 to-pink-600/10 text-pink-400 border-pink-500/20',
    ADA: 'from-sky-500/20 to-sky-600/10 text-sky-400 border-sky-500/20',
    UNI: 'from-pink-500/20 to-pink-600/10 text-pink-400 border-pink-500/20',
    ATOM: 'from-indigo-500/20 to-indigo-600/10 text-indigo-400 border-indigo-500/20',
  };

  const colorClass = colors[symbol] || 'from-slate-500/20 to-slate-600/10 text-slate-400 border-slate-500/20';

  return (
    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${colorClass} border flex items-center justify-center text-sm font-bold font-mono shrink-0`}>
      {symbol.slice(0, 2)}
    </div>
  );
};

// Individual gain/loss cell
const GainCell = ({ value }) => {
  const isPositive = value > 0;
  const isZero = value === 0;

  return (
    <span className={`font-mono text-sm tabular-nums font-medium ${
      isZero ? 'text-slate-500' : isPositive ? 'text-jade-400' : 'text-coral-400'
    }`}>
      {isPositive ? '+' : ''}{formatCurrency(value)}
    </span>
  );
};

// Custom checkbox
const Checkbox = ({ checked, indeterminate = false, onChange, label }) => (
  <label className="relative flex items-center justify-center cursor-pointer group">
    <input
      type="checkbox"
      className="sr-only"
      checked={checked}
      onChange={onChange}
      aria-label={label}
    />
    <div className={`w-4.5 h-4.5 w-[18px] h-[18px] rounded flex items-center justify-center border transition-all duration-150 ${
      checked || indeterminate
        ? 'bg-azure-500 border-azure-500'
        : 'bg-transparent border-slate-600 group-hover:border-azure-500/60'
    }`}>
      {indeterminate && !checked ? (
        <div className="w-2 h-0.5 bg-white rounded-full" />
      ) : checked ? (
        <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
          <path d="M1 3.5L3.5 6L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : null}
    </div>
  </label>
);

const HoldingsTable = ({ holdings, selectedIds, onToggleRow, onToggleAll, isAllSelected, isPartialSelected }) => {
  if (holdings.length === 0) {
    return (
      <div className="glass-card rounded-2xl shadow-glass p-16 text-center">
        <p className="text-4xl mb-4">📭</p>
        <p className="font-display font-semibold text-slate-300 text-lg mb-2">No Holdings Found</p>
        <p className="text-slate-500 text-sm">Your portfolio appears to be empty.</p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl shadow-glass overflow-hidden">
      {/* Table Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <h2 className="font-display font-semibold text-slate-200 text-lg">Holdings</h2>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700/60 text-slate-400 font-body border border-slate-600/30">
            {holdings.length} assets
          </span>
        </div>
        {selectedIds.size > 0 && (
          <span className="text-xs text-azure-400 font-body font-medium">
            {selectedIds.size} selected for harvesting
          </span>
        )}
      </div>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px]">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left px-6 py-3.5 w-12">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isPartialSelected}
                  onChange={onToggleAll}
                  label="Select all"
                />
              </th>
              <th className="text-left px-4 py-3.5">
                <span className="text-xs font-display font-medium text-slate-500 uppercase tracking-widest">
                  Asset
                </span>
              </th>
              <th className="text-right px-4 py-3.5">
                <span className="text-xs font-display font-medium text-slate-500 uppercase tracking-widest">
                  Quantity
                </span>
              </th>
              <th className="text-right px-4 py-3.5">
                <span className="text-xs font-display font-medium text-slate-500 uppercase tracking-widest">
                  Buy Price
                </span>
              </th>
              <th className="text-right px-4 py-3.5">
                <span className="text-xs font-display font-medium text-slate-500 uppercase tracking-widest">
                  Current Price
                </span>
              </th>
              <th className="text-right px-4 py-3.5">
                <span className="text-xs font-display font-medium text-slate-500 uppercase tracking-widest">
                  ST Gain/Loss
                </span>
              </th>
              <th className="text-right px-6 py-3.5">
                <span className="text-xs font-display font-medium text-slate-500 uppercase tracking-widest">
                  LT Gain/Loss
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.03]">
            {holdings.map((holding, idx) => {
              const isSelected = selectedIds.has(holding.id);

              return (
                <tr
                  key={holding.id}
                  onClick={() => onToggleRow(holding.id)}
                  className={`cursor-pointer transition-all duration-150 group ${
                    isSelected
                      ? 'bg-azure-500/[0.06] hover:bg-azure-500/[0.09]'
                      : 'hover:bg-white/[0.02]'
                  }`}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {/* Checkbox */}
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={isSelected}
                      onChange={() => onToggleRow(holding.id)}
                      label={`Select ${holding.name}`}
                    />
                  </td>

                  {/* Asset Name */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <AssetBadge symbol={holding.symbol} icon={holding.icon} />
                      <div>
                        <p className="font-body font-medium text-slate-200 text-sm leading-tight">
                          {holding.name}
                        </p>
                        <p className="font-mono text-xs text-slate-500 mt-0.5">
                          {holding.symbol}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Quantity */}
                  <td className="px-4 py-4 text-right">
                    <span className="font-mono text-sm text-slate-300 tabular-nums">
                      {holding.quantity.toLocaleString('en-IN')}
                    </span>
                  </td>

                  {/* Buy Price */}
                  <td className="px-4 py-4 text-right">
                    <span className="font-mono text-sm text-slate-400 tabular-nums">
                      ₹{holding.buyPrice.toLocaleString('en-IN')}
                    </span>
                  </td>

                  {/* Current Price */}
                  <td className="px-4 py-4 text-right">
                    <span className={`font-mono text-sm tabular-nums font-medium ${
                      holding.currentPrice >= holding.buyPrice ? 'text-jade-400' : 'text-coral-400'
                    }`}>
                      ₹{holding.currentPrice.toLocaleString('en-IN')}
                    </span>
                  </td>

                  {/* Short-term Gain/Loss */}
                  <td className="px-4 py-4 text-right">
                    <GainCell value={holding.shortTermGain} />
                  </td>

                  {/* Long-term Gain/Loss */}
                  <td className="px-6 py-4 text-right">
                    <GainCell value={holding.longTermGain} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="px-6 py-3 border-t border-white/5 flex items-center justify-between">
        <p className="text-xs text-slate-600 font-body">
          Click a row to select it for harvesting
        </p>
        <p className="text-xs text-slate-600 font-body">
          Showing {holdings.length} of {holdings.length} holdings
        </p>
      </div>
    </div>
  );
};

export default HoldingsTable;
