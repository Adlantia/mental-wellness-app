'use server'

import {Journal, JournalSchema} from "@/utils/models/journal.model";
import {cookies} from "next/headers";

export async function fetchJournalsByJournalProfileId(authorization: string): Promise<Journal[]>{
    const sid = cookies().get('connect.sid')?.value ?? ""

    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/journal`
        ,{
        headers: {
            "authorization": authorization
                , cookie: `connect.sid=${sid}`
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

export async function fetchJournalByJournalId(journalId: string, authorization: string): Promise<Journal>{
    const sid = cookies().get('connect.sid')?.value ?? ""

    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/journal/${journalId}`
        ,{
            headers: {
                "authorization": authorization
                , cookie: `connect.sid=${sid}`
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
    return JournalSchema.parse(data)
}