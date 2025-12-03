<template>
  <main>
    <section class="product">
      <div class="product_container">
        <img :src="drug.image" :alt="drug.name" />
      </div>
      <section class="product_info">
        <span v-if="drug.isNew" class="new_badge">NEW</span>
        <h1 class="product_name">{{ drug.name }}</h1>
        <p class="product_description">{{ drug.description }}</p>
        <range-star :rating="drug.rating" width="1.5rem" />
        <p class="price_btc">{{ drug.priceBTC }} BTC</p>
        <p class="price_eur">{{ transformBTCtoEUR(drug.priceBTC || 0) }} €</p>
        <p class="recommendation">{{ drug.recomendation }}</p>
      </section>
      <div>
        <buy-card />
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import DrugService from "@/service/drug.service";
import { type Drug } from "@/interfaces/models/Drug.interface";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import BuyCard from "@/components/BuyCard.vue";
import RangeStar from "@/components/RangeStar.vue";
const route = useRoute();
const drug = ref<Drug>({});

const EUR = 79929.74; // jeje

const transformBTCtoEUR = (btc: number) => {
  return (btc * EUR).toFixed(2);
};

onMounted(async () => {
  try {
    if (!route.params.id || Array.isArray(route.params.id)) return;
    drug.value = await DrugService.getDrugById(route.params.id);
  } catch (e) {
    console.log((e as Error).message);
  }
});

onBeforeRouteUpdate(async (to, from) => {
  try {
    if (to.params.id === from.params.id || Array.isArray(to.params.id)) return;
    drug.value = await DrugService.getDrugById(to.params.id);
  } catch (e) {
    console.log((e as Error).message);
  }
});
</script>
<style lang="css" scoped>
* {
  box-sizing: border-box;
}

main {
  margin: 1rem 0rem 0rem;
  justify-content: space-between;
  position: relative;
  padding: 0 11rem;
}

section {
  & span {
    color: rgb(28, 216, 216);
    font-weight: 700;
  }
}
.product {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  grid-template-rows: minmax(400px, 500px);
  > div {
    justify-items: center;
  }
}

.product_container {
  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
.new_badge {
  color: rgb(0, 225, 255);
  font-weight: 700;
}

.product_name {
  font-size: 4rem;
  font-weight: bold;
  line-height: 1.1;
  margin: 0;
  color: white;
}

.product_description {
  color: #a0a0a0;
  font-size: 2rem;
  margin: 0.5rem 0;
  font-weight: 600;
}

.price_btc {
  font-size: 4rem;
  font-weight: bold;
  margin: 1rem 0 0.25rem 0;
  color: white;
}

.price_eur {
  font-size: 2rem;
  color: #a0a0a0;
  margin: 0 0 1rem 0;
}

.recommendation {
  font-size: 1.3rem;
  line-height: 1.3;
  color: #b0b0b0;
  margin-top: 1rem;
}
</style>
