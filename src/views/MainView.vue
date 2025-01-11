<script setup lang="ts">
import { 
    ref,
    Ref,
    watch,
    onMounted,
    onUnmounted,
} from 'vue';
import { Drug } from '@interfaces/models/Drug.interface';
import SliderContainer from '@/components/SliderContainer.vue';
import DrugSection from "@components/DrugSection.vue"
import MainSection from '@/components/MainSection.vue';
import { usePagination } from '@hooks/usePagination';
import { DrugColor } from '@/interfaces/enums/DrugColor';
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


const doTransition = (index : number): void  =>{
    if(index === currentPage.value)return;

    const oldColor = currentScreen.value.drugColor;
    const newColor = data.value[index]?.drugColor;

    currentScreen.value = data.value[index];
    doTransitionLeftColor(id.value,oldColor,newColor,2,index !==0);
    changePage(index);
    changeColorPropety(window.document.documentElement,"--main-color",newColor);
    // manageImage(data.value[index]?.image);
}
const doPrevTransition = () : void =>{
    const prev = getPreviusPage();
    doTransition(prev);
}
const doNextTransition = () :void  =>{
    const next = getNextPage();
    doTransition(next);
}
// const manageImage = (newImage: string) : void =>{
//     changing.value = true;
//     setTimeout(()=>{
//         changing.value = false;
//         currentImage.value = newImage;
//     },700);
// }
onMounted(fechData);
onUnmounted(()=>{
    window.document.body.style.backgroundImage = "none";
    changeColorPropety(window.document.documentElement,"--main-color","#0e0e0e");
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
            v-if="currentPage == 0"
            :img="currentScreen.image">
            </main-section>
            
            <drug-section 
            v-else
            :key="currentScreen.name"
            :drug-info="currentScreen"
            </drug-section>
        </slider-container>
    </main>
</template>


<style lang="css" scoped>

.title-pill,.des-pill{
    text-transform: uppercase;
}

.title-pill{
    font-weight: 900;
    font-size: 4rem;
    white-space: pre;
    text-shadow: 0px 0px 15px  rgba(0, 0, 0, 0.347);
}
.des-pill,.price-pill{
    font-size: xx-large;
    white-space: pre;

}
.rec-pill{
    margin: 1rem 0;
}
.des-pill{
 font-weight: 400;
 text-align: end;
}
main{
    margin: 2rem 0rem 1rem;
    width: 100%;
    height: calc(100vh - 8rem);
    display: flex;
    justify-content: space-between;
    position: relative;
    color:white;
}


/* section{
    width: 100%;
    height: 90%;
    align-self: flex-start;
    display: grid;
    grid-template-columns:  minmax(100px,.8fr) minmax(100px,1fr) minmax(100px,.8fr);
    grid-template-rows: 1fr;
    column-gap: 1rem;
}
section > picture{
    grid-column: 2/3;
}

section > div:last-child.presentation{
    justify-self: start;
}

section > div:first-child.presentation,
section > div:last-child.presentation{
    height: 100%;
    padding: 0;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
}
section > div:first-child{
    display: flex;
    flex-direction: column;
    text-align: end;
    padding-bottom: 20rem;
    align-self: center;
}
section > div:last-child{
    align-self: center;
    padding-top: 10rem;

} */


.square{
    height: 4rem;
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    outline: 2px solid white;
    cursor: pointer;

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
    width: 100%;
    height: 90%;
    max-width: 650px;
    min-width: 100px;
}
.main-img{
    width: 100%;
    height: 100%;
    object-fit: contain;
    animation-fill-mode: forwards;  /*JSAJDJASDJSAJD YA TE ENCONTREEEE*/
}
.img-animation{
    animation-name: cleanImage;
    animation-timing-function: ease-out;
    animation-duration: .7s;
}
/* .info-animation{
    animation-name: decorationText;
    animation-timing-function: ease-in;
    animation-duration: .25s;
}

.dlay-1{
    animation-delay: .25s;
}
.dlay-2{
    animation-delay: .5s;
    
}
.dlay-3{
    animation-delay: .3s;
    
}
.dlay-4{
    animation-delay: .4s;

}
.dlay-5{
    animation-delay: .5s;

}
.dlay-6{
    animation-delay: .6s;

}
.dlay-7{
    animation-delay: .7s;

}
.dlay-8{
    animation-delay: .8s;

} */

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

/* @keyframes decorationText{
    from{
        transform: translateY(100px);
        opacity: 0;
    }
    to{
        transform: translateX(0);
        opacity: 1;
    }
} */
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