'use server'

import {Journal, JournalSchema} from "@/utils/models/journal.model";

export async function fetchAllJournals(): Promise<Journal[]>{
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/journal`)
        .then(response => {
            if(!response.ok) {
                throw new Error(`error fetching journals`)
            } else {
                return response.json()
            }
        })
    return JournalSchema.array().parse(data)
}

export async function fetchAllJournalsByJournalProfileId(): Promise<Journal>{
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/journal`)
        .then(response => {
            if(!response.ok) {
                throw new Error(`error fetching journal`)
            } else {
                return response.json()
            }
        })
    return JournalSchema.parse(data)
}
