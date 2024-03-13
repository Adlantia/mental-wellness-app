
import {cookies} from "next/headers";


export async function POST(request: Response) {

    const data = await request.json()

    const responseFormServer = await fetch(`${process.env.REST_API_URL}/apis/login`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    )

    const response = responseFormServer.clone()

    const authorization = response.headers.get("authorization")
    console.log(authorization)

    if (authorization) {
        const cookieStore = cookies()
        cookieStore.set("jwt-token", authorization, {path: "/", maxAge:10_800_000})

    }

    return response

}