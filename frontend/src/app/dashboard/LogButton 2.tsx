type LogButtonProps = {link: string, name:string}

export function LogButton ({link, name}: LogButtonProps) {
    return (
        <div className="bg-base-100 rounded-md p-16 w-96 flex gap-3 my-4 mx-auto justify-between">
            <h2 className="text-6xl text-center text-blue-700"><a href={`${link}`}>{name}</a> </h2>

            <button
                className="bg-blue-600 rounded-full p-4 text-white hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-950">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                     className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M12 4v16m8-8H4"></path>
                </svg>
            </button>
        </div>
    )
}