
import './App.css'
import Header from './components/header.tsx'
import StockList from './components/stockList.tsx'

function App() {
  

  return (
      <div className = "p-2">
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 text-black dark:text-white">
        <Header />
        <StockList />

    </div>

</div>
  )
}

export default App
