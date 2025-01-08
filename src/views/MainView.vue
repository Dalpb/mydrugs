<script setup lang="ts">
import { 
    ref,
    Ref,
    watch,
    onMounted,
    onUnmounted,
} from 'vue';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    PlusIcon,
} from "@heroicons/vue/16/solid"
import { Drug } from '@interfaces/models/Drug.interface';
import SliderDot from "@components/SliderDot.vue";
import RangeStar from '@/components/RangeStar.vue';
import { usePagination } from '@hooks/usePagination';
import { DrugColor } from '@/interfaces/enums/DrugColor';
import { changeColorPropety, changeFirstChildColor,doTransitionLeftColor } from '@/utils/colorHandlers';

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


const doTransition = (index : number): void  =>{
    if(index === currentPage.value)return;
    doTransitionLeftColor(id.value,data.value[currentPage.value]?.drugColor,data.value[index]?.drugColor,2);
    changePage(index);
    changeColorPropety(window.document.documentElement,"--main-color",data.value[index]?.drugColor);
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
        changing.value = false;
        currentImage.value = newImage;
    },700);
}
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
        <ChevronLeftIcon
        v-if="totalPage > 0"
        class="chevron left"
        @click="doPrevTransition"/>
            <section>
                <div v-if="currentPage !== 0">
                        <p class="title-pill">{{ data[currentPage]?.name }}</p>
                        <p class="des-pill">{{ data[currentPage].description }}</p>
                        <RangeStar :rating="data[currentPage]?.rating"/>
                </div>
                <div v-else class="presentation">
                    <div>
                        <p class="title-pill info-animation dlay-1">SHOP</p><br>
                        <p class="des-pill info-animation dlay-2">ALL THE DRUGS <br> YOU WANT</p>
                    </div>
                    <div>
                        <p class="title-pill info-animation dlay-3">SAFETY</p><br>
                        <p class="des-pill info-animation dlay-4">IMPORTANT <br> INFORMATION</p>
                    </div>
                </div>
                <picture class="picture ">
                    <img :src="currentImage" class="main-img" :class="changing && 'img-animation' " >
                </picture>
                <div v-if="currentPage !== 0">
                    <p class="price-pill">
                        {{ data[currentPage]?.priceBTC  }}BTC / {{ data[currentPage]?.priceETH }}ETH
                    </p>
                    <p class="rec-pill">
                        {{ data[currentPage]?.recomendation }}
                    </p>
                    <div
                    class="square"
                    @mouseover="(e) => changeFirstChildColor(e,data[currentPage]?.drugColor)"
                    @mouseleave="(e) => changeFirstChildColor(e,'white')">
                        <PlusIcon id="plus" class="plus"  />
                    </div>
                </div>
                <div v-else class="presentation">
                    <div>
                        <p class="title-pill info-animation dlay-5">FAQ</p><br>
                        <p class="des-pill info-animation dlay-6">ANSWERING <br> YOUR QUESTIONS </p>
                    </div>
                    <div>
                        <p class="title-pill info-animation dlay-7">CONTACT</p><br>
                        <p class="des-pill info-animation dlay-8">SUGGESTIONS AND <br> FEEDBACK</p>
                    </div>
                 </div>
            </section>
            <SliderDot v-if="totalPage > 0" :quantity="totalPage" :actual-index="currentPage" :callback="doTransition"  />
        <ChevronRightIcon 
        v-if="totalPage > 0"
        class="chevron right"
        @click="doNextTransition"/>
    </main>
</template>


<style lang="css" scoped>
.chevron{
    height: 7rem;
    aspect-ratio: 2/3;
    position:relative;
    cursor:pointer;
    color:rgba(255, 255, 255, 0.657);   
    transition: color ease-in-out .2s;
}
.chevron:hover{
    color:white;
}
.left,.right{
    top:30%;
}
.left{
    left:0;
}
.right{
    right: 0;
}
.title-pill,.des-pill{
    text-transform: uppercase;
}

.title-pill{
    font-weight: 800;
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
 font-weight: 100;
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


section{
    width: 100%;
    height: 90%;
    align-self: flex-start;
    display: grid;
    grid-template-columns:  minmax(100px,.8fr) minmax(100px,1fr) minmax(100px,.8fr);
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

}


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