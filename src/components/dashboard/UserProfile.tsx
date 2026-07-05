import { User } from "@/types/users";


interface Props{
user:User;
}


export default function UserProfile(
{user}:Props
){


return (

<div>

<h2 className="font-semibold">

{user.name}

</h2>


<p className="text-gray-500">

{user.email}

</p>


</div>


)

}