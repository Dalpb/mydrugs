<template>
    <main>
        <section class="product">
            <picture>
                <img :src="drug.image" :alt="drug.name" />
            </picture>
            <card title="Buy Now">
                <check-out-button></check-out-button>
            </card>
        </section>
    </main>
</template>


<script lang="ts" setup>
import {onMounted, ref,type Ref} from "vue"
import DrugService from '@/service/drug.service';
import { type Drug } from "@/interfaces/models/Drug.interface";
import { useRoute,onBeforeRouteUpdate } from 'vue-router';
import Card from "@/components/UI/Card.vue";
import CheckOutButton from "@/components/UI/CheckOutButton.vue";
const route = useRoute();
const drug : Ref<Drug> = ref<Drug>({});

onMounted(async()=>{
    try{
        if(!route.params.id || Array.isArray(route.params.id))return;
        drug.value= await DrugService.getDrugById(route.params.id);
    }
    catch(e){
        console.log((e as Error ).message);
    }
})

onBeforeRouteUpdate(async(to,from)=>{
    try{
        if(to.params.id === from.params.id || Array.isArray(to.params.id))return;
        drug.value = await DrugService.getDrugById(to.params.id);
    }
    catch(e){
        console.log((e as Error).message);
    }
})
</script>
<style lang="css" scoped>
main{
    margin: 1rem 0rem 1rem;
    display: flex;
    justify-content: space-between;
    position: relative;
}
</style>