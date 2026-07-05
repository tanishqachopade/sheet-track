import { User } from "@/types/user";


export async function getCurrentUser()
:Promise<User>{


return {

id:"mock-user-id",

name:"Demo User",

email:"demo@sheettrack.com"

}

}