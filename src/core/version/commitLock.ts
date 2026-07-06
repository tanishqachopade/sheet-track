import { redis } from "@/lib/redis";
import crypto from "crypto";


const LOCK_TIME = 30;



export async function acquireCommitLock(
    userId:string,
    sheetId:string
){


    const key =
        `commit-lock:${userId}:${sheetId}`;


    const lockId =
        crypto.randomUUID();



    const result =
        await redis.set(
            key,
            lockId,
            {
                nx:true,
                ex:LOCK_TIME
            }
        );



    if(result !== "OK"){

        return null;

    }



    return lockId;


}




export async function releaseCommitLock(
    userId:string,
    sheetId:string,
    lockId:string
){


    const key =
        `commit-lock:${userId}:${sheetId}`;


    const currentLock =
        await redis.get(key);



    if(currentLock === lockId){


        await redis.del(key);


    }


}