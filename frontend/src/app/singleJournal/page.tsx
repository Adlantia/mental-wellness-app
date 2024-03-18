// import {JournalCard} from "@/app/shared/JournalCard";
// import {getSession} from "@/utils/models/fetchSession";
// import {redirect} from "next/navigation";
// import {Journal} from "@/utils/models/journal.model";
// import {fetchJournalsByJournalProfileId} from "@/utils/http/journal.http";
//
//
// export default function ViewJournalEntry () {
//
//     const session = await getSession()
//     if (session === undefined) {
//         redirect("/login")
//     }
//     const journals = await getData(session.authorization)
//     return (
//         <>
//
//             <div className="flex flex-col justify-start items-center mt-8">
//                 <h1 className="text-3xl font-semibold mb-8">{journal.journalTitle}</h1>
//
//                 <div className="flex flex-col items-center justify-center sm:flex-row sm:flex-wrap">
//                     {journals.map(journal => <JournalCard key={journal.journalId} journal={journal}/>
//                     )}
//
//                 </div>
//             </div>
//
//         </>
//     )
// }
//
// async function getData(authorization: string): Promise<Journal[]> {
//     return  fetchJournalsByJournalProfileId(authorization)
// }
//
//

import React from "react";

export function SingleJournal() {
    return (
        <>
            <section className="container">
                <SingleJournal/>
            </section>
        </>
    )
}