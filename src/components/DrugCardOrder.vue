<template>
  <article class="drug-order">
    <div class="img-c">
      <img :src="item.image" :alt="`image-order-${item.id}`" />
    </div>
    <div class="drug-info">
      <p>{{ item.name }}</p>
      <p>{{ item.priceBTC }} BTC/piece</p>
      <p>In stock</p>
    </div>
    <button class="close-btn" @click="remove">×</button>
    <div class="quantity-order">
      <div class="square" @click="decrease">
        <minus-icon />
      </div>
      <p>{{ item.quantity }}</p>
      <div class="square" @click="increase">
        <plus-icon />
      </div>
    </div>
    <div class="total-order">
      <p>Price</p>
      <p>{{ totalByDrug.toFixed(3) }} BTC</p>
      <p>{{ transformBTCtoEUR(totalByDrug || 0) }}€</p>
    </div>
  </article>
</template>
<script lang="ts" setup>
import type { DrugProduct } from "@/interfaces/models/Drug.interface";
import MinusIcon from "./minusIcon.vue";
import PlusIcon from "./plusIcon.vue";
import { transformBTCtoEUR } from "@/utils/helper";
import { useStore } from "vuex";
import { key } from "@/store";
import { computed } from "vue";

interface Props {
  item: DrugProduct;
}
const { item } = defineProps<Props>();
const store = useStore(key);

const remove = () => {
  store.dispatch("moduleShopcart/removeFromCart", item.id);
};
const increase = () => {
  store.dispatch("moduleShopcart/incrementToCart", item);
};
const decrease = () => {
  store.dispatch("moduleShopcart/decrementFromCart", item.id);
};
const totalByDrug = computed(() =>
  store.getters["moduleShopcart/cartTotalByDrug"](item.id)
);
</script>
<style lang="css" scoped>
.drug-order {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(120px, 140px) repeat(2, 1fr) min-content;
  grid-template-rows: 130px 80px;
}
.img-c {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  & > img {
    width: 80%;
    height: 80%;
    object-fit: contain;
  }
}

.drug-info {
  grid-column: 2/4;
  & p:first-of-type {
    font-weight: bold;
    font-size: 1.6rem;
  }
  & p:nth-of-type(2) {
    font-size: 1.3rem;
  }
  & p:last-of-type {
    color: rgba(41, 183, 95, 0.824);
  }
}

img {
  object-fit: fill;
}
.quantity-order {
  grid-row: 2/3;
  grid-column: 1/3;
  display: flex;
  z-index: 10;
  gap: 1rem;
  align-items: center;
  & > p {
    font-size: 3rem;
    font-weight: bold;
  }
}

.total-order {
  grid-column: 2/ 5;
  grid-row: 2/3;
  text-align: end;

  & > p:nth-of-type(2) {
    font-size: 2rem;
  }
}
.close-btn {
  background: none;
  border: none;
  color: white;
  justify-self: end;
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

.square {
  border: 1px solid #fff;
  width: 3.2rem;
  height: 3.2rem;
  aspect-ratio: 1;
  border-radius: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  transition: background-color 0.3s;

  & svg {
    height: 100%;
    width: 100%;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:active {
    transform: scale(0.95);
  }
}
</style>
