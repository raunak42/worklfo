import { validateRequest } from "@/auth"

export default async function Page(){
   
    const {session, user} = await validateRequest()

    return<div>Hello{user?.username}</div>
}