<script setup lang="ts">
import Layout from '@layouts/Layout.vue';
import { Drug } from '@interfaces/models/Drug.interface';
import { onMounted, Ref, ref } from 'vue';
import {ChevronLeftIcon,ChevronRightIcon} from "@heroicons/vue/16/solid"
import SliderDot from "@components/SliderDot.vue";
import { usePagination } from '@hooks/usePagination';

const id : Ref<number | null> = ref(null); 
let currentColor : Ref<string>= ref("#0e0e0e");
const {
   currentPage,
   totalPage,
   changePage,
   nextPage,
   previusPage 
} =usePagination(0,5);



const data: Ref< Array<Drug> > = ref([]);
const error = ref(null);
const fechData = async () =>{
   try{
    const response = await fetch("/src/mocks/drugsPopularity.json");
    const responseJson  = await response.json();
    data.value = responseJson.data.drugs;
   }
   catch(error){
    console.log("Error al cargar el JSON");
   }
} 
const handleColor = (): void => {
    let pos: number = 0;
    const paint = () => {
        if (pos > 100) {
            if (id.value) cancelAnimationFrame(id.value!);
        } else {
            pos +=2;
            const color = `radial-gradient(circle,rgba(255, 255, 255, 0.35) 0%, transparent ${pos>=72 ? 70 : pos}%),linear-gradient(to left,#9f6983  ${pos}%, ${currentColor.value} ${pos}% )`;
            window.document.body.style.backgroundImage = color;
            id.value = requestAnimationFrame(paint);
        }
    };
    if (id.value) cancelAnimationFrame(id.value);
    id.value = requestAnimationFrame(paint); 
};

onMounted(fechData);




</script>

<template> 
<Layout>
    <main>
        <ChevronLeftIcon class="chevron left" v-if="totalPage > 0" @click="previusPage" />
        <div>
            <picture class="picture">
                <img src="/images/main_page.png" class="main-img">
            </picture>
            <SliderDot :quantity="totalPage" :actual-index="currentPage" :callback="changePage"  />
        </div>
        <ChevronRightIcon class="chevron right" v-if="totalPage > 0" @click="nextPage"/>
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
    animation-name: cleanImage;
    animation-timing-function: ease-in-out;
    animation-duration: .7s;
    animation-fill-mode: forwards;
}
.main-img{
    width: 100%;
    height: auto;
    object-fit: cover;
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