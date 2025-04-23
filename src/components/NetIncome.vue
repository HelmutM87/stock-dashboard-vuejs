<template>
  <div class="chart-container">
    <h2 style="font-size: 20px;">Net Income TTM</h2>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue';
import { Chart, CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import stockData from '../stockData.json';

Chart.register(CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend, ChartDataLabels);

export default {
  name: 'NetIncome',
  setup() {
    const chart = ref(null);
    const colorPalette = ['#39DAFF', '#31BFE2', '#29A5C5', '#218AA8', '#196F8C', '#11546F', '#093A52'];

    onMounted(() => {
      const labels = stockData.companies.map(company => company.name);
      const netIncomeData = stockData.companies.map(company => company.netIncome);

      nextTick(() => {
        if (chart.value) {
          new Chart(chart.value, {
            type: 'bar',
            data: {
              labels,
              datasets: [
                {
                  label: 'Net Income TTM',
                  data: netIncomeData,
                  backgroundColor: colorPalette.slice(0, labels.length),
                  borderColor: '#FFFFFF',
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              indexAxis: 'y',
              scales: {
                x: {
                  beginAtZero: true,
                  ticks: {
                    color: 'white',
                  },
                  grid: {
                    color: '#9E9E9E',
                  },
                },
                y: {
                  ticks: {
                    color: 'white',
                  },
                  grid: {
                    color: '#9E9E9E',
                  },
                },
              },
              plugins: {
                legend: {
                  display: false,
                  position: 'right',
                  labels: {
                    color: 'white',
                  },
                },
                tooltip: {
                  enabled: true,
                },
                datalabels: {
                  color: 'white',
                  align: 'end',
                  anchor: 'end',
                  font: {
                    size: 11,
                    weight: 'bold',
                  },
                },
              },
            },
          });
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
  height: 200px;
}
</style>
