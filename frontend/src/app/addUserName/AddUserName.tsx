

import {getSession} from "@/utils/models/fetchSession";
import {redirect} from "next/navigation";
import {Profile} from "@/utils/models/profile.model";



export  async function AddUserName() {
    const session = await getSession()
    if(session === undefined) {
        redirect("/login")
    }
    const {profile} = session

    return (
        <h2>  Hi, there {profile.profileName}
       </h2>
    )
}