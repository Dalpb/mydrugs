<script setup lang="ts">
interface Props{
    title?: string
}
const {title = ""} = defineProps<Props>();
</script>

<template>
    <div class="card">
        <div :if="title" class="card-head">
            {{ title }}
        </div>
        <div class="card-body">
            <slot/>
        </div>
    </div>
</template>
<style lang="css" scoped>
.card{
    padding: 0 1rem;
    border: white 1px solid;
    border-radius: 0.5rem;
    color: white
}
.card-head{
    font-size: xx-large;
    font-weight: bold;
}
.card-body{
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
}
</style>