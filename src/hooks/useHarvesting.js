import { useState, useEffect, useCallback } from 'react';
import { fetchHoldings, fetchCapitalGains } from '../services/api.js';
import {
  buildAfterHarvestingGains,
  computeNetGain,
  computeRealisedGains,
  computeTaxSavings,
} from '../utils/calculations.js';

export const useHarvesting = () => {
  const [holdings, setHoldings] = useState([]);
  const [capitalGains, setCapitalGains] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [loadingHoldings, setLoadingHoldings] = useState(true);
  const [loadingGains, setLoadingGains] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [holdingsData, gainsData] = await Promise.all([
          fetchHoldings(),
          fetchCapitalGains(),
        ]);
        setHoldings(holdingsData);
        setCapitalGains(gainsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingHoldings(false);
        setLoadingGains(false);
      }
    };

    loadData();
  }, []);

  // Toggle a single row
  const toggleRow = useCallback((id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  // Toggle all rows
  const toggleAll = useCallback(() => {
    setSelectedIds((prev) => {
      if (prev.size === holdings.length) {
        return new Set();
      }
      return new Set(holdings.map((h) => h.id));
    });
  }, [holdings]);

  const isAllSelected = holdings.length > 0 && selectedIds.size === holdings.length;
  const isPartialSelected = selectedIds.size > 0 && selectedIds.size < holdings.length;

  // Derive selected holdings objects
  const selectedHoldings = holdings.filter((h) => selectedIds.has(h.id));

  // Pre-harvesting computed values
  const preHarvesting = capitalGains
    ? (() => {
        const netSTCG = computeNetGain(capitalGains.shortTermProfits, capitalGains.shortTermLosses);
        const netLTCG = computeNetGain(capitalGains.longTermProfits, capitalGains.longTermLosses);
        return {
          ...capitalGains,
          netShortTerm: netSTCG,
          netLongTerm: netLTCG,
          realisedGain: computeRealisedGains(netSTCG, netLTCG),
        };
      })()
    : null;

  // After-harvesting computed values
  const afterHarvesting = capitalGains
    ? (() => {
        const merged = buildAfterHarvestingGains(capitalGains, selectedHoldings);
        const netSTCG = computeNetGain(merged.shortTermProfits, merged.shortTermLosses);
        const netLTCG = computeNetGain(merged.longTermProfits, merged.longTermLosses);
        return {
          ...merged,
          netShortTerm: netSTCG,
          netLongTerm: netLTCG,
          realisedGain: computeRealisedGains(netSTCG, netLTCG),
        };
      })()
    : null;

  // Tax savings
  const taxSavings =
    preHarvesting && afterHarvesting
      ? computeTaxSavings(preHarvesting.realisedGain, afterHarvesting.realisedGain)
      : 0;

  return {
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
  };
};
