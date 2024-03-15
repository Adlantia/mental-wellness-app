'use server'

import {Log} from "@/utils/models/log.model";
import {fetchLogsByLogProfileId} from "@/utils/http/log.http";
import {Graph} from "@/app/graph/Graph";
import {getSession} from "@/utils/models/fetchSession";
import {redirect} from "next/navigation";
import {fetchAllTrackers} from "@/utils/http/tracker.http";
import {Tracker} from "@/utils/models/tracker.model";





export default async function () {
    const session = await getSession()
    if(session === undefined) {
        redirect("/login")

    }
    console.log(session)
    const {logs, trackers}= await getData(session.authorization)
    console.log("logs", logs)
    return (
       <Graph logs={logs} trackers={trackers} />
    )
}

async function getData(authorization: string): Promise <{logs: Log[], trackers: Tracker[]}> {
    const trackers = await fetchAllTrackers()
    const logs = await fetchLogsByLogProfileId(authorization)
    return {logs, trackers}
}


