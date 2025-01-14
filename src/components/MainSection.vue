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
            <p class="show-animation dly-1">SHOP</p>
            <p class="show-animation dly-2">ALL THE DRUGS<br>YOU WANT</p>
        </article>
        <article class="opt sft">
            <p class="show-animation dly-3">SAFETY</p>
            <p class="show-animation dly4">IMPORTANT <br>INFORMATION</p>
        </article>
        <picture class="main-picture ">
            <img :src="img" alt="home-drug"/>
        </picture>
        <article class="opt faq">
            <p class="show-animation dly-5">FAQ</p>
            <p class="show-animation dly-6">ANSWERING <br>YOUR QUESTIONS </p>
        </article>
        <article class="opt ctc">
            <p class="show-animation dly-7">CONTACT</p>
            <p class="show-animation dly-8">SUGGESTIONS AND<br>FEEDBACK</p>               
        </article>
    </section>
</template>
<style lang="css" scoped>
.main-section{
    width: 100%;
    height: 97%;
    align-self: flex-start;
    display: grid;
    grid-template-columns:  minmax(100px,.8fr) minmax(500px,1fr) minmax(100px,.8fr);
    grid-template-rows: repeat(6,1fr);
    column-gap: 1rem;
}
.main-picture{
    grid-column: 2/3;
    grid-row: 1/7;
    place-content: center;
    width: 97.5%;
}
.main-picture img{
    width: 100%;
    object-fit: cover;
}
.opt p{
    font-size: 2rem;
 }
.opt p:first-child{
    font-weight: 900;
    font-size: 3.3rem;
}
.opt p:last-child{
    color:#ffffffb3;
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
@media screen and (max-width: 1100px) {
    .main-section{
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
    }
    .main-picture{
        grid-column: 1/2;
        grid-row: 1/2;
        align-self: center;
        justify-self: center;
        width: 150%;

    }
    .opt{
       display: none; 
    }
}
</style>