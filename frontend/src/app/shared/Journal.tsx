type Journal = {journalId: string, journalProfileId: string, journalTitle: string, journalDateTime: string, journalText: string}
type JournalProps = {journal: Journal}
export function Journal({journal}: JournalProps) {
    return (
        <button className="bg-gray-100 p-4 rounded-lg shadow-md mb-5 mx-2 w-56 sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
            <h2 className="text-lg font-semibold">{journal.journalTitle}</h2>
            <p className="text-sm text-gray-500">{journal.journalDateTime}</p>
            <p className="text-sm text-gray-700 text-left">{journal.journalText}</p>
        </button>
    )
}