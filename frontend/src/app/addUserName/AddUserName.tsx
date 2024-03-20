

import {getSession} from "@/utils/models/fetchSession";
import {redirect} from "next/navigation";
import {Profile} from "@/utils/models/profile.model";


export  async function AddUserName() {
    const session = await getSession()
    const profileName = session?.profile?.profileName
    if(profileName){

    return (

        <h2 className="inline-block">  Hi, {profileName}
       </h2>
    )}
}