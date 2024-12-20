<script setup lang="ts">
import Layout from '@layouts/Layout.vue';
import { Drug } from '@interfaces/models/Drug.interface';
import { ref } from 'vue';

const promotion : Array<Drug> = [];


let currentColor : string = "#0e0e0e";
let colors : Array<string> = ["#9f6983","#138aca"]
const id = ref<number | null>(null); 

const handleColor = (): void => {
    let pos: number = 0;
    const paint = () => {
        if (pos === 100) {
            if (id.value) cancelAnimationFrame(id.value!);
        } else {
            pos +=2;
            const color = `radial-gradient(circle,rgba(255, 255, 255, 0.309) 0%, transparent ${pos>=72 ? 70 : pos}%),linear-gradient(to left,#138aca  ${pos}%, ${currentColor} ${pos}% )`;
            window.document.body.style.backgroundImage = color;
            id.value = requestAnimationFrame(paint);
        }
    };
    if (id.value) cancelAnimationFrame(id.value);
    id.value = requestAnimationFrame(paint); 
};
</script>

<template> 
<Layout>
    <img src="/images/main_page.png" class="main-img">
    <button @click="handleColor">Cambia color</button>
</Layout>
</template>

<style lang="css" scoped>
.main-img{
    mask-image: radial-gradient(black 80%, transparent);
}

</style>
