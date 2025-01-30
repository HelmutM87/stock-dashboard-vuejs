<template>
  <div class="chart-container">
    <h2>Revenue Breakdown Magnificant Seven</h2>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue';
import { Chart, Title, Tooltip, Legend, ArcElement, DoughnutController } from 'chart.js';

// 🔹 WICHTIG: Registriere den DoughnutController!
Chart.register(Title, Tooltip, Legend, ArcElement, DoughnutController);

export default {
  name: 'BreakdownMagnificantSeven',
  setup() {
    const chart = ref(null);

    onMounted(() => {
      nextTick(() => {
        if (chart.value) {
          try {
            new Chart(chart.value, {
              type: 'doughnut', // 🔹 Jetzt wird der Typ richtig erkannt
              data: {
                labels: ['Apple', 'Microsoft', 'Google', 'Amazon', 'Tesla', 'Nvidia', 'Meta'],
                datasets: [
                  {
                    label: 'Net Income TTM (in Mrd. $)',
                    data: [62.62, 40.15, 39.50, 24.51, 26.25, 6.81, 3.16],
                    backgroundColor: [
                      '#39DAFF', '#31BFE2', '#29A5C5', '#218AA8',
                      '#196F8C', '#11546F', '#093A52'
                    ],
                    borderColor: '#FFFFFF',
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                  },
                  tooltip: {
                    enabled: true,
                    callbacks: {
                      label: function (tooltipItem) {
                        let value = tooltipItem.raw;
                        return ` ${value} Mrd. $`;
                      },
                    },
                  },
                },
              },
            });
          } catch (error) {
            console.error('Fehler bei der Diagramm-Erstellung:', error);
          }
        } else {
          console.error('Canvas-Element wurde nicht gefunden');
        }
      });
    });

    return {
      chart,
    };
  },
};
</script>

<style scoped>
.chart-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #011F35;
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
