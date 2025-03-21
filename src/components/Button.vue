<script lang="ts" setup>
import "@/styles/button.css"
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