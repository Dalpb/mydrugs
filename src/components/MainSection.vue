<script lang="ts" setup>
interface Props{
    img?:string,
}
const {img} = defineProps<Props>();
</script>

<template>
    <section>
        <div>
            <article>
                <p>SHOP</p>
                <p>ALL THE DRUGS<br>YOU WANT</p>
            </article>
            <article>
                <p>SAFETY</p>
                <p>IMPORTANT <br>INFORMATION</p>
            </article>
        </div>
        <picture>
            <img :src="img" alt="home-drug"/>
        </picture>
        <div>
            <article>
                <p>FAQ</p>
                <p>ANSWERING <br>YOUR QUESTIONS </p>
            </article>
            <article>
                <p>CONTACT</p>
                <p>SUGGESTIONS AND<br>FEEDBACK</p>               
            </article>
        </div>
    </section>
</template>