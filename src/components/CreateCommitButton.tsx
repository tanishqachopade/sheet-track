"use client";


export default function CreateCommitButton({

spreadsheetId

}:{

spreadsheetId:string

}){


async function create(){


await fetch(
"/api/commit/create",
{

method:"POST",

headers:{
"Content-Type":
"application/json"
},


body:
JSON.stringify({

spreadsheetId,

message:
"Manual commit"

})

}

);



window.location.reload();


}




return (

<button

onClick={create}

className="
mt-5
rounded
bg-black
text-white
px-5
py-3
"

>

Create Commit

</button>

);


}