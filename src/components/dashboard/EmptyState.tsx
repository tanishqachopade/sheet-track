import { dashboardContent } 
from "@/constants/dashboard";


export default function EmptyState(){


return (

<div className="
border
rounded-xl
p-10
text-center
">

<h2 className="font-semibold">

{dashboardContent.emptyState.title}

</h2>


<p className="mt-2 text-gray-500">

{dashboardContent.emptyState.description}

</p>


<button className="
mt-5
bg-black
text-white
px-5
py-2
rounded-lg
">

{dashboardContent.emptyState.action}

</button>


</div>

)

}