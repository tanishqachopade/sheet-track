import crypto from "crypto";
import { InternalRowMove } from "./types";



function hashRow(row:any[]) {

 return crypto
    .createHash("sha256")
    .update(JSON.stringify(row))
    .digest("hex");

}



export function detectRowMoves(
 oldRows:any[][],
 newRows:any[][]
){


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