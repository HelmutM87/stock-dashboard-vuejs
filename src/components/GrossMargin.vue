<template>
  <div class="chart-container">
    <h2 style="font-size: 20px;">52-Week Range (USD)</h2>
    <canvas class="canvas" ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, watch, nextTick, onUnmounted } from 'vue';
import { Chart, CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend);

export default {
  name: 'FiftyTwoWeekChart',
  props: {
    companies: { type: Array, required: true },
  },
  setup(props) {
    const chartCanvas = ref(null);
    let chartInstance = null;

    const createChart = async () => {
      await nextTick();
      if (chartInstance) chartInstance.destroy();
      if (!chartCanvas.value) return;

      const labels = props.companies.map(c => c.symbol);

      const currentPrices = props.companies.map(c => parseFloat(c.price) || 0);
      const highs = props.companies.map(c => parseFloat(c.yearHigh) || 0);
      const lows = props.companies.map(c => parseFloat(c.yearLow) || 0);

      // Berechne prozentuale Position im Jahresrange (0% = Low, 100% = High)
      const rangePosition = props.companies.map((c, i) => {
        const high = highs[i];
        const low = lows[i];
        if (high === 0 || low === 0) return 50; // neutral wenn keine Daten
        const price = currentPrices[i];
        return ((price - low) / (high - low)) * 100;
      });

      chartInstance = new Chart(chartCanvas.value, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Position im 52-Week Range (%)',
            data: rangePosition,
            backgroundColor: '#39DAFF',
            borderColor: '#FFFFFF',
            borderWidth: 1,
            borderRadius: 8,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          scales: {
            x: { 
              beginAtZero: true,
              max: 100,
              ticks: { color: 'white', callback: v => v + '%' },
              grid: { color: '#9E9E9E' }
            },
            y: { ticks: { color: 'white' }, grid: { color: '#9E9E9E' } }
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => `Aktuell ${ctx.raw.toFixed(1)}% zwischen Low & High`
              }
            }
          }
        }
      });
    };

    onMounted(createChart);
    watch(() => props.companies, createChart, { deep: true });
    onUnmounted(() => { if (chartInstance) chartInstance.destroy(); });

    return { chartCanvas };
  }
};
</script>

<style scoped>
.chart-container {
  background-color: #011F35;
  border-radius: 16px;
  padding: 20px;
  color: white;
  height: 380px;
}

.canvas {
  width: 100% !important;
  height: 86% !important;
}
</style>