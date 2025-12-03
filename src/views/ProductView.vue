<template>
  <main>
    <section class="product">
      <picture>
        <img :src="drug.image" :alt="drug.name" />
      </picture>
      <section></section>
      <buy-card />
    </section>
  </main>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import DrugService from "@/service/drug.service";
import { type Drug } from "@/interfaces/models/Drug.interface";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import BuyCard from "@/components/BuyCard.vue";
const route = useRoute();
const drug = ref<Drug>({});

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
main {
  margin: 1rem 0rem 1rem;
  display: flex;
  justify-content: space-between;
  position: relative;
}

.product {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
