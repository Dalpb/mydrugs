<script lang="ts" setup>
import "../styles/myanimations.css"
import RangeStar from './RangeStar.vue';
import { PlusIcon } from '@heroicons/vue/24/solid';
import { changeFirstChildColor } from '@/utils/colorHandlers';
import { Drug } from '@/interfaces/models/Drug.interface';

interface Props{
    drugInfo:Drug,
    changing:boolean
}
const {drugInfo,changing} = defineProps<Props>();
const {name,description,recomendation,image,priceBTC,priceETH,rating,drugColor} = drugInfo;

</script>
<template>
    <section class="main-section">
        <article class="inf-1 "  v-bind:class="changing ? 'hide-animation' : 'show-animation' ">
            <p>{{ name }}</p>
            <p class="a">{{ description }}</p>
            <RangeStar :rating="rating"/>
        </article>
        <picture class="main-picture" v-bind:class="changing && 'clean-animation'">
            <img :src="image" :alt="image" />
        </picture>
        <article class="inf-2" v-bind:class="changing ? 'hide-animation' : 'show-animation'" >
            <p>{{ priceBTC }}BTC / {{ priceETH }}ETH</p>
            <p>{{ recomendation }}</p>
            <div 
            class="square"
            @mouseover="(e)=>changeFirstChildColor(e,drugColor)"
            @mouseleave="(e)=>changeFirstChildColor(e,'white')">
                <PlusIcon id="plus" class="plus"/>
            </div>
        </article>
    </section>
</template>
<style lang="css" scoped>
.a{
    color:#ffffffb3;
}
/* content styles */
.show-animation{
    animation-duration: .45s;
}
.main-section{
    width: 100%;
    height: 97%;
    align-self: flex-start;
    display: grid;
    grid-template-columns:  minmax(100px,.8fr) minmax(100px,1fr) minmax(100px,.8fr);
    grid-template-rows: repeat(8,1fr);
    column-gap: 1rem;
}
.main-picture{
    grid-column: 2/3;
    grid-row: 1/9;
    place-self: center;
    width: 100%;
}
.main-picture img{
    width: 100%;
    object-fit: contain;
}

.main-section article:first-of-type{
    grid-row: 2/5;
    text-align: end;
    white-space: pre;
    text-transform: uppercase;
}
.main-section article:last-of-type{
    grid-column: 3/4;
    grid-row: 5/8;
}
/* end content styles */

/* letter styles */
.inf-1 p{
    font-size: 2.5rem;
 }
.inf-1 p:first-child{
    font-weight: 900;
    font-size: 3.5rem;
    text-shadow: 0px 0px 15px  rgba(0, 0, 0, 0.347);
}
.inf-2{
    display: flex;
    flex-direction: column;
    gap:.5rem;
    align-items: start;
}
.inf-2 p{
    font-size: 1.25rem;
}
.inf-2 p:first-child{
    font-weight: 300;
}
/* end letter styles */


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
    background-color: rgba(255, 255, 255, 0.164);
}
.square:hover .plus{
    color:transparent;
}
.star,.plus{
    width: 3.2rem;
}
/* end of decoration */

/* responsive desgin */
@media screen and (max-width: 1100px) {
    .main-section{
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr ;
        row-gap: 1rem;
        column-gap: 0rem;
    }
    .main-picture{
        grid-row: 2/5;
        grid-column: 1/2;
        align-self: flex-start;
        width: 85%;
    }
    .main-section article:first-of-type{
        grid-row: 1/2;
        grid-column: 1/2;
        align-self: end;
        text-align: center;
    }
    .main-section article:last-of-type{
    display: none;
    }

    .inf-1 p:first-child{
        font-size: 2.8rem;
    }
    .inf-1 p{
    font-size: 1.8rem;
    }
}
@media screen and (max-height: 600px){
    .inf-1 p:first-child{
        font-size: 1.8rem;
    }
    .inf-1 p{
    font-size: 1rem;
    }
}
</style>