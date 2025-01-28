

<template>
    <div class="card">
      <slot />
      <!-- <pre v-if="data">{{ data }}</pre> -->
      <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_11_196)">
<path d="M2 0H11.5238V9.52381H2V0Z" fill="#F35325"/>
<path d="M12.4762 0H22V9.52381H12.4762V0Z" fill="#81BC06"/>
<path d="M2 10.4762H11.5238V20H2V10.4762Z" fill="#05A6F0"/>
<path d="M12.4762 10.4762H22V20H12.4762V10.4762Z" fill="#FFBA08"/>
</g>
<defs>
<clipPath id="clip0_11_196">
<rect width="24" height="20" fill="white"/>
</clipPath>
</defs>
</svg>

      <h2>Microsoft</h2>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BaseCardMicrosoft',
    props: {
      data: {
        type: Object,
        required: false,
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
  }
  </style>
  