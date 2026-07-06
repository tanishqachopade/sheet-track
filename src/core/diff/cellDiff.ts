import { normalizeValue } from "./normalizer";
import { CellChange } from "./types";


export function diffCells(
  oldCells: Record<string, any>,
  newCells: Record<string, any>
) {

  const changes: CellChange[] = [];


  const allCells = new Set([
    ...Object.keys(oldCells),
    ...Object.keys(newCells),
  ]);



  for(const cell of allCells) {


    const oldCell = oldCells[cell];
    const newCell = newCells[cell];


    if(!oldCell && newCell) {

      changes.push({
        cell,
        type:"ADD",
        newValue:newCell.value
      });

      continue;
    }



    if(oldCell && !newCell) {

      changes.push({
        cell,
        type:"DELETE",
        oldValue:oldCell.value
      });

      continue;
    }



    const oldValue =
      normalizeValue(oldCell.value);

    const newValue =
      normalizeValue(newCell.value);



    if(oldValue !== newValue) {

      changes.push({

        cell,

        type:"UPDATE",

        oldValue,
        newValue

      });

    }

  }


  return changes;
}