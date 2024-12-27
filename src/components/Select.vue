<script lang="ts" setup>
import "../style.css"
interface Props{
    label: string,
    name: string,
    onChange: (e:Event)=> void
}
const {label,name,onChange} = defineProps<Props>();
</script>
<template>
    <label :for="label" />
    <select
    class="my-input"
    :id="label"
    :name="name"
    onchange="onChange"
    >
        <slot />
    </select>

</template>