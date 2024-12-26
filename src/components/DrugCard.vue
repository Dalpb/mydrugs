<script lang="ts" setup>
import { Drug } from '@interfaces/models/Drug.interface';
import RangeStar from './RangeStar.vue';
import { changeColorPropety } from '@/utils/colorHandlers';
import { onMounted, ref, Ref } from 'vue';
interface Props{
    drug: Drug
}
const { drug } = defineProps<Props>(); 
const inicio : Ref<boolean> = ref(false);

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
    <span class="info txt">{{ drug.composition }} PER PILL</span>
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
    width: 20rem;
    padding: .7rem;
    border:1px solid white;
    border-radius: 15px;
    display: flex;
    flex-flow: column nowrap;
    gap: .5rem;
    cursor: pointer;
}
.init-animation{
    animation : init 1s ease-out 1 forwards;
}
article:hover{
    animation: lamp .3s ease-in-out  1 forwards;

}
@keyframes lamp {
    0%{
        box-shadow: none;
    }
    40%{
    box-shadow: 0 0 30px var(--local-color), 0 0 50px var(--local-seccolor) inset;
    }
    60%{
        box-shadow: none;
    }
    100%{
        box-shadow: 0 0 30px var(--local-color), 0 0 50px  var(--local-seccolor) inset;
    
    }
}
@keyframes init {
    from{
        opacity: 0;
        transform: translateY(5rem);
    }
    to{
        opacity: 1;
        transform: translateY(0);
    }
}
</style>