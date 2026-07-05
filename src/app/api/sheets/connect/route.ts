import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

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



if(!session){

return NextResponse.json(

{
error:"Unauthorized"
},

{
status:401
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



return NextResponse.json({

spreadsheetId,
metadata,
snapshot

});



}


catch(error){


console.error(
"Sheet connection failed"
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