<template>
  <div class="headline">
    <div class="rectangle"></div>
    <h1>The Magnificent Seven Companies</h1>
    <button @click="refreshData" class="refresh-btn">
      <i class="fas fa-sync-alt"></i> Aktualisieren
    </button>
  </div>

  <div class="container" :class="{ loading: loading }">
    <div v-if="loading" class="loading-overlay">Lade Live-Daten von Finnhub...</div>

    <div class="top-container">
      <CompanyCards :companies="companies" />
    </div>

    <div class="middle-container">
      <Last3YearsChart :companies="companies" /> <!-- muss noch angepasst werden -->
      <!-- Breakdown vorerst auskommentiert oder statisch halten -->
      <!-- <BreakdownMagSeven :companies="companies" /> -->
    </div>

    <div class="bottom-container">
      <NetIncome :companies="companies" />
      <GrossMargin :companies="companies" />
      <!-- RevenueGrowth muss YoY aus historischen Daten berechnet werden -->
    </div>
  </div>
</template>

<script>
import CompanyCards from './components/CompanyCards.vue';
import GrossMargin from './components/GrossMargin.vue';
import Last3YearsChart from './components/Last3YearsChart.vue';
import NetIncome from './components/NetIncome.vue';
// import BreakdownMagSeven from './components/RevenueBreakdownMagnificantSeven.vue';

import { fetchMag7Data } from './services/finnhubService';

export default {
  name: 'App',
  components: {
    CompanyCards,
    Last3YearsChart,
    // BreakdownMagSeven,
    NetIncome,
    GrossMargin,
    // RevenueGrowth
  },
  data() {
    return {
      companies: [],
      loading: false,
    };
  },
  async created() {
    await this.refreshData();
  },
  methods: {
    async refreshData() {
      this.loading = true;
      try {
        this.companies = await fetchMag7Data();
      } catch (err) {
        console.error('Refresh fehlgeschlagen', err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
body {
  margin: 0;
  background: radial-gradient(71.11% 100% at 50% 0%, #020204 14.6%, #011F35 100%);
  font-family: rubik, sans-serif;
  color: white;
}

#app {
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
  padding: 148px 16px 16px 16px;
  box-sizing: border-box;
}

.card {
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
}

.container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
  max-width: 1440px;
  width: 98%;
  padding: 0px 16px 16px 16px;
  box-sizing: border-box;
  gap: 24px;
}

.top-container {
  /* top: 100px; */
  /* max-width: 86vw; */
  /* margin-bottom: 20px; */
  background-color: #023A6233;
  display: flex;
  justify-content: center;
  width: 100%;
  /* padding: 24px; */
  border-radius: 20px;
  /* gap: 24px; */
}

.middle-container {
  /* max-width: 86vw; */
  display: flex;
  justify-content: space-between;
  /* margin-bottom: 20px; */
  width: 100%;
  gap: 24px;
}

.bottom-container {
  /* max-width: 86vw; */
  display: flex;
  justify-content: space-between;
  gap: 24px;
  height: 400px;
}

.headline {
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  z-index: 10;
}

.refresh-btn {
  background: #39DAFF33;
  border: 1px solid #39DAFF;
  color: #39DAFF;
  padding: 8px 16px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}

.refresh-btn:hover {
  background: #39DAFF66;
}

.loading-overlay {
  position: absolute;
  inset: 0;
  background: rgba(1, 31, 53, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #39DAFF;
  font-size: 1.3rem;
  z-index: 5;
  border-radius: 20px;
}

.loading .top-container,
.loading .middle-container,
.loading .bottom-container {
  filter: blur(4px);
}

.rectangle {
  width: 96px;
  height: 32px;
  background-color: #39DAFF;
  border-radius: 0 20px 20px 0;
  
  /* margin-bottom: 20px; */
}

@media (max-width: 1030px) {
  .middle-container {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
