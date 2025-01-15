<script lang="ts" setup>
import {inject} from 'vue';
import "../style.css"

type SelectTrigger = {
  currentLabel: string;
  currentValue: string;
  updateValue: (value: string,label:string) => void;
  handleDropdown: ()=>void
  onchange: (value : string)=>void
};


interface Props{
    value: string,
    label: string
}
const {value,label} = defineProps<Props>();
const {
currentValue,
handleDropdown,
updateValue,
onchange,
} = inject<SelectTrigger>('selecTrigger')!;

const handleClick =() =>{
    if(value === currentValue)return;
    
    updateValue(value,label);
    console.log("dsadsa");
    onchange(value);
    handleDropdown();
}

</script>
<template>
    <li class="my-option" :id="value"
    :class="value=== currentValue && 'selected'"
    @click="handleClick">{{ label }}</li>
</template>
