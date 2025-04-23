<template>
  <div class="chart-container">
    <h2 style="font-size: 20px;">Revenue Breakdown Magnificant Seven</h2>
    <canvas ref="chart"></canvas>
    <div class="labels-container">
      <div v-for="(company, index) in companies" :key="index" class="label-item">
        <span>{{ company.name }}</span> - <span>{{ company.netIncome }} Mrd. $</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue';
// Importiere die stockData.json
import stockData from '../stockData.json';
import { Chart, Title, Tooltip, Legend, ArcElement, DoughnutController } from 'chart.js';

// 🔹 WICHTIG: Registriere den DoughnutController!
Chart.register(Title, Tooltip, Legend, ArcElement, DoughnutController);

export default {
  name: 'BreakdownMagnificantSeven',
  setup() {
    const chart = ref(null);
    const companies = stockData.companies;  // Hier speichern wir die Unternehmensdaten

    onMounted(() => {
      nextTick(() => {
        if (chart.value) {
          try {
            // Extrahiere die Daten aus stockData
            const labels = companies.map(company => company.name);
            const data = companies.map(company => company.netIncome);
            const backgroundColor = [
              '#39DAFF', '#31BFE2', '#29A5C5', '#218AA8',
              '#196F8C', '#11546F', '#093A52'
            ];

            // Erstelle das Diagramm
            new Chart(chart.value, {
              type: 'doughnut',
              data: {
                labels: labels,
                datasets: [
                  {
                    label: 'Net Income TTM (in Mrd. $)',
                    data: data,
                    backgroundColor: backgroundColor,
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
                    labels: {
                      color: 'white', // Setzt die Legenden-Beschriftungen auf Weiß
                    },
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
      companies,
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
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.labels-container {
  margin-top: 20px;
  color: white;
}

.label-item {
  margin-bottom: 5px;
}
</style>
