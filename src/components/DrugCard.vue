<script lang="ts" setup>
import { Drug } from '@interfaces/models/Drug.interface';
import RangeStar from './RangeStar.vue';
import { changeColorPropety } from '@/utils/colorHandlers';
import { onMounted, ref, Ref } from 'vue';
interface Props{
    drug: Drug
}
const { drug } = defineProps<Props>(); 

const colorEffect =(e : Event) =>{
    const elem = e.currentTarget as HTMLElement;
    changeColorPropety(elem,'--local-color',drug.drugColor+"fd");
    changeColorPropety(elem,'--local-seccolor',drug.drugColor+"40");
}
const removeInit = (e :Event) =>{
    const elem = e.currentTarget as HTMLElement;
    elem.classList.remove("init-animation");
}

</script>
<template>
<article class="init-animation" 
:onmouseover="colorEffect"
v-on:animationend="removeInit">
   <div class="product-img">
       <img :src="drug.image" alt=" "/>
    </div> 
    <p class="title ">{{ drug.name }}</p>
    <span class="info txt">{{ drug.composition }}MG MDMA PER PILL</span>
    <RangeStar :rating="drug.rating" width="1.5rem"/>
    <p class="txt">{{ drug.recomendation.length > 65 ? drug.recomendation.slice(0,65)+"..." : drug.recomendation }}</p>
    <span>{{ drug.priceBTC }} BTC</span>
    <span>{{ drug.priceETH }} ETH</span>
</article>
</template>

<style lang="css" scoped>

article{
    --local-color :#138acafd;
    --local-seccolor: #138aca40;
}
.title{
    font-weight: 800;
    font-size: 2rem;
    text-transform: uppercase;
}
.txt{
    color:rgba(156, 163, 175, 0.722);
}
.info{
    font-weight: 600;
}
.product-img{
    height: 40%;
    width: 100%;
}
img{
    height: 100%;
    width: 100%;
    object-fit: contain;
}
article{
    width: 18rem;
    padding: .7rem;
    border:1px solid white;
    border-radius: 15px;
    display: flex;
    flex-flow: column nowrap;
    gap: .5rem;
    cursor: pointer;
}
.init-animation{
    /* mejorar animacion  */
    animation : show .7s linear  1 forwards;
}
article:hover .product-img{
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
    animation: drop-shadow-lamp .3s ease-in-out  1 forwards;
}
article:hover{
    animation: lamp .3s ease-in-out  1 forwards;
}

@keyframes drop-shadow-lamp {
    0%{
        filter: drop-shadow(0 0 0px rgba(0, 0, 0, 0.5));
    }
    40%{
    filter: drop-shadow(0 0 10px var(--local-color));
    }
    60%{
        filter: drop-shadow(0 0 0px rgba(0, 0, 0, 0.5));
    }
    100%{
        filter: drop-shadow(0 0 10px var(--local-color));
    }  
}
@keyframes lamp {
    0%{
        box-shadow: none;
    }
    40%{
    box-shadow: 0 0 20px var(--local-color)
    }
    60%{
        box-shadow: none;
    }
    100%{
        box-shadow: 0 0 20px var(--local-color)
    
    }
}
@keyframes show {
    from{
        opacity: 0;
        transform: translateY(3rem);
    }
    to{
        opacity: 1;
        transform: translateY(0);

    }
}

</style>