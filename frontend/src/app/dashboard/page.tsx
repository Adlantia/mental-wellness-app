import {LogButton} from "@/app/dashboard/LogButton";
import {Tracker} from "@/utils/models/tracker.model";
import {fetchAllTrackers} from "@/utils/http/tracker.http";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Dashboard () {
    const trackers =  await getData()
    // console.log(trackers)
    return (
        <>
            <div className=" mx-auto">
                <h1 className="text-blue-800 text-4xl text-center mb-5 mt-6 text-semibold italic">Welcome!</h1>
                <h2 className="text-xl text-center text-blue-900 ">Click below to start Tracking and Journaling</h2>
            </div>

            <div className="flex-wrap md:flex-row mt-5">
                <section className="container mx-auto py-12 flex flex-row flex-wrap justify-center">
                    {trackers.map(tracker => <LogButton link={`/log/${tracker.trackerId}`}
                                                        name={tracker.trackerCategory}/>)}
                    <LogButton link="/journal" name="Journal"/>
                </section>
            </div>


            <div className="bg-gray-50 p-16 flex gap-3 mx-auto justify-center hover:bg-slate-100 mt-2 mb-3 shadow-lg rounded-lg w-96">
                <a href="/graph" className="text-4xl text-center text-blue-700 ">View Graph</a>
            </div>


        </>
    )
}

async function getData(): Promise<Tracker[]> {
    return await fetchAllTrackers()
}


