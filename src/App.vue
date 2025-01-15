<script lang="ts" setup>
import { RouterView } from 'vue-router';  
import Layout from '@layouts/Layout.vue';
</script>
<!-- template renderiza el html  -->
<template> 
<Layout >
    <RouterView />
</Layout>
</template>
<style>
:root{
    --main-color: #0D151A;
    --line-color: rgba(255, 255, 255, 0.502);
}
*{
    box-sizing: border-box;
    font-family: "Roboto",sans-serif;
}
#app{
    height: 100%;
}
p{
    margin:0;
}
body{
    background-color :var(--main-color);
}
a{
    color:white;
    text-decoration: none;
}
</style>

