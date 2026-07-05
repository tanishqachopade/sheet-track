import { dashboardContent } from "@/constants/dashboard";


export default function Sidebar(){

return (

<aside className="
w-64
border-r
h-screen
p-6
">

<h1 className="font-bold text-xl">

{dashboardContent.sidebar.title}

</h1>


<nav className="mt-8 space-y-4">

{
dashboardContent.sidebar.links.map(link=>(

<a
key={link.href}
href={link.href}
className="block"
>

{link.label}

</a>

))
}


</nav>


</aside>

)

}