import { prisma } from "@/lib/prisma";

import { buildSnapshot } from "../snapshot/builder";
import { generateDiff } from "../diff";
import { generateSnapshotHash } from "../snapshot/hash";


interface Props {

    spreadsheetId:string;

    values:any;
    formulas:any;

    message:string;

}

export async function createCommit({
    spreadsheetId,
    values,
    formulas,
    message
}:Props){


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
        await prisma.commit.create({


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



    return {

        success:true,

        commit

    };


}