import {getSession} from "@/utils/models/fetchSession";
import ProfileForm from "@/app/profile/ProfileForm";

export default async function () {
    const session = await getSession()
    return (
        <>
            <ProfileForm session={session} />
        </>
    )
}

