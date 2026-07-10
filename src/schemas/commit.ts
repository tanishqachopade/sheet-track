import { z } from "zod";


export const createCommitRequestSchema =
z.object({

  spreadsheetId:
    z.string()
    .min(1),


  message:
    z.string()
    .trim()
    .min(1)
    .max(200)
    .optional()


});