// src/services/finnhubService.js
import axios from 'axios';

const API_KEY = 'd70k5nhr01ql6rnvjg30d70k5nhr01ql6rnvjg3g';   // ← hier deinen Key

const BASE_URL = 'https://finnhub.io/api/v1';

const MAG7_SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA'];

export async function fetchMag7Data() {
    const results = [];

    for (const symbol of MAG7_SYMBOLS) {
        try {
            // Drei Calls parallel, aber mit Fallback
            const [quoteRes, profileRes] = await Promise.all([
                axios.get(`${BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`),
                axios.get(`${BASE_URL}/stock/profile2?symbol=${symbol}&token=${API_KEY}`)
            ]);

            const quote = quoteRes.data;
            const profile = profileRes.data;

            let marketCap = '–';

            // Beste Quelle: quote.mc (Market Cap direkt aus dem Quote)
            if (quote.mc && quote.mc > 0) {
                marketCap = (quote.mc / 1_000_000_000).toFixed(0) + ' Mrd $';
            }
            // Fallback 1: aus Metric
            else {
                try {
                    const metricRes = await axios.get(`${BASE_URL}/stock/metric?symbol=${symbol}&metric=all&token=${API_KEY}`);
                    const m = metricRes.data.metric || {};
                    if (m.marketCapitalization && m.marketCapitalization > 0) {
                        marketCap = (m.marketCapitalization / 1_000_000_000).toFixed(0) + ' Mrd $';
                    }
                } catch (e) {
                    console.warn(`Metric-Call für MarketCap fehlgeschlagen bei ${symbol}`);
                }
            }

                  // Metrics (Net Income TTM, Gross Margin, etc.)
      let netIncomeTTM = '–';
      let grossMargin = '–';

      try {
        const metricRes = await axios.get(`${BASE_URL}/stock/metric?symbol=${symbol}&metric=all&token=${API_KEY}`);
        const m = metricRes.data.metric || {};

        // Net Income TTM – mehrere mögliche Feldnamen abdecken
        if (m.netIncomeTTM) {
          netIncomeTTM = (m.netIncomeTTM / 1_000_000_000).toFixed(2) + ' Mrd $';
        } else if (m.netIncome) {
          netIncomeTTM = (m.netIncome / 1_000_000_000).toFixed(2) + ' Mrd $';
        }

        if (m.grossMargin) {
          grossMargin = (m.grossMargin * 100).toFixed(1) + '%';
        }
      } catch (e) {
        console.warn(`Metrics für ${symbol} nicht verfügbar:`, e.message);
      }

            results.push({
                symbol,
                name: profile.name || symbol,
                logo: profile.logo || null,
                price: quote.c ? quote.c.toFixed(2) : '–',
                changePercent: quote.dp ? quote.dp.toFixed(2) : 0,
                yearHigh: quote.h ? quote.h.toFixed(2) : '–',
                yearLow: quote.l ? quote.l.toFixed(2) : '–',
                netIncomeTTM,
                grossMargin,
                marketCap,          // ← sollte jetzt bessere Werte haben
            });
        } catch (err) {
            console.error(`Fehler bei ${symbol}:`, err.message);
            results.push({
                symbol,
                name: symbol,
                logo: null,
                price: '–',
                changePercent: 0,
                netIncomeTTM: '–',
                grossMargin: '–',
                marketCap: '–',
            });
        }

        await new Promise(resolve => setTimeout(resolve, 400));
    }

    return results;
}

// === NEUE FUNKTION FÜR CHARTS ===
export async function fetchFinancials(symbol) {
    try {
        // quarterly = letztes Jahr + aktuelles
        const res = await axios.get(
            `${BASE_URL}/stock/financials?symbol=${symbol}&statement=is&freq=quarterly&token=${API_KEY}`
        );
        return res.data.financials || [];   // Array mit Quartalen
    } catch (err) {
        console.warn(`Financials für ${symbol} nicht verfügbar:`, err.message);
        return [];
    }
}

// Hilfsfunktion: Letzte 4 Quartale Revenue + Net Income extrahieren
export function extractLastQuarters(financials) {
    if (!financials || financials.length === 0) return [];

    return financials.slice(0, 8).map(item => ({   // max 8 Quartale
        period: item.period || 'Unknown',
        revenue: item.totalRevenue ? item.totalRevenue / 1_000_000_000 : 0,     // in Mrd. $
        netIncome: item.netIncome ? item.netIncome / 1_000_000_000 : 0
    })).reverse(); // ältestes zuerst
}