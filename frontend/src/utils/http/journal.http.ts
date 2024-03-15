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

export async function fetchJournalsByJournalProfileId(authorization: string): Promise<Journal[]>{
    const data = await fetch(`${process.env.PUBLIC_API_URL}/apis/journal`
        ,{
        headers: {
            "authorization": authorization
        }
        }
    )

        .then(response => {
            if(!response.ok) {
                throw new Error(`error fetching journal`)
            } else {

                return response.json()

            }

        })
    console.log(data)
    return JournalSchema.array().parse(data)
}