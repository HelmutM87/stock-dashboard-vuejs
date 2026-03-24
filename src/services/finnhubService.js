// src/services/finnhubService.js
import axios from 'axios';

const API_KEY = 'd70k5nhr01ql6rnvjg30d70k5nhr01ql6rnvjg3g';   // ← hier deinen Key

const BASE_URL = 'https://finnhub.io/api/v1';

const MAG7_SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA'];

export async function fetchMag7Data() {
  const results = [];

  for (const symbol of MAG7_SYMBOLS) {
    try {
      // Sequentiell laden → weniger Rate-Limit-Probleme
      const [quoteRes, profileRes] = await Promise.all([
        axios.get(`${BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`),
        axios.get(`${BASE_URL}/stock/profile2?symbol=${symbol}&token=${API_KEY}`)
      ]);

      const quote = quoteRes.data;
      const profile = profileRes.data;

      // Metrics versuchen (kann fehlschlagen → Fallback)
      let netIncomeTTM = '–';
      let grossMargin = '–';

      try {
        const metricRes = await axios.get(`${BASE_URL}/stock/metric?symbol=${symbol}&metric=all&token=${API_KEY}`);
        const m = metricRes.data.metric || {};

        if (m.netIncomeTTM || m.netIncome) {
          const income = (m.netIncomeTTM || m.netIncome) / 1_000_000_000;
          netIncomeTTM = income.toFixed(2) + ' Mrd $';
        }
        if (m.grossMargin) {
          grossMargin = (m.grossMargin * 100).toFixed(1) + '%';
        }
      } catch (e) {
        console.warn(`Metrics für ${symbol} nicht verfügbar (Free-Tier):`, e.message);
      }

      results.push({
        symbol,
        name: profile.name || symbol,
        logo: profile.logo || null,
        price: quote.c ? quote.c.toFixed(2) : '–',
        changePercent: quote.dp ? quote.dp.toFixed(2) : 0,
        netIncomeTTM,
        grossMargin,
      });
    } catch (err) {
      console.error(`Kompletter Fehler bei ${symbol}:`, err.response?.data || err.message);
      results.push({
        symbol,
        name: symbol,
        logo: null,
        price: '–',
        changePercent: 0,
        netIncomeTTM: '–',
        grossMargin: '–',
      });
    }

    // Kurze Pause zwischen den Symbolen (hilft gegen Rate-Limit)
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  return results;
}