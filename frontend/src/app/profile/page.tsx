import {getSession} from "@/utils/models/fetchSession";
import ProfileForm from "@/app/profile/ProfileForm";

export default async function () {
    const session = await getSession()

    console.log("session", session)
    return (
        <>
            <ProfileForm session={session} />
        </>
    )
}

