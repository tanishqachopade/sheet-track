import { landingContent } from "@/constants/landing";

export default function Features(){


return (

<section className="
grid
grid-cols-1
md:grid-cols-3
gap-6
p-8
">


{landingContent.features.map(feature=>(


<div
key={feature.title}
className="
border
rounded-xl
p-6
"
>

<h3 className="font-semibold">

{feature.title}

</h3>


<p className="text-gray-500 mt-2">

{feature.description}

</p>


</div>


))}


</section>

)

}