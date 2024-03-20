import {Journal} from "@/utils/models/journal.model";
import Link from 'next/link'
type JournalProps = {journal: Journal}
export function JournalCard({journal}: JournalProps) {

    return (
        <Link href={`/journal/${journal.journalId as string}`}>

            <button
                className="p-4 rounded-lg shadow-md mb-5 mx-2 w-full h-48 sm:h-auto focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                style={{background: 'linear-gradient(to bottom, #f0f0f0, #e0e0e0)'}}>
                <h2 className="text-lg font-semibold overflow-hidden line-clamp-2">{journal.journalTitle}</h2>
                <p className="text-sm text-gray-500">{journal.journalDateTime?.toLocaleString()}</p>
                <p className="text-sm text-gray-700 text-left overflow-hidden line-clamp-2">{journal.journalText}</p>
            </button>

         </Link>

    )
}