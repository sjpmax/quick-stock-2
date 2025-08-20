import { useState, useEffect } from 'react';
import { setItem, getItem } from '../utils';


/**
 * This function is a custom React hook that manages a list of stock symbols.
 * I included TSLA and TSLX because when tesla is doing well, tslx is negative. We'll always be able to see the green
 * and red colors show up.
 * 
 * It initializes the state with a default list of stock symbols, retrieves and saves the list to localStorage,
 */


export function useStocks() {
    const [stocks, setStocks] = useState<string[]>(() => {
        // Initialize state from localStorage
        return getItem<string[]>('stocks') || ['MSFT', 'META', 'TSLA', 'TSLX']; 
    });

    // setting localStorage whenever stocks change
    useEffect(() => {
        setItem('stocks', stocks);
    }, [stocks]);

    return [stocks, setStocks] as const;
}