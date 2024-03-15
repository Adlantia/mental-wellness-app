"use server"

import {Log, LogSchema} from "@/utils/models/log.model";

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

export async function fetchLogsByLogProfileId(): Promise<Log[]> {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/log`)
        .then(response => {
            if(!response.ok) {
                throw new Error(`error fetching log`)
            } else {
                return response.json()
            }
        })
    return LogSchema.array().parse(data)
}