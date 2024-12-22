<script setup lang="ts">
import { 
    ref,
    Ref,
    watch,
    onMounted,
} from 'vue';
import {
    ChevronLeftIcon,
    ChevronRightIcon
} from "@heroicons/vue/16/solid"

import Layout from '@layouts/Layout.vue';
import { Drug } from '@interfaces/models/Drug.interface';
import SliderDot from "@components/SliderDot.vue";
import { usePagination } from '@hooks/usePagination';
import { DrugColor } from '@/interfaces/enums/DrugColor';

const id : Ref<number | null> = ref(null); 
    
const {
   currentPage,
   totalPage,
   changePage,
   getNextPage,
   getPreviusPage
} =usePagination(0);


const data: Ref< Array<Drug | {image: string,drugColor: DrugColor}> > = ref([{image:"/images/main_page.png",drugColor:DrugColor.DARK}]);
const error = ref(null);
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
const handleColor = (currentColor: DrugColor, nextColor: DrugColor): void => {
    console.log(currentColor,nextColor);
    let pos: number = 0;
    const paint = () => {
        if (pos > 100) {
            if (id.value) cancelAnimationFrame(id.value!);
        } else {
            pos +=3;
            const color = `radial-gradient(circle,rgba(255, 255, 255, 0.35) 0%, transparent ${pos>=72 ? 70 : pos}%),linear-gradient(to left,${nextColor}  ${pos}%, ${currentColor} ${pos}% )`;
            window.document.body.style.backgroundImage = color;
            id.value = requestAnimationFrame(paint);
        }
    };
    if (id.value) cancelAnimationFrame(id.value);
    id.value = requestAnimationFrame(paint); 
};

onMounted(fechData);

watch(data,(newData,oldData) =>{
    totalPage.value = newData.length;
})

const doTransition = (index : number) =>{
    console.log(data.value[index]?.drugColor);
    handleColor(data.value[currentPage.value]?.drugColor,data.value[index]?.drugColor);
    changePage(index);
}
const doPrevTransition = () =>{
    const prev = getPreviusPage();
    handleColor(data.value[currentPage.value]?.drugColor,data.value[prev]?.drugColor);
    changePage(prev);
}
const doNextTransition = () =>{
    const next = getNextPage();
    handleColor(data.value[currentPage.value]?.drugColor,data.value[next]?.drugColor);
    changePage(next);
}
</script>

<template> 
<Layout>
    <main>
        <ChevronLeftIcon
        v-if="totalPage > 0"
        class="chevron left"
        @click="doPrevTransition"/>
            <div>
                <picture class="picture">
                    <img :src="data[currentPage]?.image" class="main-img" >
                </picture>
                <SliderDot v-if="totalPage > 0" :quantity="totalPage" :actual-index="currentPage" :callback="doTransition"  />
            </div>

        <ChevronRightIcon 
        v-if="totalPage > 0"
        class="chevron right"
        @click="doNextTransition"/>
    </main>
</Layout>
</template>


<style lang="css" scoped>
.chevron{
    width: 3.5rem; 
    position:absolute;
    cursor:pointer;
    color:rgba(255, 255, 255, 0.657);   
    transition: color ease-in-out .2s;
}
.chevron:hover{
    color:white;
}
.left,.right{
    top:45%;
}
.left{
    left:0;
}
.right{
    right: 0;
}

main{
    margin: 2rem 1rem 1rem;
    height: calc(100vh - 10rem);
    display: flex;
    justify-content: center;
    position: relative;
}
picture{
    display:flex;
    align-items: center;
    width: 80vw;
    height: 100%;
    max-width: 650px;
    min-width: 100px;
    padding:  2rem;
    margin-right: 40px;

}
.main-img{
    width: 100%;
    height: auto;
    object-fit: cover;
    /* animation-name: cleanImage;
    animation-timing-function: ease-in;
    animation-duration: .7s;
    animation-delay: 1s;
    animation-fill-mode: forwards; */
}
.img-animation{
    animation-name: cleanImage;
    animation-timing-function: ease-in;
    animation-duration: .7s;
    animation-delay: 1s;
    animation-fill-mode: forwards;
}
@media screen and (width <= 1600px) {
    picture{
        max-width: 500px;
    }
}
@media screen and (width <= 1300px){
    picture{
        max-width: 400px;
    }
}
@media screen and (width <=1100px) {
    picture{
        max-width: 300px;
    }
}
/* fuck you cleanImage, 4hours!!!! */
@keyframes cleanImage {
  0% {
    clip-path: polygon(66% 0, 100% 0, 100% 100%, 37% 100%, 37% 100%, 0 100%, 0 0); 
  }
  16.6% {
    clip-path: polygon(66% 0, 100% 0, 100% 100%, 37% 100%, 37% 0, 0 0, 0 0); 
  }
  33.3% {
    clip-path: polygon(100% 0, 100% 0, 100% 100%, 37% 100%, 37% 0, 67% 0, 67% 0); 
  }
  50% {
    clip-path: polygon(100% 0, 100% 0, 100% 100%, 37% 100%, 37% 100%, 67% 100%, 67% 0); 
  }
  66.6% {
    clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%, 67% 100%, 67% 100%, 67% 0); 
  }
  100% {
    clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 0, 67% 0, 67% 100%, 67% 0); 
  }
}

</style>

<!-- 
ANIMACION!!!!!! 4HORAS GAAAAAAAA!!!
clip-path: polygon(66% 0, 100% 0, 100% 100%, 37% 100%, 37% 100%, 0 100%, 0 0);
clip-path: polygon(66% 0, 100% 0, 100% 100%, 37% 100%, 37% 0, 0 0, 0 0);
clip-path: polygon(100% 0, 100% 0, 100% 100%, 37% 100%, 37% 0, 67% 0, 67% 0); //acomo
clip-path: polygon(100% 0, 100% 0, 100% 100%, 37% 100%, 37% 100%, 67% 100%, 67% 0); //baja
clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%, 67% 100%, 67% 100%, 67% 0);//acomoda
clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 0, 67% 0, 67% 100%, 67% 0); //sube
-->