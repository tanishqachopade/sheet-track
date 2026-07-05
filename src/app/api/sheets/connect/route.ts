import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

import {
  extractSpreadsheetId
} from "@/lib/sheets";


import {

fetchMetadata,
fetchSheetSnapshot

} from "@/services/googleSheets";




export async function POST(req: Request) {


const session = await auth();



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
await req.json();



const spreadsheetId =
extractSpreadsheetId(
body.url
);



console.log(
"SHEET ID:",
spreadsheetId
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



console.log(
"SNAPSHOT:",
snapshot
);




return NextResponse.json({

spreadsheetId,

metadata,

snapshot

});


}