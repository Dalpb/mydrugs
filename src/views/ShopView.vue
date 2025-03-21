<script lang="ts" setup>
import Input from '@/components/Input.vue';
import Select from '@/components/Select.vue';
import Option from '@/components/Option.vue';
import DrugCard from '@/components/DrugCard.vue';
import type { Drug } from '@/interfaces/models/Drug.interface';
import { DrugColor } from '@/interfaces/enums/DrugColor';
import { onMounted,ref } from 'vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { useFilterDrug } from '@/composables/useDrugFilter';
import { useSortDrug } from '@/composables/useDrugSort';
import DrugService from '@/service/drug.service';
let data = ref<Drug[]>([]);
//copio el mismo codigo ,por ahora 
const fechData = async () =>{
   try{
    let drugs : Drug[] = (await DrugService.getDrugs()).map((item : Drug) =>({
        ...item,
        drugColor:item.drugColor! in DrugColor ? DrugColor[item.drugColor as unknown  as keyof typeof DrugColor] : DrugColor.DARK
    }));
    data.value = [...data.value ,...drugs];
   }
   catch(error){
    console.log("Error al cargar el JSON");
   }
} 
onMounted(fechData);
const{
    filterData,
    filterByName,
    filterByColor
}  = useFilterDrug(data);

const {
    sortedData,
    sortByPrice,
    sortByPopularity,
    sortByMDMA
} = useSortDrug(filterData);


const manageSort =(value : string)=>{
    switch(value){
        case "1":
            sortByPopularity();
        break;
        case "2":
            sortByPrice("asc");
        break;
        case "3":
            sortByPrice("desc");
        break;
        case "4":
            sortByMDMA("asc");
        break;
        case "5":
            sortByMDMA("desc");
        break;
    }
}

</script>
<template>
    <main>
        <div>
            <h1>ECSTASYS</h1>
            <div class="search">
                <MagnifyingGlassIcon 
                class="search-icon"/>
                <Input 
                type="text"
                class-new="add-input"
                placeholder="Search products... "
                width="100%"
                :oninput="(e:Event)=>filterByName((e.currentTarget as HTMLInputElement).value)"
                />
            </div>
        </div>
        <div>
            <div class="filters">
            <Select class-new="add" name="color" :onchange="(value:string)=>filterByColor(value)">
                <Option value="" label="All Products"/>
                <Option 
                v-for="clr in DrugColor"
                :key="clr" 
                :value="Object.entries(DrugColor).find(entry => entry[1] === clr)?.[1]!"
                :label="Object.entries(DrugColor).find(entry => entry[1] === clr)?.[0]!" />
            </Select>
            <Select class-new="add" name="filter" :onchange="manageSort">
                <Option value="1" label="Most Popular"/>
                <Option value="2" label="Price: High to Low"/>
                <Option value="3" label="Price: Low to High"/>
                <Option value="4" label="MDMA: High to Low"/>
                <Option value="5" label="MDMA: Low to High"/>
            </Select>
            </div>
            <div class="results">
                Showing {{ data.length }} results
            </div>
        </div>
        <hr/>
        <section>
            <DrugCard v-for="drug of sortedData" :drug="drug"/> 
        </section>
    </main>
</template>
<style lang="css" scoped>
hr{
    border-color: var(--line-color);
}
.results{
    font-size: 1.1rem;
    color:rgba(255, 255, 255, 0.755);
    align-self: flex-end;
}
.add-input{
    padding-left: 2.5rem;
}
h1{
    text-shadow: 0px 0px 15px  rgba(254, 239, 239, 0.347);
    font-size: 3.5rem;
}
main{
    margin: 2rem 5rem 1rem;
    color: white;
}
main > div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: .7rem;
}
.search{
    display: flex;
    width: 300px;
    position: relative;
    column-gap: 2rem;
}
.search-icon{
    position: absolute;
    align-self: stretch;
    height: 50%;
    top:25%;
    left: 10px;
}
.filters{
    display: flex; 
    flex-flow: row wrap;
    row-gap: .7rem;
    column-gap: 1rem;
}
.add{
    width: 14rem
}

section{
    display: grid;
    margin-top: 1rem;
    grid-template-columns: repeat(auto-fit,minmax(400px,1fr));
    justify-items: center;
    gap:2rem 3rem;
}

@media screen and (max-width: 500px) {
    section {
        justify-items: center;
        grid-template-columns: minmax(300px,1fr);
    }
    main {
        margin: 2rem 1.5rem 1rem;
    }
    h1 {
        text-align: center;
    }
    .add, .search, h1 {
        flex-grow: 1;
    }
    .results {
        width: 100%;
        margin-top: 10px;
        text-align: center;
    }
}

@media screen and (max-width: 340px) {
    main {
        margin: 2rem 0.5rem 1rem;
    }
}


</style>