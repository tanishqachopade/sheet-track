import "dotenv/config";

import {
    acquireCommitLock,
    releaseCommitLock
} from "./core/version/commitLock";


async function main(){


    const first =
        await acquireCommitLock(
            "user1",
            "sheet1"
        );


    console.log(
        "First:",
        !!first
    );



    const second =
        await acquireCommitLock(
            "user1",
            "sheet1"
        );


    console.log(
        "Second:",
        !!second
    );



    if(first){

        await releaseCommitLock(
            "user1",
            "sheet1",
            first
        );

    }


}


main();