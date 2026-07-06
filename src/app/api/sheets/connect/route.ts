import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import {
  rateLimit
} from "@/lib/rateLimit";

import {
  extractSpreadsheetId
} from "@/lib/sheets";


import {
  fetchMetadata,
  fetchSheetSnapshot
} from "@/services/googleSheets";


import {
  connectSheetSchema
} from "@/schemas/sheets";



export async function POST(
  req: Request
) {


try {


const session =
await auth();



if(!session?.user?.email){

return NextResponse.json(

{
error:"Unauthorized"
},

{
status:401
}

);

}

const user =
await prisma.user.upsert({

  where:{
    email:
    session.user.email,
  },


  update:{},


  create:{

    email:
    session.user.email,

    name:
    session.user.name,

    image:
    session.user.image,

  },


});



const limit =
await rateLimit.limit(
  session.user.email!
);



if(!limit.success){


return NextResponse.json(

{
error:
"Too many requests. Try again later."
},

{
status:429
}

);


}



const body =
connectSheetSchema.parse(
  await req.json()
);



const spreadsheetId =
extractSpreadsheetId(
body.url
);



const metadata =
await fetchMetadata(
spreadsheetId,
session.accessToken!
);



const snapshot =
await fetchSheetSnapshot(
spreadsheetId,
session.accessToken!
);



const spreadsheet =
await prisma.spreadsheet.upsert({

  where:{
    googleSheetId: spreadsheetId,
  },

  update:{},

  create:{

    googleSheetId:
    spreadsheetId,

    title:
    metadata.title ?? "Untitled Sheet",

    ownerId:
user.id,

  },

});



return NextResponse.json({

spreadsheet,
metadata,
snapshot

});



}


catch(error){


console.error(
"Sheet connection failed:",
error
);



return NextResponse.json(

{
error:
"Unable to connect sheet"
},

{
status:400
}

);


}


}