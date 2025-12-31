<template>
  <main>
    <article v-if="isPaying" class="payment">
      <h1>PROCESSING PAYMENT</h1>
      <div class="loading-c">
        <div class="loading"></div>
        <div class="loading"></div>
        <div class="loading"></div>
      </div>
    </article>
    <article v-else>
      <span>Order Successful</span>
      <h1>
        Thank you for <br />
        choosing MyDrugs!
      </h1>
      <div class="helper-container">
        <div class="card-order">
          <p>You ordered:</p>
          <div class="your-order" v-for="item in items" :key="item.id">
            <div class="your-order-image">
              <img :src="item.image" alt="image-item-order" />
            </div>
            <div class="your-order-quantity">
              <p>{{ item.quantity }}x {{ item.name }}</p>
              <p>{{ item.priceBTC }} BTC</p>
            </div>
          </div>
          <div>
            <p>Total:</p>
            <p>{{ myTotal.toFixed(5) }} BTC</p>
          </div>
          <p>Payed Via Bitcoin</p>
        </div>
        <div class="card-inf">
          <p>Estimated delivery time: 2-4 days</p>
          <div @click="gotoShop">
            <check-out-button>Keep shopping!</check-out-button>
          </div>
        </div>
      </div>
    </article>
  </main>
</template>
<script lang="ts" setup>
import CheckOutButton from "@/components/UI/CheckOutButton.vue";
import { key } from "@/store";
import { computed, onMounted, ref, type ComputedRef } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore(key);
const isPaying = ref(true);
const router = useRouter();
const items = computed(() => store.state.moduleShopcart.checkoutOrder);

const myTotal = computed(
  () => store.getters["moduleShopcart/orderTotal"]
) as ComputedRef<number>;

const gotoShop = () => {
  router.push({ name: "Shop" });
};
onMounted(() => {
  store.dispatch("moduleShopcart/AddToOrder");
  store.dispatch("moduleShopcart/removeCart");
  setTimeout(() => {
    isPaying.value = false;
  }, 5000);
});
</script>
<style lang="css" scoped>
main {
  margin: 2rem 5rem 1rem;
  color: white;
  flex: 1;
}
span {
  font-size: 1.5rem;
}
h1 {
  margin: 0;
  font-size: 3.5rem;
}
.card-order,
.card-inf {
  display: flex;
  flex-direction: column;
}
.card-inf {
  padding-top: 1.5rem;
  display: flex;
  gap: 1rem;
}
.card-order {
  gap: 0.5rem;

  & > div:last-of-type {
    display: flex;
    justify-content: space-between;
    & p {
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
  & > p:last-of-type {
    color: #2ab1d6;
  }
}
.your-order {
  display: flex;
  gap: 1rem;
  align-items: center;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.315);
}
.your-order-image {
  width: 5rem;
  height: 5rem;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
.your-order-quantity {
  & > p:first-of-type {
    font-weight: bolder;
    font-size: 1.4rem;
  }
}
.payment {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  padding-bottom: 10rem;
  & h1 {
    font-size: 3.5rem;
  }
}
.loading-c {
  display: flex;
  gap: 1rem;
}
.loading {
  width: 4rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: rgb(47, 243, 116);
  opacity: 0;
  animation: appear 2.4s infinite;
}

.loading:nth-child(2) {
  animation-delay: 0.4s;
}

.loading:nth-child(3) {
  animation-delay: 0.8s;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@media (width <= 768px) {
  main {
    margin: 1.5rem 1.5rem;
  }

  h1 {
    font-size: 2.4rem;
    line-height: 1.1;
  }

  span {
    font-size: 1.2rem;
  }
}
@media (width <= 768px) {
  .helper-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
}
@media (width <= 768px) {
  .card-order,
  .card-inf {
    width: 100%;
  }

  .your-order-image {
    width: 4rem;
    height: 4rem;
  }

  .your-order-quantity > p:first-of-type {
    font-size: 1.2rem;
  }

  .your-order-quantity > p:last-of-type {
    font-size: 1rem;
  }
}
@media (width <= 768px) {
  .card-order > div:last-of-type p {
    font-size: 1.3rem;
  }

  .card-inf {
    align-items: flex-start;
    gap: 1.5rem;
  }

  check-out-button {
    align-self: center;
    width: 100%;
  }
}
@media (width <= 768px) {
  .payment h1 {
    font-size: 2.5rem;
  }

  .loading {
    width: 3rem;
  }
}
</style>
