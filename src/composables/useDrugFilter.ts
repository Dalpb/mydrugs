import { type Ref, ref, watch } from "vue";
import { type Drug } from "@/interfaces/models/Drug.interface";

export function useFilterDrug(data: Ref<Drug[]>) {
  const filterData = ref<Drug[]>([]);
  const nameFilter = ref<string>("");
  const colorFilter = ref<string>("");

  // Función que aplica TODOS los filtros desde el origen
  const applyFilters = () => {
    let result = [...data.value];

    // Filtrar por nombre si existe
    if (nameFilter.value) {
      const txt = nameFilter.value.toLowerCase();
      result = result.filter((elem) => elem.name?.toLowerCase().includes(txt));
    }

    // Filtrar por color si existe
    if (colorFilter.value) {
      result = result.filter((elem) => elem.drugColor === colorFilter.value);
    }

    filterData.value = result;
  };

  const filterByName = (txt: string) => {
    nameFilter.value = txt;
    applyFilters();
  };

  const filterByColor = (clr: string) => {
    colorFilter.value = clr;
    applyFilters();
  };

  // Inicializar cuando data tenga valores
  watch(
    data,
    (newData) => {
      if (newData.length > 0) {
        applyFilters();
      }
    },
    { immediate: true }
  );

  return {
    filterData,
    filterByName,
    filterByColor,
  };
}
