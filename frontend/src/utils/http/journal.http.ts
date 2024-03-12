'use server'

import {Journal, JournalSchema} from "@/utils/models/journal.model";

export async function fetchJournalEntries(): Promise<Journal> {
    const {data} = await fetch(`&{proceses.env.REST_API_URL}/apis/journal`)
        .then(response => {
            if(!response.ok) {
                throw new Error(`error fetching journals`)
            } else {
                return response.json()
            }
        })
}

// return JournalSchema.parse(data)