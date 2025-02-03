<template>
    <div class="card-container">
        <!-- Schleife über alle Firmen aus den stockData -->
        <BaseCard v-for="company in companies" :key="company.name" :data="company" />
    </div>
</template>

<script>
import stockData from '../stockData.json'; // Importiere die JSON-Daten
import BaseCard from './BaseCard.vue'; // Importiere die BaseCard-Komponente

export default {
    name: 'CompanyCards',
    components: {
        BaseCard,
    },
    data() {
        return {
            // Die Firmen werden aus dem JSON-Daten geladen
            companies: stockData.companies,
        };
    },
};
</script>

<style scoped>
.card-container {
    display: flex; /* Aktiviert Flexbox */
    flex-direction: row; /* Anordnung in einer Zeile */
    gap: 20px; /* Abstand zwischen den Karten */
    overflow-x: auto; /* Falls der Platz nicht ausreicht, kann gescrollt werden */
    white-space: nowrap; /* Verhindert Zeilenumbrüche */
    padding: 10px;
}

</style>