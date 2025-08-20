# EZ Stocks 📈

A clean, modern stock tracking application built with React and TypeScript. Monitor your favorite stocks with real-time data from the Finnhub API.

## Features

### Current Features ✅
- **Real-time Stock Data**: Live price updates, daily changes, and percentage changes
- **Clean UI**: Dark mode interface with responsive design
- **Multiple Stock Support**: Track multiple stocks simultaneously
- **Local Storage**: Your stock list persists between sessions
- **Add/Remove Stocks**: Easy stock management with search functionality

### Planned Features 🚧
- **Sorting**: Sort stocks by price, change, percentage, or alphabetically
- **Portfolio Tracking**: Track positions, quantities, and P&L
- **Advanced Analytics**: Charts, historical data, and performance metrics
- **Alerts**: Price alerts and notifications

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **API**: Finnhub Stock API
- **HTTP Client**: Axios
- **Linting**: ESLint with TypeScript support

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Finnhub API key (free at [finnhub.io](https://finnhub.io))


## Project Structure

```
src/
├── components/
│   ├── header.tsx          # App header with logo
│   └── stockList.tsx       # Stock list display
├── hooks/
│   ├── useStocks.tsx       # Stock management hook
│   └── useStockData.tsx    # API data fetching hooks
├── api/
│   └── finnHub.ts          # Finnhub API client
├── types/
│   ├── stockQuote.ts       # Stock quote type definitions
│   └── companyProfile.ts   # Company profile types
├── utils.ts                # Utility functions
└── App.tsx                 # Main app component
```

## API Integration

The app uses the Finnhub API for real-time stock data:
- **Stock Quotes**: Current price, daily change, high/low
- **Company Profiles**: Company information, industry, market cap

## Roadmap

### Phase 1: Core Functionality
- [x] Basic stock display
- [x] Real-time data fetching
- [x] Add/remove stocks
- [x] Stock search

### Phase 2: Enhanced Features
- [ ] Sorting and filtering
- [ ] Portfolio tracking
- [ ] Position management
- [ ] Price alerts


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details.

## Acknowledgments

- [Finnhub](https://finnhub.io) for providing the stock API
- [Tailwind CSS](https://tailwindcss.com) for the styling framework
- [Vite](https://vitejs.dev) for the fast build tool

---

**Note**: This app is for educational and personal use. Always consult with financial professionals before making investment decisions.
