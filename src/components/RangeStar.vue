<script setup lang="ts">
import { StarIcon as StarIconOutline } from '@heroicons/vue/24/outline';
import { StarIcon as StarIconSolid} from '@heroicons/vue/24/solid';
interface Props{
    rating? : number
    width?: string
}
const {rating = 0,width = "2.5rem"} = defineProps<Props>();  

</script>
<template>
    <div class="star-rating" >
        <StarIconSolid v-for=" in rating "  :style="`width:${width}`" />
        <StarIconOutline v-for=" in 5-rating"  :style="`width:${width}`"/>
    </div>
</template>
<style lang="css">
@media screen and (max-height:600px){
    .star-rating > *{
        height: 2rem;
    }
}
</style>