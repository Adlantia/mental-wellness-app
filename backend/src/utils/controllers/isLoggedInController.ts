import { Status } from "../interfaces/Status";
import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { PublicProfile } from "../../apis/profile/profile.model";

export function isLoggedInController(request: Request, response: Response, next: NextFunction): Response | void {
    //set a predefined response if the user is not logged in
    const status: Status = {status: 401, message: 'Please log in', data: null}
    try {
        //get the profile from the session
        const profile: PublicProfile | undefined = request.session?.profile

        //get the signature from the session
        const signature: string | undefined = request.session?.signature

        //get the unparsed jwt token from request header
        const unverifiedJwtToken: string | undefined = request.headers?.authorization

        //if the profile signature or jwt token are undefined, return predefined status
        if (profile === undefined || signature === undefined || unverifiedJwtToken === undefined) {
            return response.json(status)
        }

        //verify the jwt token from request header matches jwt token from session; if no match return predefined status
        if (unverifiedJwtToken !== request.session?.jwt) {
            return response.json(status)
        }

        //verify that jwt token from request is valid
        verify(unverifiedJwtToken, signature)

        //if jwt token verified without throwing an error, call the next controller
        return next()
    } catch (error: unknown) {
        return response.json(status)
    }
}

export function  isSessionActive(request: Request, response: Response, NextFunction: NextFunction) : Response | void {
    console.log(request.headers)
    const status: Status = {status: 401, message: 'Session has expired, please log in', data: null}
    const profile: PublicProfile | undefined = request.session?.profile
    console.log(profile)
    const status: Status = {status: 401, message: 'Please log in', data: null}
    if (profile === undefined) {
        return response.json(status)
    }
    NextFunction()
}