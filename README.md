# HarvestIQ — Tax Loss Harvesting Dashboard

A production-grade Tax Loss Harvesting web application built with **React.js + Vite + Tailwind CSS**. Designed as a fintech dashboard with a premium dark-glass aesthetic.

![HarvestIQ](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react) ![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite) ![Tailwind](https://img.shields.io/badge/Tailwind-3-38BDF8?style=flat&logo=tailwindcss)

---

## Features

- **Pre & After Harvesting cards** — Real-time capital gains comparison
- **Holdings table** — Crypto portfolio with select/deselect & visual highlights
- **Live harvesting logic** — Gains/losses update as you select holdings
- **Tax savings banner** — Shown only when savings are positive
- **Loading skeletons** — Smooth async UX with shimmer animations
- **Error states** — Graceful error handling with retry
- **Responsive design** — Mobile-first, works on all screen sizes
- **Mock APIs** — Realistic delay simulation with `fetchHoldings()` and `fetchCapitalGains()`

---

## Project Structure

```
src/
├── components/
│   ├── CapitalGainsCard.jsx   # Pre/After harvesting display card
│   ├── ErrorState.jsx         # Error fallback component
│   ├── GainsRow.jsx           # Individual gain/loss row
│   ├── Header.jsx             # Sticky navigation bar
│   ├── HoldingsTable.jsx      # Interactive holdings table
│   ├── Skeleton.jsx           # Loading skeleton components
│   └── TaxSavingsBanner.jsx   # Animated savings notification
├── data/
│   └── mockData.js            # Mock crypto holdings & capital gains
├── hooks/
│   └── useHarvesting.js       # Core state management hook
├── services/
│   └── api.js                 # Mock API with Promise + setTimeout
├── utils/
│   └── calculations.js        # Pure calculation utility functions
├── App.jsx                    # Root component
├── main.jsx                   # React entry point
└── index.css                  # Global styles + Tailwind
```

---

## Getting Started

### Prerequisites
- Node.js ≥ 18
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/tax-loss-harvesting.git
cd tax-loss-harvesting

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Calculation Logic

### Capital Gains Formulas
```
Net Short-Term Capital Gains (STCG) = ST Profits − ST Losses
Net Long-Term Capital Gains (LTCG) = LT Profits − LT Losses
Realised Capital Gains             = Net STCG + Net LTCG
```

### Harvesting Logic
When a holding is selected:
- `shortTermGain > 0` → added to **short-term profits**
- `shortTermGain < 0` → absolute value added to **short-term losses**
- Same applies for `longTermGain`

### Tax Savings
```
Tax Savings = Pre-Harvest Realised Gains − After-Harvest Realised Gains
Shown only if savings > 0
```

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18 | UI framework |
| Vite | 5 | Build tool & dev server |
| Tailwind CSS | 3 | Utility-first styling |
| Google Fonts | — | Syne + DM Sans + JetBrains Mono |

---

## Deployment (Vercel)

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Production deploy
vercel --prod
```

### Option 2: Vercel Dashboard (Recommended)

1. Push your code to **GitHub**
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**

Vercel auto-deploys on every push to `main`. 🎉

### Option 3: Manual Build

```bash
npm run build
# Uploads the `dist/` folder to any static host (Netlify, GitHub Pages, etc.)
```

---

## Mock API

Located at `src/services/api.js`:

```js
fetchHoldings()      // Returns Promise<Holding[]> after ~1200ms
fetchCapitalGains()  // Returns Promise<CapitalGains> after ~900ms
```

Both use `setTimeout` + `Promise` to simulate real network latency.

---

## Customisation

- **Add holdings**: Edit `src/data/mockData.js`
- **Change theme colours**: Edit `tailwind.config.js`
- **Replace mock API**: Swap `src/services/api.js` with real REST/GraphQL calls
- **Add tax rate calculation**: Extend `src/utils/calculations.js`

---

## License

MIT © 2025 HarvestIQ
