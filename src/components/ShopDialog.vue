<template>
  <div class="shop-car-container" @click="openDialog">
    <ShoppingCartIcon class="shop-car" />
    <div v-if="totalOrder > 0" :key="totalOrder" class="badge-order">
      {{ totalOrder }}
    </div>
  </div>
  <Teleport to="body">
    <div v-if="isOpen" class="sh-overlay" @click="closeDialog">
      <div :class="animModal" @click.stop>
        <button class="close-btn" @click="closeDialog">×</button>
        <h1>Review your order.</h1>
        <div v-if="myOrder?.length" class="orders">
          <DrugCardOrder
            v-for="drugOrder in myOrder"
            :item="drugOrder"
            :key="drugOrder.id"
          />
          <div class="check-out-order">
            <p>Free Shipping</p>
            <div class="order-total">
              <p>Total:</p>
              <p>{{ myTotal.toFixed(5) }} BTC</p>
              <p>{{ transformBTCtoEUR(myTotal || 0) }}€</p>
            </div>
            <p class="b">Change BTC wallet</p>
            <p class="b">Change shipping address</p>
          </div>
          <div class="ck-btn">
            <div>
              <check-out-button />
            </div>
          </div>
        </div>
        <h2 v-else class="empty-msg">You dont have any drugs in your cart.</h2>
      </div>
    </div>
  </Teleport>
</template>
<script setup lang="ts">
import { ref, computed, type ComputedRef } from "vue";
import { ShoppingCartIcon } from "@heroicons/vue/16/solid";
import { useStore } from "vuex";
import { key } from "@/store";
import DrugCardOrder from "./DrugCardOrder.vue";
import { transformBTCtoEUR } from "@/utils/helper";
import CheckOutButton from "./UI/CheckOutButton.vue";

const store = useStore(key);
const myOrder = computed(() => store.state.moduleShopcart.items);
const totalOrder = computed(
  () => store.getters["moduleShopcart/itemCount"]
) as ComputedRef<number>;
const myTotal = computed(
  () => store.getters["moduleShopcart/cartTotal"]
) as ComputedRef<number>;

const isOpen = ref<boolean>(false);
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
.orders {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.shop-car-container {
  height: 100%;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 10px;

  &:hover .shop-car {
    transform: scale(1.1);
  }
}

.shop-car {
  height: 2.2rem;
  color: white;
  transition: transform 0.2s ease;
}

.badge-order {
  position: absolute;
  top: 5px;
  right: -2px;
  background-color: #00ffff;
  color: #000;
  font-weight: bold;
  font-size: 0.75rem;

  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 2px solid #0e0e0e;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.4);
  pointer-events: none;
}

.sh-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99999999; /*neot god pracitce ndeah*/
}

.modal-content {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 500px;
  max-width: 90vw;
  background-color: #0e0e0e;
  color: white;
  border-left: 0.13rem solid rgba(59, 104, 78, 0.474);
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
/*------------- */
.empty-msg {
  text-align: center;
  line-height: 2rem;
}
.check-out-order {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & .b {
    color: #2ab1d6;
  }
}
.order-total {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  & p:nth-of-type(1),
  & p:nth-of-type(2) {
    font-size: 1.8rem;
    font-weight: bold;
  }
  & p:nth-of-type(3),
  & p:nth-of-type(2) {
    justify-self: end;
  }
  & p:nth-of-type(3) {
    grid-column: 1/3;
  }
}
.ck-btn {
  display: flex;
  justify-content: center;

  /*Disgusting*/
  & > div {
    width: 45%;
    & > * {
      width: 100%;
    }
  }
}
</style>
