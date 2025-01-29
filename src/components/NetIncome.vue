<!-- <template>
  <div class="chart-container">
    <h2>Net Income TTM</h2>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue';
import { Chart } from 'chart.js'; // Importiere Chart.js

export default {
  name: 'NetIncome',
  setup() {
    const chart = ref(null); // Ref für das Canvas-Element

    // Zufällige Daten generieren
    const generateRandomData = () => {
      const data = Array.from({ length: 7 }, () => Math.floor(Math.random() * 1000000)); // Zufallszahlen für 7 Firmen
      console.log('Generierte Zufallsdaten:', data);  // Log für generierte Daten
      return data;
    };

    // Warten, bis der DOM vollständig gerendert ist
    onMounted(() => {
      console.log('Komponente geladen, onMounted ausgelöst');
      
      nextTick(() => {
        console.log('nextTick aufgerufen');
        
        if (chart.value) {
          console.log('Canvas-Element gefunden:', chart.value); // Log für das Canvas-Element
          
          // Erstelle das Diagramm, sobald die Komponente geladen ist
          try {
            new Chart(chart.value, {
              type: 'bar', // Balkendiagramm
              data: {
                labels: ['Apple', 'Microsoft', 'Google', 'Amazon', 'Tesla', 'Nvidia', 'Meta'], // Namen der Firmen
                datasets: [
                  {
                    label: 'Net Income TTM', // Bezeichnung des Diagramms
                    data: generateRandomData(), // Die zufälligen Daten
                    backgroundColor: '#011F35', // Balkenfarbe
                    borderColor: '#388E3C', // Balkenrandfarbe
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true, // Startet die Y-Achse bei 0
                  },
                },
              },
            });
            console.log('Diagramm erfolgreich erstellt!');
          } catch (error) {
            console.error('Fehler bei der Diagramm-Erstellung:', error); // Fehlerbehandlung
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
  height: 300px;
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
  background-color: aliceblue;
}
</style> -->

<template>
  <div class="chart-container">
    <h2>Net Income TTM</h2>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>

import { ref, onMounted, nextTick } from 'vue';
import { Chart, CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend } from 'chart.js';  // Importiere benötigte Komponenten

// Registriere die notwendigen Komponenten
Chart.register(CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend);  // Hier wird die "linear"-Skala registriert

export default {
  name: 'NetIncome',
  setup() {
    const chart = ref(null);  // Ref für das Canvas-Element

    // Zufällige Daten generieren
    const generateRandomData = () => {
      const data = Array.from({ length: 7 }, () => Math.floor(Math.random() * 1000000)); // Zufallszahlen für 7 Firmen
      console.log('Generierte Zufallsdaten:', data);  // Log für generierte Daten
      return data;
    };

    // Warten, bis der DOM vollständig gerendert ist
    onMounted(() => {
      console.log('Komponente geladen, onMounted ausgelöst');
      
      nextTick(() => {
        console.log('nextTick aufgerufen');
        
        if (chart.value) {
          console.log('Canvas-Element gefunden:', chart.value); // Log für das Canvas-Element
          
          // Erstelle das Diagramm, sobald die Komponente geladen ist
          try {
            new Chart(chart.value, {
              type: 'bar', // Balkendiagramm
              data: {
                labels: ['Apple', 'Microsoft', 'Google', 'Amazon', 'Tesla', 'Nvidia', 'Meta'], // Namen der Firmen
                datasets: [
                  {
                    label: 'Net Income TTM', // Bezeichnung des Diagramms
                    data: generateRandomData(), // Die zufälligen Daten
                    backgroundColor: '#011F35', // Balkenfarbe
                    borderColor: '#388E3C', // Balkenrandfarbe
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true, // Startet die Y-Achse bei 0
                  },
                },
              },
            });
            console.log('Diagramm erfolgreich erstellt!');
          } catch (error) {
            console.error('Fehler bei der Diagramm-Erstellung:', error); // Fehlerbehandlung
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
  height: 300px;
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
  background-color: aliceblue;
}
</style>