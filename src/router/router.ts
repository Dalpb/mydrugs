import { createRouter, createWebHistory } from "vue-router";

import FaqView from "@/views/FaqView.vue";
import ShopView from "@/views/ShopView.vue";
import MainView from "@/views/MainView.vue";
import LoginView from "@/views/LoginView.vue";
import ProductView from "@/views/ProductView.vue";
import RegisterView from "@/views/RegisterView.vue";
import SafetyView from "@/views/SafetyView.vue";
import ContactView from "@/views/ContactView.vue";

const routes = [
  { path: "/", name: "Home", component: MainView },
  { path: "/shop", name: "Shop", component: ShopView },
  { path: "/faq", name: "FAQ", component: FaqView },
  { path: "/safety", name: "Safety", component: SafetyView },
  { path: "/contact", name: "Contact", component: ContactView },
  { path: "/login", name: "Login", component: LoginView },
  { path: "/register", name: "Register", component: RegisterView },
  { path: "/products/:id", name: "Products", component: ProductView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
