import Sidebar from "@/components/dashboard/Sidebar";
import UserProfile from "@/components/dashboard/UserProfile";
import EmptyState from "@/components/dashboard/EmptyState";

import { getCurrentUser }
from "@/services/user.service";

import { getTrackedSheets }
from "@/services/sheet.service";


export default async function Dashboard(){


const user =
await getCurrentUser();


const sheets =
await getTrackedSheets();


return (

<div className="flex">


<Sidebar/>


<main className="flex-1 p-8">


<UserProfile user={user}/>


<section className="mt-10">

{
sheets.length===0
?
<EmptyState/>
:
null
}


</section>


</main>


</div>


)

}