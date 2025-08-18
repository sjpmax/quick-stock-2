
import { useStocks } from './useStocks';


function StockList() {
    const [stocks] = useStocks();


    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Stock List</h2>
            <ul className="list-disc pl-5">
                {stocks.map((stock: string, idx: number) => (
                <li key={idx}> {stock}</li>
                )) }
            </ul>
        </div>
    );
}

export default StockList;