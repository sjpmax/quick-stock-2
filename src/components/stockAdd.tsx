import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import type StockOption  from '../types/stockOption';
import secTickers from '../data/sec_tickers.json';
function StockAdd() {
    const [avilableStockList, setavilableStockList] = useState<StockOption[]>([]);

    useEffect(() => {
        const formatted: StockOption[] = Object.values(secTickers).map(company => ({
            symbol: company.ticker,
            description: company.title
        }));
        setStockList(formatted);
    }, []);

    if (stockList.length === 0) return <div>Loading stocks...</div>;

        return (
          <>
                <form className="w-full max-w-sm">
                    <div className="flex items-center border-b border-teal-500 py-2">
                        <Autocomplete<StockOption>
                            disablePortal
                            options={avilableStockList}
                            getOptionLabel={(option) => `${option.symbol} - ${option.description}`}
                            noOptionsText="Type to search stocks..."
                            filterOptions={(options, { inputValue }) => {
                                
                                return options.filter(option =>
                                    option.symbol.toLowerCase().includes(inputValue.toLowerCase()) ||
                                    option.description.toLowerCase().includes(inputValue.toLowerCase())
                                ).slice(0, 50); // Limit to first 50 results
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
                 
                        <button className="flex-shrink-0 bg-sky-600 hover:bg-teal-700 border-sky-600 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                Add Stock
                </button>
                        <button className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button" >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                            </svg>

                </button>
        </div>
                </form>
            </>
        );
    }
    export default StockAdd;