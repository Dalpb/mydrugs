<script lang="ts" setup>
import "../style.css"
import { ChevronDownIcon } from "@heroicons/vue/16/solid";
import { provide,inject, ref, onMounted } from "vue";
interface Props{
    classNew? : string,
    value?:string
}
const {classNew = ""} = defineProps<Props>();
const isOpen = ref(false);
const currentValue = ref("");
const currentLabel = ref("");
const updateValue = (newValue:string,newLabel : string) => {
    currentLabel.value = newLabel;
    currentValue.value = newValue;
}

const handleDropdown =() => isOpen.value = !isOpen.value;
const handleInit = (option : HTMLElement) => {

}
provide('selecTrigger',{
    currentValue,
    currentLabel,
    updateValue,
    handleDropdown
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
        <ul v-if="isOpen">
            <slot />
        </ul>
    </div>
</template>
