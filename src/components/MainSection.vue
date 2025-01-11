<script lang="ts" setup>
import "../styles/myanimations.css"
interface Props{
    img?:string,
}
const {img} = defineProps<Props>();
</script>

<template>
    <section class="main-section">
        <article class="opt shp">
            <p class="show-text-animation dly-1">SHOP</p>
            <p class="show-text-animation dly-2">ALL THE DRUGS<br>YOU WANT</p>
        </article>
        <article class="opt sft">
            <p class="show-text-animation dly-3">SAFETY</p>
            <p class="show-text-animation dly4">IMPORTANT <br>INFORMATION</p>
        </article>
        <picture class="main-picture">
            <img :src="img" alt="home-drug"/>
        </picture>
        <article class="opt faq">
            <p class="show-text-animation dly-5">FAQ</p>
            <p class="show-text-animation dly-6">ANSWERING <br>YOUR QUESTIONS </p>
        </article>
        <article class="opt ctc">
            <p class="show-text-animation dly-7">CONTACT</p>
            <p class="show-text-animation dly-8">SUGGESTIONS AND<br>FEEDBACK</p>               
        </article>
    </section>
</template>
<style lang="css" scoped>
.main-section{
    width: 100%;
    height: 97%;
    align-self: flex-start;
    display: grid;
    grid-template-columns:  minmax(100px,.8fr) minmax(100px,1fr) minmax(100px,.8fr);
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
    column-gap: 1rem;
}
.main-picture{
    grid-column: 2/3;
    grid-row: 1/7;
    justify-self: center;
}
.main-picture img{
    height: 100%;
    object-fit: cover;
}
.opt p{
    font-size: 2.5rem;
 }
.opt p:first-child{
    font-weight: 900;
    font-size: 3.5rem;
}
.shp,.faq{
grid-row: 2/3;
}
.ctc,.sft{
    grid-row: 5/6;
}
.shp,.sft{
    text-align: end;
}

</style>