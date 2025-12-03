<script setup lang="ts">
import { ref } from "vue";
import MinusIcon from "./minusIcon.vue";
import PlusIcon from "./plusIcon.vue";
import CheckOutButton from "./UI/CheckOutButton.vue";

const quantity = ref<number>(0);

const handleUpperQuantity = () => {
  quantity.value++;
};
const handleLowerQuantity = () => {
  if (quantity.value - 1 < 0) return;
  quantity.value--;
};
</script>

<template>
  <div class="card">
    <div class="card-head">Buy Now</div>
    <div class="card-body">
      <div>
        <p>
          Guaranteed delivery within 4 business days. Choose premium delivery at
          checkout for faster shipping options.
        </p>
      </div>
      <div>
        <p>Free shipping standards.</p>
        <p>Learn more about our returns & refunds.</p>
        <p>In stock</p>
      </div>
      <div class="quantity_shop">
        <div class="circle" @click="handleUpperQuantity">
          <plus-icon />
        </div>
        <div class="quantity_display">
          {{ quantity }}
        </div>
        <div class="circle" @click="handleLowerQuantity">
          <minus-icon />
        </div>
      </div>
    </div>
    <div class="card_footer">
      <button class="btn btn_fix">Add to Car</button>
      <check-out-button />
    </div>
  </div>
</template>
<style lang="css" scoped>
.quantity_shop {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.quantity_display {
  font-size: 3rem;
  font-weight: bold;
  min-width: 4rem;
  text-align: center;
  user-select: none;
  transition: transform 0.2s ease;
}
.circle {
  border: 1px solid #fff;
  width: 4rem;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:active {
    transform: scale(0.95);
  }
}

.circle svg {
  width: 100%;
  height: 100%;
  display: block;
}
.card_footer {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.btn_fix {
  text-transform: capitalize;
  &:hover {
    color: black;
  }
}
.card {
  padding: 1rem 2rem;
  border: white 1px solid;
  border-radius: 0.5rem;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 21.5rem;
}
.card-head {
  font-size: xx-large;
  font-weight: bold;
}
.card-body {
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  gap: 1.3rem;

  & div:last-of-type p {
    color: gray;
    font-weight: 500;
  }
  & div:last-of-type p:last-of-type {
    color: rgb(33, 165, 136);
  }
}
</style>
