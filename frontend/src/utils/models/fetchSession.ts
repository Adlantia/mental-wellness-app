import {Profile, ProfileSchema} from "@/utils/models/profile.model";
import {cookies} from "next/headers";
import {jwtDecode} from 'jwt-decode';
import { unstable_noStore as noStore } from 'next/cache';

noStore()
export type Session = {
    profile: Profile
    authorization: string
    exp: number
}



export let session : Session|undefined = undefined



const currentTimeInSeconds = new Date().getTime() / 1000

export async function getSession(): Promise<Session|undefined > {

    const cookieStore = cookies()
    const jwtToken = cookieStore.get("jwt-token")
    if (session === undefined &&  jwtToken) {
        setJwtToken(jwtToken.value)
        return session
    } else {
        return session
    }

}
export async function setProfile(profile: Profile) {
    if (session) {
        session.profile = profile
    }
}

export function setJwtToken(jwtToken: string) {

    try {
        const  parsedJwtToken = jwtDecode(jwtToken) as any


    console.log(parsedJwtToken)

        //console.log("token is expired", currentTimeInSeconds < parsedJwtToken.exp)

        if(parsedJwtToken &&  currentTimeInSeconds < parsedJwtToken.exp) {

            session = {
                profile: ProfileSchema.parse(parsedJwtToken.auth),
                authorization: jwtToken,
                exp: parsedJwtToken.exp
            }

        } else {
            session = undefined
        }


    } catch (error) {
        console.error(error)
        session = undefined

    }


}