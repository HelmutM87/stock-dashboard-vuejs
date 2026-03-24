<template>
  <div class="card">
    <div class="company-name">
  <div class="logo-wrapper">
    <img 
      v-if="data.logo"
      :src="data.logo" 
      :alt="data.name + ' logo'" 
      class="company-logo"
      @error="handleLogoError"
    />
    <div v-else class="logo-placeholder">
      {{ data.symbol }}
    </div>
  </div>
  <h2>{{ data.name }}</h2>
</div>

    <!-- Aktueller Kurs + Veränderung -->
    <p style="font-size: 12px; margin: 8px 0 4px;">Aktueller Kurs</p>
    <div class="company-info">
      <div>
        <p class="price">${{ data.price }}</p>
      </div>
      <div>
        <p :class="parseFloat(data.changePercent) >= 0 ? 'positive' : 'negative'">
          {{ parseFloat(data.changePercent) >= 0 ? '+' : '' }}{{ data.changePercent }}%
          <span v-if="parseFloat(data.changePercent) >= 0">↑</span>
          <span v-else>↓</span>
        </p>
      </div>
    </div>

    <!-- Net Income TTM
    <p style="font-size: 12px; margin-top: 20px;">Net Income TTM</p>
    <p style="font-size: 24px; font-weight: 500;">{{ data.netIncomeTTM }}</p>

    Gross Margin 
    <p style="font-size: 12px; margin-top: 16px;">Gross Margin (TTM)</p>
    <p style="font-size: 20px; font-weight: 500;">{{ data.grossMargin }}</p> -->

    <p style="font-size: 10px; color: #888; margin-top: 12px;">
      Daten von Finnhub • Live aktualisiert
    </p>
  </div>
</template>

<script>
export default {
  name: 'BaseCard',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
  handleLogoError(e) {
    // Entferne das fehlerhafte img und zeige stattdessen den schönen CSS-Platzhalter
    e.target.style.display = 'none';
    e.target.parentElement.nextElementSibling.style.display = 'flex'; // falls nötig
    // Oder einfach den ganzen Wrapper auf Platzhalter umstellen – hier einfache Lösung:
    const wrapper = e.target.parentElement;
    wrapper.innerHTML = `<div class="logo-placeholder">${this.data.symbol}</div>`;
  }
}
};
</script>

<style scoped>
.card {
  background-color: #011F35;
  border-radius: 16px;
  padding: 24px;
  color: white;
  min-width: 280px;          /* sorgt für schöne Kartenbreite beim Scrollen */
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.company-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
  background: #023A62;
}

.company-name {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
}

h2 {
  font-size: 22px;
  margin: 0;
}

.price {
  font-size: 28px;
  font-weight: bold;
  margin: 0;
}

.company-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  margin-top: 4px;
}

.positive {
  color: #4CAF50;
  font-weight: 500;
}

.negative {
  color: #F44336;
  font-weight: 500;
}
.logo-placeholder {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #011F35, #023A62);
  border: 2px solid #39DAFF;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: bold;
  color: #39DAFF;
  flex-shrink: 0;
}

.logo-wrapper {
  width: 80px;
  height: 80px;
  position: relative;
  flex-shrink: 0;
}
</style>