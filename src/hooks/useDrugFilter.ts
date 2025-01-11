import { Ref,ref,watch } from "vue";
import { Drug } from "../interfaces/models/Drug.interface";

export function useFilterDrug(data: Ref<Drug[]>){
    console.log(data.value);
    const filterData : Ref<Drug []> = ref([...data.value]);

    const resetData = () =>{
        filterData.value = [...data.value];
    }

    const filterByName = (txt: string) =>{
        if(!txt){
            resetData();
            return;
        }
        txt = txt.toLowerCase();
        filterData.value = filterData.value.filter( elem => elem.name?.toLowerCase().includes(txt));
    }
    const filterByColor = (clr:string) =>{
        if(!clr){
            resetData();
            return;
        }
        filterData.value = data.value.filter( elem => elem.drugColor === clr);
    }
    
    watch(data, (newData) => {
        if (newData.length > 0)filterByName('');
    });

    return{
        filterData,
        filterByName,
        filterByColor
    }
}