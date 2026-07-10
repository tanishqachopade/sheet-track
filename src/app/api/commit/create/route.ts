import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { createCommit } from "@/core/version/createCommit";

import {
fetchSheetValues,
fetchSheetFormulas
} from "@/services/googleSheets";


import {
createCommitRequestSchema
} from "@/schemas/commit";


import {
verifyOrigin
} from "@/lib/security";


import {
rateLimit
} from "@/lib/rateLimit";



export async function POST(
req:Request
){


try{


/*
|--------------------------------------------------------------------------
| Origin protection
|--------------------------------------------------------------------------
*/


if(!verifyOrigin(req)){


return NextResponse.json(

{
error:"Invalid origin"
},

{
status:403}

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
status:401}

);


}





/*
|--------------------------------------------------------------------------
| Rate limiting
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
"Too many requests"
},

{
status:429}

);


}




/*
|--------------------------------------------------------------------------
| Validate body
|--------------------------------------------------------------------------
*/


const body =
createCommitRequestSchema.parse(

await req.json()

);





/*
|--------------------------------------------------------------------------
| Find user
|--------------------------------------------------------------------------
*/


const user =
await prisma.user.findUnique({


where:{

email:
session.user.email

}


});



if(!user){

throw new Error(
"User not found"
);

}





/*
|--------------------------------------------------------------------------
| Ownership check
|--------------------------------------------------------------------------
*/


const spreadsheet =
await prisma.spreadsheet.findFirst({


where:{


id:
body.spreadsheetId,


ownerId:
user.id


}


});




if(!spreadsheet){


return NextResponse.json(

{
error:"Forbidden"
},

{
status:403}

);


}






/*
|--------------------------------------------------------------------------
| Fetch latest Google Sheet state
|--------------------------------------------------------------------------
*/


const values =
await fetchSheetValues(

spreadsheet.googleSheetId,

session.accessToken!

);




const formulas =
await fetchSheetFormulas(

spreadsheet.googleSheetId,

session.accessToken!

);







/*
|--------------------------------------------------------------------------
| Create version commit
|--------------------------------------------------------------------------
*/


const commit =
await createCommit({


userId:
user.id,


spreadsheetId:
spreadsheet.id,


values,


formulas,


message:
body.message ??
"Manual commit"


});





return NextResponse.json(
commit
);



}


catch(error){


console.error(
"Create commit failed:",
error
);



return NextResponse.json(

{
error:"Commit failed"
},

{
status:500}

);


}


}