<script lang="ts" setup>
import "../style.css"
import { ChevronDownIcon } from "@heroicons/vue/16/solid";
interface Props{
    classNew? : string,
    value?:string
}
const {value = "" ,classNew = ""} = defineProps<Props>();
</script>
<template>
    <div class="select-container" :class="classNew">
        <div tabindex="0" class="my-input my-select">
            <span>{{ value }}</span>
            <ChevronDownIcon class="chevron"/>
        </div>
        <ul>
            <li>Una wea</li>
        </ul>
    </div>
</template>
<style lang="css" scoped>
.select-container {
    position: relative;
}
.select-container > ul{
    position:absolute;
    margin:0;
    padding: 0;
    width: 0;
    color: transparent;
}
.my-select {
    display: flex;
    padding-left: 1rem;
    justify-content: space-between;
}
.my-select .chevron{
    transition:  transform .3s ease-in-out;
}
.my-select:focus .chevron{
    transform: rotate(-90deg);
}
.my-select:focus + ul{
    width: 100%;
    min-height: 1rem;
    bottom: -1.2rem;
    background-color: aliceblue;
    color: black;
}
</style>