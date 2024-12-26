<script lang="ts" setup>
import DrugCard from '@components/DrugCard.vue';
import { Drug } from '@/interfaces/models/Drug.interface';
import { DrugColor } from '@/interfaces/enums/DrugColor';
import { onMounted,ref,Ref } from 'vue';
const data: Ref< Array<Drug> > = ref([]);


//copio el mismo codigo ,por ahora 
const fechData = async () =>{
   try{
    const response = await fetch("/src/mocks/drugs.json");
    const responseJson = await response.json();
    let drugs : Drug[] = responseJson.data.drugs.map((item : Drug) =>({
        ...item,
        drugColor:item.drugColor in DrugColor ? DrugColor[item.drugColor as unknown  as keyof typeof DrugColor] : DrugColor.DARK
    }))
    data.value = [...data.value ,...drugs];
   }
   catch(error){
    console.log("Error al cargar el JSON");
   }
} 
onMounted(fechData);

</script>
<template>
    <main>
        <h1>ECSTASYS</h1>
        <hr/>
        <section >
            <DrugCard v-for="drug of data" :drug="drug"/> 
        </section>
    </main>
</template>
<style lang="css" scoped>
main{
    margin: 2rem 5rem 1rem;
    color: white;
}
section{
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(300px,1fr));
    gap:5rem 3rem;
    justify-items: center;
}
</style>