
import { useStocks } from '../hooks/useStocks';
import { useMultipleStocks } from '../hooks/useStockData';
import { TrashIcon } from '@heroicons/react/24/solid'
import { useState } from 'react';
import type { ModifyStockProps } from '../types/modifyStocksProps';


function StockList({ stocks, setStocks }: ModifyStockProps) {


    // Take in the raw price point and format it into currency
    function currencyFormat (price: number) {
        return '$' + price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    // color the price change  based on whether it is positive or negative    
    function cellColorChange(dailyChange: number) {
        return dailyChange >= 0 ? 'text-green-500' : 'text-red-500';
    }

    const handleRemoveStock = (stockToRemove: string) => {
        // Remove the stock from the stocks array
        setStocks(prevStocks => prevStocks.filter(s => s !== stockToRemove));
    };

    const { stocksData, loading, error } = useMultipleStocks(stocks);
    if (loading) {
        return (
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Stock List</h2>
                <p className="text-gray-600 dark:text-gray-400">Loading stock data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Stock List</h2>
                <p className="text-red-600 dark:text-red-400">Error: {error}</p>
            </div>
        );
    }

    return (


        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-sky-900 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="w-20 px-2 py-2">
                            Symbol
                        </th>
                        <th scope="col" className="w-24 px-2 py-2">
                            Price
                        </th>
                        <th scope="col" className="w-32 px-2 py-2">
                            Change
                        </th>
                        <th scope="col" className="w-10 px-2 py-2">
                            Remove
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/* Get the stock data for each stock from finnhub and render it in the table */}
                    {stocks.map((symbol: string) => {
                        const stockData = stocksData[symbol];
                        console.log(stockData, "stock data in list");
                        if (!stockData || !stockData.quote || !stockData.profile) {
                            // Optionally render a loading row or skip rendering
                            return (
                                <tr key={symbol}>
                                    <td colSpan={4} className="px-2 py-2 text-gray-400">Loading...</td>
                                </tr>
                            );
                        }
                        return (
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:dark:bg-sky-950 border-b dark:border-gray-700 border-gray-200" key={symbol}>
                                <th scope="row" className="w-15 px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {stockData.profile.ticker}
                                </th>
                                <td className="w-24 px-2 py-2">
                                    {currencyFormat(stockData.quote.c)}        
                        </td>
                                <td className={`w-32 px-2 py-2 ${cellColorChange(stockData.quote.d)}`}>
                                    {stockData.quote.d.toFixed(3)} ({stockData.quote.dp.toFixed(2)}%)
                        </td>
                                <td className="w-10 px-2 py-2 text-center">
                                    <button className="text-red-500 hover:text-red-700" onClick={() => handleRemoveStock(symbol)}>
                                        <TrashIcon className="size-6 text-blue-500" /></button>
                                </td>
                            </tr>
                        );
                    })}

                    

                        
                </tbody>
            </table>
        </div>

    );
}

export default StockList;