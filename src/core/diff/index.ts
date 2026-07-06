import { diffCells } from "./cellDiff";
import { diffFormulas } from "./formulaDiff";
import { detectRowMoves } from "./rowMovement";


export function generateDiff(
 oldSnapshot:any,
 newSnapshot:any
){


 return {

    cells: diffCells(
        oldSnapshot.cells,
        newSnapshot.cells
    ),


    formulas: diffFormulas(
        oldSnapshot.cells,
        newSnapshot.cells
    ),


    rows: detectRowMoves(
        oldSnapshot.rows ?? [],
        newSnapshot.rows ?? []
    )

 };


}