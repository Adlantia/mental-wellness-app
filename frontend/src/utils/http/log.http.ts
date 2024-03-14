'use server'


export async function fetchAllLogs(): Promise<log[]> {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/graph`)
        .then(response => {
            if(!response.ok) {
                throw new Error(`error fetching logs`)
            } else {
                return response.json()
            }
        })
    return LogSchema.array().parse(data)
}

export async function fetchLogsbyLogProfileIt(): Promise<logs[]> {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/graph`)
        .then(response => {
            if(!response.ok) {
                throw new Error(`error fetching log`)
            } else {
                return response.json()
            }
        })
    return LogSchema.array().parse(data)
}