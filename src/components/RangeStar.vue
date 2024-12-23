<script setup lang="ts">
import { StarIcon } from '@heroicons/vue/24/outline';
interface Props{
    rating? : number
}
const {rating = 0} = defineProps<Props>();  

</script>
<template>
    <div class="star-rating">
        <StarIcon v-for="n in 5 "  class="star"  />

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