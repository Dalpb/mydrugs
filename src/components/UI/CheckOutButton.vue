<template>
  <button class="btn checkout-btn" @click="playBtnSound"><slot /></button>
</template>
<script setup lang="ts">
import "@/styles/button.css";
import { playBtnSound } from "@/utils/sound";
</script>
<style lang="css">
.checkout-btn {
  height: 2.8rem;
  background-color: #5cb6d0;
  color: white;
  width: 100%;
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
