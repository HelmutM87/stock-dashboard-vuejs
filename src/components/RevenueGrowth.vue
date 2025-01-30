<!-- <template>
    <div class="chart-container">
      <h2>Revenue Growth in % YoY</h2>
      <canvas ref="chart"></canvas>
    </div>
  </template>
  
  <script>
import { ref, onMounted, nextTick } from 'vue';
import { Chart, CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend } from 'chart.js';  // Importiere benötigte Komponenten

// Registriere die notwendigen Komponenten
Chart.register(CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend);  // Hier wird die "linear"-Skala registriert

export default {
  name: 'RevenueGrowth',
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
                indexAxis: '', // Hier wird die Richtung der Balken geändert
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
  
   -->


   <template>
    <div class="chart-container">
      <h2>Revenue Growth in % YoY</h2>
      <canvas ref="chart"></canvas>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, nextTick } from 'vue';
  import { Chart, CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend } from 'chart.js';
  
  // Registriere die notwendigen Komponenten
  Chart.register(CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend);
  
  export default {
    name: 'RevenueGrowth',
    setup() {
      const chart = ref(null);
  
      onMounted(() => {
        nextTick(() => {
          if (chart.value) {
            try {
              new Chart(chart.value, {
                type: 'bar',
                data: {
                  labels: ['Apple', 'Microsoft', 'Google', 'Amazon', 'Tesla', 'Nvidia', 'Meta'],
                  datasets: [
                    {
                      label: 'Q1',
                      data: [5.2, 3.8, 4.1, 2.9, 3.2, 1.8, 2.5],
                      backgroundColor: '#39DAFF',
                    },
                    {
                      label: 'Q2',
                      data: [6.1, 4.2, 4.8, 3.1, 3.5, 2.1, 2.8],
                      backgroundColor: '#31BFE2',
                    },
                    {
                      label: 'Q3',
                      data: [5.8, 4.5, 4.9, 3.5, 3.7, 2.4, 3.0],
                      backgroundColor: '#29A5C5',
                    },
                    {
                      label: 'Q4',
                      data: [6.3, 4.9, 5.2, 3.8, 4.1, 2.7, 3.4],
                      backgroundColor: '#218AA8',
                    },
                  ],
                },
                options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  indexAxis: 'x', // Balken horizontal ausrichten
                  scales: {
                    x: {
                      beginAtZero: true,
                    },
                  },
                  plugins: {
                    legend: {
                      position: 'right', // Legende oben anzeigen
                    },
                    tooltip: {
                      enabled: true,
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
    max-width: 900px;
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
  