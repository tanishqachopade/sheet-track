import crypto from "crypto";
import { InternalRowMove } from "./types";
import { normalizeValue } from "./normalizer";



function hashRow(row:any[]) {

 return crypto
    .createHash("sha256")
    .update(
 JSON.stringify(
  row.map(normalizeValue)
 )
)
    .digest("hex");

}



export function detectRowMoves(
 oldRows:any[][],
 newRows:any[][]
){


 const MAX_ROWS = 100000;


 if(
  oldRows.length > MAX_ROWS ||
  newRows.length > MAX_ROWS
 ){

  throw new Error(
   "Sheet too large to diff"
  );

 }


 const moves:InternalRowMove[] = [];



 const oldHashes = new Map();


 oldRows.forEach((row,index)=>{

    oldHashes.set(
        hashRow(row),
        index
    );

 });



 newRows.forEach((row,index)=>{


    const hash =
        hashRow(row);



    const oldIndex =
        oldHashes.get(hash);



    if(
        oldIndex !== undefined &&
        oldIndex !== index
    ){

        moves.push({

            type:"MOVE",

            rowHash:hash,

            from:oldIndex,

            to:index

        });

    }


 });


 return moves;

}