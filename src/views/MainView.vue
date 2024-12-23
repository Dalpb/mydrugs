<script setup lang="ts">
import { 
    ref,
    Ref,
    watch,
    onMounted,
} from 'vue';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    PlusIcon,
} from "@heroicons/vue/16/solid"
import {
    StarIcon
}from "@heroicons/vue/24/outline"
import Layout from '@layouts/Layout.vue';
import { Drug } from '@interfaces/models/Drug.interface';
import SliderDot from "@components/SliderDot.vue";
import RangeStar from '@/components/RangeStar.vue';
import { usePagination } from '@hooks/usePagination';
import { DrugColor } from '@/interfaces/enums/DrugColor';

const id : Ref<number | null> = ref(null); 
const currentImage : Ref<string> = ref("/images/main_page.png");
const changing : Ref<boolean> = ref(false);
const {
   currentPage,
   totalPage,
   changePage,
   getNextPage,
   getPreviusPage
} =usePagination(0);


const data: Ref< Array<Drug> > = ref([{image:"/images/main_page.png",drugColor:DrugColor.DARK}]);
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

const doTransition = (index : number): void  =>{
    if(index === currentPage.value)return;
    handleColor(data.value[currentPage.value]?.drugColor,data.value[index]?.drugColor);
    changePage(index);
    manageImage(data.value[index]?.image);
}
const doPrevTransition = () : void =>{
    const prev = getPreviusPage();
    doTransition(prev);
}
const doNextTransition = () :void  =>{
    const next = getNextPage();
    doTransition(next);
}

const manageImage = (newImage: string) : void =>{
    changing.value = true;
    setTimeout(()=>{
        currentImage.value = newImage;
        changing.value = false;
    },850);
}



</script>

<template> 
<Layout>
    <main>
        <ChevronLeftIcon
        v-if="totalPage > 0"
        class="chevron left"
        @click="doPrevTransition"/>
            <section>
                <div v-if="currentPage !== 0">
                    <span class="title-pill">{{ data[currentPage]?.name }}</span>
                    <p class="des-pill">{{ data[currentPage].description }}</p>
                    <RangeStar />
                </div>
                <picture class="picture">
                    <img :src="currentImage" class="main-img" :class="changing && 'img-animation' " >
                </picture>
                <div v-if="currentPage !== 0">
                    <span class="price-pill">
                        {{ data[currentPage]?.priceBTC  }}BTC / {{ data[currentPage]?.priceETH }}ETH
                    </span>
                    <p class="rec-pill">
                        {{ data[currentPage]?.recomendation }}
                    </p>
                    <div class="square" @mouseover="">
                        <PlusIcon class="plus"  />
                    </div>
                </div>
            </section>
            <SliderDot v-if="totalPage > 0" :quantity="totalPage" :actual-index="currentPage" :callback="doTransition"  />
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
    position:relative;
    cursor:pointer;
    color:rgba(255, 255, 255, 0.657);   
    transition: color ease-in-out .2s;
}
.chevron:hover{
    color:white;
}
.left,.right{
    top:0%;
}
.left{
    left:0;
}
.right{
    right: 0;
}
.title-pill{
    font-weight: 800;
}
.title-pill,.des-pill,.price-pill{
    font-size: xx-large;

}
.des-pill{
 font-weight: 100;
}
.price-pill{

}
.rec-pill{

}
main{
    margin: 2rem 1rem 1rem;
    height: calc(100vh - 8rem);
    display: flex;
    color:white;
    font-family: sans-serif;
    justify-content: center;
    position: relative;
    text-transform: uppercase;
}


section{
    align-self: flex-start;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3,minmax(200px,1fr));
}
section > picture{
    grid-column: 2/3;
}
section > div:first-child{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-top: 2rem;
    padding-left:2rem;
    justify-self: end;
}
section > div:last-child{
    align-content: end;
    padding-bottom: 2rem;
}
.square{
    outline: 2px solid white;
    aspect-ratio: 1;
    height: 4rem;
    display: flex;
    justify-content: center;

}
.square:hover{
    background-color: white;
}
.square:hover .plus{
    color:transparent;
}
.star,.plus{
    width: 3.2rem;
}


.picture{
    display:flex;
    align-items: center;
    justify-self: center;
    width: 95%;
    height: 100%;
    max-width: 650px;
    min-width: 100px;
}
.main-img{
    width: 100%;
    height: auto;
    object-fit: cover;
    animation-fill-mode: forwards;  /*JSAJDJASDJSAJD YA TE ENCONTREEEE*/
}
.img-animation{
    animation-name: cleanImage;
    animation-timing-function: ease-out;
    animation-duration: .7s;
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