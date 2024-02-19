type Journal = {journalId: string, journalProfileId: string, journalTitle: string, journalDateTime: string, journalText: string}
type JournalProps = {journal: Journal}
export function Journal({journal}: JournalProps) {
    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-5 mx-2 w-56 sm:w-auto">
            <h2 className="text-lg font-semibold">{journal.journalTitle}</h2>
            <p className="text-sm text-gray-500">{journal.journalDateTime}</p>
            <p className="text-sm text-gray-700">{journal.journalText}</p>
        </div>
    )
}