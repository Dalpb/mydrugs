<script lang="ts" setup>
import Input from "@/components/Input.vue";
import Select from "@/components/Select.vue";
import Option from "@/components/Option.vue";
import DrugCard from "@/components/DrugCard.vue";
import type { Drug } from "@/interfaces/models/Drug.interface";
import { DrugColor } from "@/interfaces/enums/DrugColor";
import { onMounted, ref, computed } from "vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import DrugService from "@/service/drug.service";
const data = ref<Drug[]>([]);

const nameFilter = ref("");
const colorFilter = ref("");
const sortOption = ref("1");

const fetchData = async () => {
  const drugs = await DrugService.getDrugs();
  data.value = drugs.map((item: Drug) => ({
    ...item,
    drugColor:
      item.drugColor! in DrugColor
        ? DrugColor[item.drugColor as unknown as keyof typeof DrugColor]
        : DrugColor.DARK,
  }));
};

onMounted(fetchData);

const processedDrugs = computed(() => {
  let result = [...data.value];

  if (nameFilter.value) {
    const txt = nameFilter.value.toLowerCase();
    result = result.filter((d) => d.name?.toLowerCase().includes(txt));
  }

  if (colorFilter.value) {
    result = result.filter((d) => d.drugColor === colorFilter.value);
  }

  switch (sortOption.value) {
    case "1":
      result.sort((a, b) => b.rating! - a.rating!);
      break;
    case "2":
      result.sort((a, b) => b.priceBTC! - a.priceBTC!);
      break;
    case "3":
      result.sort((a, b) => a.priceBTC! - b.priceBTC!);
      break;
    case "4":
      result.sort((a, b) => b.composition! - a.composition!);
      break;
    case "5":
      result.sort((a, b) => a.composition! - b.composition!);
      break;
  }

  return result;
});

const resultsCount = computed(() => processedDrugs.value.length);
</script>

<template>
  <main>
    <div>
      <h1>ECSTASYS</h1>
      <div class="search">
        <MagnifyingGlassIcon class="search-icon" />
        <Input
          type="text"
          class-new="add-input"
          placeholder="Search products... "
          width="100%"
          :oninput="e => nameFilter = (e.currentTarget as HTMLInputElement).value"
        />
      </div>
    </div>
    <div>
      <div class="filters">
        <Select
          class-new="add"
          name="color"
          :onchange="(value:string) => colorFilter = value"
        >
          <Option value="" label="All Products" />
          <Option
            v-for="clr in DrugColor"
            :key="clr"
            :value="Object.entries(DrugColor).find(entry => entry[1] === clr)?.[1]!"
            :label="Object.entries(DrugColor).find(entry => entry[1] === clr)?.[0]!"
          />
        </Select>
        <Select
          class-new="add"
          name="filter"
          :onchange="(value:string) => sortOption = value"
        >
          <Option value="1" label="Most Popular" />
          <Option value="2" label="Price: High to Low" />
          <Option value="3" label="Price: Low to High" />
          <Option value="4" label="MDMA: High to Low" />
          <Option value="5" label="MDMA: Low to High" />
        </Select>
      </div>
      <div class="results">Showing {{ resultsCount }} results</div>
    </div>
    <hr />
    <section v-if="processedDrugs.length">
      <DrugCard v-for="drug in processedDrugs" :key="drug.id" :drug="drug" />
    </section>
    <section v-else class="empty">
      <p>No results found D:</p>
      <span>Try changing filters or search terms</span>
    </section>
  </main>
</template>

<style lang="css" scoped>
.empty {
  display: flex;
  flex-direction: column;
  text-align: center;
}
hr {
  border-color: var(--line-color);
}
.results {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.755);
  align-self: flex-end;
}
.add-input {
  padding-left: 2.5rem;
}
h1 {
  text-shadow: 0px 0px 15px rgba(254, 239, 239, 0.347);
  font-size: 3.5rem;
}
main {
  margin: 2rem 5rem 1rem;
  color: white;
}
main > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 0.7rem;
}
.search {
  display: flex;
  width: 300px;
  position: relative;
  column-gap: 2rem;
}
.search-icon {
  position: absolute;
  align-self: stretch;
  height: 50%;
  top: 25%;
  left: 10px;
}
.filters {
  display: flex;
  flex-flow: row wrap;
  row-gap: 0.7rem;
  column-gap: 1rem;
}
.add {
  width: 14rem;
}

section {
  display: grid;
  margin-top: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  justify-items: center;
  gap: 2rem 3rem;
}

@media screen and (max-width: 500px) {
  section {
    justify-items: center;
    grid-template-columns: minmax(300px, 1fr);
  }
  main {
    margin: 2rem 1.5rem 1rem;
  }
  h1 {
    text-align: center;
  }
  .add,
  .search,
  h1 {
    flex-grow: 1;
  }
  .results {
    width: 100%;
    margin-top: 10px;
    text-align: center;
  }
}

@media screen and (max-width: 340px) {
  main {
    margin: 2rem 0.5rem 1rem;
  }
}
</style>
