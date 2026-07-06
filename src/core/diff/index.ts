import { diffCells } from "./cellDiff";
import { diffFormulas } from "./formulaDiff";
import { detectRowMoves } from "./rowMovement";
import { SnapshotSchema } from "../snapshot/schema";


export function generateDiff(
 oldSnapshot:any,
 newSnapshot:any
){


 const safeOldSnapshot =
    SnapshotSchema.parse(oldSnapshot);


 const safeNewSnapshot =
    SnapshotSchema.parse(newSnapshot);



 return {

    cells: diffCells(
        safeOldSnapshot.cells,
        safeNewSnapshot.cells
    ),


    formulas: diffFormulas(
        safeOldSnapshot.cells,
        safeNewSnapshot.cells
    ),


    rows: detectRowMoves(
        safeOldSnapshot.rows ?? [],
        safeNewSnapshot.rows ?? []
    )

 };


}