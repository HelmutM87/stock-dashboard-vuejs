<template>
  <div class="card-container">
    <BaseCard v-for="company in companies" :key="company.symbol" :data="company" />
  </div>
</template>

<script>
import BaseCard from './BaseCard.vue';

export default {
  name: 'CompanyCards',
  components: { BaseCard },
  props: {
    companies: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  overflow-x: auto;
  padding: 24px;
  width: 100%;
}
</style>