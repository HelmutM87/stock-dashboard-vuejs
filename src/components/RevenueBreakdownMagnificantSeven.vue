<template>
    <div class="chart-container">
      <h2>Revenue Breakdown Magnificant Seven</h2>
      <canvas ref="chart"></canvas>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  
  export default {
    name: 'BreakdownMagSeven',
    props: {
      stockData: {
        type: Array,
        required: true,
      },
    },
    setup() {
      const chart = ref(null);
  
      onMounted(() => {
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
  