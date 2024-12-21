import {ref,Ref} from "vue"

export function usePagination(initialPage : number = 0,total:number = 0){
    const currentPage : Ref<number> = ref(initialPage);
    const totalPage : Ref<number> = ref(total);

    const changePage = (index : number ): void => {
        currentPage.value = index;
    }
    const nextPage = () : void =>{
        currentPage.value + 1 < totalPage.value ? changePage(currentPage.value + 1) : changePage(0);
    }
    const previusPage = () : void  => {
        currentPage.value - 1 >= 0 ? changePage(currentPage.value - 1) : changePage(totalPage.value -1);
    }
    return{
        currentPage,
        totalPage,
        changePage,
        nextPage,
        previusPage
    }

}