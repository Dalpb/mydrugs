<script lang="ts" setup>
import "../styles/myanimations.css";
import { useRouter } from "vue-router";
interface Props {
  img?: string;
}
const router = useRouter();
const { img } = defineProps<Props>();
const goToShop = () => router.push({ name: "Shop" });

const goToSafety = () => router.push({ name: "Safety" });

const goToFaq = () => router.push({ name: "FAQ" });

const goToContact = () => router.push({ name: "Contact" });
</script>

<template>
  <section class="main-section">
    <article class="opt shp bright" @click="goToShop">
      <p class="show-animation dly-1">SHOP</p>
      <p class="show-animation dly-2">ALL THE DRUGS<br />YOU WANT</p>
    </article>
    <article class="opt sft bright" @click="goToSafety">
      <p class="show-animation dly-3">SAFETY</p>
      <p class="show-animation dly4">IMPORTANT <br />INFORMATION</p>
    </article>
    <picture class="main-picture">
      <img :src="img" alt="home-drug" />
    </picture>
    <article class="opt faq bright">
      <p class="show-animation dly-5" @click="goToFaq">FAQ</p>
      <p class="show-animation dly-6">ANSWERING <br />YOUR QUESTIONS</p>
    </article>
    <article class="opt ctc bright">
      <p class="show-animation dly-7" @click="goToContact">CONTACT</p>
      <p class="show-animation dly-8">SUGGESTIONS AND<br />FEEDBACK</p>
    </article>
  </section>
</template>
<style lang="css" scoped>
.main-section {
  width: 100%;
  height: 97%;
  align-self: flex-start;
  display: grid;
  grid-template-columns: minmax(100px, 0.8fr) minmax(500px, 1fr) minmax(
      100px,
      0.8fr
    );
  grid-template-rows: repeat(6, 1fr);
  column-gap: 1rem;
}
.main-picture {
  grid-column: 2/3;
  grid-row: 1/7;
  place-content: center;
  width: 97.5%;
}
.main-picture img {
  width: 100%;
  object-fit: cover;
}
.opt {
  width: fit-content;
}
.opt p {
  font-size: 2rem;
}
.opt p:first-child {
  font-weight: 900;
  font-size: 3.3rem;
}
.opt p:last-child {
  color: #ffffffb3;
}

.shp,
.faq {
  grid-row: 2/3;
}
.shp,
.sft {
  justify-self: end;
}
.faq,
.ctc {
  justify-self: start;
}
.ctc,
.sft {
  grid-row: 5/6;
}
.shp,
.sft {
  text-align: end;
}
.bright {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  padding: 0.5rem;
}

/* Estado HOVER */
.bright:hover {
  transform: translateY(-8px) scale(1.02);
  cursor: pointer;
}

.bright:hover p {
  text-shadow: 0 0 12px rgba(255, 255, 255, 0.8),
    0 0 20px rgba(255, 255, 255, 0.4);
}

.bright:hover p:last-child {
  color: #ffffff;
}
@media screen and (max-width: 1100px) {
  .main-section {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
  .main-picture {
    grid-column: 1/2;
    grid-row: 1/2;
    align-self: center;
    justify-self: center;
    width: 150%;
  }
  .opt {
    display: none;
  }
}
</style>
