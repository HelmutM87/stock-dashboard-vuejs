<template>
    <div class="chart-container">
      <h2 style="font-size: 20px;">Revenue Growth in % YoY</h2>
      <canvas ref="chart"></canvas>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, nextTick } from 'vue';
  import {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    BarController,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
  // Falls du datalabels doch mal aktiviert hattest, stell sicher, dass du es hier NICHT importierst oder registrierst.
  import stockData from '../stockData.json';
  
  Chart.register(CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend);
  
  export default {
    name: 'RevenueGrowth',
    setup() {
      const chart = ref(null);
  
      onMounted(() => {
        nextTick(() => {
          if (chart.value) {
            try {
              const companies = stockData.companies;
              const labels = companies.map(company => company.name);
              const dataQ1 = companies.map(company => company.revenueGrowthYoY.Q1);
              const dataQ2 = companies.map(company => company.revenueGrowthYoY.Q2);
              const dataQ3 = companies.map(company => company.revenueGrowthYoY.Q3);
              const dataQ4 = companies.map(company => company.revenueGrowthYoY.Q4);
  
              new Chart(chart.value, {
                type: 'bar',
                data: {
                  labels,
                  datasets: [
                    { label: 'Q1', data: dataQ1, backgroundColor: '#39DAFF' },
                    { label: 'Q2', data: dataQ2, backgroundColor: '#31BFE2' },
                    { label: 'Q3', data: dataQ3, backgroundColor: '#29A5C5' },
                    { label: 'Q4', data: dataQ4, backgroundColor: '#218AA8' },
                  ],
                },
                options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  indexAxis: 'x',
                  scales: {
                    x: {
                      ticks: { color: 'white' },
                      grid: { display: false },
                    },
                    y: {
                      ticks: { color: 'white' },
                      grid: { color: '#9E9E9E' },
                    },
                  },
                  plugins: {
                    legend: {
                      position: 'right',
                      labels: { color: 'white' },
                    },
                    tooltip: { enabled: true },
                    // Stelle sicher, dass keine datalabels aktiv sind:
                    datalabels: { display: false }
                  },
                },
              });
            } catch (error) {
              console.error('Fehler bei der Diagramm-Erstellung:', error);
            }
          }
        });
      });
  
      return { chart };
    },
  };
  </script>
  
  <style scoped>
  .chart-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #011F35;
    border-radius: 16px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    color: white;
    height: 300px;
  }
  
  canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
  </style>
  