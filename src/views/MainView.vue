<script setup lang="ts">
import { 
    ref,
    Ref,
    watch,
    onMounted,
    onUnmounted,
} from 'vue';
import { usePagination } from '@hooks/usePagination';
import DrugSection from "@components/DrugSection.vue"
import MainSection from '@/components/MainSection.vue';
import SliderContainer from '@/components/SliderContainer.vue';
import { DrugColor } from '@/interfaces/enums/DrugColor';
import { Drug } from '@interfaces/models/Drug.interface';
import { changeColorPropety,doTransitionLeftColor } from '@/utils/colorHandlers';

const id : Ref<number | null> = ref(null); 
const changing : Ref<boolean> = ref(false);
const currentScreen : Ref<Drug> = ref({image:"/images/main_page.png",drugColor:DrugColor.DARK});

const {
   currentPage,
   totalPage,
   changePage,
   getNextPage,
   getPreviusPage
} =usePagination(0);


const data: Ref< Array<Drug> > = ref([{image:"/images/main_page.png",drugColor:DrugColor.DARK}]);
const fechData = async () =>{
   try{
    const response = await fetch("/src/mocks/drugsPopularity.json");
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


const doTransition = (index : number): void  =>{
    if(index === currentPage.value)return;

    const oldColor = currentScreen.value.drugColor;
    const newColor = data.value[index]?.drugColor;

    doTransitionLeftColor(id.value,oldColor,newColor,4,index !==0);
    changePage(index);
    changeColorPropety(window.document.documentElement,"--main-color",newColor);
    manageImage(data.value[index]);
}
const doPrevTransition = () : void =>{
    const prev = getPreviusPage();
    doTransition(prev);
}
const doNextTransition = () :void  =>{
    const next = getNextPage();
    doTransition(next);
}
const manageImage = (newDrug: Drug) : void =>{
    changing.value = true;
    setTimeout(()=>{
        changing.value = false;
        currentScreen.value = newDrug;
    },700);
}
onMounted(fechData);
onUnmounted(()=>{
    window.document.body.style.backgroundImage = "none";
    changeColorPropety(window.document.documentElement,"--main-color","#0D151A");
})

watch(data,(newData,oldData) =>{
    totalPage.value = newData.length;
})

</script>

<template> 
    <main>
        <slider-container
        v-if="totalPage > 0"
        :actual-index="currentPage"
        :quantity="totalPage"
        :callback="doTransition"
        :onclick-next="doNextTransition"
        :onclick-prev="doPrevTransition">

            <main-section
            v-if="currentPage == 0 && !changing"
            :img="currentScreen.image">
            </main-section>

            <drug-section 
            v-else
            :key="currentScreen.name"
            :changing="changing"
            :drug-info="currentScreen"

            </drug-section>
        </slider-container>
    </main>
</template>


<style lang="css" scoped>
main{
    overflow: hidden;
    margin: 1rem 0rem 1rem;
    width: 100%;
    height: calc(100% - 8rem);
    display: flex;
    justify-content: space-between;
    position: relative;
    color:white;
} 
</style>

