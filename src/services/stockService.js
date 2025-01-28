
import axios from 'axios';

const BASE_URL = 'https://sheetdb.io/api/v1/3hktccrkppmrv?sheet=$AAPL';

export async function stockService() {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
}
