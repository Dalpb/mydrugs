<template>
    <main>
        <picture>
            <img :src="drug.image" :alt="drug.name" />
        </picture>
        
        <section class="others-products">

        </section>
    </main>
</template>


<script lang="ts" setup>
import {onMounted, ref,Ref} from "vue"
import DrugService from '@/service/drug.service';
import { Drug } from "@/interfaces/models/Drug.interface";
import { useRoute,onBeforeRouteLeave,onBeforeRouteUpdate } from 'vue-router';
const route = useRoute();
const drug : Ref<Drug> = ref<Drug>({});

onMounted(async()=>{
    try{
        if(!route.params.id || Array.isArray(route.params.id))return;
        drug.value= await DrugService.getDrugById(route.params.id);
    }
    catch(e){
        console.log(e.message);
    }
})

onBeforeRouteUpdate(async(to,from)=>{
    try{
        if(to.params.id === from.params.id || Array.isArray(to.params.id))return;
        drug.value = await DrugService.getDrugById(to.params.id);
    }
    catch(e){
        console.log(e.message);
    }
})
</script>
<style lang="css" scoped>
main{
    display: grid;

}
</style>