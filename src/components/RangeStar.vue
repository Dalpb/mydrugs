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
        <StarIconSolid v-for="n in rating "  :style="`width:${width}`" />
        <StarIconOutline v-for="n in 5-rating"  :style="`width:${width}`"/>
    </div>
</template>
<style lang="css">
</style>