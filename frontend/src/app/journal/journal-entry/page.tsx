import {JournalForm} from "@/app/journal/journal-entry/JournalForm";
import {getSession} from "@/utils/models/fetchSession";

export default async function () {
    const session = await getSession()
    console.log(session)
    return (
        <>
            <JournalForm session={session} />
        </>
    )
}

