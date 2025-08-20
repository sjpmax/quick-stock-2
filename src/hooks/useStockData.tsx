import { useState, useEffect } from 'react';
import StockQuote from '../types/stockQuote';
import CompanyProfile from '../types/companyProfile';
import { getStockData, getCompanyProfile } from '../api/finnHub';
import StockQuote from '../types/stockQuote';

interface StockData {
    quote: StockQuote | null;
    profile: CompanyProfile | null;
    loading: boolean;
    error: string | null;
}


/*  
    * This hook fetches stock data and company profile for a given stock symbol.
    * It returns an object containing the stock quote, company profile, loading state, and any error that occurred during the fetch.
    * 
    * @param {string} symbol - The stock symbol to fetch data for.
    * @returns {StockData} - An object containing stock quote, company profile, loading state, and error message.
    */


export function useStockData(symbol: string): StockData {
        const [data, setData] = useState<StockData>({
            quote: null,
            profile: null,
            loading: false,
            error: null
        });

    useEffect(() => {
        if (!symbol) return;

        const fetchStockData = async () => {
            setData(prev => ({ ...prev, loading: true, error: null }));

            try {
                const [quote, profile] = await Promise.all([
                    getStockData(symbol),
                    getCompanyProfile(symbol)
                ]);
                setData({
                    quote,
                    profile,
                    loading: false,
                    error: null
                });
            } catch (error) {
                setData({
                    quote: null,
                    profile: null,
                    loading: false,
                    error: error instanceof Error ? error.message : 'Failed to retrieve stock data.'

                })
            }

        };
        fetchStockData();
    }, [symbol]);

    
    return data;
}

/*  
    * This hook is to retrieve multiple stocks
    * It takes an array of stock symbols and fetches their data concurrently.
    * It returns an object containing the stocks data, loading state, and any error that occurred during the fetch.
    *
    * @param {string[]} symbols - An array of stock symbols to fetch data for.
    * @returns {Object} - An object containing stocks data, loading state, and error message.
    
*/
export function useMultipleStocks(symbols: string[]) {
    const [stocksData, setStocksData] = useState<Record<string, StockData>>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (symbols.length === 0) return;

        const fetchMultipleStocks = async () => {
            setLoading(true);
            setError(null);

            try {
                const promises = symbols.map(async (symbol) => {
                    const [quote, profile] = await Promise.all([
                        getStockData(symbol),
                        getCompanyProfile(symbol)
                    ]);
                    return { symbol, quote, profile };
                });

                const results = await Promise.all(promises);

                const newStocksData: Record<string, StockData> = {};
                results.forEach(({ symbol, quote, profile }) => {
                    newStocksData[symbol] = {
                        quote,
                        profile,
                        loading: false,
                        error: null
                    };
                });

                setStocksData(newStocksData);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to fetch stocks data');
            } finally {
                setLoading(false);
            }
        };

        fetchMultipleStocks();
    }, [symbols.join(',')]); // Re-run when symbols array changes

    return { stocksData, loading, error };
}