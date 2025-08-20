
import './App.css'
import Header from './components/header.tsx'
import StockList from './components/stockList.tsx'
import StockAdd from './components/stockAdd.tsx'
import { useStocks } from './hooks/useStocks.tsx'


function App() {

    const [stocks, setStocks] = useStocks();

  return (
      <div className = "p-2">
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 text-black dark:text-white">
              <Header />
              <StockAdd stocks={stocks} setStocks={setStocks} />
              <StockList stocks={stocks} setStocks={setStocks} />

    </div>

</div>
  )
}

export default App
