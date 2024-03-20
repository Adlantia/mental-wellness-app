import { Request, Response } from "express";
import { Status } from "../../utils/interfaces/Status";
import { zodErrorResponse } from "../../utils/response.utils";
import { PrivateProfile, updateProfile, selectPrivateProfileByProfileId } from "./profile.model";
import { PublicProfileSchema } from "./profile.validator";
import {setHash} from "../../utils/auth.utils";

/**
 * Express controller for updating a profile
 * @param request from client to server to update a profile 
 * @param response from server to client with status message to indicate whether update successful
 * @return {Promise<Resopnse<Status>>} A promise containing response for the client with the requested info
 */

export async function putProfileController(request:Request, response: Response): Promise<Response<Status>> {
    try {
        //validate updated profile data coming from request body
        const validationResultForRequestBody = PublicProfileSchema.safeParse(request.body)

        //if validation of the body unsuccessful, return a preformatted response to client
        if(!validationResultForRequestBody.success) {
            return zodErrorResponse(response, validationResultForRequestBody.error)
        }

        //validate profileId coming from request parameters
        const validationResultForRequestParams = PublicProfileSchema.pick({profileId: true}).safeParse(request.params)

        //if validation of params unsuccessful, return preformatted response to client
        if(!validationResultForRequestParams.success) {
            return zodErrorResponse(response, validationResultForRequestParams.error)
        }

        //grab profileId from the session
        const profileFromSession = request.session?.profile
        const profileIdFromSession = profileFromSession?.profileId

        //grab profileId off the validated request parameters
        const {profileId} = validationResultForRequestParams.data

        if(profileIdFromSession !== profileId) {
            return response.json({status: 400, message: 'You cannot update a profile that is not yours', data: null})
        }

        //grab the profile data off the validated request body
        const {profileName, profilePassword} = validationResultForRequestBody.data

        //grab the profile by profileId
        const profile: PrivateProfile | null = await selectPrivateProfileByProfileId(profileId)

        //if the profile does not exist, return a preformatted response to client
        if(profile === null) {
            return response.json({status: 400, message: 'Profile does not exist', data: null})
        }

        const profileHash = await setHash(profilePassword)

        //update the profile with the new data
        profile.profileName = profileName

        //update the profile in the database 
        await updateProfile(profile)

        //return a response to client with success message 
        return response.json({status: 200, message: 'Profile successfully updated', data: null})
    } catch (error: unknown) {
        return response.json({status: 500, message: 'internal server error', data: null})
    }
}
