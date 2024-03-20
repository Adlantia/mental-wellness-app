import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

export async function PUT(request: NextRequest): Promise <Response> {

    const data = await request.json()
    const sid = cookies().get('connect.sid')?.value ?? ""
    const authorization = request.headers.get("authorization")
    if (sid && authorization) {
    const responseFormServer = await fetch(`${process.env.REST_API_URL}/apis/profile/${data.profileId}`,
        {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authorization,
                "Cookie": sid

            },
            body: JSON.stringify(data)
        }
    )

    const response = responseFormServer.clone()

    const authorizationFromResponse = response.headers.get("authorization")


    if (authorizationFromResponse) {
        const cookieStore = cookies()
        cookieStore.set("jwt-token", authorizationFromResponse, {path: "/", maxAge:10_800_000})

    }

    return response
    }
    return NextResponse.json()


}