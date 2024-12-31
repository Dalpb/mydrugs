<script lang="ts" setup>
import MainView from '@views/MainView.vue';
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
    --main-color: #0e0e0e;
}

*{
    box-sizing: border-box;
    font-family: sans-serif;
}
p{
    margin:0;
}
body{
    background-color :var(--main-color);
}
</style>

