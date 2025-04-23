<template>
  <div class="chart-container">
    <h2 style="font-size: 20px;">Revenue last 3 years</h2>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue';
import stockData from '../stockData.json'; // JSON import
import {
  Chart,
  Title,
  Tooltip,
  Legend,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

// Registriere Chart.js-Komponenten
Chart.register(
  Title,
  Tooltip,
  Legend,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

export default {
  name: 'Last3YearsChart',
  setup() {
    const chart = ref(null);

    onMounted(async () => {
      // verwende direkt importierte Daten
      const companies = stockData.companies;
      const years = ['2022', '2023', '2024'];

      // baue Labels Q1–Q4 pro Jahr
      const labels = [];
      years.forEach((y) => {
        ['Q1', 'Q2', 'Q3', 'Q4'].forEach((q) => labels.push(`${q} ${y}`));
      });

      // Farbschema
      const colorPalette = [
        '#39DAFF', '#31BFE2', '#29A5C5', '#218AA8',
        '#196F8C', '#11546F', '#093A52'
      ];

      // Datasets pro Firma
      const datasets = companies.map((c, i) => ({
        label: c.name,
        data: years.flatMap((y) =>
          ['Q1', 'Q2', 'Q3', 'Q4'].map((q) => c.revenue[y][q])
        ),
        borderColor: 'white',
        borderWidth: 2,
        backgroundColor: colorPalette[i % colorPalette.length],
        fill: false
      }));

      await nextTick();
      if (!chart.value) return;

      new Chart(chart.value, {
        type: 'line',
        data: { labels, datasets },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              ticks: { color: 'white' },
              grid: { color: '#9E9E9E' }
            },
            y: {
              beginAtZero: true,
              ticks: { color: 'white' },
              grid: { color: '#9E9E9E' }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'right',
              labels: { color: 'white' }
            },
            tooltip: { enabled: true },
            datalabels: { display: false }
          }
        }
      });
    });

    return { chart };
  }
};
</script>

<style scoped>
.chart-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #011f35;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: white;
  height: 400px;
}
canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
