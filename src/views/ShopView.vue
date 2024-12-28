<script lang="ts" setup>
import DrugCard from '@components/DrugCard.vue';
import { Drug } from '@/interfaces/models/Drug.interface';
import { DrugColor } from '@/interfaces/enums/DrugColor';
import { onMounted,ref,Ref } from 'vue';
import Input from '@components/Input.vue';
import Select from '@components/Select.vue';
import Option from '@components/Option.vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { filterByColor } from '@utils/filter';
const data: Ref< Drug[] > = ref([]);
const copydata : Ref<Drug[]> = ref([]);

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
    copydata.value = [...data.value];
   }
   catch(error){
    console.log("Error al cargar el JSON");
   }
} 
onMounted(fechData);

const search=(e: Event ) => {
    const text = (e.currentTarget as HTMLInputElement).value;
    console.log("dasdsad");
    if(!text){
        copydata.value = data.value;
        return;
    }
    copydata.value = data.value.filter(drug => drug.name.toLowerCase().includes(text.toLowerCase()));
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
                :onchange="search"
                />
            </div>
        </div>
        <div>
            <div class="filters">
            <Select class-new="add" name="color">
                <Option value="" label="All Products"/>
                <Option 
                v-for="clr in DrugColor"
                :key="clr" 
                :value="Object.entries(DrugColor).find(entry => entry[1] === clr)[1]"
                :label="Object.entries(DrugColor).find(entry => entry[1] === clr)[0]" />
            </Select>
            <Select class-new="add" name="filter">
                <Option value="1" label="Most Popular"/>
                <Option value="2" label="Price: High to Low"/>
                <Option value="3" label="Price: Low to High"/>
                <Option value="4" label="MDMA: High to Low"/>
                <Option value="5" label="MDMA: Low to High"/>
            </Select>
            </div>
        </div>
        <hr/>
        <section >
            <DrugCard v-for="drug of copydata" :drug="drug"/> 
        </section>
    </main>
</template>
<style lang="css" scoped>

.add-input{
    padding-left: 2.5rem;
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
    grid-template-columns: repeat(auto-fit,minmax(300px,1fr));
    gap:5rem 3rem;
}


@media screen and (width <= 900px) {
    h1{
        text-align: center;
    }
    .add,.search,h1{
        flex-grow: 1
    }
}
</style>