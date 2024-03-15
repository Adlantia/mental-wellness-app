'use server'

import {Tracker} from "@/utils/models/tracker.model";
import {fetchTrackerByTrackerId} from "@/utils/http/tracker.http";
import { LoggingForm } from "@/app/LoggingForm";

export default async function Page({params}: {params: {trackerId: string}})  {
            const {trackerId}= params

            const tracker = await getData(trackerId)
    return (
            <section className = 'container'>
                <h1 className='text-3xl max-w-fit mx-auto py-4 mt-4'> {tracker.trackerCategory} </h1>
                <h2 className='text-3xl max-w-fit mx-auto py-4 mt-4'> {tracker.trackerQuestion} </h2>
                <LoggingForm />
            </section>
    )
}
async function getData(trackerId:string): Promise<Tracker> {
    return  await fetchTrackerByTrackerId(trackerId)
}
