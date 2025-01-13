import { Drug } from "../interfaces/models/Drug.interface";

class DrugService{

    public static async getDrugById(drugId: string) : Promise<Drug>{
        try{
            const response = await fetch("/src/mocks/drugs.json");
            const drugs : Drug[] = (await response.json()).data.drugs;
            const drugIndex: number = drugs.findIndex(drug => drug.id === drugId );
            if(drugIndex === -1)throw new Error("This drug doesn't exists");
            return drugs[drugIndex];
        }catch(e){
            throw new Error();
        }
    }
    
    public static async getDrugs() : Promise<Drug []>{
        const response = await fetch("/src/mocks/drugs.json");
        const drugs : Drug[] = (await response.json()).data.drugs;
        return drugs;
    }

    public static async getDrugFamous(): Promise<Drug []>{
        const response = await fetch("/src/mocks/drugsPopularity.json");
        const drugs : Drug[] = (await response.json()).data.drugs;
        return drugs;
    }
    
}

export default DrugService