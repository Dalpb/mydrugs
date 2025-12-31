<template>
  <button class="btn checkout-btn">Check Out</button>
</template>
<script setup lang="ts">
import "@/styles/button.css";
</script>
<style lang="css">
.checkout-btn {
  height: 2.8rem;
  background-color: #5cb6d0;
  color: white;
  border-radius: 2rem;
  font-size: 1.5rem;
  font-weight: bolder;
  border: 0;
  text-transform: none;
  &:hover {
    background-color: #37dfdf;
  }
}
</style>
