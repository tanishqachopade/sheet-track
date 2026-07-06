import { z } from "zod";


export const SnapshotSchema =
 z.object({


  cells:

   z.record(

    z.string(),

    z.object({


     value:

      z.union([

       z.string(),

       z.number(),

       z.boolean(),

       z.null()

      ]),


     formula:

      z.union([

       z.string(),

       z.null()

      ])


    })

   ),



  rows:

   z.array(

    z.array(

     z.union([

      z.string(),

      z.number(),

      z.boolean(),

      z.null()

     ])

    )

   )

   .optional()


 });