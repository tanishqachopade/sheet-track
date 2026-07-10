import "dotenv/config";

import { prisma } from "./lib/prisma";


async function main(){


const sheets =
await prisma.spreadsheet.findMany({

include:{

owner:true,

},

});


console.log(
JSON.stringify(
sheets,
null,
2
)
);


}


main()
.finally(async()=>{

await prisma.$disconnect();

});