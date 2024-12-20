<script setup lang="ts">
import Header from '@components/Header.vue';
</script>
<template>
    <Header />
    <slot />
</template>

<style lang="css">
body{
  background-color: #0e0e0e;
  margin:0;
  height: 100vh;
  max-height: 100vh;
}
body > div{
  height: 100%;
}
</style>