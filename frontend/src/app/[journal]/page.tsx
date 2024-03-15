

import {JournalCard} from "@/app/shared/JournalCard";
import {fetchJournalsByJournalProfileId} from "@/utils/http/journal.http";
import {Journal} from "@/utils/models/journal.model";

export default async function JournalList() {
    const journals = await getData()
    return (
        <>

            <div className="flex flex-col justify-start items-center mt-8">
                <h1 className="text-3xl font-semibold mb-8">Journal</h1>
                <a href='/journal-entry'>
                    <button
                        className="mb-4 bg-white p-6 rounded-lg shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 w-64">
                        <span className="text-lg font-semibold">Add Entry</span>
                        <span className="ml-4 pb-1 font-bold text-xl text-blue-900">+</span>
                    </button>
                </a>

                <div className="flex flex-col items-center justify-center sm:flex-row sm:flex-wrap">
                    {journals.map(journal => <JournalCard key={journal.journalId} journal={journal}/>
                    )}

                </div>
            </div>

        </>
    )
}

async function getData(): Promise<Journal[]> {
    return await fetchJournalsByJournalProfileId()
}
