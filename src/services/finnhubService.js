// src/services/finnhubService.js
import axios from 'axios';

const API_KEY = 'DEIN_FINNHUB_API_KEY'; // ← hier eintragen (oder .env nutzen)
const BASE_URL = 'https://finnhub.io/api/v1';

const MAG7 = [
  { symbol: 'AAPL', name: 'Apple', logo: 'https://logo.clearbit.com/apple.com' },
  { symbol: 'MSFT', name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com' },
  { symbol: 'GOOGL', name: 'Alphabet', logo: 'https://logo.clearbit.com/abc.xyz' },
  { symbol: 'AMZN', name: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com' },
  { symbol: 'NVDA', name: 'NVIDIA', logo: 'https://logo.clearbit.com/nvidia.com' },
  { symbol: 'META', name: 'Meta', logo: 'https://logo.clearbit.com/meta.com' },
  { symbol: 'TSLA', name: 'Tesla', logo: 'https://logo.clearbit.com/tesla.com' },
];

export async function fetchMag7Data() {
  const promises = MAG7.map(async (company) => {
    try {
      // 1. Aktueller Kurs + Change
      const quoteRes = await axios.get(`${BASE_URL}/quote?symbol=${company.symbol}&token=${API_KEY}`);
      const quote = quoteRes.data;

      // 2. Fundamentals (TTM + Margins etc.)
      const metricRes = await axios.get(`${BASE_URL}/stock/metric?symbol=${company.symbol}&metric=all&token=${API_KEY}`);
      const metrics = metricRes.data.metric || {};

      return {
        ...company,
        price: quote.c?.toFixed(2) || '–',
        changePercent: quote.dp?.toFixed(2) || 0,
        netIncomeTTM: metrics.netIncomeTTM ? (metrics.netIncomeTTM / 1e9).toFixed(2) + ' Mrd' : '–', // in Mrd. USD
        grossMargin: metrics.grossMargin ? (metrics.grossMargin * 100).toFixed(1) + '%' : '–',
        // Weitere Felder bei Bedarf: revenuePerShareTTM, operatingMargin etc.
      };
    } catch (err) {
      console.error(`Fehler bei ${company.symbol}:`, err);
      return { ...company, price: 'Error', changePercent: 0, netIncomeTTM: '–', grossMargin: '–' };
    }
  });

  return Promise.all(promises);
}

// Optional: Historische Finanzdaten für Charts (letzte Jahre/Quartale)
export async function fetchFinancials(symbol, freq = 'quarterly') {
  try {
    const res = await axios.get(`${BASE_URL}/stock/financials?symbol=${symbol}&statement=bs&freq=${freq}&token=${API_KEY}`);
    return res.data; // → .financialsArray enthält die Quartale/Jahre
  } catch (err) {
    console.error(err);
    return null;
  }
}