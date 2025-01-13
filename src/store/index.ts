import { createStore } from "vuex";
import moduleShopcart from "./modules/shopcart";
const store = createStore({
    modules:{
        moduleShopcart
    }
});

export default store;