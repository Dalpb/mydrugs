<script lang="ts" setup>
import "../style.css"
interface Props{
    type?:string
    placeholder? : string
    width: string
    classNew?: string
    onchange : (e:Event)=>void
}
const {type = "text",placeholder= "",width= "100%",classNew="",onchange =()=>{}} = defineProps<Props>();
</script>
<template>
    <input 
    class="my-input"
    :class="classNew"
    :style="{width}"
    :type="type"
    :placeholder="placeholder"
    @input="onchange"
    />
    
</template>
