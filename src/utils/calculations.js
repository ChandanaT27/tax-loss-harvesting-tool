/**
 * Formats a number as Indian Rupee currency string
 */
export const formatCurrency = (amount) => {
  const abs = Math.abs(amount);
  const formatted = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(abs);
  return amount < 0 ? `−₹${formatted}` : `₹${formatted}`;
};

/**
 * Formats a number with sign prefix for display
 */
export const formatWithSign = (amount) => {
  if (amount === 0) return '₹0.00';
  const abs = Math.abs(amount);
  const formatted = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(abs);
  return amount < 0 ? `−₹${formatted}` : `+₹${formatted}`;
};

/**
 * Computes net gain = profits - losses
 */
export const computeNetGain = (profits, losses) => profits - losses;

/**
 * Computes total realised capital gains = netSTCG + netLTCG
 */
export const computeRealisedGains = (netSTCG, netLTCG) => netSTCG + netLTCG;

/**
 * Given a list of selected holdings, computes incremental gains to add
 * to the after-harvesting card values.
 * 
 * - If gain > 0 → adds to the respective profits bucket
 * - If gain < 0 → adds the absolute value to the respective losses bucket
 */
export const computeHarvestingDeltas = (selectedHoldings) => {
  let stProfits = 0;
  let stLosses = 0;
  let ltProfits = 0;
  let ltLosses = 0;

  selectedHoldings.forEach((holding) => {
    if (holding.shortTermGain > 0) {
      stProfits += holding.shortTermGain;
    } else if (holding.shortTermGain < 0) {
      stLosses += Math.abs(holding.shortTermGain);
    }

    if (holding.longTermGain > 0) {
      ltProfits += holding.longTermGain;
    } else if (holding.longTermGain < 0) {
      ltLosses += Math.abs(holding.longTermGain);
    }
  });

  return { stProfits, stLosses, ltProfits, ltLosses };
};

/**
 * Builds the after-harvesting capital gains object
 * by merging base gains with selected holdings deltas
 */
export const buildAfterHarvestingGains = (baseGains, selectedHoldings) => {
  const { stProfits, stLosses, ltProfits, ltLosses } = computeHarvestingDeltas(selectedHoldings);

  return {
    shortTermProfits: baseGains.shortTermProfits + stProfits,
    shortTermLosses: baseGains.shortTermLosses + stLosses,
    longTermProfits: baseGains.longTermProfits + ltProfits,
    longTermLosses: baseGains.longTermLosses + ltLosses,
  };
};

/**
 * Returns the tax savings amount if any
 */
export const computeTaxSavings = (preRealisedGain, postRealisedGain) => {
  const savings = preRealisedGain - postRealisedGain;
  return savings > 0 ? savings : 0;
};
