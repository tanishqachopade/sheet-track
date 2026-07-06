import { prisma } from "@/lib/prisma";

import { createCommit } from "./core/version/createCommit";


async function main() {


    // create test user

    const user =
        await prisma.user.upsert({


            where: {

                email: "test@sheettrack.com"

            },


            update: {},


            create: {

                email: "test@sheettrack.com",

                name: "Test User"

            }


        });



    // create test spreadsheet

    const spreadsheet =
        await prisma.spreadsheet.upsert({


            where: {

                googleSheetId: "test-google-sheet"

            },


            update: {},


            create: {


                googleSheetId: "test-google-sheet",

                title: "Revenue Tracker",


                owner: {

                    connect: {

                        id: user.id

                    }

                }


            }


        });




    // create commit

    const result =
        await createCommit({


            userId: user.id,


            spreadsheetId: spreadsheet.id,


            values: [

                ["Item", "Amount"],

                ["Revenue", "1000"],

                ["Cost", "500"]

            ],



            formulas: [

                [null, null],

                [null, null],

                [null, null]

            ],



            message: "Initial commit"


        });




    console.log(

        JSON.stringify(
            result,
            null,
            2
        )

    );


}



main()

    .catch((error) => {


        console.error(error);


    })

    .finally(async () => {


        await prisma.$disconnect();


    });