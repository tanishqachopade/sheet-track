"use client";


export default function Error({
reset,
}:{
error:Error;
reset:()=>void;
}){


return (

<div className="
p-10
text-center
">


<h2 className="font-bold">

Something went wrong

</h2>


<button
onClick={reset}
className="
mt-5
bg-black
text-white
px-5
py-2
rounded-lg
"
>

Retry

</button>


</div>


)

}