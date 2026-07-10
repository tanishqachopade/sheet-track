import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";


export default async function CommitPage({

params,

}:{

params:Promise<{
id:string
}>

}){


const session =
await auth();



if(!session?.user?.email){

redirect("/");

}



const { id } =
await params;



const user =
await prisma.user.findUnique({

where:{

email:
session.user.email

}

});



if(!user){

redirect("/");

}



const commit =
await prisma.commit.findFirst({


where:{


id:id,


spreadsheet:{

ownerId:
user.id

}


},



include:{


changes:true,


spreadsheet:true,


}


});




if(!commit){

redirect("/dashboard");

}





return (


<main className="p-8 max-w-4xl mx-auto">


<h1 className="text-3xl font-bold">

{commit.message}

</h1>



<p className="text-gray-500 mt-2">


{
commit.createdAt.toLocaleString()
}


</p>




<div className="mt-10 space-y-5">



{
commit.changes.map(

(change)=>(



<div

key={change.id}

className="
border
rounded-lg
p-5
font-mono
"

>



<p className="font-bold mb-3">


{change.cell}


</p>





{
change.type === "ADD"
&&
(
<p className="text-green-600">

+ {change.newValue}

</p>
)
}







{
change.type === "REMOVED"

&&

(

<p className="text-red-600">

- {change.oldValue}

</p>


)

}








{
change.type === "MODIFIED"

&&

(

<div>


<p className="text-red-600">

- {change.oldValue}

</p>


<p className="text-green-600">

+ {change.newValue}

</p>


</div>


)

}








{
change.type === "FORMULA_CHANGED"

&&

(

<div>


<p className="text-red-600">

- formula: {change.oldValue}

</p>



<p className="text-green-600">

+ formula: {change.newValue}

</p>


</div>


)

}





</div>



)

)

}




</div>




</main>


)


}