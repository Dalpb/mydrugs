import { 
    createRouter,
    createWebHistory
} from "vue-router";

import MainView from "../views/MainView.vue";
import LoginView from "../views/LoginView.vue";
import FaqView from "../views/FaqView.vue";
import ShopView from "../views/ShopView.vue";

const routes  = [
    {path:"/" ,name:"Home" , component:MainView },
    {path:"/shop", name:"Shop", component:ShopView},
    {path:"/faq" , name:"FAQ", component:FaqView },
    {path:"/login", name:"Login", component:LoginView}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
