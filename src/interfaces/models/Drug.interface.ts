import type { DrugColor } from "../enums/DrugColor";

export interface Drug{
   id?:string,
   name?: string,
   image?:string,
   drugColor?: DrugColor,
   priceBTC?: number,
   priceETH? : number,
   description?: string,
   recomendation?:string,
   composition?: number,
   rating?: number,   
   isNew?:boolean
}