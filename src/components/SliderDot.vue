<script lang="ts" setup>
interface Props{
    quantity: number,
    actualIndex: number,
    callback? : (n : number) => void,
}
const {quantity = 0,actualIndex = 0,callback = ()=>{}} = defineProps<Props>();

const arrayDot : Array<string> = Array.from<string>({length:quantity}).fill("");

</script>

<template>
    <ul class="my-list-dot">
        <li 
        v-for="(dot,index) in arrayDot" 
        class="dot" 
        :key="index"
        :class="actualIndex === index && 'selected' "
        @click="() => {callback(index)}">
        {{dot}}
        </li>
    </ul>
</template>
<style lang="css" scoped>
.my-list-dot{
    position: absolute;
    height: 1.5rem;
    margin: 0;
    padding: 0;
    display: flex;
    gap:1rem;
    margin-right: 40px;
    justify-content: center;
    bottom: 0;
}

.dot{
    height: 100%;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: border ease-in-out .1s;
}

.dot::after{
    content: "";
    width: 40%;
    height: 40%;
    background-color: white;
    border-radius: 50%;
}
.dot:hover,
.selected{
    border:2px solid white;
    border-radius: 50%;
    background-color: transparent;
}
</style>