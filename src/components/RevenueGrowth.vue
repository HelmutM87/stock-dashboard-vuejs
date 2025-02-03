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
      <h2 style="font-size: 20px;">Revenue Growth in % YoY</h2>
      <canvas ref="chart"></canvas>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, nextTick } from 'vue';
  import { Chart, CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend } from 'chart.js';
  // Importiere die JSON-Daten
  import stockData from '../stockData.json'; // Passe den Pfad ggf. an
  
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
              // Extrahiere die relevanten Daten für das Diagramm
              const companies = stockData.companies;
              const labels = companies.map(company => company.name);
              const dataQ1 = companies.map(company => company.revenueGrowthYoY.Q1);
              const dataQ2 = companies.map(company => company.revenueGrowthYoY.Q2);
              const dataQ3 = companies.map(company => company.revenueGrowthYoY.Q3);
              const dataQ4 = companies.map(company => company.revenueGrowthYoY.Q4);
  
              // Erstelle das Diagramm
              new Chart(chart.value, {
                type: 'bar',
                data: {
                  labels: labels, // Firmennamen als Beschriftungen
                  datasets: [
                    {
                      label: 'Q1',
                      data: dataQ1,
                      backgroundColor: '#39DAFF',
                    },
                    {
                      label: 'Q2',
                      data: dataQ2,
                      backgroundColor: '#31BFE2',
                    },
                    {
                      label: 'Q3',
                      data: dataQ3,
                      backgroundColor: '#29A5C5',
                    },
                    {
                      label: 'Q4',
                      data: dataQ4,
                      backgroundColor: '#218AA8',
                    },
                  ],
                },
                options: {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'x',
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: 'white', // Achsen-Beschriftung auf Weiß setzen
        },
        grid: {
          // color: '#9E9E9E', // Gitterlinien auf Weiß setzen
        },
      },
      y: {
        ticks: {
          color: 'white', // Auch Y-Achsen-Beschriftung auf Weiß setzen
        },
        grid: {
          color: '#9E9E9E', // Gitterlinien auf Weiß setzen
        },
      },
    },
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: 'white', // Legenden-Beschriftung auf Weiß setzen
        },
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
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #011F35;
    border-radius: 16px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    color: white;
    height: 300px; /* Höhe des Diagramms angepasst */
  }
  
  canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
  
  </style>