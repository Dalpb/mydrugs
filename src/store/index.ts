import { createStore, Store } from "vuex";
import moduleShopcart, { type ShopcartState } from "./modules/shopcart";
import type { InjectionKey } from "vue";
export interface RootState {
  moduleShopcart: ShopcartState;
}

export const key: InjectionKey<Store<RootState>> = Symbol();

const store = createStore<RootState>({
  modules: {
    moduleShopcart,
  },
});

export default store;
