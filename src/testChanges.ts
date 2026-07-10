import "dotenv/config";

import { prisma } from "@/lib/prisma";


async function main(){

const changes =
await prisma.change.findMany();


console.log(

JSON.stringify(
changes,
null,
2
)

);


}


main()
.finally(async()=>{

await prisma.$disconnect();

});