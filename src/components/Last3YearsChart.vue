<template>
  <div class="chart-container">
    <h2 style="font-size: 20px;">Revenue last 3 years</h2>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue';
import { Chart, Title, Tooltip, Legend, LineController, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';

// Registriere die notwendigen Chart.js Komponenten
Chart.register(Title, Tooltip, Legend, LineController, LineElement, PointElement, CategoryScale, LinearScale);

export default {
  name: 'Last3YearsChart',
  setup() {
    const chart = ref(null);
    const stockDataUrl = '/stockData.json';
    const colorPalette = [
      '#39DAFF', '#31BFE2', '#29A5C5', '#218AA8',
      '#196F8C', '#11546F', '#093A52'
    ];

    onMounted(async () => {
  try {
    const response = await fetch(stockDataUrl);
    const jsonData = await response.json();

    const labels = [
      'Q1 2022', 'Q2 2022', 'Q3 2022', 'Q4 2022',
      'Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023',
      'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'
    ];

    // 🎯 Daten umwandeln: Wandelt JSON-Daten in Chart.js Format um
    const datasets = jsonData.companies.map((company, index) => ({
      label: company.name,
      data: [
        company.revenue['2022'].Q1, company.revenue['2022'].Q2, company.revenue['2022'].Q3, company.revenue['2022'].Q4,
        company.revenue['2023'].Q1, company.revenue['2023'].Q2, company.revenue['2023'].Q3, company.revenue['2023'].Q4,
        company.revenue['2024'].Q1, company.revenue['2024'].Q2, company.revenue['2024'].Q3, company.revenue['2024'].Q4
      ],
      borderColor: 'white', // Weißer Rand
      borderWidth: 1,
      backgroundColor: colorPalette[index % colorPalette.length], // Farben als Hintergrund
      fill: true,
    }));

    nextTick(() => {
      if (chart.value) {
        new Chart(chart.value, {
          type: 'line',
          data: {
            labels,
            datasets
          },
          options: {
            responsive: true,
            scales: {
              x: {
                ticks: {
                  color: 'white', // Labels auf der X-Achse in Weiß
                },
                grid: {
                  color: '#9E9E9E', // Gitterlinien auf der X-Achse in #9E9E9E
                },
              },
              y: {
                ticks: {
                  color: 'white', // Labels auf der Y-Achse in Weiß
                },
                grid: {
                  color: '#9E9E9E', // Gitterlinien auf der Y-Achse in #9E9E9E
                },
              },
            },
            plugins: {
              legend: {
                display: true,
                position: 'right',
                labels: {
                  color: 'white', // Legenden-Beschriftung in Weiß
                },
              },
              tooltip: {
                enabled: true,
              },
            },
          },
        });
      }
    });

  } catch (error) {
    console.error('Fehler beim Laden der JSON-Daten:', error);
  }
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
  background-color: #011F35;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: white;
  height: 200px;
}
</style>
