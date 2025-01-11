<template>
    <chevron-left-icon 
    class="chevron left"
    @click="onclickPrev"/>
        <slot />    
        <slider-dot
        :callback="callback"
        :quantity="quantity"
        :actual-index="actualIndex" />
    <chevron-right-icon
    class="chevron right"
    @click="onclickNext"/>
</template>

<script lang="ts" setup>
import {
    ChevronLeftIcon,
    ChevronRightIcon
} from "@heroicons/vue/16/solid"
import SliderDot from "@components/SliderDot.vue";
interface Props{
    quantity: number,
    actualIndex: number,
    onclickNext?: ()=>void
    onclickPrev?: ()=>void
    callback? : (n : number) => void,
}
const {quantity = 0,actualIndex = 0,callback = ()=>{},onclickNext= ()=>{},onclickPrev= ()=>{}} = defineProps<Props>();

</script>
<style lang="css" scoped>
.chevron{
    height: 7rem;
    aspect-ratio: 2/3;
    position:relative;
    cursor:pointer;
    color:rgba(255, 255, 255, 0.657);   
    transition: color ease-in-out .2s;
}
.chevron:hover{
    color:white;
}
.left,.right{
    top:35%;
}
.left{
    left:0;
}
.right{
    right: 0;
}
</style>