import { type Drug } from "@/interfaces/models/Drug.interface";
import {type Ref,ref,watch} from "vue"
export function useSortDrug (data: Ref<Drug[]>){
    const sortedData : Ref<Drug[]> = ref([...data.value]);

    const sortByMDMA =(option: "asc" | "desc")=>{
        switch(option){
            case "desc":
                sortedData.value = [...data.value].sort((a,b) => a.composition! - b.composition!);
                break;
            case "asc":
                sortedData.value = [...data.value].sort((a,b) => b.composition! - a.composition!);
                break;
        }
    }
    const sortByPrice =(option: "asc" | "desc")=>{
        switch(option){
            case "desc":
                sortedData.value = [...data.value].sort((a,b) => a.priceBTC! - b.priceBTC!);
                break;
            case "asc":
                sortedData.value = [...data.value].sort((a,b) => b.priceBTC! - a.priceBTC!);
                break;
        }
    }

    const sortByPopularity =()=>{
        sortedData.value = [...data.value].sort((a,b)=>a.rating! - b.rating!);
    }

    watch(data, (newData) => {
        if (newData.length > 0)sortedData.value = [...newData];
    });

    return{
        sortedData,
        sortByPrice,
        sortByPopularity,
        sortByMDMA
    }
}