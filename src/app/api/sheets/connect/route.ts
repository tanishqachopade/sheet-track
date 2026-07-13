import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import {
  verifyOrigin
} from "@/lib/security";


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


/*
|--------------------------------------------------------------------------
| CSRF / Origin protection
|--------------------------------------------------------------------------
*/

console.log("Origin:", req.headers.get("origin"));
console.log("verifyOrigin:", verifyOrigin(req));

if(!verifyOrigin(req)){

return NextResponse.json(

{
error:"Invalid origin"
},

{
status:403
}

);

}



/*
|--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
*/


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



/*
|--------------------------------------------------------------------------
| Rate limit BEFORE database work
|--------------------------------------------------------------------------
*/


const limit =
await rateLimit.limit(
  session.user.email
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



/*
|--------------------------------------------------------------------------
| Ensure user exists
|--------------------------------------------------------------------------
*/


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




/*
|--------------------------------------------------------------------------
| Validate input
|--------------------------------------------------------------------------
*/


const body =
connectSheetSchema.parse(
  await req.json()
);



const spreadsheetId =
extractSpreadsheetId(
body.url
);




/*
|--------------------------------------------------------------------------
| Verify Google access
|--------------------------------------------------------------------------
*/


const metadata =
await fetchMetadata(

spreadsheetId,

session.accessToken!

);



await fetchSheetSnapshot(

spreadsheetId,

session.accessToken!

);




/*
|--------------------------------------------------------------------------
| Save spreadsheet
|--------------------------------------------------------------------------
*/


const spreadsheet =
await prisma.spreadsheet.upsert({

where:{

googleSheetId:
spreadsheetId,

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




/*
|--------------------------------------------------------------------------
| Ownership protection
|--------------------------------------------------------------------------
*/

console.log("Spreadsheet owner:", spreadsheet.ownerId);
console.log("Current user:", user.id);


if(
spreadsheet.ownerId !== user.id
){


return NextResponse.json(

{
error:"Forbidden"
},

{
status:403
}

);


}




/*
|--------------------------------------------------------------------------
| Safe response
|--------------------------------------------------------------------------
*/


return NextResponse.json({

spreadsheet:{

id:
spreadsheet.id,


title:
spreadsheet.title,

},


message:
"Sheet connected"

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