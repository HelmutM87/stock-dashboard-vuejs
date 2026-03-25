<template>
  <div class="chart-container">
    <h2 style="font-size: 20px;">Net Income TTM (Mrd. USD)</h2>
    <canvas class="canvas" ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, watch, nextTick, onUnmounted } from 'vue';
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

Chart.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  BarController, 
  Title, 
  Tooltip, 
  Legend
);

export default {
  name: 'NetIncomeChart',
  props: {
    companies: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const chartCanvas = ref(null);
    let chartInstance = null;

    const createChart = async () => {
      await nextTick();

      if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
      }

      if (!chartCanvas.value) return;

      const labels = props.companies.map(c => c.symbol);

      const netIncomes = props.companies.map(c => {
        if (!c.netIncomeTTM || c.netIncomeTTM === '–') return 0;
        const num = parseFloat(c.netIncomeTTM.replace(' Mrd $', '').trim());
        return isNaN(num) ? 0 : num;
      });

      console.log('Net Income Rohdaten:', props.companies.map(c => c.netIncomeTTM));
      console.log('Net Income bereinigt:', netIncomes);

      chartInstance = new Chart(chartCanvas.value, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Net Income TTM (Mrd. USD)',
            data: netIncomes,
            backgroundColor: ['#39DAFF', '#31BFE2', '#29A5C5', '#218AA8', '#196F8C', '#11546F', '#093A52'],
            borderColor: '#FFFFFF',
            borderWidth: 1,
            borderRadius: 6,
          }]
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
                callback: value => value + ' Mrd $'
              },
              grid: { color: '#9E9E9E' }
            },
            y: { 
              ticks: { color: 'white' },
              grid: { color: '#9E9E9E' }
            }
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => ctx.raw + ' Mrd. USD'
              }
            }
          }
        }
      });
    };

    onMounted(createChart);
    watch(() => props.companies, createChart, { deep: true });

    onUnmounted(() => {
      if (chartInstance) chartInstance.destroy();
    });

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