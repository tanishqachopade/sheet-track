import { CellChange } from "./types";


export function diffFormulas(
 oldCells:Record<string,any>,
 newCells:Record<string,any>
){

 const changes:CellChange[] = [];


 const cells = new Set([
    ...Object.keys(oldCells),
    ...Object.keys(newCells)
 ]);


 for(const cell of cells){


    const oldFormula =
        oldCells[cell]?.formula ?? null;


    const newFormula =
        newCells[cell]?.formula ?? null;



    if(oldFormula !== newFormula){


        changes.push({

            cell,

            type:"FORMULA_CHANGE",

            oldFormula,
            newFormula

        });

    }

 }


 return changes;

}