<!-- <template>
    <div class="card">
      <div class="company-name">
      <img :src="data.logo" :alt="data.name + ' logo'" class="company-logo" />
      
      <h2>{{ data.name }}</h2>
      </div>
      
<p>Revenue Q4 2024</p>
  
<div class="company-info">
  <div>
     <p> {{ data.netIncome }}</p>
  </div>    
 
  <div>
    <p>+ 4.22 ↑</p>
    <p> {{ data.revenueGrowthYoY.Q4 }}%</p>
  </div>
   
      
</div>
      
      
      <p>In Bill USD</p>
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
  };
  </script>
  
  <style scoped>
  .card {
    background-color: #011F35;
    border-radius: 16px;
    padding: 20px 32px;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .company-logo {
    max-width: 100px;
    
  }
  
  h2 {
    font-size: 24px;
    margin: 16px 0;
  }
  
  p {
    margin: 8px 0;
    font-size: 14px;
    color: #dcdcdc;
  }

  .company-name {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .company-info {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  </style>
   -->



<!--    
   <template>
    <div class="card">
      <div class="company-name">
        <img :src="data.logo" :alt="data.name + ' logo'" class="company-logo" />
        
        <h2>{{ data.name }}</h2>
      </div>
  
      <p>Revenue Q4 2024</p>
    
      <div class="company-info">
        <div>
          <p style="font-size: 24px; font-weight: 500;">{{ data.revenue["2024"].Q4 }} </p>
        </div>    
  
        <div>
          <p :class="changePercentage >= 0 ? 'positive' : 'negative'">
            {{ changePercentage >= 0 ? '+' : '' }}{{ changePercentage.toFixed(2) }}%
            <span v-if="changePercentage >= 0">↑</span>
            <span v-else>↓</span>
          </p>
        </div>
      </div>
      
      <p>In Bill USD</p>
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
    computed: {
      changePercentage() {
        let lastQuarterRevenue = this.data.revenue["2024"].Q4;
        let previousQuarterRevenue = this.data.revenue["2024"].Q3;
        let change = ((lastQuarterRevenue - previousQuarterRevenue) / previousQuarterRevenue) * 100;
        return change;
      }
    }
  };
  </script>
  
  <style scoped>
  .card {
    background-color: #011F35;
    border-radius: 16px;
    padding: 20px 32px;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .company-logo {
    max-width: 100px;
  }
  
  h2 {
    font-size: 24px;
    margin: 16px 0;
  }
  
  p {
    margin: 8px 0;
    font-size: 14px;
    color: #dcdcdc;
  }
  
  .company-name {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  
  .company-info {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  
  .positive {
    color: #4CAF50; /* Grün */
  }
  
  .negative {
    color: #F44336; /* Rot */
  }

  </style>
   -->


   <template>
    <div class="card">
      <div class="company-name">
        <!-- Logo der Firma -->
        <img :src="data.logo" :alt="data.name + ' logo'" class="company-logo" />
        
        <!-- Firmenname -->
        <h2 style="font-size: 20px;">{{ data.name }}</h2>
      </div>
  
      <p style="font-size: 12px;">Revenue Q4 2024</p>
    
      <div class="company-info">
        <!-- Net Income -->
        <div>
          <p  style="font-size: 24px; font-weight: 500;">{{ data.netIncome }}</p>
        </div>    
  
        <!-- Veränderung zum vorherigen Quartal -->
        <div>
          <p :class="changeAbsolute >= 0 ? 'positive' : 'negative'">
            {{ changeAbsolute >= 0 ? '+' : '' }}{{ changeAbsolute.toFixed(2) }}
            <span v-if="changeAbsolute >= 0">↑</span>
            <span v-else>↓</span>
          </p>
          <p :class="changePercentage >= 0 ? 'positive' : 'negative'">
            {{ changePercentage.toFixed(2) }}%
          </p>
        </div>
      </div>
      
      <p style="font-size: 8px;">In Bill USD</p>
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
    computed: {
      lastQuarterRevenue() {
        return this.data.revenue["2024"].Q4;
      },
      previousQuarterRevenue() {
        return this.data.revenue["2024"].Q3;
      },
      changeAbsolute() {
        return this.lastQuarterRevenue - this.previousQuarterRevenue;
      },
      changePercentage() {
        return ((this.changeAbsolute / this.previousQuarterRevenue) * 100);
      }
    }
  };
  </script>
  
  <style scoped>
  .card {
    background-color: #011F35;
    border-radius: 16px;
    padding: 20px 24px;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .company-logo {
    max-width: 100px;
  }
  
  h2 {
    font-size: 24px;
    margin: 16px 0;
  }
  
  p {
    margin:  0;
    font-size: 14px;
    color: #dcdcdc;
  }
  
  .company-name {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  
  .company-info {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 8px;
  }
  
  .positive {
    color: #4CAF50; /* Grün */
  }
  
  .negative {
    color: #F44336; /* Rot */
  }
  </style>
  