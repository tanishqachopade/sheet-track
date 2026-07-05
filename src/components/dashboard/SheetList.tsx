import { TrackedSheet } from "@/types/sheet";


interface Props{
sheets:TrackedSheet[];
}


export default function SheetList(
{sheets}:Props
){


return (

<div className="space-y-4">


{sheets.map(sheet=>(


<div
key={sheet.id}
className="
border
rounded-xl
p-5
"
>


<h3 className="font-semibold">

{sheet.name}

</h3>


<p className="text-gray-500">

Versions: {sheet.versions}

</p>


</div>


))}


</div>


)

}