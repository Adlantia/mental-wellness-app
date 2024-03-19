'use server'

import {Log} from "@/utils/models/log.model";
import {fetchLogsByLogProfileId} from "@/utils/http/log.http";
import {Graph} from "@/app/graph/Graph";
import {getSession} from "@/utils/models/fetchSession";
import {redirect} from "next/navigation";
import {fetchAllTrackers} from "@/utils/http/tracker.http";
import {Tracker} from "@/utils/models/tracker.model";
import {next} from "sucrase/dist/types/parser/tokenizer";





export default async function () {
    const session = await getSession()
    if(session === undefined) {
        redirect("/login")

    }
    console.log(session)
    const {logs, trackers}= await getData(session.authorization)
    console.log("logs", logs)

    const newLogArray: any[] = []
// construct date
    logs.map((log, index) => {
        const date = log.logDatetime as Date
        const day = date.getDate()
        const month = date.getMonth()+1
        const year = date.getFullYear() -2000

        // Concatenate date in format needed for graph
        let newLog: any = {date:`${month}/${day}/${year}`}

        trackers.map(tracker => {
            if(tracker.trackerId === log.logTrackerId) {
                newLog[tracker.trackerCategory] = log.logAnswer
            }   else {
                if(tracker.trackerCategory === "Sleep") {
                    // if tracker category is "Sleep" and the current index is not the first element,
                    // set the value to the previous value of Sleep, otherwise set it to null

                    newLog[tracker.trackerCategory] = (index) ? newLogArray[index - 1].Sleep : null
                    // if tracker.trackerCategory is not sleep and logAnswer is undefined then we need to fill in the undefined values

                } else if(newLogArray[index - 1][tracker.trackerCategory] )
                {
                    // get prior value for mood (priorValue)
                    const priorValue = newLogArray[index - 1][tracker.trackerCategory]

                    // determine how many elements into the future is the next recorded value(logAnswer) = gap
                    let gap
                    for(let i = index+1; i < logs.length; i++) {
                       if (tracker.trackerId === logs[i].logTrackerId && logs[i].logAnswer) {
                           gap = i-index

                           // get next value for mood(logAnswer)
                           const nextValue = logs[i].logAnswer

                           // Calculate the difference between prior value and next value (difference = priorMood - nextMood)
                           let difference = priorValue - nextValue

                           // Calculate the difference to the current value (differenceToCurrentValue = difference / (gap+1))
                           let differenceToCurrentValue = difference / (gap+1)

                           // console.log("priorValue", priorValue, "nextValue", nextValue, "difference", difference, "gap", gap)

                           // Calculate the current value (currentMoodValue = priorValue + differenceToCurrentValue)
                           newLog[tracker.trackerCategory] = priorValue - differenceToCurrentValue
                           break;
                       }
                    }
                } else {
                    // if there is no previous entry, make this null
                    newLog[tracker.trackerCategory] = null
                }
            }
        } )
         newLogArray.push(newLog)
    })


    console.log(newLogArray)

    return (
       <Graph
           // logs={logs} trackers={trackers}
           data = {newLogArray}
       />
    )
}

async function getData(authorization: string): Promise <{logs: Log[], trackers: Tracker[]}> {
    const trackers = await fetchAllTrackers()
    const logs = await fetchLogsByLogProfileId(authorization)
    return {logs, trackers}
}


