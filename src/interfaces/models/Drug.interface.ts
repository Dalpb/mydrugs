import type { DrugColor } from "../enums/DrugColor";

export interface Drug{
   name: string,
   image:string,
   drugColor: DrugColor,
   priceBTC: number,
   priceETH? : number,
   description: string,
   recomendation:string,
   composition: string,
   rating: number,   
}