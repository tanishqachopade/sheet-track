import { z } from "zod";


export const connectSheetSchema =
z.object({

  url:
    z.string()
    .url()
    .refine(

      (url)=>
        url.includes(
          "docs.google.com/spreadsheets"
        ),

      {
        message:
          "Invalid Google Sheet URL"
      }

    )

});