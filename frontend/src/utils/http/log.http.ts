"use server"
import {unstable_noStore as noStore} from "next/cache";
import {Log, LogSchema} from "@/utils/models/log.model";
import {cookies} from "next/headers";

export async function fetchAllLogs(): Promise<Log[]> {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/log`)
        .then(response => {
            if(!response.ok) {
                throw new Error(`error fetching logs`)
            } else {
                return response.json()
            }
        })
    return LogSchema.array().parse(data)
}

export async function fetchLogsByLogProfileId(authorization: string): Promise<Log[]> {
    noStore()
    const cookieStore = cookies()
    const cookieValue = cookieStore.get('connect.sid')?.value ?? ""

    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/log`, {
        headers: {
            authorization,
            cookie: `connect.sid=${cookieValue}`
        },
    })
        .then(response => {
            if(!response.ok) {
                throw new Error(`error fetching log`)
            } else {
                return response.json()
            }
        })
    console.log("data", data)
    return LogSchema.array().parse(data)
}