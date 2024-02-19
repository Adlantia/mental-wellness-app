
export default function JournalList() {
    return (
        <>

            <div className="flex flex-col justify-start items-center mt-8">
                <h1 className="text-3xl font-semibold mb-8">Journal</h1>
                <button
                    className="mb-4 bg-white p-6 rounded-lg shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 w-64">
                    <span className="text-lg font-semibold">Add Entry</span>
                    <span className="ml-4 text-blue-900">+</span>
                </button>

                <div className="flex flex-col items-center justify-center sm:flex-row sm:flex-wrap">
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-5 mx-2 w-56 sm:w-auto">
                        <h2 className="text-lg font-semibold">Journal Entry Title</h2>
                        <p className="text-sm text-gray-500">Date: xx/xx/xxx</p>
                        <p className="text-sm text-gray-700">This is a placeholder text for the journal entry.</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-5 mx-2 w-56 sm:w-auto">
                        <h2 className="text-lg font-semibold">Journal Entry Title</h2>
                        <p className="text-sm text-gray-500">Date: xx/xx/xx</p>
                        <p className="text-sm text-gray-700">This is a placeholder text for the journal entry.</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-5 mx-2 w-56 sm:w-auto">
                        <h2 className="text-lg font-semibold">Journal Entry Title</h2>
                        <p className="text-sm text-gray-500">Date: xx/xx/xx</p>
                        <p className="text-sm text-gray-700">This is a placeholder text for the journal entry.</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-5 mx-2 w-56 sm:w-auto">
                        <h2 className="text-lg font-semibold">Journal Entry Title</h2>
                        <p className="text-sm text-gray-500">Date: xx/xx/xx</p>
                        <p className="text-sm text-gray-700">This is a placeholder text for the journal entry.</p>
                    </div>
                </div>
            </div>

        </>
    )
}