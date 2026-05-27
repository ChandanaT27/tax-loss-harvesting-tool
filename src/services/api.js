import { mockHoldings, mockCapitalGains } from '../data/mockData.js';

/**
 * Simulates fetching holdings from a backend API
 */
export const fetchHoldings = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve([...mockHoldings]);
      } catch (err) {
        reject(new Error('Failed to fetch holdings. Please try again.'));
      }
    }, 1200);
  });
};

/**
 * Simulates fetching pre-harvesting capital gains from a backend API
 */
export const fetchCapitalGains = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve({ ...mockCapitalGains });
      } catch (err) {
        reject(new Error('Failed to fetch capital gains. Please try again.'));
      }
    }, 900);
  });
};
