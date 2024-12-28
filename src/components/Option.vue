<script lang="ts" setup>
import { Ref, ref,inject, onMounted, onBeforeMount } from 'vue';
import "../style.css"
type SelectTrigger = {
  currentLabel: string;
  currentValue: string;
  updateValue: (value: string,label:string) => void;
  handleDropdown: ()=>void
  onchange: ()=>{}
};
interface Props{
    value: string,
    label: string
}
const {value,label} = defineProps<Props>();
const {
currentLabel,
currentValue,
handleDropdown,
updateValue,
onchange,
} = inject<SelectTrigger>('selecTrigger');

const handleClick =() =>{
    updateValue(value,label);
    onchange();
    handleDropdown();
}

</script>
<template>
    <li class="my-option" :id="value"
    :class="value=== currentValue && 'selected'"
    @click="handleClick">{{ label }}</li>
</template>
