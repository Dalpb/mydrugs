<script lang="ts" setup>
import type { Drug } from "@/interfaces/models/Drug.interface";
import RangeStar from "./RangeStar.vue";
import { changeColorPropety } from "@/utils/colorHandlers";
import { useRouter } from "vue-router";
interface Props {
  drug: Drug;
}
const { drug } = defineProps<Props>();

const router = useRouter();
const colorEffect = (e: Event) => {
  const elem = e.currentTarget as HTMLElement;
  changeColorPropety(elem, "--local-color", drug.drugColor + "fd");
  changeColorPropety(elem, "--local-seccolor", drug.drugColor + "40");
};
const removeInit = (e: Event) => {
  const elem = e.currentTarget as HTMLElement;
  elem.classList.remove("init-animation");
};

const goToProducts = () =>
  router.push({ name: "Products", params: { id: drug.id } });
</script>
<template>
  <article
    class="my-drug-card init-animation"
    :onmouseover="colorEffect"
    v-on:animationend="removeInit"
    @click="goToProducts"
  >
    <picture class="product-img">
      <img :src="drug.image" alt=" " />
    </picture>
    <div>
      <p class="title">{{ drug.name!.replace(" ", "\n") }}</p>
      <span class="info">{{ drug.composition }} MG MDMA / PILL</span>
      <span class="price">{{ drug.priceBTC }} BTC</span>
      <RangeStar :rating="drug.rating" width="1.5rem" />
    </div>
  </article>
</template>

<style lang="css" scoped>
.my-drug-card {
  --local-seccolor: #138aca40;
  --local-color: #138acafd;
  position: relative;
  width: 25rem;
  height: 11rem;
  padding: 0.7rem;
  border: 2px solid var(--line-color);
  border-radius: 8px;
  display: flex;
  flex-flow: row nowrap;
  cursor: pointer;
  justify-content: center;
}

.my-drug-card > div {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(5, 1fr);
}

.title {
  font-weight: 800;
  font-size: 1.6rem;
  text-transform: capitalize;
  place-content: center;
  white-space: pre-wrap;
  word-wrap: break-word;
}
.price {
  font-style: italic;
  place-content: end;
  grid-row: 4/5;
  color: rgba(255, 255, 255, 0.744);
  font-size: 1.1rem;
}
.price + * {
  grid-row: 5/6;
}
img {
  height: 85%;
  width: 100%;
  object-fit: contain;
}
.product-img {
  width: 50%;
  place-content: center;
  min-width: 180px;
  max-width: 180px;
}

.init-animation {
  /* mejorar animacion  */
  animation: show 0.7s linear 1 forwards;
}
.my-drug-card:hover .product-img {
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
  animation: drop-shadow-lamp 0.3s ease-in-out 1 forwards;
}
.my-drug-card:hover {
  animation: lamp 0.3s ease-in-out 1 forwards;
}

@keyframes drop-shadow-lamp {
  0% {
    filter: drop-shadow(0 0 0px rgba(0, 0, 0, 0.5));
  }
  40% {
    filter: drop-shadow(0 0 10px var(--local-color));
  }
  60% {
    filter: drop-shadow(0 0 0px rgba(0, 0, 0, 0.5));
  }
  100% {
    filter: drop-shadow(0 0 10px var(--local-color));
  }
}
@keyframes lamp {
  0% {
    box-shadow: none;
  }
  40% {
    box-shadow: 0 0 20px var(--local-color);
  }
  60% {
    box-shadow: none;
  }
  100% {
    box-shadow: 0 0 20px var(--local-color);
  }
}
@keyframes show {
  from {
    opacity: 0;
    transform: translateY(3rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media screen and (max-width: 500px) {
  .my-drug-card {
    width: 100%;
  }
  .info {
    font-size: 0.8rem;
  }
}
@media screen and (max-width: 340px) {
  .my-drug-card {
    gap: 1rem;
  }
  img {
    height: 95%;
    width: 100%;
    object-fit: contain;
  }
  .product-img {
    min-width: 130px;
    max-width: 130px;
  }
}
</style>
