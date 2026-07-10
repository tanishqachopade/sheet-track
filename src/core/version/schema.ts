import { z } from "zod";


export const CreateCommitSchema =
z.object({


    userId:
    z.string()
    .min(1),


    spreadsheetId:
    z.string()
    .min(1),


    values:
    z.array(
        z.array(
            z.any()
        )
    ),


    formulas:
    z.any(),


    message:
    z.string()
    .min(1)
    .max(200)


});