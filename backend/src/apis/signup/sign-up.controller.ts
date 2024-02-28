
import {SignUpProfileSchema} from "./sign-up.validator";
import {zodErrorResponse} from "../../utils/response.utils";
import Mailgun from "mailgun.js";
import {insertProfile, PrivateProfile} from "../profile/profile.model";
import {Status} from "../../utils/interfaces/Status";
import {Request, Response} from "express";
import formData from 'form-data'
import {setActivationToken, setHash} from "../../utils/auth.utils";

/**
 *  Express controller for sign-up
 *  @endpoint POST /apis/sign-up/
 *  @param request an object containing the body contain a profileName, profileEmail, profilePassword and profilePasswordConfirm
 *  @param response an object modeling the response that will be sent to the client
 *  @returns response to the client indicating whether the sign up was successful or not
 */

export async function signUpController (request: Request, response: Response): Promise<Response | any> {
    try {
        const validationResult = SignUpProfileSchema.safeParse(request.body)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }


        const mailgun: Mailgun = new Mailgun(formData)
    const mailgunClient = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY as string })

    const { profileName, profileEmail, profilePassword } = request.body

    const profileHash = await setHash(profilePassword)

    const profileActivationToken = setActivationToken()

    const basePath: string = `${request.protocol}://${request.hostname}:8080${request.originalUrl}/activation/${profileActivationToken}`

        const message = `<h2> Welcome to Mindsight. </h2>
    <p>In order to start tracking data, you must first confirm your account.</p>
    <p><a href="${basePath}">${basePath}</a></p>`

        const mailgunMessage = {
        from: `Mailgun Sandbox <mailgun@${process.env.MAILGUN_DOMAIN as string}>`,
        to: profileEmail,
        subject: 'One step closer to signup -- Account Activation',
        html: message}


    const profile: PrivateProfile = {
        profileId: '',
        profileActivationToken,
        profileEmail,
        profileName,
        profileHash
    }

    await insertProfile(profile)

    await mailgunClient.messages.create(process.env.MAILGUN_DOMAIN as string, mailgunMessage)

    const status: Status = {
        status: 200,
        message: 'Profile successfully created please check your email.',
        data: null
    }

    return response.json(status)

} catch (error: any) {
        console.error(error)
    const status: Status = {
        status: 500,
        message: error.message,
        data: null
    }
    return response.json(status)
} }