<script lang="ts" setup>
import "../style.css"
interface Props{
    type?: string
    placeholder? : string
    width: string
}
const {type = "text",placeholder= "",width= "100%"} = defineProps<Props>();
</script>
<template>
    <input 
    class="my-input"
    :style="{width}"
    :type="type"
    :placeholder="placeholder"
    />
</template>
