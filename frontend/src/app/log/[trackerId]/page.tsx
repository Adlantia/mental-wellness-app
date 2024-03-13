'use server'

import {RatingScale} from "@/app/RatingScale";
import {SubmitButton} from "@/app/SubmitButton";
import {Tracker} from "@/utils/models/tracker.model";
import { fetchTrackerByTrackerId} from "@/utils/http/tracker.http";


export default async function Page({params}: {params: {trackerId: string}})  {
            const {trackerId}= params

            const tracker = await getData(trackerId)
    return (
            <section className = 'container'>
                <h1 className='text-3xl max-w-fit mx-auto py-4 mt-4'> {tracker.trackerQuestion} </h1>
                <RatingScale />
                <div className = 'flex justify-center gap-4 my-6'>
                    <SubmitButton buttonName = 'Submit' />
                    <SubmitButton buttonName = 'Skip' />
                </div>
            </section>
    )
}
async function getData(trackerId:string): Promise<Tracker> {
    return  await fetchTrackerByTrackerId(trackerId)
}