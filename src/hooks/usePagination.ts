import {ref,Ref} from "vue"

export function usePagination(initialPage : number = 0){
    const currentPage : Ref<number> = ref(initialPage);
    const totalPage : Ref<number | null> = ref(null);

    const changePage = (index : number ): void => {
        currentPage.value = index;
    }
    const getNextPage = () : number =>{
        if(totalPage.value === null)return -1;
        const next : number = (currentPage.value +1) % totalPage.value ;
        return next;
    }
    const getPreviusPage = () : number => {
        if(totalPage.value === null)return -1;
        const prev :number = (currentPage.value -1 + totalPage.value) % totalPage.value;
        return prev;
    }
    return{
        currentPage,
        totalPage,
        changePage,
        getNextPage,
        getPreviusPage
    }

}