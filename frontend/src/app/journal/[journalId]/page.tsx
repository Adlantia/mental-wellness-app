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
            <h1 className = "text-3xl mx-auto text-center my-3">
                {journal.journalTitle}
            </h1>

            <div className = "p-4 w-3/4 mx-auto">
                <div className="flex">
                        <p>
                            {journal.journalText}
                            </p>
                </div>
            </div>
        </>
    )
}
async function getData(journalId: string, authorization:string): Promise<Journal> {
    return  fetchJournalByJournalId(journalId, authorization)
}