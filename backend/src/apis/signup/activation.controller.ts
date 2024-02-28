import {selectPrivateProfileByProfileActivationToken, updateProfile} from "../profile/profile.model";
import {zodErrorResponse} from "../../utils/response.utils";
import {activationProfileSchema} from "./activation.validator";
import {Status} from "../../utils/interfaces/Status";
import {Request, Response} from 'express'

/**
 * Handles the logic for account activation by checking for an existing profileActivationToken and updating the profileActivationToken to null
 * @param request {Request} the request object containing the profileActivationToken
 * @param response {Response} the response object containing the status and message
 */
export async function activationController (request: Request, response: Response) : Promise<Response<Status>> {
    try {
        const validationResult = activationProfileSchema.safeParse(request.params)
        //if the validation is unsuccessful, return a preformatted response to the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

    // deconstruct the profileActivationToken from the request body
    const {activation} = validationResult.data


    //select the profile by profileActivationToken
    const profile = await selectPrivateProfileByProfileActivationToken(activation)

    // if the profile is null, return a preformatted response to the client
    if (profile === null) {
        // @ts-ignore
        return response.json({
            status: 400,
            data: null,
            message: "Account activation has failed. Have you already activated this account?"
        })
    }

    //if the profile is not null, update the profileActivationToken to null and send a success response
    profile.profileActivationToken = null
    await updateProfile(profile)
    // @ts-ignore
        return response.json({
        status: 200,
        data: null,
        message: 'Account activation was successful'
    })

}   catch (error:any) {
    //catch any errors and return them to the client
        // @ts-ignore
        return response.json({status:500, data:null, message: error.message})
    }
}