import {LogButton} from "@/app/dashboard/LogButton";
import {Tracker} from "@/utils/models/tracker.model";
import {fetchAllTrackers} from "@/utils/http/tracker.http";


export default async function Dashboard () {
    const trackers =  await getData()
    // console.log(trackers)
    return (
        <>
            <section className="container mx-auto py-12">
                {trackers.map(tracker => <LogButton link = {`/log/${tracker.trackerId}`} name= {tracker.trackerCategory} />)}

                <LogButton link = "/journal" name= "Journal" />
            </section>

        </>
    )
}
async function getData(): Promise<Tracker[]> {
    return  await fetchAllTrackers()
}


