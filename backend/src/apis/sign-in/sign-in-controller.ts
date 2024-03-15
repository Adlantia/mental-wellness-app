import {Request, Response} from "express";
import {signInProfileSchema} from "./sign-in-validator";
import {zodErrorResponse} from "../../utils/response.utils";
import {PrivateProfile, selectPrivateProfileByProfileEmail} from "../profile/profile.model";
import {Status} from "../../utils/interfaces/Status";
import {generateJwt, validatePassword} from "../../utils/auth.utils";
import {v4 as uuid} from 'uuid'

/**
 * Express controller for sign-in
 * @endpoint POST /apis/sign-in/
 * @param request an object containing the body with a profileEmail and ProfilePassword.
 * @param response an object modeling the response that will be sent to client
 * @returns response to client indicating whether sign in was successful or not
 * @throws {Error} an error indicating what went wrong
 */

export async function signInController (request: Request, response: Response): Promise<Response> {
    try {
        console.log(request)

        //validate profile data from request body
        const validationResult = signInProfileSchema.safeParse(request.body)

        //return preformatted response if validation unsuccessful
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        //deconstruct profileEmail and profilePassword
        const {profileEmail, profilePassword} = validationResult.data

        //select profile by profileEmail from db
        const profile: PrivateProfile | null = await selectPrivateProfileByProfileEmail(profileEmail)

        //create preformatted response to send if sign in fails
        const signInFailedStatus: Status = {status: 400, message: 'Email or password is incorrect. Please try again.', data: null}

        if (profile === null) {
            return response.json(signInFailedStatus)
        }

        //check that password matches hash
        const isPasswordValid = await validatePassword(profile.profileHash, profilePassword)

        //check for failed sign in and send response to client if so
        if (!isPasswordValid) {
            return response.json(signInFailedStatus)
        }

        //if sign in successful, create new session, send response to client
        const {profileId, profileName} = profile

        //generate new signature for session
        const signature: string = uuid()

        //generate new jwt for session using profile info and signature
        const authorization: string = generateJwt({
            profileId, profileName, profileEmail
        }, signature)

        //set session variables
        request.session.profile = profile
        request.session.jwt = authorization
        request.session.signature = signature

        //set auth header
        response.header({authorization})

        //return response to client
        return response.json({status: 200, message: 'Sign in successful', data: null})

    } catch (error: any) {
        return response.json({status: 500, data: null, message: error.message})
    }
}