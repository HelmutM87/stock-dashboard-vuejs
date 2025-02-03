<!-- <template>
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
</style> -->


<template>
  <div class="chart-container">
    <h2 style="font-size: 20px;">Gross Margin in % LQ</h2>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue';
import { Chart, CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend } from 'chart.js';  // Importiere benötigte Komponenten
import stockData from '../stockData.json'; // Pfad zur JSON-Datei anpassen

// Registriere die notwendigen Komponenten
Chart.register(CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend);  // Hier wird die "linear"-Skala registriert

export default {
  name: 'GrossMargin',
  setup() {
    const chart = ref(null);
    const companies = stockData.companies;  // Holen der Firmen aus der JSON-Datei
    const labels = companies.map(company => company.name);  // Namen der Firmen als Labels
    const data = companies.map(company => company.netIncome);  // Net Income als Daten für das Diagramm

    onMounted(() => {
  nextTick(() => {
    if (chart.value) {
      try {
        new Chart(chart.value, {
          type: 'bar', // Balkendiagramm
          data: {
            labels,  // Die Firmen-Namen als Labels
            datasets: [
              {
                label: 'Gross Margin in % LQ',
                data,  // Die Net Income Daten
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
                ticks: {
                  color: 'white', // X-Achsen-Beschriftungen in Weiß
                },
                grid: {
                  color: '#9E9E9E', // Gitterlinien in #9E9E9E für X-Achse
                },
              },
              y: {
                ticks: {
                  color: 'white', // Y-Achsen-Beschriftungen in Weiß
                },
                grid: {
                  color: '#9E9E9E', // Gitterlinien in #9E9E9E für Y-Achse
                },
              },
            },
            plugins: {
              legend: {
                display: false,
                position: 'right',
                labels: {
                  color: 'white', // Legenden-Beschriftungen in Weiß
                },
              },
              tooltip: {
                enabled: true,
              },
              datalabels: {
                    color: 'white', // Farbe der Beschriftung
                    align: 'end', // Position der Beschriftung am Ende des Balkens
                    anchor: 'end', // Ankerpunkt der Beschriftung
                    font: {
                      size: 11,
                      weight: 'bold', // Schriftgewicht der Beschriftung
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
