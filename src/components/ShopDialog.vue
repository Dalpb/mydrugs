<template>
  <ShoppingCartIcon class="shop-car" @click="openDialog" />
  <Teleport to="body">
    <div v-if="isOpen" class="sh-overlay" @click="closeDialog">
      <div :class="animModal" @click.stop>
        <button class="close-btn" @click="closeDialog">×</button>
        <h1>Review your order.</h1>
        <p>Contenido del carrito aquí...</p>
      </div>
    </div>
  </Teleport>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ShoppingCartIcon } from "@heroicons/vue/16/solid";

const isOpen = ref<boolean>(false);
const isClosing = ref<boolean>(false);
const animModal = ref("modal-content");
const openDialog = () => (isOpen.value = true);
const closeDialog = () => {
  animModal.value += " close-anim";
  setTimeout(() => {
    isOpen.value = false;
    animModal.value = "modal-content";
  }, 400);
};
</script>
<style lang="css" scoped>
.shop-car {
  height: 60%;
  cursor: pointer;
}

.sh-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99999999;
}

.modal-content {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 400px;
  max-width: 90vw;
  background-color: #0e0e0e;
  color: white;
  border-left: 0.15rem solid rgba(59, 104, 78, 0.474);
  padding: 2rem 1.5rem;
  overflow-y: auto;
  animation: slideIn 0.4s ease-out;
}
.close-anim {
  animation: slideOut 0.4s ease-out forwards;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  padding: 0;
  width: 2rem;
  height: 2rem;
  line-height: 1;

  &::hover {
    opacity: 0.7;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes slideOut {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}
</style>
