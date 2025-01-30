<template>
  <div class="chart-container">
    <h2>Revenue last 3 years</h2>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue';
import { Chart, Title, Tooltip, Legend, LineController, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';

// Registriere die notwendigen Komponenten für ein Liniendiagramm
Chart.register(Title, Tooltip, Legend, LineController, LineElement, PointElement, CategoryScale, LinearScale);

export default {
  name: 'Laste3YearsChart',
  setup() {
    const chart = ref(null);

    onMounted(() => {
      nextTick(() => {
        if (chart.value) {
          try {
            new Chart(chart.value, {
             
type: 'line', // ✅ Richtiger Typ (in Kleinbuchstaben)
              
                data: {
  labels: [
    'Q1 2021', 'Q2 2021', 'Q3 2021', 'Q4 2021',
    'Q1 2022', 'Q2 2022', 'Q3 2022', 'Q4 2022',
    'Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023'
  ],
  datasets: [
    {
      label: 'Apple',
      data: [90, 95, 100, 95, 100, 105, 110, 105, 110, 115, 120, 115],
      borderColor: '#FFFFFF',
      borderWidth: 1,
      backgroundColor: '#39DAFF',
      fill: true,
    },
    {
      label: 'Microsoft',
      data: [40, 42, 45, 43, 46, 48, 50, 49, 52, 54, 56, 55],
      borderColor: '#FFFFFF',
      borderWidth: 1,
      backgroundColor: '#31BFE2',
      fill: true,
    },
    {
      label: 'Google',
      data: [60, 65, 70, 68, 72, 75, 78, 76, 80, 83, 86, 84],
      borderColor: '#FFFFFF',
      borderWidth: 1,
      backgroundColor: '#29A5C5',
      fill: true,
    },
    {
      label: 'Amazon',
      data: [110, 115, 120, 118, 122, 125, 130, 128, 135, 138, 142, 140],
      borderColor: '#FFFFFF',
      borderWidth: 1,
      backgroundColor: '#218AA8',
      fill: true,
    },
    {
      label: 'Meta',
      data: [25, 28, 30, 29, 32, 34, 36, 35, 38, 40, 42, 41],
      borderColor: '#FFFFFF',
      borderWidth: 1,
      backgroundColor: '#196F8C',
      fill: true,
    },
    {
      label: 'Tesla',
      data: [15, 18, 20, 19, 22, 25, 27, 26, 28, 30, 32, 31],
      borderColor: '#FFFFFF',
      borderWidth: 1,
      backgroundColor: '#11546F',
      fill: true,
    },
    {
      label: 'Nvidia',
      data: [12, 14, 16, 15, 18, 20, 22, 21, 24, 26, 28, 27],
      borderColor: '#FFFFFF',
      borderWidth: 1,
      backgroundColor: '#093A52',
      fill: true,
    }
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
                        return `${tooltipItem.raw} Mrd. $`;
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Year',
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'In Billion USD',
                    },
                    beginAtZero: true,
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
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #011F35;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: white;
  height: 400px;
  border-color: white;
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
  color: white;
  border-color: white;
}
</style>
