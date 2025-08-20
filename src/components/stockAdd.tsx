import { Autocomplete, TextField } from '@mui/material';
import { LightBulbIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react';
import type StockOption  from '../types/stockOption';
import secTickers from '../data/sec_tickers.json';
import type { ModifyStockProps } from '../types/modifyStocksProps';


function StockAdd({ stocks, setStocks }: ModifyStockProps) {
    
    const [selectedStock, setSelectedStock] = useState<StockOption | null>(null);
    const [avilableStockList, setavilableStockList] = useState<StockOption[]>([]);

    useEffect(() => {
        const formatted: StockOption[] = Object.values(secTickers).map(company => ({
            symbol: company.ticker,
            description: company.title
        }));
        setavilableStockList(formatted);
    }, []);

    const handleAddStock = () => {
        if (selectedStock && !stocks.includes(selectedStock.symbol)) {
            // Update the stocks array with the new stock
            setStocks([...stocks, selectedStock.symbol]);
            // Reset selection
            setSelectedStock(null);
        }
    };

    if (avilableStockList.length === 0) return <div>Loading stocks...</div>;

        return (
          <>
                <form className="w-full max-w-sm">
                    <div className="flex items-center border-b border-teal-500 py-2">
                        <Autocomplete<StockOption>
                            disablePortal
                            options={avilableStockList}
                            getOptionLabel={(option) => `${option.symbol} - ${option.description}`}
                            noOptionsText="Type to search stocks..."
                            value={selectedStock}
                            onChange={(_, newValue) => setSelectedStock(newValue)}
                            filterOptions={(options, { inputValue }) => {
                                
                                return options.filter(option =>
                                    option.symbol.toLowerCase().includes(inputValue.toLowerCase()) ||
                                    option.description.toLowerCase().includes(inputValue.toLowerCase())
                                ).slice(0, 50); // Limit to first 50 results, loading 1000+ is just insanity. 
                            }}
                  // using the MUI styles for this dumb autocomplete component.
                            sx={{
                                appearance: 'none',
                                bgcolor: 'transparent',
                                border: 'none',
                                width: 1,
                                color: 'text.primary', 
                                mr: 1.5,
                                py: 0.5,
                                px: 1,
                                lineHeight: 1,
                                '&:focus': { outline: 'none' }
                            }}
                            renderInput={(params) => <TextField {...params} label="SEC Stock Symbol" size="small" sx={{
                                '& .MuiInputBase-root': {
                                    bgcolor: '#7dd3fc',
                                }
                            }} />}
                        />
                 
                        <button className="flex-shrink-0 bg-sky-600 hover:bg-teal-700 border-sky-600 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button" onClick={handleAddStock} >
                Add Stock
                </button>
                        <button className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button" >
                            <LightBulbIcon className="size-6 text-blue-500" />

                </button>
        </div>
                </form>
            </>
        );
    }
    export default StockAdd;