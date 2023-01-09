<template>
    <div class="home">
        <features />
    </div>
  </template>

  <script>
  import Features from '../../components/main/Features.vue';

  export default {
    name: 'Home',
    data() {
      return {
        pageTitle: 'Home',
      }
    },
    components: {
    Features,
  },
  }
  </script>
