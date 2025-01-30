<template>
  <div class="chart-container">
    <h2>Gross Margin in % LQ</h2>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue';
import { Chart, CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend } from 'chart.js';  // Importiere benötigte Komponenten

// Registriere die notwendigen Komponenten
Chart.register(CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend);  // Hier wird die "linear"-Skala registriert

export default {
  name: 'GrossMargin',
  setup() {
    const chart = ref(null);



    onMounted(() => {
      nextTick(() => {
        if (chart.value) {
          try {
            new Chart(chart.value, {
              type: 'bar', // Balkendiagramm
              data: {
                labels: ['Apple', 'Microsoft', 'Google', 'Amazon', 'Tesla', 'Nvidia', 'Meta'],
                datasets: [
                  {
                    label: 'Gross Margin in % LQ',
                    data: ['62.62', '40.15', '39.50', '24.51', '26.25', '6.81', '3.16'],
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
                indexAxis: 'y', // Hier wird die Richtung der Balken geändert
                scales: {
                  x: {
                    beginAtZero: true, // Startet die X-Achse bei 0
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
  height: 200px;
}

canvas {
  display: block;
  width: 100%;
  height: 400px;
}
</style>