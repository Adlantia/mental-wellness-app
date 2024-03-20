import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {headers as incomingHeaders} from "next/dist/client/components/headers";
import {getSession, setJwtToken, setProfile} from "@/utils/models/fetchSession";
import {revalidatePath} from "next/cache";
import {unstable_noStore} from "next/cache";
import {set} from "zod";

export async function PUT(request: NextRequest): Promise <Response> {
    unstable_noStore()
    const data = await request.json()
    const authorization = request.headers.get("authorization") ?? ""
    const cookieStore = cookies()
    const cookieValue = cookieStore.get('connect.sid')?.value ?? ""
    const responseFormServer = await fetch(`${process.env.REST_API_URL}/apis/profile/${data.profileId}`,
        {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                authorization: authorization,
                cookie: `connect.sid=${cookieValue}`
            },
            body: JSON.stringify(data)
        }
    )

    const response = responseFormServer.clone()

    const result = await responseFormServer.json()
    console.log("data", result)
    await setProfile(data)

    if (result.data) {
        setJwtToken(result.data)
        const cookieStore = cookies()
        cookieStore.set("jwt-token", result.data, {path: "/", maxAge: 10_800_000})
        revalidatePath("/", "layout")

    }

    return response
}




export async function setHeaders() {
    const headers = new Headers()

    const session = await getSession()

    if(session) {
        headers.append("authorization", session.authorization)
    }

    for (const pair of incomingHeaders().entries()) {
        console.log(pair[0], pair[1])
        headers.append(pair[0], pair[1])
    }
    return headers
}