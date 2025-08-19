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


// This hook fetches stock data and company profile for a given stock symbol.
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

//this hook is to retrieve multiple stocks
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