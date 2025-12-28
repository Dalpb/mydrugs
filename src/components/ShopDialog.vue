<template>
  <!--I could use <dialog>, i can't mk it work, forgrt it, it work-->
  <ShoppingCartIcon class="shop-car" @click="openDialog" />
  <dialog ref="dialog">
    <h1>Review your order.</h1>
    <button @click="closeDialog">Cerrar</button>
  </dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ShoppingCartIcon } from "@heroicons/vue/16/solid";
const dialog = ref<HTMLDialogElement | null>(null);

const openDialog = () => dialog.value?.showModal();
const closeDialog = () => dialog.value?.close();
const openShopcart = ref<boolean>(false);

const tooglePopUp = () => {
  openShopcart.value = !openShopcart.value;
};
</script>
<style lang="css">
.shop-car {
  height: 60%;
  cursor: pointer;
}
dialog {
  color: white;
  border-width: 0;
  border-left: 0.15rem;
  border-style: solid;
  border-color: rgba(59, 104, 78, 0.474);
  background-color: #0e0e0e;
  position: absolute;
  right: 0;
  top: 0;
}
dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.512);
}
</style>
