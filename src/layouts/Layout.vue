<script setup  lang="ts">

import Header from '@components/Header.vue';

</script>
<template>
    <Header />
    <slot />
</template>
<style lang="css">
body{
  background-color: #0e0e0e;
  /* background-image:
  radial-gradient(rgba(255, 255, 255, 0.509) 0%, transparent 50%), 
  linear-gradient(to right, #9f6983,#9f6983); */
  margin:0;
  height: 100vh;
  max-height: 100vh;
}
body > div{
  height: 100%;
}
</style>