import type { Drug, DrugProduct } from "@/interfaces/models/Drug.interface";
import type { ActionContext } from "vuex";

export interface ShopcartState {
  items: DrugProduct[];
}

const moduleShopcart = {
  namespaced: true,

  state: (): ShopcartState => ({
    items: [],
  }),
  getters: {
    itemCount(state: ShopcartState) {
      return state.items.length;
    },
    cartTotal(state: ShopcartState) {
      return state.items.reduce((ac, i) => ac + i.priceBTC! * i.quantity, 0);
    },
    totalItems(state: ShopcartState) {
      return state.items.reduce((acc, i) => acc + i.quantity, 0);
    },
  },
  mutations: {
    incrementItem(state: ShopcartState, item: Drug) {
      const found = state.items.find((p) => p.id === item.id);
      if (!found) {
        state.items.push({ ...item, quantity: 1 });
        return;
      }
      found.quantity++;
    },
    decrementItem(state: ShopcartState, id: string) {
      const found = state.items.find((p) => p.id === id);
      if (!found) return;
      if (found.quantity === 1) {
        state.items = state.items.filter((i) => i.id !== id);
        return;
      }
      found.quantity--;
    },
    addToItem(state: ShopcartState, payload: { item: Drug; quantity: number }) {
      const { item, quantity } = payload;
      const found = state.items.find((p) => p.id === item.id);
      if (!found) {
        state.items.push({ ...item, quantity: quantity });
        return;
      }
      found.quantity += quantity;
    },
    removeItem(state: ShopcartState, id: string) {
      state.items = state.items.filter((p) => p.id !== id);
    },
  },
  actions: {
    incrementToCart({ commit }: ActionContext<ShopcartState, any>, item: Drug) {
      commit("incrementItem", item);
    },
    decrementFromCart(
      { commit }: ActionContext<ShopcartState, any>,
      id: string
    ) {
      commit("decrementItem", id);
    },
    addToCart(
      { commit }: ActionContext<ShopcartState, any>,
      payload: { item: Drug; quantity: number }
    ) {
      commit("addToItem", payload);
    },
    removeFromCart({ commit }: ActionContext<ShopcartState, any>, id: string) {
      commit("removeItem", id);
    },
  },
};
export default moduleShopcart;
