const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

import StockQuote  from '../types/stockQuote';
import CompanyProfile from '../types/companyProfile';
import axios from 'axios';

class FinnhubAPI {

    private async fetchFromAPI(endpoint: string): Promise<object> {
        if (!FINNHUB_API_KEY) {
            throw new Error('Finnhub API key is not set');
        }
        const url = `${BASE_URL}${endpoint}&token=${FINNHUB_API_KEY}`;

        try {
            const response = await axios.get(url);
            if (response.status !== 200) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }
            return response.data;
        } catch (error) {   
            console.error('Error fetching data from Finnhub:', error);
            throw error;

        }
    }

    async getStockData(symbol: string): Promise<StockQuote> {
        return this.fetchFromAPI(`/quote?symbol=${symbol}`);
    }

   
    async getCompanyProfile(symbol: string): Promise<CompanyProfile> {
        return this.fetchFromAPI(`/stock/profile2?symbol=${symbol}`);
    }

}

export const finnhubAPI = new FinnhubAPI();

export const getStockData = async (symbol: string): Promise<StockQuote> => {
    return finnhubAPI.getStockData(symbol);
}

export const getCompanyProfile = (symbol: string) => finnhubAPI.getCompanyProfile(symbol);