import { User } from "@/types/users";


export async function getCurrentUser()
:Promise<User>{


return {

id:"mock-user-id",

name:"Demo User",

email:"demo@sheettrack.com"

}

}