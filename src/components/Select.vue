<script lang="ts" setup>
import "../style.css"
import { ChevronDownIcon } from "@heroicons/vue/16/solid";
import { 
    provide,
    ref,
    onMounted,
    nextTick
} from "vue";

interface Props{
    classNew? : string,
    value?:string,
    name:string,
    onchange?:(value : string)=>void
}
const {classNew = "",name="",onchange = ()=>{}} = defineProps<Props>();
const isOpen = ref(false);
const currentValue = ref("");
const currentLabel = ref("");
const updateValue = (newValue:string,newLabel : string) => {
    currentLabel.value = newLabel;
    currentValue.value = newValue;
}

const handleDropdown =() => isOpen.value = !isOpen.value;

onMounted(async () => {
    isOpen.value = true;
    await nextTick();
    const ul: HTMLElement  = document.getElementById(name);
    if (!ul || !ul.firstElementChild) return;
    const firstChild = ul.firstElementChild as HTMLElement;
    const newValue = firstChild.getAttribute("id");
    const newLabel = firstChild.textContent?.trim();
    updateValue(newValue, newLabel);
    isOpen.value = false; 
});

provide('selecTrigger',{
    currentValue,
    currentLabel,
    updateValue,
    handleDropdown,
    onchange
})
</script>
<template>
    <div class="select-container" :class="classNew" >
        <div tabindex="0" class="my-input my-select"
        :class="isOpen && 'open'"
        @click="handleDropdown">
            <span>{{ currentLabel}}</span>
            <ChevronDownIcon class="chevron"/>
        </div>
        <ul :id="name">
            <slot v-if="isOpen" />
        </ul>
    </div>
</template>
