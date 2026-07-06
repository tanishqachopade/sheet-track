import { prisma } from "@/lib/prisma";

import { buildSnapshot } from "../snapshot/builder";
import { generateDiff } from "../diff";
import { generateSnapshotHash } from "../snapshot/hash";

import { CreateCommitSchema } from "./schema";

import {
    acquireCommitLock,
    releaseCommitLock
} from "./commitLock";


interface Props {

    userId:string;

    spreadsheetId:string;

    values:any;
    formulas:any;

    message:string;

}

export async function createCommit({
    userId,
    spreadsheetId,
    values,
    formulas,
    message
}:Props){

    // validate input

CreateCommitSchema.parse({

    userId,

    spreadsheetId,

    values,

    formulas,

    message

});

const lockId =
    await acquireCommitLock(
        userId,
        spreadsheetId
    );


if(!lockId){

    return {

        success:false,

        message:"Commit already in progress"

    };

}

try {


// verify spreadsheet ownership

const spreadsheet =
    await prisma.spreadsheet.findFirst({

        where:{

            id:spreadsheetId,

            ownerId:userId

        }

    });



if(!spreadsheet){


    throw new Error(
        "Unauthorized spreadsheet access"
    );


}

    // generate current snapshot

    const newSnapshot =
    buildSnapshot(
        values,
        formulas
    );


    const newHash =
    generateSnapshotHash(newSnapshot);


    // get last commit

    const lastCommit =
        await prisma.commit.findFirst({

            where:{

                spreadsheetId

            },


            include:{

                snapshot:true

            },


            orderBy:{

                createdAt:"desc"

            }

        });



    // prevent empty commits

    if(lastCommit?.hash === newHash){


        return {

            success:false,

            message:"No changes detected"

        };


    }



    let changes:any = {

    cells:[],

    formulas:[],

    rows:[]

};



    if(lastCommit?.snapshot){


        changes =
    generateDiff(
        lastCommit.snapshot.data,
        newSnapshot
    );


    }



    // save commit + snapshot + changes


    const commit =
await prisma.$transaction(async(tx)=>{


return await tx.commit.create({


            data:{


                spreadsheetId,


                message,


                hash:newHash,



                snapshot:{


                    create:{


                        spreadsheet:{

                            connect:{

                                id:spreadsheetId

                            }

                        },


                        data:newSnapshot,


                        hash:newHash


                    }


                },



                changes:{


                    create:[


                        ...changes.cells.map((change:any)=>({


                            cell:change.cell,


                            oldValue:String(
                                change.oldValue ?? ""
                            ),


                            newValue:String(
                                change.newValue ?? ""
                            )


                        })),


                        ...changes.formulas.map((change:any)=>({


                            cell:change.cell,


                            oldValue:String(
                                change.oldFormula ?? ""
                            ),


                            newValue:String(
                                change.newFormula ?? ""
                            )


                        }))


                    ]


                }


            }


        });
    });



        return {

        success:true,

        commit

    };


} 
finally {


    await releaseCommitLock(
        userId,
        spreadsheetId,
        lockId
    );


}


}