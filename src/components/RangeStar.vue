<script setup lang="ts">
import { StarIcon as StarIconOutline } from '@heroicons/vue/24/outline';
import { StarIcon as StarIconSolid} from '@heroicons/vue/24/solid';
interface Props{
    rating? : number
}
const {rating = 0} = defineProps<Props>();  

</script>
<template>
    <div class="star-rating">
        <StarIconSolid v-for="n in rating "  class="star"  />
        <StarIconOutline v-for="n in 5-rating" class="star"/>
    </div>
</template>
<style lang="css">

.star{
    width: 2.5rem;
}
.star-rating{
    display: inline-block;
    position: relative;
}
</style>