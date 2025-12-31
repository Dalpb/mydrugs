import type { Drug, DrugProduct } from "@/interfaces/models/Drug.interface";
import type { ActionContext } from "vuex";

export interface ShopcartState {
  items: DrugProduct[];
  checkoutOrder: DrugProduct[];
}

const moduleShopcart = {
  namespaced: true,

  state: (): ShopcartState => ({
    items: [],
    checkoutOrder: [],
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
    cartTotalByDrug: (state: ShopcartState) => (id: string) => {
      const found = state.items.find((p) => p.id === id);
      if (!found) return 0;
      return found.quantity * found.priceBTC!;
    },
    orderTotal(state: ShopcartState) {
      return state.checkoutOrder.reduce(
        (ac, i) => ac + i.priceBTC! * i.quantity,
        0
      );
    },
  },
  mutations: {
    incrementItem(state: ShopcartState, item: DrugProduct) {
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
    removeAllItems(state: ShopcartState) {
      state.items = [];
    },
    passToOrder(state: ShopcartState) {
      state.checkoutOrder = [...state.items];
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
    removeCart({ commit }: ActionContext<ShopcartState, any>) {
      commit("removeAllItems");
    },
    AddToOrder({ commit }: ActionContext<ShopcartState, any>) {
      commit("passToOrder");
    },
  },
};
export default moduleShopcart;
