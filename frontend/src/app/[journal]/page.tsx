

import {Journal} from "@/app/shared/Journal";
import {fetchAllJournals} from "@/utils/http/journal.http";
import {Profile} from "@/utils/models/profile.model";
// import {Journal} from "@/utils/models/journal.model";

export default async function JournalList() {
    const journals =  [
        {
            journalId: 'd96b4953-4d15-4cf7-90d2-25b32d3bb2b2',
            journalProfileId: '891f85a2-c9ff-45b7-b988-d62c02aedd10',
            journalTitle: 'ImATitle',
            journalDateTime: '01/12/2000',
            journalText: 'jldjld sdljfds; ljl;k'
        },
        {
            journalId: 'd5db31a1-0f4f-4552-9c01-40241bdc23a6',
            journalProfileId: '623e4546-7ebc-41dc-a276-2c981f54fe52',
            journalTitle: 'ImAnotherTitle',
            journalDateTime: '01/04/2000',
            journalText: 'jdlsjd lsdjd '
        },

        {
            journalId: '478c380d-d111-4f31-a334-4aad15ebeb62',
            journalProfileId: '2f4c14a5-4b7e-4e9e-8d17-64a04cde9469',
            journalTitle: 'New Title',
            journalDateTime: '01/01/2000',
            journalText: 'lskwks skeidkdm'
        }
    ]
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
                    {journals.map(journal => <Journal key={journal.journalId} journal={journal}/>
                    )}

                </div>
            </div>

        </>
    )
}

async function getData(): Promise<Journal[]> {
    return await fetchAllJournals()
}
