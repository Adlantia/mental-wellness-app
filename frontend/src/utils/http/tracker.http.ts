'use server'

import {Tracker, TrackerSchema} from "@/utils/models/tracker.model";

export async function fetchAllTrackers(): Promise<Tracker[]>{
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/tracker`)
        .then((response:Response) => {
            if(!response.ok) {
                throw new Error('Error fetching trackers')
            } else {
                return response.json()
            }
        })
            return TrackerSchema.array().parse(data)
}

export async function fetchTrackerByTrackerId(trackerId:string): Promise<Tracker>{
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/tracker/${trackerId}`)
        .then((response:Response) => {
            if(!response.ok) {
                throw new Error('Error fetching tracker')
            } else {
                return response.json()
            }
        })
    return TrackerSchema.parse(data)
}