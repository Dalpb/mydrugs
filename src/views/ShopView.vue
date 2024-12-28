<script lang="ts" setup>
import DrugCard from '@components/DrugCard.vue';
import { Drug } from '@/interfaces/models/Drug.interface';
import { DrugColor } from '@/interfaces/enums/DrugColor';
import { onMounted,ref,Ref } from 'vue';
import Input from '@components/Input.vue';
import Select from '@components/Select.vue';
import Option from '@components/Option.vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
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
        <div>
            <h1>ECSTASYS</h1>
            <div class="search">
                <MagnifyingGlassIcon 
                class="search-icon"/>
                <Input 
                type="text"
                class-new="add-input"
                placeholder="Search products... "
                width="100%"/>
            </div>
        </div>
        <div>
            <div>
            <Select class-new="add">
                <Option value="" label="All Products"/>
                <Option 
                v-for="clr in DrugColor"
                :key="clr" 
                :value="Object.entries(DrugColor).find(entry => entry[1] === clr)[0]"
                :label="Object.entries(DrugColor).find(entry => entry[1] === clr)[0]" />
            </Select>
            <Select class-new="add">
                <Option value="1" label="Most Popular"/>
                <Option value="2" label="Price: Low to High"/>
                <Option value="3" label="MDMA: High to Low"/>
                <Option value="4" label="MDMA: Low to High"/>
            </Select>
            </div>
        </div>
        <hr/>
        <section >
            <DrugCard v-for="drug of data" :drug="drug"/> 
        </section>
    </main>
</template>
<style lang="css" scoped>
.add{
    width: 15rem;
}

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
}
.search{
    display: flex;
    width: 300px;
    position: relative;
}
.search-icon{
    position: absolute;
    align-self: stretch;
    height: 50%;
    top:25%;
    left: 10px;
}


section{
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(300px,1fr));
    gap:5rem 3rem;
    justify-items: center;
}
</style>