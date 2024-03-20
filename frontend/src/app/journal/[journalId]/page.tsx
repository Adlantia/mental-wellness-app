import {JournalCard} from "@/app/shared/JournalCard";
import {Journal} from "@/utils/models/journal.model";
import {fetchJournalByJournalId} from "@/utils/http/journal.http";
import {getSession} from "@/utils/models/fetchSession";
import {redirect} from "next/navigation";

export default async function ViewJournalEntry ({params}: {params: {journalId: string}}){
    const session = await getSession()
    if(session === undefined) {
        redirect("/login")
    }
    const {journalId}= params

    const journal = await getData(journalId, session.authorization)
    return (
        <>
            <a href="/journal" className="btn" > Go Back </a>
            <div className="p-4 w-3/4 mx-auto">


                <em>{journal.journalDateTime?.toDateString()} </em>

                <h1 className="text-3xl mx-auto text-center my-3">
                    {journal.journalTitle}
                </h1>
                <p>
                    {journal.journalText}
                </p>

            </div>

        </>
    )
}

async function getData(journalId: string, authorization:string): Promise<Journal> {
    return  fetchJournalByJournalId(journalId, authorization)
}