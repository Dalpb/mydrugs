<script lang="ts" setup>
import { DrugColor } from '@/interfaces/enums/DrugColor';
import RangeStar from './RangeStar.vue';
import { PlusIcon } from '@heroicons/vue/24/solid';
import { changeFirstChildColor } from '@/utils/colorHandlers';
import { Drug } from '@/interfaces/models/Drug.interface';
import { watch } from 'vue';
interface Props{
    drugInfo:Drug,
}
const {drugInfo} = defineProps<Props>();
const {name,description,recomendation,image,priceBTC,priceETH,rating,drugColor} = drugInfo;


</script>
<template>
    <section class="main-section">
        <div>
            <p>{{ name }}</p>
            <p>{{ description }}</p>
            <RangeStar :rating="rating" />
        </div>
        <picture>
            <img :src="image" alt="" />
        </picture>
        <div>
            <p>{{ priceBTC }}BTC / {{ priceETH }}ETH</p>
            <p>{{ recomendation }}</p>
            <div 
            class="square"
            @mouseover="(e)=>changeFirstChildColor(e,drugColor)"
            @mouseleave="(e)=>changeFirstChildColor(e,'white')">
                <PlusIcon id="plus" class="plus"/>
            </div>
        </div>
    </section>
</template>
<style lang="css">





/* Decoration for the square */
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
/* end of decoration */
</style>