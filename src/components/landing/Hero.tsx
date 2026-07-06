import { landingContent } from "@/constants/landing";

export default function Hero(){

return (

<section className="
flex
flex-col
items-center
justify-center
min-h-[70vh]
text-center
px-6
">

<p className="mb-4 text-sm">
{landingContent.hero.badge}
</p>


<h2 className="
text-5xl
font-bold
max-w-3xl
">
{landingContent.hero.title}
</h2>


<p className="
mt-5
max-w-xl
text-gray-500
">

{landingContent.hero.description}

</p>


<button
className="
mt-8
rounded-lg
bg-black
text-white
px-6
py-3
"
>

{landingContent.hero.primaryAction}

</button>


</section>


)

}