// src/services/fmpService.js
import axios from 'axios';

const API_KEY = 'LXBQzEN0rCkKKoCl20NgFtjexFuj2OvE';

const SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA'];

export async function fetchMag7Data() {
  try {
    const results = [];

    for (const symbol of SYMBOLS) {
      // 1. Quote holen (Kurs + Change)
      const quoteRes = await axios.get(
        `https://financialmodelingprep.com/stable/quote?symbol=${symbol}&apikey=${API_KEY}`
      );
      const q = quoteRes.data[0] || {};

      // 2. Income Statement (letztes verfügbares Jahr)
      let income = {};
      try {
        const incomeRes = await axios.get(
          `https://financialmodelingprep.com/stable/income-statement/${symbol}?apikey=${API_KEY}&limit=1&period=FY`
        );
        income = incomeRes.data[0] || {};
      } catch (e) {
        console.warn(`Income Statement für ${symbol} nicht verfügbar`);
      }

      results.push({
        symbol: q.symbol || symbol,
        name: q.name || symbol,
        logo: `https://financialmodelingprep.com/image-stock/${symbol}.png`,
        price: q.price ? q.price.toFixed(2) : '–',
        changePercent: q.changesPercentage ? q.changesPercentage.toFixed(2) : 0,
        marketCap: q.marketCap ? (q.marketCap / 1_000_000_000).toFixed(0) + ' Mrd $' : '–',
        netIncomeTTM: income.netIncome ? (income.netIncome / 1_000_000_000).toFixed(2) + ' Mrd $' : '–',
        revenueTTM: income.revenue ? (income.revenue / 1_000_000_000).toFixed(0) + ' Mrd $' : '–',
        grossProfit: income.grossProfit ? (income.grossProfit / 1_000_000_000).toFixed(0) + ' Mrd $' : '–',
      });

      await new Promise(r => setTimeout(r, 350));
    }

    console.log('✅ FMP Income Statement Daten geladen:', results);
    return results;

  } catch (error) {
    console.error('❌ FMP Fehler:', error.response?.data || error.message);
    return [];
  }
}