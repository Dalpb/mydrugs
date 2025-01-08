<script lang="ts" setup>
interface Props{
    onmouseover?:(e:Event)=>void
    onmouseleave?:(e:Event)=>void
    onclick?: (e:Event)=>void
    addClass?: string
    
}
const {addClass= "", onclick = ()=>{}, onmouseover= ()=>{}, onmouseleave = ()=>{} } = defineProps<Props>();
</script>
<template>    
    <button 
    class="btn"
    :class="addClass"
    @click="onclick"
    @mouseleave="onmouseleave"
    @mouseover="onmouseover"
    >
        <span>
            <slot/>
        </span>
    </button>
</template>
<style lang="css" scoped>

.btn{
    padding: 9px .9rem;
    height: 2.4rem;
    color:white;
    border:1.8px solid white;
    border-radius: 2rem;
    text-transform: uppercase;
    font-weight: 600;
    font-size: large;
    background-color: transparent;
    transition-property: background-color;
    transition-timing-function: ease-in-out;
    transition-duration: .1s;
}
.btn:hover{
    background-color: white;
}
</style>