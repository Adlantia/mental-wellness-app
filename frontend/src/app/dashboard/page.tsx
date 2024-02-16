export default function Dashboard () {
    return (
        <>
            <section className="container mx-auto py-12 flex justify-center w-100">
                <div className="bg-slate-200 rounded-md p-16 bg-gray-100 w-100 flex gap-3">
                    <h1 className="text-6xl text-center text-blue-700">Mood </h1>

                    <button
                        className="bg-blue-600 rounded-full p-4 text-white hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-950">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                             className="h-6 w-6">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M12 4v16m8-8H4"></path>
                        </svg>
                    </button>
                </div>

                </section>

            <section className="container mx-auto py-12 flex justify-center w-100">
                <div className="bg-slate-200 rounded-md p-16 bg-gray-100 w-100 flex gap-3">
                    <h1 className="text-6xl text-center text-blue-700">Sleep </h1>

                    <button
                        className="bg-blue-600 rounded-full p-4 text-white hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-950">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                             className="h-6 w-6">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M12 4v16m8-8H4"></path>
                        </svg>
                    </button>

                </div>
            </section>

            <section className="container mx-auto py-12 flex justify-center w-100">
                <div className="bg-slate-200 rounded-md p-16 bg-gray-100 flex gap-3">
                    <h1 className="text-6xl text-center text-blue-700">Journal </h1>

                    <button
                        className="bg-blue-600 rounded-full p-4 text-white hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-950">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                             className="h-6 w-6">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M12 4v16m8-8H4"></path>
                        </svg>
                    </button>

                </div>
            </section>
        </>
    )
}