import { useHarvesting } from './hooks/useHarvesting.js';
import Header from './components/Header.jsx';
import CapitalGainsCard from './components/CapitalGainsCard.jsx';
import HoldingsTable from './components/HoldingsTable.jsx';
import TaxSavingsBanner from './components/TaxSavingsBanner.jsx';
import ErrorState from './components/ErrorState.jsx';
import { SkeletonCard, SkeletonTable } from './components/Skeleton.jsx';

function App() {
  const {
    holdings,
    preHarvesting,
    afterHarvesting,
    selectedIds,
    toggleRow,
    toggleAll,
    isAllSelected,
    isPartialSelected,
    loadingHoldings,
    loadingGains,
    error,
    taxSavings,
  } = useHarvesting();

  return (
    <div className="min-h-screen bg-obsidian-950">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-azure-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-jade-500/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/3 rounded-full blur-3xl" />
      </div>

      <Header />

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Page Title */}
        <div className="animate-fade-up">
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-100 tracking-tight">
            Tax Loss Harvesting
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-body">
            Optimise your portfolio to reduce tax liability by harvesting unrealised losses.
          </p>
        </div>

        {/* Error State */}
        {error && (
          <ErrorState
            message={error}
            onRetry={() => window.location.reload()}
          />
        )}

        {/* Tax Savings Banner */}
        {!error && !loadingGains && taxSavings > 0 && (
          <TaxSavingsBanner savings={taxSavings} />
        )}

        {/* Capital Gains Cards */}
        {!error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {loadingGains ? (
              <>
                <div className="animate-fade-up animate-delay-100">
                  <SkeletonCard />
                </div>
                <div className="animate-fade-up animate-delay-200">
                  <SkeletonCard />
                </div>
              </>
            ) : (
              <>
                <div className="animate-fade-up animate-delay-100">
                  <CapitalGainsCard
                    title="Pre Harvesting"
                    data={preHarvesting}
                    variant="pre"
                  />
                </div>
                <div className="animate-fade-up animate-delay-200">
                  <CapitalGainsCard
                    title="After Harvesting"
                    data={afterHarvesting}
                    variant="after"
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* Divider with label */}
        {!error && (
          <div className="flex items-center gap-4 animate-fade-up animate-delay-300">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="text-xs text-slate-600 font-body font-medium uppercase tracking-widest">
              Select holdings to harvest
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        )}

        {/* Holdings Table */}
        {!error && (
          <div className="animate-fade-up animate-delay-400">
            {loadingHoldings ? (
              <SkeletonTable />
            ) : (
              <HoldingsTable
                holdings={holdings}
                selectedIds={selectedIds}
                onToggleRow={toggleRow}
                onToggleAll={toggleAll}
                isAllSelected={isAllSelected}
                isPartialSelected={isPartialSelected}
              />
            )}
          </div>
        )}

        {/* Footer note */}
        <div className="text-center pb-6 animate-fade-up animate-delay-500">
          <p className="text-xs text-slate-700 font-body">
            HarvestIQ uses real-time data to help optimise your tax position. Results are indicative only and not financial advice.
          </p>
        </div>

      </main>
    </div>
  );
}

export default App;
