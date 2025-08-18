import { useState, useEffect } from 'react';
import { setItem, getItem } from './utils';

export function useStocks() {
    const [stocks, setStocks] = useState<string[]>(() => {
        // Initialize state from localStorage
        return getItem<string[]>('stocks') || ['MSFT, META, GME'];
    });

    useEffect(() => {
        setItem('stocks', stocks);
    }, [stocks]);

}