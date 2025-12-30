<template>
  <article class="drug-order">
    <div class="img-c">
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
      <p>{{ item.quantity }}</p>
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
  display: grid;
  grid-template-columns: minmax(160px, 250px) repeat(4, 1fr);
  grid-template-rows: repeat(2, 150px);
}
.img-c {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
img {
  object-fit: fill;
}

.close-btn {
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
.quantity-order {
  display: flex;
  gap: 1rem;
  align-items: center;

  & > p {
    font-size: 3rem;
    font-weight: bold;
  }
}
.square {
  border: 1px solid #fff;
  width: 3.5rem;
  height: 3.5rem;
  aspect-ratio: 1;
  border-radius: 15%;
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
</style>
