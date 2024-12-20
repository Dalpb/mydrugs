<script setup lang="ts">
import Layout from '@layouts/Layout.vue';
import { Drug } from '@interfaces/models/Drug.interface';
import { onMounted, Ref, ref } from 'vue';
const id : Ref<number | null> = ref(null); 
let currentColor : Ref<string>= ref("#0e0e0e");
const data: Ref< Array<Drug> > = ref([]);
const error = ref(null);
const fechData = async () =>{
   try{
    const response = await fetch("/src/mocks/drugsPopularity.json");
    const responseJson  = await response.json();
    data.value = responseJson.data.drugs;
   }
   catch(error){
    console.log("Error al cargar el JSON");
   }
} 

onMounted(fechData);

const handleColor = (): void => {
    let pos: number = 0;
    const paint = () => {
        if (pos > 100) {
            if (id.value) cancelAnimationFrame(id.value!);
        } else {
            pos +=2;
            const color = `radial-gradient(circle,rgba(255, 255, 255, 0.35) 0%, transparent ${pos>=72 ? 70 : pos}%),linear-gradient(to left,#9f6983  ${pos}%, ${currentColor.value} ${pos}% )`;
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
    <main>
        <picture class="picture">
            <img src="/images/main_page.png" class="main-img">
        </picture>
    </main>
</Layout>
</template>


<style lang="css" scoped>
main{
    margin: 2rem 2rem 1rem;
    height: calc(100vh - 8rem);
    display: flex;
    justify-content: center;
}
picture{
    display:flex;
    align-items: flex-start;
    width: 80vw;
    height: 80%;
    max-width: 650px;
    min-width: 100px;
    padding:  2rem;
    margin-right: 40px;
}
.main-img{
    width: 100%;
    height: auto;
    object-fit: cover;
}
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