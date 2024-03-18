

import {JournalCard} from "@/app/shared/JournalCard";
import {fetchJournalsByJournalProfileId} from "@/utils/http/journal.http";
import {Journal} from "@/utils/models/journal.model";
import {getSession} from "@/utils/models/fetchSession";
import {redirect} from "next/navigation";

export default async function JournalList() {
    const session = await getSession()
    if(session === undefined) {
        redirect("/login")
    }

    const journals = await getData(session.authorization)
    return (
        <>

            <div className="flex flex-col items-center mt-8">
                <h1 className="text-3xl font-semibold mb-8">Journal</h1>
                <a href='journal/journal-entry'>
                    <button
                        className="mb-4 bg-white p-6 rounded-lg shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 w-64">
                        <span className="text-lg font-semibold">Add Entry</span>
                        <span className="ml-4 pb-1 font-bold text-xl text-blue-900">+</span>
                    </button>
                </a>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start p items-center x-4" style={{maxWidth: "100%"}}>
                {journals.map(journal => (
                    <div key={journal.journalId} className="w-full md:w-1/3 p-2">
                        <JournalCard journal={journal}/>
                    </div>
                ))}
            </div>

        </>
    )
}

async function getData(authorization: string): Promise<Journal[]> {
    return fetchJournalsByJournalProfileId(authorization)
}
