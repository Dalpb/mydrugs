<template>
  <article class="drug-order">
    <div>
      <img :src="item.image" :alt="`image-order-${item.id}`" />
    </div>
    <div>
      <p>{{ item.name }}</p>
      <p>{{ item.priceBTC }} BTC/piece</p>
    </div>
    <button class="close-btn">×</button>
    <div class="quantity-order">
      <div class="square">
        <minus-icon />
      </div>
      <div class="square">
        <plus-icon />
      </div>
    </div>
  </article>
</template>
<script lang="ts" setup>
import type { DrugProduct } from "@/interfaces/models/Drug.interface";
import MinusIcon from "./minusIcon.vue";
import PlusIcon from "./plusIcon.vue";

interface Props {
  item: DrugProduct;
}
const { item } = defineProps<Props>();
</script>
<style lang="css" scoped>
.drug-order {
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
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
</style>
