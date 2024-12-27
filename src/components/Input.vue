<script lang="ts" setup>
import "../style.css"
interface Props{
    type?:string
    placeholder? : string
    width: string
    select?:boolean
    classNew?: string 
}
const {type = "text",placeholder= "",width= "100%",select= false,classNew=""} = defineProps<Props>();
</script>
<template>
    <input 
    v-if="!select"
    class="my-input"
    :class="classNew"
    :style="{width}"
    :type="type"
    :placeholder="placeholder"
    />
    <select
    v-else
    class="my-input my-select"
    :class="classNew"
    :style="{width}">
        <slot/>
    </select>
    
</template>
