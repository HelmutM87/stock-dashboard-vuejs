


<template>
<div class="headline">
  
    <h1>The Magnificant Seven Companies </h1>
</div>
  <div class="top-container">
    <!-- <BaseCard v-if="data" :data="data"> -->
    <CompanyCards>
    <!-- <pre>{{ data }}</pre> -->
    </CompanyCards>
  <!-- <p v-else>Lade Daten...</p> -->
  
  </div>

  <div class="middle-container">
<Last3YearsChart></Last3YearsChart>
  <BreakdownMagSeven></BreakdownMagSeven>
  </div>

  <div class="bottom-container">
    <NetIncome></NetIncome>
  <GrossMargin></GrossMargin>
  <RevenueGrowth></RevenueGrowth>
  </div>
  
</template>

<script>
// import BaseCard from './components/BaseCard.vue';
import CompanyCards from './components/CompanyCards.vue';
// import BaseCardAmazon from './components/BaseCard.vue';
// import BaseCardApple from './components/BaseCardApple.vue';
// import BaseCardGoogle from './components/BaseCardGoogle.vue';
// import BaseCardMeta from './components/BaseCardMeta.vue';
// import BaseCardMicrosoft from './components/BaseCardMicrosoft.vue';
// import BaseCardNvidia from './components/BaseCardNvidia.vue';
// import BaseCardTesla from './components/BaseCardTesla.vue';
import GrossMargin from './components/GrossMargin.vue';
import Last3YearsChart from './components/Last3YearsChart.vue';
import NetIncome from './components/NetIncome.vue';
import BreakdownMagSeven from './components/RevenueBreakdownMagnificantSeven.vue';
import RevenueGrowth from './components/RevenueGrowth.vue';
import { stockService } from './services/stockService';


export default {
  name: 'App',
  components: {
    CompanyCards,
    // BaseCard,
    // BaseCardApple,
    // BaseCardMeta,
    // BaseCardMicrosoft,
    // BaseCardAmazon,
    // BaseCardGoogle,
    // BaseCardTesla,
    // BaseCardNvidia,
    Last3YearsChart,
    BreakdownMagSeven,
    NetIncome,
    GrossMargin,
    RevenueGrowth
  },
  data() {
    return {
      data: null,
    };
  },
  async created() {
    try {
      this.data = await stockService();
      console.log('Daten:', this.data);
    } catch (error) {
      console.error('Fehler beim Abrufen der Daten:', error);
    }
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
  padding: 16px;
  box-sizing: border-box;
}

.card {
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
}

.top-container {
  max-width: 86vw;
  margin-bottom: 20px;
  background-color: #023A6233;
  display: flex;
  padding: 24px;
  border-radius: 20px;
  /* gap: 24px; */
}

.middle-container {
  max-width: 86vw;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.bottom-container {
  max-width: 86vw;
  display: flex;
  justify-content: space-between;
}

.headline {
  /* position: absolute; */
    /* top: 50px;
    left: 50px; */
}
</style>
